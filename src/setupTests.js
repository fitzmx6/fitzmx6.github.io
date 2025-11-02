import '@testing-library/jest-dom';

// Mock the analytics module to avoid import.meta.env issues in tests
jest.mock('./utils/analytics', () => ({
	initGA: jest.fn(),
	trackPageView: jest.fn(),
	trackEvent: jest.fn()
}));