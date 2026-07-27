import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/Video1.mp4";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const rule = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
};

const SERVICES = ["IT Solutions", "Consulting", "Outsourcing", "Training"];

// Rolling readout labels — each carries its own accent colour
const LABELS = [
  { text: "IT Solutions", color: "#5EEAD4" },
  { text: "Consulting", color: "#7C9CFF" },
  { text: "Outsourcing", color: "#FF8A3D" },
  { text: "Training", color: "#D7FF3F" },
  { text: "Live Support", color: "#FF6F91" },
];

function Hero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(3);
  const [centerIdx, setCenterIdx] = useState(1);

  // Rolling label cycles, offset so left/center/right never change in sync
  useEffect(() => {
    const leftId = setInterval(
      () => setLeftIdx((i) => (i + 1) % LABELS.length),
      2600
    );
    const rightId = setInterval(
      () => setRightIdx((i) => (i + 1) % LABELS.length),
      2200
    );
    const centerId = setInterval(
      () => setCenterIdx((i) => (i + 1) % LABELS.length),
      3000
    );
    return () => {
      clearInterval(leftId);
      clearInterval(rightId);
      clearInterval(centerId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (videoRef.current) {
          // Stronger, clearly visible parallax drift as the page scrolls
          videoRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.12)`;
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
      window.location.href = "mailto:contact@jaswisys.com";
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#060708]"
      aria-label="Hero"
      role="region"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="jw-hero-video absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform", filter: "saturate(1.05) contrast(1.08) brightness(1.05)" }}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(6,7,8,0.05) 0%, rgba(6,7,8,0.4) 55%, rgba(6,7,8,0.82) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="jw-grain absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

        .jw-mono { font-family: 'IBM Plex Mono', monospace; }
        .jw-display { font-family: 'Sora', sans-serif; }
        .jw-body { font-family: 'Inter', sans-serif; }

        .jw-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: overlay;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .jw-status-dot { animation: pulseDot 2.2s ease-in-out infinite; }

        /* Ambient breathing zoom so the footage clearly moves even before any scroll */
        @keyframes jwVideoBreathe {
          0%   { transform: scale(1.06); }
          50%  { transform: scale(1.16); }
          100% { transform: scale(1.06); }
        }
        .jw-hero-video {
          animation: jwVideoBreathe 14s ease-in-out infinite;
          transform-origin: center center;
        }

        /* Rolling readout labels — crossfade + rise, colour swaps per label */
        @keyframes jwLabelIn {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .jw-rolling-label {
          display: inline-block;
          position: relative;
          padding-bottom: 4px;
          animation: jwLabelIn 0.5s ease;
        }
        .jw-rolling-label::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1.5px;
          background: currentColor;
          transform-origin: left;
          animation: jwUnderlineIn 0.5s ease;
        }
        @keyframes jwUnderlineIn {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* Rolling colour treatment for the brand name — a slow hue sweep across the gradient stops */
        @keyframes jwRollingColour {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .jw-rolling-text {
          background-image: linear-gradient(
            100deg,
            #D7FF3F 0%,
            #5EEAD4 25%,
            #7C9CFF 50%,
            #FF8A3D 75%,
            #D7FF3F 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: jwRollingColour 8s ease-in-out infinite;
        }

        /* Explore Services — solid capsule, unchanged family but distinct from Contact */
        .jw-btn-primary {
          box-shadow: 0 8px 26px -8px rgba(94,234,212,0.35);
        }
        .jw-btn-primary:hover {
          box-shadow: 0 10px 34px -6px rgba(94,234,212,0.55);
        }
        .jw-btn-primary .jw-arrow {
          transition: transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
        }
        .jw-btn-primary:hover .jw-arrow { transform: translateX(3px); }

        /* Contact Us — outlined, squared-off tag style to read as a distinctly different action */
        .jw-btn-secondary {
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .jw-btn-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #FF8A3D;
          transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .jw-btn-secondary:hover::before { transform: translateX(0); }
        .jw-btn-secondary:hover { color: #0A0F14 !important; }
        .jw-btn-secondary span, .jw-btn-secondary .jw-icon-circle {
          position: relative;
          z-index: 1;
        }
        .jw-btn-secondary .jw-icon-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          transition: transform 0.2s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .jw-btn-secondary:hover .jw-icon-circle {
          transform: translateX(3px) rotate(45deg);
          border-color: #0A0F14 !important;
          color: #0A0F14 !important;
        }

        .jw-corner { position: absolute; width: 22px; height: 22px; z-index: 10; opacity: 0.55; }
        .jw-corner-tl { top: 24px; left: 24px; border-top: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-corner-tr { top: 24px; right: 24px; border-top: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }
        .jw-corner-bl { bottom: 24px; left: 24px; border-bottom: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-corner-br { bottom: 24px; right: 24px; border-bottom: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .jw-ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 22s linear infinite;
        }
        .jw-ticker-item {
          white-space: nowrap;
          padding: 0 2rem;
          border-right: 1px solid rgba(255,255,255,0.14);
        }

        @media (prefers-reduced-motion: reduce) {
          .jw-ticker-track { animation: none; }
          .jw-status-dot { animation: none; }
          .jw-rolling-text { animation: none; background-position: 0% 50%; }
          .jw-hero-video { animation: none; }
          .jw-rolling-label { animation: none; }
          .jw-rolling-label::after { animation: none; transform: scaleX(1); }
        }
      `}</style>

      {/* HUD frame — viewfinder marks, not decoration: they say "this is being watched/measured" */}
      <span className="jw-corner jw-corner-tl" aria-hidden="true" />
      <span className="jw-corner jw-corner-tr" aria-hidden="true" />
      <span className="jw-corner jw-corner-bl" aria-hidden="true" />
      <span className="jw-corner jw-corner-br" aria-hidden="true" />

      {/* Top readout bar */}
      <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-16 pt-9 grid grid-cols-3 items-center">
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase justify-self-start"
        >
          <span
            className="jw-status-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: LABELS[leftIdx].color,
              boxShadow: `0 0 6px ${LABELS[leftIdx].color}`,
            }}
            aria-hidden="true"
          />
          <span
            key={leftIdx}
            className="jw-rolling-label"
            style={{ color: LABELS[leftIdx].color }}
          >
            {LABELS[leftIdx].text}
          </span>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono hidden sm:flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase justify-self-center"
        >
          <span
            className="jw-status-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: LABELS[centerIdx].color,
              boxShadow: `0 0 6px ${LABELS[centerIdx].color}`,
            }}
            aria-hidden="true"
          />
          <span
            key={centerIdx}
            className="jw-rolling-label"
            style={{ color: LABELS[centerIdx].color }}
          >
            {LABELS[centerIdx].text}
          </span>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="jw-mono flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase justify-self-end"
        >
          <span
            className="jw-status-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: LABELS[rightIdx].color,
              boxShadow: `0 0 6px ${LABELS[rightIdx].color}`,
            }}
            aria-hidden="true"
          />
          <span
            key={rightIdx}
            className="jw-rolling-label"
            style={{ color: LABELS[rightIdx].color }}
          >
            {LABELS[rightIdx].text}
          </span>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-16 pt-24 pb-28"
      >
        <div className="max-w-5xl">
          <motion.h1
            variants={item}
            className="jw-display text-[2.5rem] sm:text-6xl md:text-[5.5rem] leading-[0.96] tracking-tight text-white"
          >
            <span className="font-light" style={{ color: "#9AA3AD" }}>Build your business with</span>
            <br />
            <span className="jw-rolling-text font-extrabold">Jaswisys Technologies</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="jw-body mt-7 max-w-lg mx-auto text-center text-base md:text-lg leading-relaxed font-light"
            style={{ color: "rgba(230,233,238,0.68)" }}
          >
            We deliver top-notch IT software services, backed by experienced professionals, to help businesses thrive.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleScrollToServices}
              className="jw-display jw-btn-primary inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "#5EEAD4", color: "#0A0F14" }}
            >
              Explore Services
              <span className="jw-arrow" style={{ background: "#0A0F14", color: "#5EEAD4" }} aria-hidden="true">→</span>
            </button>

            <button
              onClick={handleContactClick}
              className="jw-display jw-btn-secondary inline-flex items-center gap-3 pl-6 pr-2 py-2 text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "transparent", color: "#FF8A3D", border: "1.5px solid #FF8A3D" }}
            >
              <span>Contact Us</span>
              <span className="jw-icon-circle" style={{ border: "1.5px solid #FF8A3D", color: "#FF8A3D" }} aria-hidden="true">↗</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
