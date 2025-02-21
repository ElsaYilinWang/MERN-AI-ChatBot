import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Chat from '../../../../pages/Chat';
import { AuthProvider } from '../../../../context/AuthContext';

// Setup MSW server
const server = setupServer(
  rest.post('/api/chat', (req, res, ctx) => {
    return res(
      ctx.json({
        role: 'assistant',
        content: 'Hello! How can I help you today?'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Chat Feature Integration', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <Chat />
      </AuthProvider>
    );
  });

  it('should send message and display response', async () => {
    // Find and type in the input
    const input = screen.getByPlaceholderText(/type a message/i);
    await userEvent.type(input, 'Hello AI');

    // Click send button
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);

    // Wait for and verify the response
    await waitFor(() => {
      expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
    });
  });

  it('should handle code block messages', async () => {
    // Setup mock response with code block
    server.use(
      rest.post('/api/chat', (req, res, ctx) => {
        return res(
          ctx.json({
            role: 'assistant',
            content: 'Here is an example:\n```const example = "test";```'
          })
        );
      })
    );

    // Send message
    const input = screen.getByPlaceholderText(/type a message/i);
    await userEvent.type(input, 'Show me some code');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // Verify code block rendering
    await waitFor(() => {
      expect(screen.getByText('const example = "test";')).toBeInTheDocument();
    });
  });

  it('should handle error states', async () => {
    // Setup error response
    server.use(
      rest.post('/api/chat', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    // Send message
    const input = screen.getByPlaceholderText(/type a message/i);
    await userEvent.type(input, 'This will fail');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // Verify error handling
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
}); 