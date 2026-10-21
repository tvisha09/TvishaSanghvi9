/* eslint-disable @next/next/no-img-element -- images come from Framer's resizing CDN */

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProjectShowcase from "@/components/ProjectShowcase";
import ReadProgress from "@/components/ReadProgress";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import { caseStudies, caseThemes } from "@/case-studies";
import { getProject, imageSrcSet, imageUrl, projects } from "@/data/projects";
import styles from "./project.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} | Tvisha Sanghvi` : "Project | Tvisha Sanghvi" };
}

const pad = (n: number) => String(n).padStart(2, "0");

// The progress bar and page frame don't depend on the URL, so they stay in the
// shared shell; everything that reads `params` streams in behind Suspense.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <>
      <ReadProgress />
      <Suspense fallback={<main className={styles.page} />}>
        <ProjectDetails params={params} />
      </Suspense>
    </>
  );
}

async function ProjectDetails({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const group = projects.filter((p) => p.kind === project.kind);
  const position = group.indexOf(project) + 1;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const kindLabel = project.kind === "main" ? "Case study" : "Side quest";
  const CaseStudy = caseStudies[project.slug];

  return (
    <main className={`${styles.page} ${caseThemes[project.slug] ?? ""}`}>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link href="/projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span>
          {kindLabel} {pad(position)}
        </span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <div className={styles.hero}>
        <ProjectShowcase
          project={project}
          position={position}
          total={group.length}
          text={project.description}
          heading="h1"
          eager
        />
      </div>

      {CaseStudy ? (
        <article className={styles.case} aria-label="Case study">
          <CaseStudy />
        </article>
      ) : project.plates.length > 0 ? (
        <section className={styles.plates} aria-label="Case study">
          {project.plates.map((plate, i) => (
            <Reveal key={plate.id} className={styles.plate}>
              <figure>
                <img
                  src={imageUrl(plate.id, 2048)}
                  srcSet={imageSrcSet(plate.id)}
                  sizes="(max-width: 1320px) 92vw, 1208px"
                  width={plate.w}
                  height={plate.h}
                  alt={`${project.title}, plate ${i + 1}`}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                <figcaption>
                  <span>
                    Plate {pad(i + 1)} / {pad(project.plates.length)}
                  </span>
                  <span>{project.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </section>
      ) : project.video ? (
        <Reveal>
          <VideoEmbed url={project.video} title={project.title} />
        </Reveal>
      ) : (
        <p className={styles.empty}>The full deck is available on request.</p>
      )}

      <Link href={`/projects/${next.slug}`} className={styles.next}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>{next.title}</span>
        <span className={styles.nextSub}>{next.subtitle}</span>
        <span className={styles.nextThumb} aria-hidden="true">
          <img src={imageUrl(next.cover.id, 512)} alt="" loading="lazy" />
        </span>
        <span className={styles.nextArrow} aria-hidden="true">
          →
        </span>
      </Link>
    </main>
  );
}
