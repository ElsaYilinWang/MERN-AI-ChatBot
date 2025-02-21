import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(
    <AuthProvider>{ui}</AuthProvider>,
    options
  );
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render }; 