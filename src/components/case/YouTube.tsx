"use client";

/* eslint-disable @next/next/no-img-element -- the poster comes from YouTube's own thumbnail CDN */

import { useState } from "react";
import Reveal from "../Reveal";
import styles from "./YouTube.module.css";

/**
 * A YouTube embed that only loads the iframe (and YouTube's own scripts)
 * once the reader clicks: the thumbnail is a plain image until then, so an
 * unwatched video costs nothing.
 */
export default function YouTube({ id, title, caption }: { id: string; title: string; caption?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Reveal>
      <figure className={styles.video}>
        <div className={styles.frame}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className={styles.poster} onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
              {/* YouTube serves a high-res thumbnail for every video id at this path */}
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className={styles.play} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
