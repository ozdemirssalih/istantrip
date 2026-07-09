'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass3D } from './Compass3D';
import type { Dictionary } from '@/app/[lang]/dictionaries';

// Public CDN Istanbul B-roll (fallback). Replace by dropping /public/hero.mp4.
const FALLBACK_VIDEO = '/hero.mp4';

export function Hero({ dict }: { dict: Dictionary }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapperRef.current;
    if (!video || !wrap) return;

    // We need duration to map scroll -> currentTime
    let duration = 0;
    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
    };
    video.addEventListener('loadedmetadata', onMeta);

    // Scrub loop — smoothly ease currentTime toward targetTime
    const tick = () => {
      if (duration > 0 && video.readyState >= 2) {
        const current = video.currentTime;
        const next = current + (targetTimeRef.current - current) * 0.15;
        try {
          video.currentTime = next;
        } catch {}
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      if (!duration) return;
      const rect = wrap.getBoundingClientRect();
      const height = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), height);
      const progress = height > 0 ? scrolled / height : 0;
      targetTimeRef.current = progress * duration;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[280vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fallback background if hero.mp4 is missing */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(201,162,74,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(143,107,31,0.35), transparent 60%), linear-gradient(180deg, #0f0c07 0%, #0b0a08 100%)',
          }}
        />
        <video
          ref={videoRef}
          className="hero-video"
          src={FALLBACK_VIDEO}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = 'none';
          }}
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/70 via-[#0b0a08]/30 to-[#0b0a08]" />
        <div className="absolute inset-0 grain" />

        {/* 3D compass floats top-right */}
        <div className="pointer-events-none absolute inset-0">
          <Compass3D className="absolute top-[15%] end-[6%] hidden md:block w-[420px] h-[420px] opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl w-full px-6">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[color:var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-6"
              >
                {dict.hero.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-cream"
              >
                {dict.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="mt-6 text-lg text-cream/80 max-w-xl"
              >
                {dict.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75 }}
                className="mt-10 flex items-center gap-4"
              >
                <a href="#reservation" className="btn-gold px-7 py-3.5 rounded-full text-sm">
                  {dict.hero.cta}
                </a>
                <a href="#services" className="btn-ghost px-6 py-3.5 rounded-full text-sm">
                  {dict.nav.tours}
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-cream/60">
            {dict.hero.scroll}
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
