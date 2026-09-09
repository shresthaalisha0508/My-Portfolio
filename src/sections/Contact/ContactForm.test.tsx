import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ContactForm } from './ContactForm';
import { profile } from '@/data';
import { mockWindowLocation } from '@/test/mocks';

describe('ContactForm validation', () => {
  it('announces a summary and shows field errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/3 issues/i);
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Please include a message.')).toBeInTheDocument();
  });

  it('flags an invalid email with an accessible error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const email = screen.getByLabelText('Email');
    await user.type(email, 'not-an-email');
    await user.tab(); // blur triggers validation

    expect(email).toBeInvalid();
    expect(screen.getByText(/doesn’t look right/i)).toBeInTheDocument();
  });

  it('does not navigate for invalid data', async () => {
    const location = mockWindowLocation();
    const hrefSetter = vi.fn();
    Object.defineProperty(location, 'href', { set: hrefSetter });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(hrefSetter).not.toHaveBeenCalled();
  });

  it('opens a mailto: link with prefilled content on valid data', async () => {
    const location = mockWindowLocation();

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Alex Doe');
    await user.type(screen.getByLabelText('Email'), 'alex@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would love to discuss a critical care opportunity with you.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(location.href.startsWith(`mailto:${profile.email}`)).toBe(true);
    expect(location.href).toContain('subject=Portfolio%20enquiry');
  });
});
