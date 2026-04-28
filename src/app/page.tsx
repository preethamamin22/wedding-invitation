"use client";

import { useEffect, useRef, useState } from "react";

// ─── Local Image Paths ────────────────────────────────────────────────────────
const PHOTO_1 = "/images/photo1.jpg";
const PHOTO_2 = "/images/photo2.jpg";
const PHOTO_3 = "/images/photo3.jpg";
const PHOTO_4 = "/images/photo4.jpg";
const PHOTO_5 = "/images/photo5.jpg";
const PHOTO_6 = "/images/photo6.jpg";

const WEDDING_DATE = new Date("2026-05-10T08:50:00+05:30");
const MUSIC_URL = "/music_audio.mpeg";

// ─── Petal Canvas ─────────────────────────────────────────────────────────────
function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const COLORS = ["#D4806A", "#E8C07A", "#C9963E", "#B85940", "#EEDDD3", "#F5E4C0"];
    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Petal {
      x: number; y: number; r: number; vx: number; vy: number;
      rot: number; drot: number; color: string; alpha: number;
      constructor(initial = false) {
        this.x = Math.random() * canvas!.width;
        this.y = initial ? Math.random() * canvas!.height * 2 - canvas!.height : -20;
        this.r = 4 + Math.random() * 5;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = 0.6 + Math.random() * 1.2;
        this.rot = Math.random() * Math.PI * 2;
        this.drot = (Math.random() - 0.5) * 0.04;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 0.5 + Math.random() * 0.4;
      }
      update() {
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.4;
        this.y += this.vy;
        this.rot += this.drot;
        if (this.y > canvas!.height + 20) { 
          this.x = Math.random() * canvas!.width;
          this.y = -20; 
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r * 0.55, this.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const COUNT = window.innerWidth < 600 ? 28 : 52;
    const petals = Array.from({ length: COUNT }, () => new Petal(true));

    function loop() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      petals.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} id="petals-canvas" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: "00", h: "00", m: "00", s: "00" }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add("revealed");
        }
      });
      
      // Auto-unlock expanding photos/videos like the reference site
      document.querySelectorAll<HTMLElement>(".event-photo-wrap").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
          el.classList.add("unlocked");
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(30,10,5,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Photo" style={{ display: "block", maxWidth: "100%", maxHeight: "90vh", objectFit: "contain" }} />
      </div>
      <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: "44px", height: "44px", color: "white", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const countdown = useCountdown(WEDDING_DATE);
  useScrollReveal();

  const openInvitation = () => {
    setRevealed(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) { audioRef.current.pause(); setAudioPlaying(false); }
    else { audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {}); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  const photos = [
    "https://lh3.googleusercontent.com/pw/AP1GczNtw6Vq-6BE14u6BlmfhIN1g-nVfFqYdUflCA-XYab2RFUcZb4rhNdTuIR1qWY86rtqph2uyKgS-b66SCOqY3qgP9q8yxhiVp_PaQAkRW8HmF29cwAxMoYLHDP2NkQWxX2Wgs4GJoPQa2x2XQ8RQvJk1Q=w571-h859-s-no-gm",
    "https://lh3.googleusercontent.com/pw/AP1GczOs003-E8utclXygTlU4diRtrPVHU10AGzegrIvAQAH3EEvCt8E1memfyXm8Y8IQfFBeHxOncOXEqOPAHom3hI8IiVpenpxGs2GicWfkp1T9OsoOg-Kay-z47qE504rOkpgP_suI7KnwFdEYyd4xh295Q=w571-h859-s-no-gm",
    "https://lh3.googleusercontent.com/pw/AP1GczOXcuPYAlmsCQL1DQAEBf--704o7_6lp_bAOESCePvXjq724ERJrhtlcPeFyo5TPH4te3_Jbvp0hsmsqioZ9cvOmIcB9xJr9mciRcrdZ8gmLLt94ShjpcZY3HCGhPugZYQBZ9vsRHIS8OQ8vHDY4oNb5A=w571-h859-s-no-gm",
    "/photo4.png"
  ];

  const OrnamentStar = () => (
    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );

  return (
    <main>
      {/* ── Audio ── */}
      <audio ref={audioRef} loop preload="metadata">
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>

      {/* ── Petals ── */}
      {revealed && <PetalCanvas />}

      {/* ── Audio Button ── */}
      {revealed && (
        <button id="audio-btn" onClick={toggleAudio} title="Toggle music" aria-label="Toggle music">
          {audioPlaying ? (
            <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          ) : (
            <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
            </svg>
          )}
        </button>
      )}

      {/* ── Entry Gate ── */}
      {!revealed && (
        <div
          onClick={openInvitation}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "linear-gradient(135deg, #2E1810 0%, #5C2233 50%, #2E1810 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer", userSelect: "none",
          }}
        >
          {/* Decorative corners */}
          {[["top:20px;left:20px;border-top:1px solid;border-left:1px solid", "tl"],
            ["top:20px;right:20px;border-top:1px solid;border-right:1px solid", "tr"],
            ["bottom:20px;left:20px;border-bottom:1px solid;border-left:1px solid", "bl"],
            ["bottom:20px;right:20px;border-bottom:1px solid;border-right:1px solid", "br"]].map(([, k]) => (
            <div key={k} style={{
              position: "absolute", width: 60, height: 60, borderColor: "rgba(201,150,62,0.4)", borderStyle: "solid",
              ...(k === "tl" ? { top: 20, left: 20, borderWidth: "1px 0 0 1px" } :
                k === "tr" ? { top: 20, right: 20, borderWidth: "1px 1px 0 0" } :
                k === "bl" ? { bottom: 20, left: 20, borderWidth: "0 0 1px 1px" } :
                { bottom: 20, right: 20, borderWidth: "0 1px 1px 0" })
            }} />
          ))}

          <div style={{ textAlign: "center", padding: "2rem" }}>
            {/* Wax seal */}
            <div style={{
              width: 120, height: 120, borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #E8C07A, #C9963E, #8B3E28)",
              margin: "0 auto 2rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 60px rgba(201,150,62,0.4), 0 4px 30px rgba(0,0,0,0.4)",
              border: "3px solid rgba(232,192,122,0.5)",
              animation: "pulse 2.5s ease-in-out infinite",
            }}>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem", color: "#2E1810", lineHeight: 1 }}>S & K</span>
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(232,192,122,0.7)", fontSize: "1rem", marginBottom: "0.5rem" }}>
              With the blessings of God &amp; our elders
            </p>
            <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.5rem,10vw,4.5rem)", color: "#E8C07A", lineHeight: 1.1, marginBottom: "2rem" }}>
              Sunil Kumar KJ &amp; Keerthana NS
            </h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                border: "1.5px solid rgba(232,192,122,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "scrollBounce 2s ease infinite",
              }}>
                <svg fill="none" stroke="#E8C07A" strokeWidth="2" viewBox="0 0 24 24" width="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,192,122,0.6)" }}>
                Tap to Open
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div style={{ display: revealed ? "block" : "none" }}>

        {/* ════ HERO ════ */}
        <section id="hero">
          {/* Background photo with overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO_1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: 0.22, zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(253,240,232,0.4), rgba(253,240,232,0.7))", zIndex: 0 }} />

          <div className="hero-frame"><span /></div>

          <div className="hero-card">
            <div className="card-corner tl" />
            <div className="card-corner tr" />
            <div className="card-corner bl" />
            <div className="card-corner br" />

            {/* Ganesha */}
            <div className="ganesh-icon" style={{ fontSize: "4rem", lineHeight: 1 }}>🕉️</div>

            <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", color: "var(--terracotta)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ
            </p>

            <p className="blessings-text">
              With the blessings of our parents,<br />
              we joyfully request your gracious presence at the wedding of
            </p>

            <div className="couple-block">
              <span className="couple-name shimmer-gold">Sunil Kumar KJ</span>
              <p className="family-line">Son of Mr. &amp; Mrs. Groom&rsquo;s parents</p>
              <p className="family-subline">And all relatives &amp; well-wishers</p>
            </div>

            <div className="ampersand-wrap">
              <div className="ampersand-line" />
              <span className="ampersand">&amp;</span>
              <div className="ampersand-line" />
            </div>

            <div className="couple-block">
              <span className="couple-name shimmer-gold">Keerthana NS</span>
              <p className="family-line">Daughter of Mr. &amp; Mrs. Bride&rsquo;s parents</p>
              <p className="family-subline">And all relatives &amp; well-wishers</p>
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem 0 0", borderTop: "1px solid var(--border)", width: "100%" }}>
              <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--terracotta)" }}>
                Sunday · 10th May 2026
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "var(--text-mid)", fontSize: "0.95rem", marginTop: "0.3rem" }}>
                Muhurtham: 8:50 AM - 10:00 AM · Yashaswini Kalyana Mantapa
              </p>
            </div>
          </div>

          <div className="scroll-cue">
            <p>Scroll</p>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ════ COUNTDOWN ════ */}
        <section id="countdown-section">
          <div className="countdown-card reveal">
            <span className="section-label">The Big Day</span>
            <p className="countdown-quote">
              &ldquo;The start of a beautiful journey, shared with those we love most&rdquo;
            </p>
            <p className="countdown-date">Sunday · 10th May 2026</p>
            <div className="countdown-grid">
              {[
                { val: countdown.d, label: "Days" },
                { val: countdown.h, label: "Hours" },
                { val: countdown.m, label: "Mins" },
                { val: countdown.s, label: "Secs" },
              ].map(({ val, label }) => (
                <div key={label} className="countdown-unit">
                  <span className="countdown-number">{val}</span>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ MEMORIES / GALLERY ════ */}
        <section id="memories-section">
          <div className="text-center reveal">
            <span className="section-label">A Glimpse of Us</span>
            <h2 className="section-heading" style={{ color: "var(--terracotta)" }}>Our Beautiful<br />Moments</h2>
            <div className="ornament mt-4">
              <div className="ornament-line rev" />
              <OrnamentStar />
              <div className="ornament-line" />
            </div>
          </div>

          <div className="photo-grid reveal reveal-delay-2">
            {photos.map((src, i) => (
              <div key={i} className="photo-grid-item" onClick={() => setLightbox(src)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Couple photo ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <p className="text-center reveal reveal-delay-3 mt-8" style={{ fontStyle: "italic", color: "var(--text-light)", fontSize: "1.1rem" }}>
            A moment captured in time, forever in our hearts
          </p>
        </section>

        {/* ════ VENUE ════ */}
        <section id="venue-section">
          <div className="text-center reveal">
            <span className="section-label">Where Love Awaits</span>
            <h2 className="section-heading" style={{ color: "var(--terracotta)" }}>Our Cherished<br />Venue</h2>
            <div className="ornament mt-4 mb-8">
              <div className="ornament-line rev" />
              <OrnamentStar />
              <div className="ornament-line" />
            </div>
          </div>

          <div className="venue-card reveal reveal-delay-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="venue-img" src={PHOTO_4} alt="Kalyana Mantapa" />
            <div className="venue-info text-center">
              <h3 className="venue-name">Yashaswini Kalyana Mantapa</h3>
              <p className="venue-address">
                Hemavathi badavane, KR Pet.<br />
                Please contact family for exact address &amp; directions
              </p>
              <iframe
                className="venue-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15552.345826374956!2d75.7100861!3d12.8700814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4fde9a3a2bad5%3A0x6c3a29e0a90ba4f7!2sHassan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
              />
              <br />
              <a
                className="directions-btn"
                href="https://www.google.com/maps/search/?api=1&query=Kalyana+Mantapa+Karnataka"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        {/* ════ EVENTS ════ */}
        <section id="events-section">
          <div className="text-center reveal" style={{ marginBottom: "3rem" }}>
            <span className="section-label">The Celebration Unfolds</span>
            <h2 className="section-heading" style={{ color: "var(--terracotta)" }}>Sacred<br />Ceremonies</h2>
            <div className="ornament mt-4">
              <div className="ornament-line rev" />
              <OrnamentStar />
              <div className="ornament-line" />
            </div>
          </div>

          {[
            {
              num: "Ceremony I",
              title: "RECEPTION",
              date: "09-05-2026 (Saturday)",
              time: "7:30 PM",
              venue: "Yashaswini Kalyana Mantapa",
              photo: "https://lh3.googleusercontent.com/pw/AP1GczNtw6Vq-6BE14u6BlmfhIN1g-nVfFqYdUflCA-XYab2RFUcZb4rhNdTuIR1qWY86rtqph2uyKgS-b66SCOqY3qgP9q8yxhiVp_PaQAkRW8HmF29cwAxMoYLHDP2NkQWxX2Wgs4GJoPQa2x2XQ8RQvJk1Q=w571-h859-s-no-gm",
            },
            {
              num: "Ceremony II",
              title: "MUHURTHAM",
              date: "10-05-2026 (Sunday)",
              time: "8:50 AM - 10:00 AM",
              venue: "Yashaswini Kalyana Mantapa",
              photo: "https://lh3.googleusercontent.com/pw/AP1GczOs003-E8utclXygTlU4diRtrPVHU10AGzegrIvAQAH3EEvCt8E1memfyXm8Y8IQfFBeHxOncOXEqOPAHom3hI8IiVpenpxGs2GicWfkp1T9OsoOg-Kay-z47qE504rOkpgP_suI7KnwFdEYyd4xh295Q=w571-h859-s-no-gm",
            },
          ].map((ev, i) => (
            <div key={i}>
              <div className="event-block reveal">
                <div className="text-center mb-4">
                  <p className="event-subtitle">{ev.num}</p>
                  <h3 className="event-title">{ev.title}</h3>
                </div>
                <div className="event-photo-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.photo} alt={ev.title} loading="lazy" />
                </div>
                <div className="event-details">
                  <div className="event-detail-row">
                    <span className="event-detail-label">Date</span>
                    <span>{ev.date}</span>
                  </div>
                  <div className="event-detail-row">
                    <span className="event-detail-label">Time</span>
                    <span>{ev.time}</span>
                  </div>
                  <div className="event-detail-row">
                    <span className="event-detail-label">Venue</span>
                    <span>{ev.venue}</span>
                  </div>
                </div>
              </div>
              {i < 1 && (
                <div className="event-sep reveal">
                  <div className="event-sep-line" />
                  <div className="event-sep-dot" />
                  <div className="event-sep-line" />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* ════ RSVP ════ */}
        <section id="rsvp-section">
          <div className="text-center reveal">
            <span className="section-label">Join the Celebration</span>
            <h2 className="section-heading" style={{ color: "var(--terracotta)" }}>Celebrate<br />With Us</h2>
            <p className="reveal reveal-delay-2 mt-4" style={{ fontStyle: "italic", color: "var(--text-light)", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
              A few kind questions before the big day!
            </p>
          </div>

          {submitted ? (
            <div className="rsvp-form">
              <div className="form-card text-center" style={{ padding: "3rem 2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💕</div>
                <h3 className="form-card-title" style={{ fontSize: "2.5rem", fontFamily: "'Great Vibes',cursive" }}>Thank You!</h3>
                <p style={{ color: "var(--text-light)", fontStyle: "italic", marginTop: "0.75rem", lineHeight: 1.6 }}>
                  We can&rsquo;t wait to celebrate with you on this beautiful day!
                </p>
              </div>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="form-card reveal">
                <p className="form-card-title">Guest Details</p>
                <div className="field-group">
                  <label className="field-label" htmlFor="f-name">Your Name</label>
                  <input className="field-input" type="text" id="f-name" name="name" required placeholder="Full name" />
                </div>
                <div className="field-group" style={{ marginBottom: 0 }}>
                  <label className="field-label" htmlFor="f-phone">Phone Number</label>
                  <input className="field-input" type="tel" id="f-phone" name="phone" required placeholder="+91 00000 00000" />
                </div>
              </div>

              <div className="form-card reveal reveal-delay-1">
                <p className="form-card-title">Will you join us?</p>
                <div className="radio-pill-row">
                  <label className="radio-pill">
                    <input type="radio" name="attending" value="yes" defaultChecked />
                    Joyfully Accept 🎉
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="attending" value="no" />
                    Regrettably Decline
                  </label>
                </div>
              </div>

              <div className="form-card reveal reveal-delay-1">
                <p className="form-card-title">Party Size</p>
                <p className="form-card-subtitle">Including yourself, how many guests?</p>
                <div className="field-group" style={{ marginBottom: 0 }}>
                  <select className="field-input" name="guest_count">
                    <option value="1">1 (Just me)</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6+">6+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-card reveal reveal-delay-2">
                <p className="form-card-title">Leave Us a Note</p>
                <p className="form-card-subtitle">Share a wish or a blessing for the couple.</p>
                <textarea
                  style={{ width: "100%", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0.85rem 1rem", fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "var(--text-dark)", outline: "none", resize: "none", lineHeight: 1.5 }}
                  name="message" rows={3} placeholder="Write something from the heart..."
                />
              </div>

              <div className="reveal reveal-delay-3">
                <button type="submit" className="submit-btn">Send Love 💌</button>
              </div>
            </form>
          )}
        </section>

        {/* ════ FOOTER ════ */}
        <section id="footer-section">
          <div className="text-center reveal" style={{ marginBottom: "3rem" }}>
            <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: "4rem", color: "var(--gold-light)", display: "block", lineHeight: 1.1 }}>
              Sunil Kumar KJ &amp; Keerthana NS
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem", opacity: 0.4 }}>
              <div style={{ height: 1, width: 60, background: "var(--gold-light)" }} />
              <span style={{ color: "var(--gold-light)", fontSize: "1.1rem" }}>♥</span>
              <div style={{ height: 1, width: 60, background: "var(--gold-light)" }} />
            </div>
          </div>

          <div className="footer-grid">
            <div className="reveal">
              <span className="footer-heading">With Compliments From</span>
              <ul className="footer-list">
                <li>Mr. &amp; Mrs. Groom&rsquo;s Parents</li>
                <li>And all relatives &amp; well-wishers</li>
              </ul>
            </div>

            <div className="reveal reveal-delay-2">
              <span className="footer-heading">Bride&rsquo;s Family</span>
              <ul className="footer-list">
                <li>Mr. &amp; Mrs. Bride&rsquo;s Parents</li>
                <li>And all relatives &amp; well-wishers</li>
              </ul>
            </div>

            <div className="footer-endnote reveal">
              <div style={{ opacity: 0.4, height: 1, width: 120, background: "var(--gold-light)", margin: "0 auto 2rem" }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.5)" }}>
                10th May 2026 · Yashaswini Kalyana Mantapa, KR Pet
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", marginTop: "0.5rem" }}>
                With the blessings of our parents, we sincerely request your presence.
              </p>
              <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  Created by <a href="https://preethamamin.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold-light)", textDecoration: "none" }}>Preetham B R</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </main>
  );
}
