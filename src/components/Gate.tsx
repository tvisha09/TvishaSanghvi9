"use client";

import { useState } from "react";
import LockIcon from "./LockIcon";
import MindScene from "./MindScene";
import Starfield from "./Starfield";
import styles from "./Gate.module.css";

export default function Gate() {
  const [unlocked, setUnlocked] = useState(false);
  const [warpAt, setWarpAt] = useState<number | null>(null);
  const opened = warpAt !== null;

  // The lock springs open first, then the journey into the mind begins
  const unlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    window.setTimeout(() => setWarpAt(performance.now()), 520);
  };

  return (
    <main
      className={`${styles.gate} ${unlocked ? styles.unlocked : ""} ${opened ? styles.opened : ""}`}
    >
      <div className={styles.lights} aria-hidden="true">
        <span className={`${styles.orb} ${styles.cyan}`} />
        <span className={`${styles.orb} ${styles.magenta}`} />
        <span className={`${styles.orb} ${styles.yellow}`} />
      </div>

      <Starfield warpAt={warpAt} />

      <div className={styles.entry}>
        <button
          className={styles.button}
          onClick={unlock}
          disabled={unlocked}
          aria-label="Welcome to my mind. Click to unlock"
        >
          <span className={styles.label}>Welcome to my mind</span>
          <LockIcon className={styles.lock} />
        </button>
        <p className={styles.hint} aria-hidden="true">
          Click to unlock
        </p>
      </div>

      {opened && <MindScene />}
    </main>
  );
}
