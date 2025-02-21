import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatItem from '../../../../components/chat/ChatItem';
import { AuthProvider } from '../../../../context/AuthContext';
import { extractCodeFromString, isCodeBlock } from '../../../components/chat/ChatItem';

// Mock the auth context
jest.mock('../../../../context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'John Doe'
    }
  })
}));

describe('ChatItem Component', () => {
  it('renders user message correctly', () => {
    render(
      <AuthProvider>
        <ChatItem 
          content="Hello, how are you?" 
          role="user" 
        />
      </AuthProvider>
    );

    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders assistant message correctly', () => {
    render(
      <AuthProvider>
        <ChatItem 
          content="I'm doing well, thanks!" 
          role="assistant" 
        />
      </AuthProvider>
    );

    expect(screen.getByText("I'm doing well, thanks!")).toBeInTheDocument();
    expect(screen.getByAltText('openai')).toBeInTheDocument();
  });

  it('renders code blocks with syntax highlighting', () => {
    const codeMessage = '```const hello = "world";```';
    render(
      <AuthProvider>
        <ChatItem 
          content={codeMessage} 
          role="assistant" 
        />
      </AuthProvider>
    );

    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('handles mixed content with code and text', () => {
    const mixedContent = 'Here is some code:\n```const x = 1;```\nAnd some text.';
    render(
      <AuthProvider>
        <ChatItem 
          content={mixedContent} 
          role="assistant" 
        />
      </AuthProvider>
    );

    expect(screen.getByText('Here is some code:')).toBeInTheDocument();
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('And some text.')).toBeInTheDocument();
  });
});

describe('Message Utilities', () => {
  describe('extractCodeFromString', () => {
    it('should extract code blocks correctly', () => {
      const input = 'Text ```code``` more text';
      const result = extractCodeFromString(input);
      expect(result).toEqual(['Text ', 'code', ' more text']);
    });

    it('should return null for messages without code blocks', () => {
      const input = 'Plain text message';
      const result = extractCodeFromString(input);
      expect(result).toBeNull();
    });
  });

  describe('isCodeBlock', () => {
    it('should identify code blocks correctly', () => {
      expect(isCodeBlock('const x = 1;')).toBeTruthy();
      expect(isCodeBlock('function test() {}')).toBeTruthy();
      expect(isCodeBlock('Regular text')).toBeFalsy();
    });
  });
}); 