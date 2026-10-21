import images from "./framer-images.json";

/*
 * Project content, taken from tvishasanghvi9.framer.website.
 * Images are served from Framer's CDN (framerusercontent.com), which resizes
 * on the fly via ?scale-down-to=, so we never ship multi-megabyte PNGs.
 */

export type Plate = { id: string; w: number; h: number };

export type Project = {
  slug: string;
  kind: "main" | "side";
  title: string;
  subtitle: string;
  tags: string[];
  /** One line, used wherever space is tight (the Projects index). */
  summary: string;
  description: string;
  /** Words on the project page (hero and case study), counted from the rendered page. */
  words: number;
  cover: Plate;
  plates: Plate[];
  /** YouTube URL to embed on the project page, if there's a video to show. */
  video?: string;
};

const plates = images as Record<string, Plate[]>;

const CDN = "https://framerusercontent.com/images/";

/** Framer CDN URL, scaled down to at most `size` px on the long edge. */
export const imageUrl = (id: string, size: 512 | 1024 | 2048 = 1024) => `${CDN}${id}?scale-down-to=${size}`;

export const imageSrcSet = (id: string) =>
  `${imageUrl(id, 512)} 512w, ${imageUrl(id, 1024)} 1024w, ${imageUrl(id, 2048)} 2048w`;

const project = (p: Omit<Project, "plates">): Project => ({ ...p, plates: plates[p.slug] ?? [] });

