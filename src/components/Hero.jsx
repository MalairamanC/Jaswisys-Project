import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/Video1.mp4";

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

// Core capability lines — shown as quiet pills under the subcopy
const SERVICES = ["IT Solutions", "Consulting", "Outsourcing", "Training"];

// Rotating trust line in the top readout bar — one accent colour throughout,
// so it reads as a single credible signal rather than a light show
const TRUST_LINES = [
  "5+ Enterprise Clients",
  "24/7 Global Support Desk",
  "99.9% Platform Uptime",
];

// Ops/status readout — the hero's one signature element. Framed as a live
// systems bar because that's a credible, industry-specific thing for an
// IT-services company to show, not decoration for its own sake.
const STATUS_ITEMS = [
  "SYSTEMS OPERATIONAL",
  "GOOD SUPPORT RESPONSE",
];

function Hero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [trustIdx, setTrustIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTrustIdx((i) => (i + 1) % TRUST_LINES.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

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

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#070C16]"
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
        style={{
          willChange: "transform",
          filter: "grayscale(0.05) contrast(1.05) brightness(0.98) saturate(1.05)",
        }}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

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

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-16 pt-24 pb-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            variants={item}
            className="jw-mono inline-block text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border mb-6"
            style={{ borderColor: "rgba(59,110,246,0.4)", color: "#7C9CFF" }}
          >
            Enterprise IT Partner
          </motion.span>

          <motion.h1
            variants={item}
            className="jw-display text-[2.4rem] sm:text-5xl md:text-[4.25rem] leading-[1.05] tracking-tight text-white"
            style={{ textShadow: "0 2px 24px rgba(7,12,22,0.55)" }}
          >
            <span className="font-medium" style={{ color: "#9AA3AD" }}>
              Enterprise technology, delivered with
            </span>{" "}
            <span className="font-bold" style={{ color: "#F4F6F9" }}>
              precision and{" "}
              <span style={{ color: "#3B6EF6" }}>scale.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="jw-body mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-light"
            style={{ color: "rgba(230,233,238,0.7)", textShadow: "0 2px 16px rgba(7,12,22,0.5)" }}
          >
            <span className="jw-brand-gradient">JASWISYS TECHNOLOGIES</span> deliver top-notch IT software services, backed by experienced professionals, to help businesses thrive.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-2.5">
            {SERVICES.map((service) => (
              <span
                key={service}
                className="jw-mono jw-pill text-[11px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full"
              >
                {service}
              </span>
            ))}
          </motion.div>

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
