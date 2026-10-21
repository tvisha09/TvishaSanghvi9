import type { Metadata } from "next";
import { Archivo_Black, Cormorant_Garamond, Inter, JetBrains_Mono, Poppins, Quicksand, Roboto } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const block = Archivo_Black({
  variable: "--font-block",
  subsets: ["latin"],
  weight: "400",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// SeaRaksha's own identity typefaces (src/case-studies/searaksha.tsx). Loaded
// here, at the root, because next/font/google must be called where it's
// declared at module scope exactly once per font — not inside a route's own
// component tree, which breaks Turbopack's font resolution in dev.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400"],
});

// Greenly's own identity typeface (src/case-studies/greenly.tsx): a rounded
// sans that matches the "Greenly" wordmark's soft letterforms.
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio — Creative Director",
  description: "I design what you haven't said yet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${block.variable} ${mono.variable} ${poppins.variable} ${roboto.variable} ${quicksand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
