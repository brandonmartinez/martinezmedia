import { useState, useRef, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
	fadeIn,
	fadeInDown,
	fadeInLeft,
	fadeInRight,
	fadeInUp,
	pulse
} from 'react-animations';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

// Custom Components
import useWindowDimensions from '../../hooks/useWindowDimensions';
import log from './Logger';
const logger = log.getLogger('Animated');

// Animations that are available
const fadeInDownKeyframes = keyframes`${fadeInDown}`;
const fadeInKeyframes = keyframes`${fadeIn}`;
const fadeInLeftKeyframes = keyframes`${fadeInLeft}`;
const fadeInRightKeyframes = keyframes`${fadeInRight}`;
const fadeInUpKeyframes = keyframes`${fadeInUp}`;
const pulseKeyframes = keyframes`${fadeIn} ${pulse}`;

// Animation Helpers
const visibleAnimation = css`
	${(props) => (props.isVisible ? props.keyframeAnimation : '')};
`;
const AnimatedDiv = styled.div`
	animation: ${(props) => props.duration}s ${visibleAnimation};
	visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

// Hooks used in animations
const useWindowScrollPosition = () => {
	const { height } = useWindowDimensions();
	const [viewportBoundaryLine, setViewportBoundaryLine] = useState(height);

	// Position of the Viewport
	// TODO: this should be done globally and then stored in a context, instead of for each component
	useScrollPosition(
		({ currPos }) => {
			const y = currPos.y;
			const boundaryCheckLine = y + height;

			if (boundaryCheckLine > viewportBoundaryLine) {
				logger.debug(
					'Viewport Position',
					`Max Scroll Increased to ${
						y + height
					}. Setting boundaryCheckLine to ${boundaryCheckLine}.`
				);

				setViewportBoundaryLine(boundaryCheckLine);
			}
		},
		[viewportBoundaryLine],
		null,
		true,
		100
	);

	return { windowHeight: height, viewportBoundaryLine };
};

const getActualElementCoordinates = (elem) => {
	const coordinates = { top: 0, left: 0 };

	const box = elem.getBoundingClientRect();
	if (!box) {
		return coordinates;
	}

	const body = document.body;
	const docEl = document.documentElement;

	const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	const clientTop = docEl.clientTop || body.clientTop || 0;
	const clientLeft = docEl.clientLeft || body.clientLeft || 0;

	coordinates.top = Math.round(box.top + scrollTop - clientTop);
	coordinates.left = Math.round(box.left + scrollLeft - clientLeft);

	return coordinates;
};

const useRefScrollPosition = ({ ref, windowHeight, viewportBoundaryLine }) => {
	const [isVisible, setIsVisible] = useState(false);

	useScrollPosition(
		({ currPos }) => {
			// If we're already visible, we're done here
			if (isVisible) {
				return;
			}

			// Get proper coordinates (currPos is relative to the container/viewport)
			const coords = getActualElementCoordinates(ref.current);
			// start the animate when the top of the container is within the window by 5%
			const animateOnY = coords.top + windowHeight * 0.05;

			if (animateOnY <= viewportBoundaryLine) {
				logger.debug(
					'DOM Element Position',
					'Scrolled In View',
					currPos,
					coords,
					windowHeight,
					animateOnY,
					viewportBoundaryLine,
					ref.current
				);
				setIsVisible(true);
			}
		},
		[isVisible, viewportBoundaryLine],
		ref,
		false,
		100
	);

	// This is to fire after the first render for anything that is already in view
	useEffect(() => {
		if (!ref || !ref.current) {
			return;
		}

		// Get the y position on the page
		const y = ref.current.getBoundingClientRect().y;
		const isVisible = y < windowHeight;

		if (isVisible) {
			logger.debug('DOM Element Position', 'In View on Render', y, ref.current);
			setIsVisible(true);
		}
	}, []);

	return { isVisible };
};

// Main animation logic
const Animated = ({ animation, duration, children }) => {
	const ref = useRef(null);
	const { windowHeight, viewportBoundaryLine } = useWindowScrollPosition();
	const { isVisible } = useRefScrollPosition({
		ref,
		windowHeight,
		viewportBoundaryLine
	});

	if (!duration) {
		duration = 2;
	}

	return useMemo(
		() => (
			<AnimatedDiv
				keyframeAnimation={animation}
				isVisible={isVisible}
				duration={duration}
				ref={ref}
			>
				{children}
			</AnimatedDiv>
		),
		[isVisible]
	);
};

Animated.FromLeft = ({ ...props }) =>
	Animated({ animation: fadeInLeftKeyframes, ...props });

Animated.FadeIn = ({ ...props }) =>
	Animated({ animation: fadeInKeyframes, ...props });

Animated.FromRight = ({ ...props }) =>
	Animated({ animation: fadeInRightKeyframes, ...props });

Animated.FromBottom = ({ ...props }) =>
	Animated({ animation: fadeInUpKeyframes, ...props });

Animated.FromTop = ({ ...props }) =>
	Animated({ animation: fadeInDownKeyframes, ...props });

Animated.Pulse = ({ ...props }) =>
	Animated({ animation: pulseKeyframes, ...props });

export default Animated;
