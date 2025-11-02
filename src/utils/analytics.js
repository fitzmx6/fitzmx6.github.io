import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
	// Get GA Measurement ID from environment variable
	// For GitHub Pages, you can set this in your .env file or pass it directly
	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

	if (measurementId) {
		ReactGA.initialize(measurementId);
		console.log('Google Analytics initialized with ID:', measurementId);
	} else {
		console.warn('Google Analytics Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in your environment.');
	}
};

// Track page view
export const trackPageView = (path) => {
	if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
		ReactGA.send({ hitType: 'pageview', page: path });
	}
};

// Track custom events
export const trackEvent = (category, action, label = null, value = null) => {
	if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
		ReactGA.event({
			category,
			action,
			label,
			value
		});
	}
};
