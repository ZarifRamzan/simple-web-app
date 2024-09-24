import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders the form and submits name and age', async () => {
        render(<App />);

        // Input elements
        const nameInput = screen.getByPlaceholderText(/enter your name/i);
        const ageInput = screen.getByPlaceholderText(/enter your age/i);
        const submitButton = screen.getByText(/submit/i);

        // Simulate user typing in name and age
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(ageInput, { target: { value: '30' } });

        // Mocking fetch for form submission
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve('Submission successful!'),
            })
        );

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for the success message to appear
        const successMessage = await waitFor(() => screen.getByText(/submission successful!/i));
        expect(successMessage).toBeInTheDocument();

        // Clean up the fetch mock
        global.fetch.mockRestore();
    });

    test('displays an error message when the submission fails', async () => {
        render(<App />);

        const nameInput = screen.getByPlaceholderText(/enter your name/i);
        const ageInput = screen.getByPlaceholderText(/enter your age/i);
        const submitButton = screen.getByText(/submit/i);

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(ageInput, { target: { value: '25' } });

        // Mocking fetch to simulate an error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        fireEvent.click(submitButton);

        // Wait for the error message to appear
        const errorMessage = await waitFor(() => screen.getByText(/failed to submit name/i));
        expect(errorMessage).toBeInTheDocument();

        // Clean up the fetch mock
        global.fetch.mockRestore();
    });
});
