import { FaBehance, FaInstagram, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import styles from "./SiteFooter.module.css";

const links = [
  { label: "Email", value: "tvishasanghvi9@gmail.com", href: "mailto:tvishasanghvi9@gmail.com", Icon: FaRegEnvelope },
  {
    label: "LinkedIn",
    value: "Tvisha Sanghvi",
    href: "https://www.linkedin.com/in/tvisha-sanghvi-925799247/",
    Icon: FaLinkedinIn,
  },
  { label: "Behance", value: "tvishasanghvi2", href: "https://www.behance.net/tvishasanghvi2", Icon: FaBehance },
  {
    label: "Instagram",
    value: "@tvisha.sanghvi09",
    href: "https://www.instagram.com/tvisha.sanghvi09/",
    Icon: FaInstagram,
  },
];

/** Contact strip shown at the bottom of every page. */
export default function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <section className={styles.contact}>
        <Reveal>
          <SectionHead index="@" label="Always only a call away" />
        </Reveal>
        <div className={styles.contactRow}>
          <Reveal className={styles.contactIntro}>
            <h2 className={styles.contactLine}>You’ve been inside my mind.</h2>
            <p className={styles.contactSoft}>Now tell me what’s on yours.</p>
          </Reveal>
          <ul className={styles.links}>
            {links.map(({ label, value, href, Icon }, i) => (
              <li key={label}>
                <Reveal delay={0.06 + i * 0.05}>
                  <a
                    href={href}
                    className={styles.link}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={styles.linkText}>
                      <span className={styles.linkLabel}>{label}</span>
                      <span className={styles.linkValue}>{value}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.signoff}>
          “Sagar ki geherai se gehra hai, mera storage issue.” <span>Designer, Tvisha Sanghvi</span>
        </p>
      </section>
    </footer>
  );
}
