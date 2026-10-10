"use client";

import { useState } from "react";
import styles from "./Gate.module.css";

export default function Gate() {
  const [opened, setOpened] = useState(false);

  return (
    <main className={`${styles.gate} ${opened ? styles.opened : ""}`}>
      <button
        className={styles.button}
        onClick={() => setOpened(true)}
        disabled={opened}
      >
        <span className={styles.label}>Access my mind</span>
      </button>
    </main>
  );
}
