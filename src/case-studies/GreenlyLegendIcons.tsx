/**
 * The three icons scattered through the site-map diagram itself (profit,
 * manual intervention and market reach), redrawn small for the legend key.
 */
export function ProfitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 20h7v-7H3z" fill="#8c9bf0" />
      <path d="M11 20h7v-11h-7z" fill="#2a3fc9" />
      <circle cx="7" cy="6" r="4" fill="#2a3fc9" />
      <path d="M5.3 7.6V5.1M8.7 7.6V4.4M5.3 5.1h2M5.3 6.9h2.6" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function ManualIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="4.5" r="2" fill="#2a3fc9" />
      <path
        d="M9 6.5v6l-3 7M9 12.5l3 7M6 10l-2.5 2M9 9l5-1"
        stroke="#2a3fc9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="16" r="3.2" fill="#2a3fc9" />
      <path d="M18 13.5v-1M18 19.5v-1M15.5 16h-1M21.5 16h-1M16.2 14.2l-.7-.7M19.8 17.8l-.7-.7M16.2 17.8l-.7.7M19.8 14.2l-.7.7" stroke="#2a3fc9" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="18" cy="16" r="1.1" fill="#fff" />
    </svg>
  );
}

export function MarketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="#2a3fc9" strokeWidth="1.6" />
      <path
        d="M12 3.5c2.3 2 2.3 15 0 17M8 5c-1.2 1.8-1.2 11.2 0 14M16 5c1.2 1.8 1.2 11.2 0 14M3.8 8.5h16.4M3.8 15.5h16.4"
        stroke="#2a3fc9"
        strokeWidth="1"
        fill="none"
      />
      <path d="M15 2.5l5.5 1.5-1.8 5.3" stroke="#2a3fc9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
