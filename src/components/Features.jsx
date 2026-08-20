import { motion } from "framer-motion";
import { useState } from "react";
import FeaturesBg from "../assets/FeaturesBg.png";

const features = [
  {
    title: "Our Vision",
    tag: "The Horizon",
    desc: "Our vision is to be a global leader in innovation and technology. We deliver cutting-edge enterprise solutions that inspire others and help our customers achieve greater value and long-term success.",
    color: "#5EEAD4",
    colorSoft: "#A7F3E8",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    // Wave signature: a horizon line, echoing "The Horizon" tag
    banner: (id) => (
      <svg viewBox="0 0 400 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B3B36" />
            <stop offset="100%" stopColor="#062421" />
          </linearGradient>
          <linearGradient id={`${id}-wave`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D7FF3F" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill={`url(#${id}-bg)`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-20 ${220 - i * 22} C 80 ${150 - i * 26}, 160 ${270 - i * 18}, 240 ${160 - i * 22} S 380 ${200 - i * 20}, 420 ${130 - i * 22}`}
            fill="none"
            stroke={`url(#${id}-wave)`}
            strokeWidth={i === 2 ? 2 : 1}
            opacity={0.85 - i * 0.1}
          />
        ))}
        <circle cx="322" cy="72" r="26" fill="#5EEAD4" opacity="0.9" />
        <circle cx="322" cy="72" r="44" fill="#5EEAD4" opacity="0.18" />
      </svg>
    ),
  },
  {
    title: "Our Mission",
    tag: "The Standard",
    desc: "Our mission is to become the most reliable technology services company by serving as a trusted partner and consistently exceeding customer expectations through innovative solutions and exceptional service.",
    color: "#7C9CFF",
    colorSoft: "#C6D3FF",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    ),
    // Concentric-ring signature, echoing the target/standard icon
    banner: (id) => (
      <svg viewBox="0 0 400 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${id}-bg`} cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#1A2456" />
            <stop offset="100%" stopColor="#0A0F2B" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill={`url(#${id}-bg)`} />
        {[120, 88, 56, 28].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="158"
            r={r}
            fill="none"
            stroke="#7C9CFF"
            strokeWidth={i === 3 ? 2 : 1}
            opacity={0.9 - i * 0.16}
          />
        ))}
        <circle cx="200" cy="158" r="6" fill="#D7FF3F" />
        <line x1="0" y1="158" x2="180" y2="158" stroke="#7C9CFF" strokeWidth="1" opacity="0.4" />
        <line x1="220" y1="158" x2="400" y2="158" stroke="#7C9CFF" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Our Value",
    tag: "The Practice",
    desc: "We are committed to creating value for our customers by delivering high-quality IT solutions that enhance user experience, optimize operations, and drive business growth.",
    color: "#FF8A3D",
    colorSoft: "#FFC79A",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M5 3h14l3 6-10 12L2 9l3-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 9h20M9 3 6.5 9 12 21l5.5-12L15 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // Faceted gem/compass signature, echoing the value icon
    banner: (id) => (
      <svg viewBox="0 0 400 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2010" />
            <stop offset="100%" stopColor="#1A0E06" />
          </linearGradient>
          <linearGradient id={`${id}-gem`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC79A" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill={`url(#${id}-bg)`} />
        <path
          d="M160 90 H240 L280 148 L200 232 L120 148 Z"
          fill="none"
          stroke={`url(#${id}-gem)`}
          strokeWidth="1.5"
        />
        <path d="M120 148 H280 M160 90 L200 148 L240 90 M200 148 L200 232" stroke="#FF8A3D" strokeWidth="1" opacity="0.6" />
        <circle cx="90" cy="200" r="3" fill="#FF8A3D" />
        <circle cx="330" cy="100" r="3" fill="#FF8A3D" />
        <circle cx="320" cy="220" r="3" fill="#D7FF3F" />
      </svg>
    ),
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

function FeatureCard({ title, tag, desc, color, colorSoft, banner, Icon, index }) {
  const gradId = `jw-f-banner-${index}`;
  const [selected, setSelected] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`jw-f-card relative w-full max-w-sm ${selected ? "jw-f-selected" : ""}`}
      style={{ "--accent": color, "--accent-soft": colorSoft }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => setSelected((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelected((v) => !v);
        }
      }}
    >
      {/* Banner / image area */}
      <div className="jw-f-banner relative w-full h-64 overflow-hidden rounded-2xl">
        {banner(gradId)}

        {/* Icon badge, overlapping the top-left corner of the image */}
        <div
          className="jw-f-badge absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ color }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Glass label, overlapping the bottom of the image */}
      <div className="jw-f-label relative z-10 -mt-9 mx-4 rounded-2xl p-6 text-center">
        <span className="jw-mono block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color }}>
          {tag}
        </span>
        <h3 className="jw-display text-xl font-bold jw-f-title" style={{ color: "#F5F7FA" }}>
          <span className="jw-f-title-inner">{title}</span>
        </h3>
        <p className="jw-body text-sm leading-relaxed" style={{ color: "rgba(235,238,242,0.75)" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function Features() {
  return (
    <section
      id="AboutSection" // ✅ IMPORTANT (for Navbar scroll)
      className="relative py-28 bg-cover bg-center bg-fixed bg-[#060708] overflow-hidden"
      style={{ backgroundImage: `url(${FeaturesBg})` }}
    >
      {/* Overlay — lightened so the photograph stays visible, contrast held by
          a bottom-weighted vignette rather than a flat wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,8,0.62) 0%, rgba(6,7,8,0.32) 30%, rgba(6,7,8,0.4) 65%, rgba(6,7,8,0.72) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(6,7,8,0) 0%, rgba(6,7,8,0.55) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="jw-f-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient accent glows — modern colour-wash depth, tuned to the brand palette */}
      <div className="jw-f-glow" style={{ background: "#5EEAD4", top: "-10%", left: "6%" }} aria-hidden="true" />
      <div className="jw-f-glow" style={{ background: "#7C9CFF", top: "20%", right: "2%" }} aria-hidden="true" />
      <div className="jw-f-glow" style={{ background: "#FF8A3D", bottom: "-14%", left: "38%" }} aria-hidden="true" />

      <span className="jw-f-section-corner jw-f-section-corner-tl" aria-hidden="true" />
      <span className="jw-f-section-corner jw-f-section-corner-tr" aria-hidden="true" />
      <span className="jw-f-section-corner jw-f-section-corner-bl" aria-hidden="true" />
      <span className="jw-f-section-corner jw-f-section-corner-br" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

        .jw-mono { font-family: 'IBM Plex Mono', monospace; }
        .jw-display { font-family: 'Sora', sans-serif; }
        .jw-body { font-family: 'Inter', sans-serif; }

        .jw-f-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: overlay;
        }

        .jw-f-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 9999px;
          filter: blur(110px);
          opacity: 0.16;
          pointer-events: none;
          z-index: 0;
        }

        .jw-f-section-corner { position: absolute; width: 22px; height: 22px; z-index: 10; opacity: 0.4; }
        .jw-f-section-corner-tl { top: 24px; left: 24px; border-top: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-f-section-corner-tr { top: 24px; right: 24px; border-top: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }
        .jw-f-section-corner-bl { bottom: 24px; left: 24px; border-bottom: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-f-section-corner-br { bottom: 24px; right: 24px; border-bottom: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }

        @keyframes jwFPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .jw-f-eyebrow-dot { animation: jwFPulse 2.2s ease-in-out infinite; }

        @keyframes jwFRollingColour {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .jw-f-rolling-text {
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
          animation: jwFRollingColour 8s ease-in-out infinite;
        }

        /* Card shell — the image + overlapping dark label read as one unit,
           lifted by a soft brand-tinted shadow instead of a flat box-shadow */
        .jw-f-card {
          cursor: pointer;
          filter: drop-shadow(0 24px 40px rgba(0,0,0,0.45));
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease;
        }
        .jw-f-card:hover {
          transform: translateY(-6px);
          filter: drop-shadow(0 30px 50px color-mix(in srgb, var(--accent) 35%, rgba(0,0,0,0.45)));
        }
        .jw-f-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 1.25rem;
        }

        .jw-f-banner {
          position: relative;
          box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .jw-f-banner svg {
          display: block;
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .jw-f-card:hover .jw-f-banner svg { transform: scale(1.05); }

        .jw-f-badge {
          background: #0B0B10;
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          box-shadow: 0 8px 20px -6px rgba(0,0,0,0.6);
        }

        /* Glass label — translucent + blurred, banner colour shows through */
        .jw-f-label {
          background: rgba(18, 20, 28, 0.45);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow:
            0 20px 40px -20px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .jw-f-title {
          margin-bottom: 14px;
        }
        .jw-f-title-inner {
          position: relative;
          display: inline-block;
        }
        .jw-f-title-inner::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -8px;
          width: 36px;
          height: 2px;
          border-radius: 2px;
          background: var(--accent);
          transform: translateX(-50%);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .jw-f-card:hover .jw-f-title-inner::after {
          width: 100%;
        }

        /* Selection zoom: clicking/tapping a card zooms its art and frame in, then settles back out */
        @keyframes jwFSelectZoom {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes jwFSelectZoomArt {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.16); }
          100% { transform: scale(1.08); }
        }
        .jw-f-selected {
          animation: jwFSelectZoom 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .jw-f-selected .jw-f-banner svg {
          animation: jwFSelectZoomArt 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .jw-f-selected .jw-f-badge {
          border-color: var(--accent);
        }
        .jw-f-selected .jw-f-label {
          box-shadow: 0 24px 48px -18px color-mix(in srgb, var(--accent) 55%, rgba(0,0,0,0.5));
        }

        @media (max-width: 768px) {
          .bg-fixed { background-attachment: scroll; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jw-f-eyebrow-dot { animation: none; }
          .jw-f-rolling-text { animation: none; background-position: 0% 50%; }
          .jw-f-card, .jw-f-banner svg { transition: none; }
          .jw-f-selected, .jw-f-selected .jw-f-banner svg { animation: none; }
        }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-6">
          <div className="jw-mono inline-flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase mb-5" style={{ color: "rgba(235,238,242,0.7)" }}>
            <span
              className="jw-f-eyebrow-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#5EEAD4", boxShadow: "0 0 6px #5EEAD4" }}
              aria-hidden="true"
            />
            Why Choose Us
          </div>

          <h2 className="jw-display text-4xl sm:text-5xl font-bold mb-4 text-white tracking-tight">
            Built around{" "}
            <span className="jw-f-rolling-text font-extrabold">JASWISYS</span>
          </h2>

          <p className="jw-body text-sm sm:text-base font-light" style={{ color: "rgba(235,238,242,0.78)" }}>
            We deliver innovative solutions with a strong focus on security, performance, and scalability, ensuring reliable operations across global platforms.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="max-w-5xl mx-auto px-6 grid gap-8 md:grid-cols-3 place-items-stretch">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              title={feature.title}
              tag={feature.tag}
              desc={feature.desc}
              color={feature.color}
              colorSoft={feature.colorSoft}
              banner={feature.banner}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
