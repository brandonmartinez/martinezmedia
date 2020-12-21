import React, { Fragment, useEffect, useState } from 'react';

const NoSsr = ({ children, fallback = null }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return <Fragment>{isMounted ? children : fallback}</Fragment>;
};

export default NoSsr;
