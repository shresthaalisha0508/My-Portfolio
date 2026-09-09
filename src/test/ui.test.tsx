import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Expertise } from '@/sections/Expertise/Expertise';
import { expertiseAreas } from '@/data';

describe('UI primitives', () => {
  it('Expertise renders one card per data entry (data-driven rendering)', () => {
    render(<Expertise />);

    for (const area of expertiseAreas) {
      expect(screen.getByRole('heading', { name: area.title })).toBeInTheDocument();
    }
    // Adding a 7th expertise to the data file should make this test fail
    // until a card appears — the guard rail for data-driven rendering.
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(expertiseAreas.length);
  });

  it('SectionHeading renders eyebrow, title and optional lede', async () => {
    const { SectionHeading } = await import('@/components/ui/SectionHeading');

    render(
      <SectionHeading
        eyebrow="Expertise"
        title="Clinical expertise built around people"
        lede="Supporting line."
      />,
    );

    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Clinical expertise built around people' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Supporting line.')).toBeInTheDocument();
  });
});
