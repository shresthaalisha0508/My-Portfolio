import { cn } from '@/lib/utils';

/**
 * Button — the single button/link styling source.
 *
 * `as` is a discriminated union: `as="button"` renders a <button> and takes
 * onClick + type; `as="a"` renders an <a> and takes href. TypeScript prevents
 * mixing the two (e.g. an anchor with a `type` attribute) at compile time.
 *
 * Variants map to the design tokens:
 *  - primary: deep teal surface, white text (AA contrast)
 *  - outline: teal border/text, transparent surface
 *  - ghost:   bare text with hover surface, for tertiary actions
 *
 * React 19 note: no forwardRef needed — plain props are enough here.
 */
type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-label'?: string;
};

type ButtonAsLink = BaseButtonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out-quart select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-teal-700 text-white shadow-sm hover:bg-teal-800 active:bg-teal-900',
  outline: 'ring-1 ring-inset ring-teal-700/40 text-teal-800 hover:bg-teal-50 hover:ring-teal-700',
  ghost: 'text-charcoal-700 hover:bg-cream-200/80 hover:text-charcoal-900',
};

const sizeStyles: Record<ButtonSize, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (props.as === 'a') {
    const { href, target, rel, 'aria-label': ariaLabel } = props;
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }

  const {
    type = 'button',
    onClick,
    disabled,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-label': ariaLabel,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
