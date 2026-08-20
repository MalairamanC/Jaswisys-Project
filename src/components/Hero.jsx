import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import heroVideo1 from "../assets/Video1.mp4";
// TODO: add these three files to ../assets (or point these imports at videos/images
// you already have) — the carousel below expects four distinct media sources.
import heroVideo2 from "../assets/Video2.mp4";
import heroVideo3 from "../assets/Video3.mp4";
import heroVideo4 from "../assets/Video4.mp4";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Core capability lines — shown as quiet pills under the subcopy. Persistent
// across slides (not slide-specific), since they're the company's full service list.
const SERVICES = ["IT Solutions", "Consulting", "Outsourcing", "Training"];

// Rotating trust line in the top readout bar — independent of the hero carousel below.
const TRUST_LINES = [
  "5+ Enterprise Clients",
  "24/7 Global Support Desk",
  "99.9% Platform Uptime",
];

// Ops/status readout — the hero's signature element, also independent of the carousel.
const STATUS_ITEMS = [
  "SYSTEMS OPERATIONAL",
  "GOOD SUPPORT RESPONSE",
];

// Each slide owns its own background media, eyebrow, headline, and subcopy —
// the three things that should differ slide to slide. CTAs, pills, and the
// stats row stay constant and live outside the carousel.
const SLIDES = [
  {
    id: "it-solutions",
    media: { type: "video", src: heroVideo1 },
    eyebrow: "Enterprise IT Partner",
    headlineLead: "Enterprise technology, delivered with",
    headlineBold: "precision and",
    headlineAccent: "scale.",
    subcopyPrefix: "",
    subcopy:
      " deliver top-notch IT software services, backed by experienced professionals, to help businesses thrive.",
    showCapabilityPills: true,
  },
  {
    id: "consulting",
    media: { type: "video", src: heroVideo2 },
    eyebrow: "Strategic Consulting",
    headlineLead: "Strategic consulting for",
    headlineBold: "digital",
    headlineAccent: "transformation",
    subcopyPrefix: "",
    subcopy:
      " guides enterprise teams through technology strategy, architecture, and change management — turning complex transformation into measurable outcomes.",
    showCapabilityPills: false,
  },
  {
    id: "outsourcing",
    media: { type: "video", src: heroVideo3 },
    eyebrow: "Global Outsourcing",
    headlineLead: "Scale your team with",
    headlineBold: "expert",
    headlineAccent: "Outsourcing.",
    subcopyPrefix: "",
    subcopy:
      " helps you scale delivery capacity with dedicated development pods and staff augmentation, without scaling overhead.",
    showCapabilityPills: false,
  },
  {
    id: "training",
    media: { type: "video", src: heroVideo4 },
    eyebrow: "Enterprise Training",
    headlineLead: "Upskill your workforce with",
    headlineBold: "enterprise-grade",
    headlineAccent: "Training",
    subcopyPrefix: "",
    subcopy:
      " designs and delivers technical training programs that keep enterprise teams current, certified, and productive.",
    showCapabilityPills: false,
  },
];

const AUTO_ADVANCE_MS = 7000;

