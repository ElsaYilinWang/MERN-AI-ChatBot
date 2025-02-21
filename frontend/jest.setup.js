import '@testing-library/jest-dom';

// Mock MUI components if needed
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    palette: {
      mode: 'light',
    },
  }),
}));