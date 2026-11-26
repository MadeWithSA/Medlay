import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store.jsx';
import { asset } from '../data/products.js';

function SparkleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.1 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.7 + 0.2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 214, 168, ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas id="sparkle-canvas" ref={ref} />;
}

export default function Hero() {
  const { t } = useStore();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const userPaused = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    video.muted = true; // React не всегда ставит атрибут muted — без него автоплей блокируется
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onPlaying = () => { setReady(true); setPlaying(true); };
    video.addEventListener('playing', onPlaying);

    if (reduceMotion) {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    } else {
      const p = video.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    }

    // Экономим батарею: пауза, когда первый экран не виден
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (userPaused.current) return;
          if (e.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      }, { threshold: 0.05 });
      io.observe(heroRef.current);
    }
    return () => {
      video.removeEventListener('playing', onPlaying);
      if (io) io.disconnect();
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
      setReady(true);
      setPlaying(true);
    } else {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <img className="hero-poster" src={asset('hero/hero-poster.jpg')} alt="" aria-hidden="true" />
      <video
        ref={videoRef}
        className={`hero-video${ready ? ' ready' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset('hero/hero-poster.jpg')}
        aria-label="Medlay — кампания высокого ювелирного искусства"
      >
        <source src={asset('hero/hero-loop.mp4')} type="video/mp4" />
      </video>
      <div className="hero-vignette" />
      <SparkleCanvas />

      <div className="hero-content">
        <span className="hero-eyebrow">{t.hero_eyebrow}</span>
        <h1 className="hero-title">
          {t.hero_title[0]}<br />{t.hero_title[1]}
        </h1>
        <p className="hero-sub">{t.hero_sub}</p>
        <a href="#panorama-collections" className="btn-cream">{t.hero_cta}</a>
      </div>

      <div className="hero-controls">
        <button className="film-toggle" onClick={toggle}>
          {playing ? t.pause : t.play}
        </button>
      </div>
    </section>
  );
}
