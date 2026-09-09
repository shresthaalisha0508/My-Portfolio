import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Experience } from './Experience';
import { experiences } from '@/data';

describe('Experience section', () => {
  it('renders every role from the data file', () => {
    render(<Experience />);

    for (const job of experiences) {
      expect(screen.getByText(job.role)).toBeInTheDocument();
      expect(screen.getByText(job.organization)).toBeInTheDocument();
      expect(screen.getByText(job.period)).toBeInTheDocument();
    }
  });

  it('renders responsibilities for each role', () => {
    render(<Experience />);

    for (const job of experiences) {
      for (const responsibility of job.responsibilities) {
        expect(screen.getByText(responsibility)).toBeInTheDocument();
      }
    }
  });

  it('renders as a semantic list with the right number of items', () => {
    render(<Experience />);

    // The timeline <ol> contains one <li> per role.
    const timeline = screen.getByRole('list', {
      name: /professional experience timeline/i,
    });
    expect(timeline).toBeInTheDocument();
    expect(timeline.children.length).toBe(experiences.length);
  });
});
