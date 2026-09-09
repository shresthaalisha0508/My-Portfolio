import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Navbar } from './Navbar';
import { navigationItems, profile } from '@/data';

describe('Navbar', () => {
  it('renders the brand name and all navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText(profile.name)).toBeInTheDocument();

    for (const item of navigationItems) {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument();
    }
  });

  it('renders a Download CV link pointing at the CV asset', () => {
    render(<Navbar />);

    const cvLink = screen.getAllByRole('link', { name: /download cv/i })[0];
    expect(cvLink).toHaveAttribute('href', profile.cvUrl);
  });

  it('opens and closes the mobile menu via the toggle button', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close navigation menu/i }));
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('closes the mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    const aboutLink = within(mobileNav).getByRole('link', { name: 'About' });
    await user.click(aboutLink);

    expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
