"use client";

import { useEffect, useRef } from "react";
import styles from "./Starfield.module.css";

/*
 * Dot starfield on white. Stars sit in 3D (z in 0..1, 1 = far) and are
 * projected from the screen centre. Idle, they barely drift; during the warp
 * they rush toward the viewer and are drawn as streaks. The cursor nudges
 * them with depth-based parallax and pushes nearby stars away.
 */

type Star = { x: number; y: number; z: number };

const IDLE_SPEED = 0.012; // depth units per second
const WARP_SPEED = 2.4;
const STREAK = 0.07; // how far back in depth a streak's tail starts, per unit of speed

// Warp envelope in seconds after `warpAt`, matched to the camera dive in MindScene
const WARP = { rampIn: 1.45, peak: 1.9, hold: 2.3, settle: 2.85 };

const smooth = (t: number) => t * t * (3 - 2 * t);

const warpAmount = (t: number) => {
  if (t < WARP.rampIn || t > WARP.settle) return 0;
  if (t < WARP.peak) return smooth((t - WARP.rampIn) / (WARP.peak - WARP.rampIn));
  if (t < WARP.hold) return 1;
  return 1 - smooth((t - WARP.hold) / (WARP.settle - WARP.hold));
};

export default function Starfield({ warpAt }: { warpAt: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpAtRef = useRef(warpAt);

  useEffect(() => {
    warpAtRef.current = warpAt;
  }, [warpAt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let last = performance.now();

    const pointer = { x: 0, y: 0, active: false };
    const parallax = { x: 0, y: 0 };

    const spread = () => Math.max(w, h) * 0.5 * 0.35;

    /** New star at depth z, placed so it lands somewhere on screen. */
    const spawn = (z = Math.random()): Star => {
      const depth = Math.max(0.05, z);
      return {
        x: ((Math.random() * w - w / 2) / spread()) * depth,
        y: ((Math.random() * h - h / 2) / spread()) * depth,
        z: depth,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.round((w * h) / 4200));
      stars = Array.from({ length: count }, () => spawn());
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const project = (s: Star, z: number) => {
      const depth = 1 - z;
      return [
        w / 2 + (s.x / z) * spread() + parallax.x * depth,
        h / 2 + (s.y / z) * spread() + parallax.y * depth,
      ];
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const started = warpAtRef.current;
      const warp = reduced || started === null ? 0 : warpAmount((now - started) / 1000);
      const speed = IDLE_SPEED + (WARP_SPEED - IDLE_SPEED) * warp;

      // Ease parallax toward the cursor offset
      const tx = pointer.active ? (pointer.x - w / 2) * -0.04 : 0;
      const ty = pointer.active ? (pointer.y - h / 2) * -0.04 : 0;
      parallax.x += (tx - parallax.x) * Math.min(1, dt * 4);
      parallax.y += (ty - parallax.y) * Math.min(1, dt * 4);

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      for (const s of stars) {
        if (!reduced) s.z -= speed * dt;
        if (s.z <= 0.02) Object.assign(s, spawn(1));

        let [x, y] = project(s, s.z);
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) {
          Object.assign(s, spawn(1));
          continue;
        }

        // Push stars away from the cursor
        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.01) {
            const push = ((110 - dist) / 110) ** 2 * 26;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }

        const near = 1 - s.z;
        const alpha = 0.18 + near * 0.6;
        const size = 0.5 + near * 1.6;

        if (warp > 0.02) {
          const [px, py] = project(s, Math.min(1, s.z + speed * STREAK));
          ctx.strokeStyle = `rgba(29, 29, 27, ${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(29, 29, 27, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size / 2 + 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(tick);
    };

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
