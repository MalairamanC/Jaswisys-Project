import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/Video1.mp4";

// Motion variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Particle config
const PARTICLE_COUNT = 80;
const PARTICLE_COLORS = [
  "rgba(168,85,247,VAL)",   // purple-500
  "rgba(236,72,153,VAL)",   // pink-500
  "rgba(59,130,246,VAL)",   // blue-500
  "rgba(52,211,153,VAL)",   // teal-400
];

function Hero() {
  const videoRef = useRef(null);
  const glowTopRef = useRef(null);
  const glowBottomRef = useRef(null);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  // ── Particle animation ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialise particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };
    initParticles();

    const CONNECTION_DISTANCE = 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("VAL", p.opacity);
        ctx.fill();

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(168,130,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Parallax on scroll ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (videoRef.current)
          videoRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;

        if (glowTopRef.current)
          glowTopRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;

        if (glowBottomRef.current)
          glowBottomRef.current.style.transform = `translate3d(0, ${y * -0.2}px, 0)`;
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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      aria-label="Hero"
      role="region"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-100"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20"
        aria-hidden="true"
      />

      {/* ── Particle Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Glow Effects */}
      <div
        ref={glowTopRef}
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-500/30 blur-3xl rounded-full top-10 left-[-100px]"
        style={{ willChange: "transform", zIndex: 2 }}
        aria-hidden="true"
      />

      <div
        ref={glowBottomRef}
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-blue-500/30 blur-3xl rounded-full bottom-10 right-[-100px]"
        style={{ willChange: "transform", zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-5xl"
      >
        {/* Top Badge */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {[
            { label: "IT Solutions", color: "bg-purple-400" },
            { label: "Consulting", color: "bg-pink-400" },
            { label: "Outsourcing", color: "bg-blue-400" },
            { label: "Training", color: "bg-green-400" },
          ].map(({ label, color }, i) => (
            <div
              key={label}
              className="
                inline-flex items-center gap-2
                px-6 py-2
                rounded-xl
                border border-transparent
                bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),linear-gradient(to_right,#a855f7,#ec4899,#3b82f6)]
                bg-origin-border
                bg-clip-padding
                bg-clip-border
              "
            >
              <span
                className={`${color} w-2 h-2 rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <span className="text-white font-medium text-xs uppercase whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6"
        >
          Build Your Business with{" "}
          <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
            Jaswisys Technologies
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          variants={item}
          className="w-full max-w-[95%] sm:max-w-3xl mx-auto mb-8 px-6 sm:px-6 py-3 text-sm text-base md:text-lg rounded-xl border-[2px] border-white/5 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] animate-gradient-x"
        >
          We deliver top-notch IT software services, backed by experienced
          professionals, to help businesses thrive.
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Explore Services — pill shape, purple → teal gradient outline */}
          <button
            onClick={handleScrollToServices}
            className="
              relative px-8 py-3
              rounded-full
              text-white font-semibold text-sm tracking-wide
              hover:scale-[1.04] active:scale-[0.98]
              transition duration-300
            "
            style={{
              background: "linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #a855f7, #06b6d4, #3b82f6) border-box",
              border: "2px solid transparent",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-blue-400 bg-clip-text text-transparent font-semibold">
              Explore Services
            </span>
          </button>

          {/* Contact Us — rounded rectangle, amber → rose gradient outline */}
          <button
            onClick={handleContactClick}
            className="
              relative px-8 py-3
              rounded-xl
              text-white font-semibold text-sm tracking-wide
              hover:scale-[1.04] active:scale-[0.98]
              transition duration-300
            "
            style={{
              background: "linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #f59e0b, #ef4444, #ec4899) border-box",
              border: "2px solid transparent",
            }}
          >
            <span className="bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              Contact Us
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center text-gray-300 animate-bounce" style={{ zIndex: 10 }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="text-xl">↓</span>
      </div>
    </section>
  );
}

export default Hero;
