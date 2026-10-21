"use client";

import styles from "./ChatLauncher.module.css";

const CHAT_URL = "https://tviii.vercel.app/";

/** Small fixed launcher, bottom-right on every inner page, opening the AI chat in a new tab. */
export default function ChatLauncher() {
  return (
    <a
      href={CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.launcher}
      aria-label="Chat with my AI assistant (opens in a new tab)"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.2 3.3a.5.5 0 0 1-.8-.4V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
          <circle cx="8.3" cy="11" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="11" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="15.7" cy="11" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className={styles.label}>Ask my AI</span>
    </a>
  );
}
