'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LogoMark } from './LogoMark';
import { stock, HERO_VIDEO } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Hero({ dict }: { dict: Dictionary }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setVideoReady(true);
    video.addEventListener('canplay', onReady);
    video.addEventListener('loadeddata', onReady);
    const p = video.play();
    if (p && typeof p.then === 'function') p.catch(() => {});
    return () => {
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('loadeddata', onReady);
    };
  }, []);

  // Scroll-driven zoom: 1x -> 1.35x as user scrolls through the hero section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={wrapperRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Zooming layer: poster (instant) + video (fades in over it) */}
        <motion.div className="absolute inset-0" style={mounted ? { scale } : undefined}>
          <Image
            src={stock.hero.signature}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
          <video
            ref={videoRef}
            className={`hero-video transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disableRemotePlayback
            poster={stock.hero.signature}
          />
        </motion.div>

        {/* Cinematic overlays (don't zoom) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/60 via-transparent to-[#0b0a08]"
          style={mounted ? { opacity: overlayOpacity } : undefined}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,10,8,0.7)_100%)]" />
        <div className="absolute inset-0 grain" />

        {/* Floating logo mark */}
        <div className="pointer-events-none absolute inset-0">
          <LogoMark className="absolute top-[8%] end-[3%] hidden md:block w-[440px] h-[440px] opacity-40" size={360} />
        </div>

        {/* Watermark logo */}
        <div className="pointer-events-none absolute bottom-[6%] start-[3%] hidden lg:block opacity-[0.08]">
          <Image src="/logo.png" alt="" width={300} height={300} />
        </div>

        {/* Content — parallax slide + fade on scroll */}
        <motion.div
          className="relative z-10 flex h-full items-center"
          style={mounted ? { y: contentY, opacity: contentOpacity } : undefined}
        >
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
                width={60}
                height={60}
                className="drop-shadow-[0_0_24px_rgba(201,162,74,0.6)]"
              />
              <span className="h-9 w-px bg-white/20" />
              <p className="text-[color:var(--gold-soft)] tracking-[0.4em] uppercase text-xs">
                {dict.hero.eyebrow}
              </p>
            </motion.div>
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
                className="font-display text-5xl sm:text-6xl md:text-[5.5rem] leading-[1.02] text-cream"
              >
                {dict.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="mt-7 text-lg md:text-xl text-cream/90 max-w-xl leading-relaxed"
              >
                {dict.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="mt-10 flex items-center gap-4 flex-wrap"
              >
                <a href="#reservation" className="btn-gold px-8 py-4 rounded-full text-sm">
                  {dict.hero.cta}
                </a>
                <a href="#services" className="btn-ghost px-6 py-4 rounded-full text-sm">
                  {dict.nav.tours}
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
