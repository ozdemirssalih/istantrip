'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass3D } from './Compass3D';
import { stock, HERO_VIDEO } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Hero({ dict }: { dict: Dictionary }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapperRef.current;
    if (!video || !wrap) return;

    let duration = 0;

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      // Kick a tiny play to force first-frame paint, then immediately pause.
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          video.pause();
          setVideoReady(true);
        }).catch(() => setVideoReady(true));
      } else {
        video.pause();
        setVideoReady(true);
      }
    };
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('loadeddata', () => setVideoReady(true));

    const tick = () => {
      if (duration > 0 && video.readyState >= 2) {
        const current = video.currentTime;
        const next = current + (targetTimeRef.current - current) * 0.15;
        try {
          video.currentTime = Math.min(Math.max(next, 0), duration - 0.05);
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
    <section ref={wrapperRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster background (always visible until video is ready, then remains as fallback) */}
        <Image
          src={stock.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          className="hero-video"
          src={HERO_VIDEO}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          poster={stock.poster}
        />
        {/* Rich dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/70 via-[#0b0a08]/25 to-[#0b0a08]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,10,8,0.65)_100%)]" />
        <div className="absolute inset-0 grain" />

        {/* 3D compass floats top-right */}
        <div className="pointer-events-none absolute inset-0">
          <Compass3D className="absolute top-[10%] end-[4%] hidden md:block w-[460px] h-[460px] opacity-95" />
        </div>

        {/* Watermark logo bottom-left */}
        <div className="pointer-events-none absolute bottom-[6%] start-[4%] hidden lg:block opacity-[0.06]">
          <Image src="/logo.png" alt="" width={280} height={280} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl w-full px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex items-center gap-4 mb-6"
            >
              <Image
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="drop-shadow-[0_0_20px_rgba(201,162,74,0.55)]"
              />
              <span className="h-8 w-px bg-white/20" />
              <p className="text-[color:var(--gold-soft)] tracking-[0.35em] uppercase text-xs">
                {dict.hero.eyebrow}
              </p>
            </motion.div>
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.03] text-cream"
              >
                {dict.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="mt-6 text-lg text-cream/85 max-w-xl"
              >
                {dict.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="mt-10 flex items-center gap-4 flex-wrap"
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-cream/70">
            {dict.hero.scroll}
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
