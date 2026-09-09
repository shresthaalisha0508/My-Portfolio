import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { profile } from '@/data';
import {
  buildMailtoUrl,
  isContactFormValid,
  validateContactForm,
} from '@/lib/validation';
import type { ContactFormData, ContactFormErrors } from '@/lib/validation';
import { cn } from '@/lib/utils';

/**
 * ContactForm — client-side validation with a mailto: fallback.
 *
 * Static-site reality: there is no backend to POST to, so a valid form opens
 * the visitor's own email client with everything prefilled. No fake "sent!"
 * success states, no fake API calls.
 *
 * Accessibility details:
 *  - each <input> has a real <label htmlFor> pairing
 *  - errors are announced via aria-describedby pointing at the message node
 *  - aria-invalid flags the field for assistive tech
 *  - errors also render in an aria-live region on submit so the *whole*
 *    failure is announced without hunting per-field
 *
 * State model: one useState object for data, one for errors — updated via
 * functional setState so React batches correctly.
 */
type Touched = Partial<Record<keyof ContactFormData, boolean>>;

const emptyForm: ContactFormData = { name: '', email: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitSummary, setSubmitSummary] = useState<string | null>(null);

  const updateField =
    (field: keyof ContactFormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((current) => {
        const next = { ...current, [field]: value };
        // Re-validate live once a field has been touched, so errors clear
        // as the user types the fix.
        if (touched[field]) {
          setErrors(validateContactForm(next));
        }
        return next;
      });
      setSubmitSummary(null);
    };

  const blurField = (field: keyof ContactFormData) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => {
      const next = validateContactForm(form);
      return field in next ? { ...current, [field]: next[field] } : current;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (!isContactFormValid(nextErrors)) {
      const count = Object.keys(nextErrors).length;
      setSubmitSummary(
        `The form has ${count} ${count === 1 ? 'issue' : 'issues'} — please review the highlighted fields.`,
      );
      return;
    }

    setSubmitSummary(null);
    window.location.href = buildMailtoUrl(profile.email, form);
  };

  const fieldClass = (hasError: boolean) =>
    cn(
      // text-base on mobile: iOS Safari zooms the viewport when an input
      // smaller than 16px receives focus — text-base avoids that jolt.
      'w-full rounded-xl border bg-white px-4 py-3 text-base sm:text-sm text-charcoal-900 placeholder:text-charcoal-400',
      'transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600',
      hasError ? 'border-coral-500' : 'border-charcoal-900/12 hover:border-charcoal-900/25',
    );

  const errorId = (field: keyof ContactFormData) => `contact-${field}-error`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Global announcement region (also used for success info) */}
      <div aria-live="polite" role="status">
        {submitSummary ? (
          <p className="rounded-xl bg-coral-50 px-4 py-3 text-sm text-coral-700">{submitSummary}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-charcoal-800">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={updateField('name')}
          onBlur={blurField('name')}
          aria-invalid={touched.name === true && errors.name !== undefined ? true : undefined}
          aria-describedby={errors.name ? errorId('name') : undefined}
          className={fieldClass(touched.name === true && errors.name !== undefined)}
          placeholder="Your full name"
        />
        {errors.name ? (
          <p id={errorId('name')} className="mt-1.5 text-xs text-coral-600">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-charcoal-800">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={updateField('email')}
          onBlur={blurField('email')}
          aria-invalid={touched.email === true && errors.email !== undefined ? true : undefined}
          aria-describedby={errors.email ? errorId('email') : undefined}
          className={fieldClass(touched.email === true && errors.email !== undefined)}
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p id={errorId('email')} className="mt-1.5 text-xs text-coral-600">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-charcoal-800">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={updateField('message')}
          onBlur={blurField('message')}
          aria-invalid={touched.message === true && errors.message !== undefined ? true : undefined}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={cn(fieldClass(touched.message === true && errors.message !== undefined), 'resize-y')}
          placeholder="Tell me a little about what you'd like to connect about…"
        />
        {errors.message ? (
          <p id={errorId('message')} className="mt-1.5 text-xs text-coral-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto active:bg-teal-900">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send message
      </Button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-500">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" aria-hidden="true" />
        This is a static portfolio site — submitting opens your email app with the message
        prefilled to {profile.email}. No data is stored or sent anywhere else.
      </p>
    </form>
  );
}
