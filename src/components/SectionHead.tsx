import styles from "./SectionHead.module.css";

/** Numbered section label: circled index, a short rule, then the label. */
export default function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className={styles.head}>
      <span className={styles.index}>{index}</span>
      <span className={styles.rule} />
      <span>{label}</span>
    </div>
  );
}
