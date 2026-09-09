import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/sections/About/About';
import { Certifications } from '@/sections/Certifications/Certifications';
import { Contact } from '@/sections/Contact/Contact';
import { Experience } from '@/sections/Experience/Experience';
import { Expertise } from '@/sections/Expertise/Expertise';
import { Hero } from '@/sections/Hero/Hero';
import { Journey } from '@/sections/Journey/Journey';
import { Philosophy } from '@/sections/Philosophy/Philosophy';
import { Testimonials } from '@/sections/Testimonials/Testimonials';

/**
 * App — the page composition.
 *
 * A single-page portfolio needs no router: anchor links (`#about`,
 * `#experience`…) give instant navigation, shareable URLs with hashes, and
 * scroll-spy highlighting without shipping a routing library. React Router
 * earns its place the day there are real, distinct pages (e.g. a blog).
 *
 * Flutter equivalent: a SingleChildScrollView containing each section widget.
 */
export function App() {
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Certifications />
        <Philosophy />
        <Testimonials />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
