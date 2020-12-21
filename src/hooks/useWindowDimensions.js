import { useState, useLayoutEffect } from 'react';

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
};

const useWindowDimensions = () => {
	const isBrowser = typeof window !== `undefined`;
	if (!isBrowser) {
		return { width: 0, height: 0 };
	}

	const initialWindowDimensions = getWindowDimensions();
	const [windowDimensions, setWindowDimensions] = useState(
		initialWindowDimensions
	);

	useLayoutEffect(() => {
		function handleResize() {
			const currentWindowDimensions = getWindowDimensions();
			setWindowDimensions(currentWindowDimensions);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
