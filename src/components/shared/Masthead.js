import styled from 'styled-components';

// Custom Components
import Images from 'components/shared/Images';
import log from './Logger';
const logger = log.getLogger('Masthead');

const StyledHeader = styled.header`
	margin-bottom: ${(props) => props.theme.gutterLarge};
	position: relative;
	height: ${(props) => Math.ceil(100 * props.heightPercentage)}vh;
	padding-top: 3.75rem;
`;
const StyledBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: no-repeat center center;
	background-color: ${(props) => props.theme.gray};
    background-attachment: scroll;
    background-size: cover;
	${(props) =>
		props.backgroundImages.srcSet
			? Images.cssBackgroundImageSet(props.backgroundImages)
			: `background-image: url('${props.backgroundImages.src}');`}
	filter: blur(${(props) => props.theme.blurRadius});
	z-index: -2;
`;
const StyledOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: ${(props) => props.theme.black};
	opacity: 0.5;
	z-index: -1;
`;
const StyledHeadingContainer = styled.div`
	height: 100%;
	color: white;
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
`;
const StyledHeading = styled.h1`
	font-size: 3rem;
	margin-top: 0;
	text-shadow: ${(props) => props.theme.textShadow};

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointMedium}) {
		font-size: 6rem;
	}
`;
const StyledSubheading = styled.span`
	font-size: 1.2rem;
	line-height: 1.6;
	display: block;
	opacity: 0.7;
	margin: ${(props) => props.theme.gutter} 0 0;
	text-shadow: ${(props) => props.theme.textShadow};

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointMedium}) {
		font-size: 1.6rem;
	}
`;

const CreateSizedBackgroundImages = (imagePath) => {
	// If it's not a local masthead image, assuming it's not getting "required"
	if (imagePath.substring(0, 2) !== './') {
		return {
			src: imagePath
		};
	}

	return Images.requireMasthead(imagePath);
};

const Masthead = ({
	backgroundImage,
	heightPercentage,
	className,
	children
}) => {
	const backgroundImages = CreateSizedBackgroundImages(backgroundImage);

	if (!heightPercentage) {
		logger.debug('No height percentage specified, using 50%;');
		heightPercentage = 0.5;
	}

	return (
		<StyledHeader heightPercentage={heightPercentage} className={className}>
			<StyledBackground backgroundImages={backgroundImages} />
			<StyledOverlay />
			<StyledHeadingContainer>{children}</StyledHeadingContainer>
		</StyledHeader>
	);
};

Masthead.Heading = StyledHeading;
Masthead.Subheading = StyledSubheading;

export default Masthead;
