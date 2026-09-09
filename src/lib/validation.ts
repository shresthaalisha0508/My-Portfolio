/**
 * Contact-form validation — pure functions, no React.
 *
 * Keeping validation out of the component makes it unit-testable without
 * rendering anything, and the component stays focused on UI.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN_LENGTH = 20;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = data.name.trim();
  if (name.length === 0) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name needs at least 2 characters.';
  }

  const email = data.email.trim();
  if (email.length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'That email address doesn’t look right.';
  }

  const message = data.message.trim();
  if (message.length === 0) {
    errors.message = 'Please include a message.';
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Message needs at least ${MESSAGE_MIN_LENGTH} characters.`;
  }

  return errors;
}

export function isContactFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}

/** Builds a mailto: URL with the validated message prefilled. */
export function buildMailtoUrl(email: string, data: ContactFormData): string {
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.name.trim()}`);
  const body = encodeURIComponent(`${data.message.trim()}\n\n— ${data.name.trim()} (${data.email.trim()})`);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