export const projects: Project[] = [
  project({
    slug: "searaksha",
    words: 3175,
    kind: "main",
    title: "SeaRaksha",
    subtitle: "Navigation and communication systems for small-scale fishermen",
    tags: ["Robotic Design", "Product Design", "UI/UX", "System Design"],
    summary: "Safety, navigation and communication for Mumbai's small-scale fishing communities.",
    description:
      "Small scale fishing communities along Mumbai's shoreline face tremendous pressures from volatile seas, reduction in stocks and access to limited communication and navigation networks. Despite their central role in the food supply chains they operate without proper safety networks and reliable devices that give them mainstream network access off shore.",
    cover: { id: "uHkA0LEKLhjrFlSbPJfuTHi1oU.jpg", w: 1065, h: 1076 },
  }),
  project({
    slug: "greenly",
    words: 2143,
    kind: "main",
    title: "Greenly",
    subtitle: "A greener way to grow",
    tags: ["AI", "Machine Learning", "Product Design", "Connected Experience"],
    summary: "A hydroponic ecosystem where profit, sustainability and precision cultivation meet.",
    description:
      "A revolution in farming is blooming, rooted not in soil, but in innovation. This project dares to design a hydroponic ecosystem where profit, sustainability, and precision cultivation converge to future-proof urban agriculture.",
    cover: { id: "XDIsw8Zt91DhGBXkkzQ7jlcDE.jpg", w: 3500, h: 3572 },
  }),
  project({
    slug: "epoch",
    words: 1502,
    kind: "main",
    title: "Epoch",
    subtitle: "Revolutionizing teaching",
    tags: ["AR", "VR", "Hologram", "System Design"],
    summary: "AR and VR learning that turns science class into a journey through discovery.",
    description:
      "What if science class felt like stepping into a time machine where students witness discoveries unfold and ideas spark into reality? This project envisions AR and VR-powered learning that turns passive memorization into immersive journeys of wonder and exploration.",
    cover: { id: "CaijLm9mcIz72SiKtoGP2iZMI.png", w: 2067, h: 2121 },
  }),
  project({
    slug: "wastonic",
    words: 1505,
    kind: "main",
    title: "Wastonic",
    subtitle: "Recycling got easy",
    tags: ["Behavioral Design", "Cognitive Ergonomics", "Product Design"],
    summary: "An e-waste ecosystem connecting consumers, kabadiwaalas and processors.",
    description:
      "This project envisions a seamless e-waste ecosystem where discarding gadgets becomes an act of responsibility, connecting consumers, kabadiwaalas, and processors to transform discarded tech into cycles of reuse, recovery, and renewed value.",
    cover: { id: "qvTyQA4lZwc8aMDvB2kprkzdrVw.png", w: 3061, h: 3061 },
  }),
  project({
    slug: "swadisht",
    words: 1714,
    kind: "main",
    title: "Swadisht",
    subtitle: "Reducing excess food waste",
    tags: ["System Design", "UI/UX", "Experience Design"],
    summary: "Turning surplus food from homes and restaurants into nourishment, not waste.",
    description:
      "A vision of smarter giving, where surplus food from homes and restaurants becomes nourishment, not waste. Swadisht bridges gaps, simplifies donations, and sparks a culture of shared responsibility and impact.",
    cover: { id: "BH49I4Hwqo7fiiWe5fdhzijKGM.png", w: 3061, h: 3061 },
  }),
  project({
    slug: "products",
    words: 89,
    kind: "main",
    title: "Products",
    subtitle: "Designed, crafted and engineered",
    tags: ["Product Design", "Ergonomics", "Visual Design"],
    summary: "Products designed, crafted and engineered for different occasions.",
    description: "Designed, crafted and engineered products for different occasions and scenarios.",
    cover: { id: "Uir6ztgcQjNukH6IqgMx5WrG4Mo.png", w: 3061, h: 3061 },
  }),
  project({
    slug: "maiyard-merch",
    words: 60,
    kind: "side",
    title: "Maiyard Merch",
    subtitle: "Merch design for a seafood company",
    tags: ["Merch Design", "Visual Design"],
    summary: "Merchandise for Maiyard, a seafood company.",
    description: "Merchandise design for Maiyard, a seafood company.",
    cover: { id: "8UZIH1PbhQRFdjUjKDDjkRULu5w.png", w: 2348, h: 1593 },
  }),
  project({
    slug: "mizon-pitch",
    words: 44,
    kind: "side",
    title: "Mizon Pitch",
    subtitle: "Investor pitch",
    tags: ["Pitch Design", "Storytelling"],
    summary: "An investor pitch built around the product's story.",
    description:
      "A well curated pitch that is used to introduce the investors to the platform and which helps them make a clear decision based on how well the narration goes along with the features of the app.",
    cover: { id: "9UtQKXr7JfN2B6iCD7ZpX66gks.png", w: 2679, h: 1510 },
    video: "https://youtu.be/XgmAxp7KAys",
  }),
  project({
    slug: "mizon-ui",
    words: 55,
    kind: "side",
    title: "Mizon UI",
    subtitle: "Product interface design",
    tags: ["UX & UI Design"],
    summary: "Interface design for the Mizon platform.",
    description: "Interface design for the Mizon platform.",
    cover: { id: "zoapZImJW1qyVDBNnHCYgmZH24.png", w: 2348, h: 1593 },
  }),
  project({
    slug: "jiocinema",
    words: 106,
    kind: "side",
    title: "JioCinema",
    subtitle: "Redesign",
    tags: ["UX & UI Design"],
    summary: "A calmer, smarter way to browse and watch.",
    description:
      "The JioCinema redesign makes watching feel effortless and exciting: cleaner screens, smarter suggestions, and a flow that feels built for people, not just platforms.",
    cover: { id: "LrttTe2mxQp9yRrbovyK6u7xwKc.png", w: 2348, h: 1593 },
  }),
  project({
    slug: "tripadvisor",
    words: 118,
    kind: "side",
    title: "TripAdvisor",
    subtitle: "Cognitive task flow",
    tags: ["Cognitive Ergonomics", "UX Research"],
    summary: "Mapping how travelers think, decide and act.",
    description:
      "Analyzing TripAdvisor's cognitive task flows reveals how travelers think, decide, and act. Uncovering friction points and designing smoother, more intuitive journeys from inspiration to booking.",
    cover: { id: "ymzrXvQ4VvpZI61fZQjsqgtvkFM.png", w: 1533, h: 859 },
  }),
  project({
    slug: "form-exploration",
    words: 53,
    kind: "side",
    title: "Form Exploration",
    subtitle: "Material bending and carving",
    tags: ["Material Exploration", "Form"],
    summary: "Bending and carving materials into new forms.",
    description:
      "Form exploration transforms raw ideas into tangible possibilities: bending and carving materials into shapes where innovation meets purpose.",
    cover: { id: "vwhTZNdA3P4Y8EOUFhQzFwvCXg.png", w: 2348, h: 1593 },
  }),
];

export const mainProjects = projects.filter((p) => p.kind === "main");
export const sideProjects = projects.filter((p) => p.kind === "side");

/** Average adult reading speed, in words per minute. */
const WPM = 238;

/** "14 minutes", from the page's word count at 238 words a minute. */
export const readTime = (p: Project) => {
  const minutes = Math.max(1, Math.round(p.words / WPM));
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** A youtu.be/watch/shorts URL, as a bare privacy-enhanced embed URL. */
export const youtubeEmbedUrl = (url: string) => {
  const u = new URL(url);
  const id = u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.searchParams.get("v") ?? "";
  return `https://www.youtube-nocookie.com/embed/${id}`;
};
