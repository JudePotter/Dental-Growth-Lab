type LogoProps = {
  className?: string;
};

export function LogoMark({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 29C5 29 12 33 20 33C28 33 35 29 35 29"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="7.8" y="19" width="5" height="10" rx="2" fill="currentColor" />
      <rect x="17.5" y="12" width="5" height="17" rx="2" fill="currentColor" />
      <rect x="27.2" y="5" width="5" height="24" rx="2" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: LogoProps) {
  return (
    <span className={`font-display font-medium tracking-tight ${className ?? ""}`}>
      Dental Growth Lab
    </span>
  );
}
