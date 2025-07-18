import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/app.tsx';

describe('App component', () => {
    it('renders the Vite and React logos', () => {
        render(<App />);

        const viteLogo = screen.getByAltText('Vite logo');
        const reactLogo = screen.getByAltText('React logo');

        expect(viteLogo).toBeInTheDocument();
        expect(reactLogo).toBeInTheDocument();
    });

    it('renders initial count and increments on click', () => {
        render(<App />);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('count is 0');

        fireEvent.click(button);
        expect(button).toHaveTextContent('count is 1');

        fireEvent.click(button);
        expect(button).toHaveTextContent('count is 2');
    });
});
