import ChatLauncher from "@/components/ChatLauncher";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Starfield from "@/components/Starfield";
import styles from "./site.module.css";

/** Shared frame for every inner page: fixed nav, starfield, content below the nav, contact footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className={styles.stars} aria-hidden="true">
        <Starfield warpAt={null} />
      </div>
      <SiteNav />
      <div className={styles.shell}>
        {children}
        <SiteFooter />
      </div>
      <ChatLauncher />
    </>
  );
}
