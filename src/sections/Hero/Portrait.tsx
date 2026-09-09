import { useState } from 'react';

import { portraitFallback, profile } from '@/data';

/**
 * Portrait — the hero visual.
 *
 * Error handling demonstrated: if the image file doesn't exist (or the user
 * is offline), the `<img>` fires `onError` once and we swap to a designed
 * monogram placeholder instead of a broken-image icon. The site never shows
 * a broken state.
 *
 * `useState(false)` is a deliberate piece of local UI state: it affects only
 * this component, so it lives here (no global store needed).
 */
export function Portrait() {
  const [failed, setFailed] = useState(false);

  const showFallback = failed || profile.portraitUrl === '';

  return (
    <div className="relative">
      {/* Decorative backdrop — a quiet sage wash, not a hospital-blue gradient */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sage-100 via-cream-100 to-teal-50"
      />

      {/* Square frame: matches the near-square source photo (1080x997) so
          nothing important is cropped, and the block stays compact on mobile. */}
      <div className="overflow-hidden rounded-[2rem] shadow-card ring-1 ring-charcoal-900/8 aspect-square">
        {showFallback ? (
          <div
            role="img"
            aria-label={portraitFallback.label}
            className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-50 via-cream-50 to-sage-100"
          >
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-700 font-display text-4xl font-bold text-white">
              {portraitFallback.initials}
            </span>
            <span className="text-sm font-medium text-charcoal-500">
              {profile.name} · {profile.title}
            </span>
          </div>
        ) : (
          <img
            src={profile.portraitUrl}
            alt={`Portrait of ${profile.name}, ${profile.title}`}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {/* Floating credential card — entrance only, no infinite animation */}
      <div className="absolute -bottom-5 -left-3 rounded-2xl border border-charcoal-900/8 bg-white px-4 py-3 shadow-card sm:-left-6">
        <p className="font-display text-sm font-bold text-charcoal-900">
          {profile.stats[0]?.value} {profile.stats[0]?.label}
        </p>
        <p className="text-xs text-charcoal-500">{profile.specialization}</p>
      </div>
    </div>
  );
}