function Hero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);
  const [trustIdx, setTrustIdx] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(
      () => setTrustIdx((i) => (i + 1) % TRUST_LINES.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  // Auto-advance the carousel. Re-runs every time currentSlide changes, which
  // means a manual click (dot/arrow) naturally resets the timer instead of
  // fighting it. Skipped entirely if the user prefers reduced motion.
  useEffect(() => {
    if (shouldReduceMotion) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide, shouldReduceMotion]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (videoRef.current) {
          // Restrained parallax — present, but not the point of the page
          videoRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleScrollToServices = () => {
    document.getElementById("Services")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    const section = document.getElementById("Contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:info@jaswisys.com";
    }
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((i) => (i + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#070C16]"
      aria-label="Hero"
      aria-roledescription="carousel"
      role="region"
    >
      {/* Background media — crossfades between slides */}
      <AnimatePresence mode="sync">
        <motion.video
          key={slide.id}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="jw-hero-video absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: "transform, opacity",
            filter: "grayscale(0.05) contrast(1.05) brightness(0.98) saturate(1.05)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <source src={slide.media.src} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* Lighter navy scrim — still grounds the top/bottom readout bars and
          keeps text legible, but the footage reads through clearly now */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,12,22,0.35) 0%, rgba(7,12,22,0.28) 40%, rgba(7,12,22,0.75) 100%), linear-gradient(120deg, rgba(59,110,246,0.06) 0%, rgba(59,110,246,0) 60%)",
        }}
        aria-hidden="true"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

        .jw-mono { font-family: 'IBM Plex Mono', monospace; }
        .jw-display { font-family: 'Space Grotesk', sans-serif; }
        .jw-body { font-family: 'Inter', sans-serif; }
        .jw-sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .jw-status-dot { animation: pulseDot 2.4s ease-in-out infinite; }

        /* Subtle ambient drift so the footage doesn't feel static — no breathing zoom */
        @keyframes jwVideoDrift {
          0%   { transform: scale(1.04); }
          50%  { transform: scale(1.07); }
          100% { transform: scale(1.04); }
        }
        .jw-hero-video {
          animation: jwVideoDrift 18s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes jwFadeUp {
          0%   { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .jw-trust-line { animation: jwFadeUp 0.45s ease; }

        /* Multi-colour brand mark — cycles through the palette instead of one flat colour */
        @keyframes jwBrandShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .jw-brand-gradient {
          background-image: linear-gradient(90deg, #5EEAD4 0%, #3B6EF6 33%, #7C9CFF 55%, #E3B341 80%, #5EEAD4 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
          animation: jwBrandShift 7s ease-in-out infinite;
        }

        .jw-btn-primary {
          box-shadow: 0 8px 24px -10px rgba(59,110,246,0.55);
        }
        .jw-btn-primary:hover {
          box-shadow: 0 10px 30px -8px rgba(59,110,246,0.7);
        }
        .jw-btn-primary .jw-arrow {
          transition: transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 4px;
        }
        .jw-btn-primary:hover .jw-arrow { transform: translateX(3px); }

        .jw-btn-secondary {
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .jw-btn-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #3B6EF6;
          transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .jw-btn-secondary:hover::before { transform: translateX(0); }
        .jw-btn-secondary:hover { color: #F4F6F9 !important; border-color: #3B6EF6 !important; }
        .jw-btn-secondary span, .jw-btn-secondary .jw-icon-box {
          position: relative;
          z-index: 1;
        }
        .jw-btn-secondary .jw-icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 3px;
          transition: transform 0.2s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .jw-btn-secondary:hover .jw-icon-box {
          transform: translateX(3px);
          border-color: #F4F6F9 !important;
          color: #F4F6F9 !important;
        }

        .jw-pill {
          border: 1px solid rgba(244,246,249,0.16);
          color: rgba(244,246,249,0.72);
        }

        .jw-stat-divider {
          border-left: 1px solid rgba(244,246,249,0.12);
        }

        /* Carousel controls */
        .jw-carousel-arrow {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: 1.5px solid rgba(244,246,249,0.25);
          color: rgba(244,246,249,0.8);
          background: rgba(7,12,22,0.35);
          backdrop-filter: blur(4px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .jw-carousel-arrow:hover {
          border-color: #3B6EF6;
          color: #F4F6F9;
          background: rgba(59,110,246,0.18);
        }
        .jw-carousel-arrow:active { transform: scale(0.94); }

        .jw-carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(244,246,249,0.3);
          transition: width 0.25s ease, background 0.25s ease;
        }
        .jw-carousel-dot[data-active="true"] {
          width: 24px;
          background: #3B6EF6;
        }
        .jw-carousel-dot:hover { background: rgba(244,246,249,0.55); }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .jw-ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 26s linear infinite;
        }
        .jw-ticker-item {
          white-space: nowrap;
          padding: 0 1.75rem;
          border-right: 1px solid rgba(244,246,249,0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .jw-ticker-track { animation: none; }
          .jw-status-dot { animation: none; }
          .jw-hero-video { animation: none; }
          .jw-trust-line { animation: none; }
          .jw-brand-gradient { animation: none; background-position: 0% 50%; }
        }
      `}</style>

      {/* Top readout bar — brand mark, one rotating trust line, direct contact */}
      <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-16 pt-8 grid grid-cols-3 items-center">
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase justify-self-start"
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#5EEAD4", boxShadow: "0 0 5px #5EEAD4" }}
            aria-hidden="true"
          />
          <span className="jw-brand-gradient">JASWISYS</span>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono hidden sm:flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase justify-self-center"
          style={{ color: "rgba(244,246,249,0.6)" }}
        >
          <span
            className="jw-status-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#3B6EF6", boxShadow: "0 0 5px #3B6EF6" }}
            aria-hidden="true"
          />
          <span key={trustIdx} className="jw-trust-line">
            {TRUST_LINES[trustIdx]}
          </span>
        </motion.div>

        <motion.a
          href="mailto:info@jaswisys.com"
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase justify-self-end hover:opacity-80 transition-opacity"
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#E3B341", boxShadow: "0 0 5px #E3B341" }}
            aria-hidden="true"
          />
          <span className="jw-brand-gradient">info@jaswisys.com</span>
        </motion.a>
      </div>

      {/* Carousel arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="jw-carousel-arrow absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="jw-carousel-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20"
      >
        ›
      </button>

      {/* Screen-reader announcement of the current slide */}
      <span className="jw-sr-only" aria-live="polite">
        {`Slide ${currentSlide + 1} of ${SLIDES.length}: ${slide.eyebrow}`}
      </span>

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-16 pt-24 pb-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Slide-specific: eyebrow, headline, subcopy — crossfades per slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="jw-mono inline-block text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border mb-6"
                style={{ borderColor: "rgba(59,110,246,0.4)", color: "#7C9CFF" }}
              >
                {slide.eyebrow}
              </span>

              <h1
                className="jw-display text-[2.4rem] sm:text-5xl md:text-[4.25rem] leading-[1.05] tracking-tight text-white"
                style={{ textShadow: "0 2px 24px rgba(7,12,22,0.55)" }}
              >
                <span className="font-medium" style={{ color: "#9AA3AD" }}>
                  {slide.headlineLead}
                </span>{" "}
                <span className="font-bold" style={{ color: "#F4F6F9" }}>
                  {slide.headlineBold}{" "}
                  <span style={{ color: "#3B6EF6" }}>{slide.headlineAccent}</span>
                </span>
              </h1>

              <p
                className="jw-body mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-light"
                style={{ color: "rgba(230,233,238,0.7)", textShadow: "0 2px 16px rgba(7,12,22,0.5)" }}
              >
                <span className="jw-brand-gradient">JASWISYS TECHNOLOGIES</span>
                {slide.subcopy}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Persistent across slides: CTAs, stats. Capability pills are conditional. */}
          <AnimatePresence mode="wait">
            {slide.showCapabilityPills && (
              <motion.div
                key="capability-pills"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-wrap justify-center gap-2.5"
              >
                {SERVICES.map((service) => (
                  <span
                    key={service}
                    className="jw-mono jw-pill text-[11px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleScrollToServices}
              className="jw-display jw-btn-primary inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-md text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#3B6EF6", color: "#F4F6F9" }}
            >
              Explore Solutions
              <span className="jw-arrow" style={{ background: "rgba(255,255,255,0.16)", color: "#F4F6F9" }} aria-hidden="true">
                →
              </span>
            </button>

            <button
              onClick={handleContactClick}
              className="jw-display jw-btn-secondary inline-flex items-center gap-3 pl-6 pr-2 py-2 text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "transparent", color: "rgba(244,246,249,0.85)", border: "1.5px solid rgba(244,246,249,0.28)" }}
            >
              <span>Talk to an Expert</span>
              <span
                className="jw-icon-box"
                style={{ border: "1.5px solid rgba(244,246,249,0.28)", color: "rgba(244,246,249,0.85)" }}
                aria-hidden="true"
              >
                ↗
              </span>
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="jw-mono mt-14 flex items-center justify-center divide-x divide-transparent"
          >
            {[
              ["2+", "Years in Operation"],
              ["5+", "Enterprise Clients"],
              ["99.9%", "Platform Uptime"],
            ].map(([value, label], i) => (
              <div
                key={label}
                className={`px-5 sm:px-8 text-center ${i !== 0 ? "jw-stat-divider" : ""}`}
              >
                <div className="text-lg sm:text-xl font-medium" style={{ color: "#F4F6F9" }}>
                  {value}
                </div>
                <div
                  className="jw-body mt-1 text-[10px] sm:text-[11px] tracking-wide uppercase"
                  style={{ color: "rgba(230,233,238,0.5)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Slide dots */}
          <motion.div variants={item} className="mt-8 flex items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                data-active={i === currentSlide}
                className="jw-carousel-dot"
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === currentSlide}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Signature element — live ops/status readout, framed as a credible
          operational signal for an IT-services company rather than decoration */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="absolute bottom-0 inset-x-0 z-10 border-t"
        style={{ borderColor: "rgba(244,246,249,0.1)", background: "rgba(7,12,22,0.55)", backdropFilter: "blur(6px)" }}
      >
        <div className="overflow-hidden py-3">
          <div className="jw-ticker-track">
            {[...STATUS_ITEMS, ...STATUS_ITEMS, ...STATUS_ITEMS].map((label, i) => (
              <span
                key={i}
                className="jw-ticker-item jw-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-2"
                style={{ color: "rgba(244,246,249,0.55)" }}
              >
                {i % STATUS_ITEMS.length === 0 && (
                  <span
                    className="jw-status-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#34D399", boxShadow: "0 0 5px #34D399" }}
                    aria-hidden="true"
                  />
                )}
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
