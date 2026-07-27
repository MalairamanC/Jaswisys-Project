import { motion } from "framer-motion";
import FeaturesBg from "../assets/FeaturesBg.png";

const features = [
  {
    title: "Our Vision",
    tag: "The Horizon",
    desc: "Our vision is to be a global leader in innovation and technology. We deliver cutting-edge enterprise solutions that inspire others and help our customers achieve greater value and long-term success.",
    color: "#5EEAD4",
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
  },
  {
    title: "Our Mission",
    tag: "The Standard",
    desc: "Our mission is to become the most reliable technology services company by serving as a trusted partner and consistently exceeding customer expectations through innovative solutions and exceptional service.",
    color: "#7C9CFF",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Our Value",
    tag: "The Practice",
    desc: "We are committed to creating value for our customers by delivering high-quality IT solutions that enhance user experience, optimize operations, and drive business growth.",
    color: "#FF8A3D",
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

function FeatureCard({ title, tag, desc, color, Icon, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="jw-f-ring relative w-full max-w-sm"
      style={{ "--accent": color }}
    >
      <div className="jw-f-card relative w-full h-full flex flex-col items-center text-center p-7 rounded-2xl">
        <span className="jw-f-corner jw-f-corner-tl" aria-hidden="true" />
        <span className="jw-f-corner jw-f-corner-br" aria-hidden="true" />

        <div
          className="jw-f-icon w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ color, borderColor: `${color}55` }}
        >
          <Icon className="w-5 h-5" />
        </div>

        <span
          className="jw-mono text-[10px] tracking-[0.25em] uppercase mb-2"
          style={{ color: `${color}CC` }}
        >
          {tag}
        </span>

        <h3 className="jw-display text-xl font-bold text-white relative inline-block mb-3">
          {title}
          <span className="jw-f-underline" style={{ background: color }} />
        </h3>

        <p className="jw-body text-sm leading-relaxed" style={{ color: "rgba(235,238,242,0.78)" }}>
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

        /* Gradient-ring border: a soft brand-coloured edge instead of a flat 1px line,
           letting the frosted card read as "modern glass" rather than a plain box */
        .jw-f-ring {
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--accent) 55%, transparent) 0%,
            rgba(255,255,255,0.08) 35%,
            rgba(255,255,255,0.04) 100%
          );
          transition: background 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .jw-f-ring:hover {
          transform: translateY(-6px);
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--accent) 85%, transparent) 0%,
            color-mix(in srgb, var(--accent) 25%, transparent) 45%,
            rgba(255,255,255,0.06) 100%
          );
        }

        .jw-f-card {
          background: rgba(12,15,18,0.4);
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
          box-shadow: 0 24px 48px -28px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: box-shadow 0.35s ease, background 0.35s ease;
        }
        .jw-f-ring:hover .jw-f-card {
          background: rgba(14,18,22,0.52);
          box-shadow: 0 30px 60px -24px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.09);
        }

        .jw-f-corner { position: absolute; width: 16px; height: 16px; opacity: 0; transition: opacity 0.35s ease; }
        .jw-f-corner-tl { top: 10px; left: 10px; border-top: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .jw-f-corner-br { bottom: 10px; right: 10px; border-bottom: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .jw-f-ring:hover .jw-f-corner { opacity: 0.85; }

        .jw-f-icon {
          border: 1.5px solid;
          background: color-mix(in srgb, var(--accent, currentColor) 12%, transparent);
        }

        .jw-f-underline {
          position: absolute;
          left: 50%;
          bottom: -3px;
          height: 2px;
          width: 28px;
          border-radius: 2px;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        .jw-f-ring:hover .jw-f-underline { width: 70%; }

        @media (max-width: 768px) {
          .bg-fixed { background-attachment: scroll; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jw-f-eyebrow-dot { animation: none; }
          .jw-f-rolling-text { animation: none; background-position: 0% 50%; }
          .jw-f-ring, .jw-f-card, .jw-f-corner, .jw-f-underline { transition: none; }
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
        <div className="max-w-5xl mx-auto px-6 grid gap-6 md:grid-cols-3 place-items-stretch">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              title={feature.title}
              tag={feature.tag}
              desc={feature.desc}
              color={feature.color}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
