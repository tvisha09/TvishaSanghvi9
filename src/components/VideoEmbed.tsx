import { youtubeEmbedUrl } from "@/data/projects";
import styles from "./VideoEmbed.module.css";

/** A 16:9 YouTube embed, framed like the case-study plates around it. */
export default function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <figure className={styles.frame}>
      <div className={styles.ratio}>
        <iframe
          src={youtubeEmbedUrl(url)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  );
}
