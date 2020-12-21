import ReactGA from 'react-ga';
import React, { useEffect } from 'react';
import log from './Logger';
const logger = log.getLogger('GoogleAnalytics');

class GoogleAnalytics {
	constructor() {
		this.analyticsKey = 'UA-9271068-1';
	}

	initialize() {
		logger.debug(`Initializing Google Analytics with ${this.analyticsKey} key.`);
		ReactGA.initialize(this.analyticsKey);
	}

	logPageView() {
		logger.debug(`Logging Page View ${window.location.pathname}.`);
		ReactGA.set({ page: window.location.pathname });
		ReactGA.pageview(window.location.pathname);
	}

	logEvent({ category = '', action = '' }) {
		if (category && action) {
			logger.debug(`Logging Event ${category} - ${action}.`);
			ReactGA.event({ category, action });
		}
	}

	logException({ description = '', fatal = false }) {
		if (description) {
			logger.debug(`Logging Exception ${description}. Fatal? ${fatal}.`);
			ReactGA.exception({ description, fatal });
		}
	}

	useAnalytics() {
		const isBrowser = typeof window !== `undefined`;
		logger.debug(`useAnalytics - Is browser? ${isBrowser}.`);
		if (!isBrowser) {
			return false;
		}

		useEffect(() => {
			if (!window.GA_INITIALIZED) {
				logger.debug('Google Analytics not initialized.');

				this.initialize();
				window.GA_INITIALIZED = true;
			}
			this.logPageView();
		}, []);

		return true;
	}
}

export default new GoogleAnalytics();
