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
const PARTICLE_COUNT = 90;
const PARTICLE_COLORS = [
  "rgba(94,234,212,VAL)",
  "rgba(255,138,61,VAL)",
  "rgba(139,110,255,VAL)",
];

const MOUSE_REPEL_RADIUS = 140;
const MOUSE_REPEL_STRENGTH = 2.8;

function Hero() {
  const videoRef = useRef(null);
  const glowTopRef = useRef(null);
  const glowMidRef = useRef(null);
  const glowBottomRef = useRef(null);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });

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

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.tx = -9999;
      mouseRef.current.ty = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      bvx: 0,
      bvy: 0,
      radius: Math.random() * 2.2 + 0.9,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.55 + 0.25,
    }));

    particlesRef.current.forEach((p) => {
      p.bvx = p.vx;
      p.bvy = p.vy;
    });

    const CONNECTION_DISTANCE = 125;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const m = mouseRef.current;

      m.x += (m.tx - m.x) * 0.1;
      m.y += (m.ty - m.y) * 0.1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dxm = p.x - m.x;
        const dym = p.y - m.y;
        const distM = Math.sqrt(dxm * dxm + dym * dym);

        if (distM < MOUSE_REPEL_RADIUS && distM > 0) {
          const force = (1 - distM / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
          p.vx = p.bvx + (dxm / distM) * force;
          p.vy = p.bvy + (dym / distM) * force;
        } else {
          p.vx += (p.bvx - p.vx) * 0.06;
          p.vy += (p.bvy - p.vy) * 0.06;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const grd = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 3,
        );

        grd.addColorStop(0, p.color.replace("VAL", p.opacity));
        grd.addColorStop(1, p.color.replace("VAL", 0));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("VAL", Math.min(p.opacity + 0.3, 1));
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.22;
            const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);

            grad.addColorStop(0, p.color.replace("VAL", alpha));
            grad.addColorStop(1, q.color.replace("VAL", alpha));

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (videoRef.current) {
          videoRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        }

        if (glowTopRef.current) {
          glowTopRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
        }

        if (glowMidRef.current) {
          glowMidRef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
        }

        if (glowBottomRef.current) {
          glowBottomRef.current.style.transform = `translate3d(0, ${y * -0.2}px, 0)`;
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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
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
        className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-100"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/5 to-black/15"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="jw-grain absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} aria-hidden="true" />

      <div
        ref={glowTopRef}
        className="absolute w-[560px] h-[560px] rounded-full top-[-80px] left-[-160px]"
        style={{
          willChange: "transform",
          zIndex: 2,
          background:
            "radial-gradient(circle, rgba(139,110,255,0.28) 0%, rgba(139,110,255,0.1) 50%, transparent 75%)",
          filter: "blur(70px)",
          animation: "glowPulse 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div
        ref={glowMidRef}
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{
          willChange: "transform",
          zIndex: 2,
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(94,234,212,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "glowPulse 8s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />

      <div
        ref={glowBottomRef}
        className="absolute w-[560px] h-[560px] rounded-full bottom-[-80px] right-[-160px]"
        style={{
          willChange: "transform",
          zIndex: 2,
          background:
            "radial-gradient(circle, rgba(255,138,61,0.22) 0%, rgba(255,138,61,0.08) 50%, transparent 75%)",
          filter: "blur(70px)",
          animation: "glowPulse 7s ease-in-out infinite 1s",
        }}
        aria-hidden="true"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        @keyframes glowPulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .jw-mono { font-family: 'JetBrains Mono', monospace; }
        .jw-display { font-family: 'Space Grotesk', sans-serif; }

        .jw-tag {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .jw-tag:hover {
          transform: translateY(-2px);
          border-color: rgba(94,234,212,0.6) !important;
          background: rgba(23,35,45,0.8) !important;
        }

        .jw-glass {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012));
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(14px);
          box-shadow: 0 30px 90px -20px rgba(0,0,0,0.65), 0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .jw-glass::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(120deg, rgba(94,234,212,0.5), rgba(139,110,255,0.15) 35%, rgba(255,138,61,0.4) 70%, rgba(94,234,212,0.5));
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderFlow 10s linear infinite;
          pointer-events: none;
          opacity: 0.7;
        }

        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .jw-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.05;
          mix-blend-mode: overlay;
        }

        .jw-btn-primary {
          box-shadow: 0 8px 30px -6px rgba(94,234,212,0.5);
        }
        .jw-btn-primary:hover {
          box-shadow: 0 10px 40px -6px rgba(94,234,212,0.75);
        }
        .jw-btn-secondary:hover {
          background: rgba(255,138,61,0.1) !important;
          box-shadow: 0 8px 30px -8px rgba(255,138,61,0.4);
        }
        .jw-icon-circle {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }
        .jw-btn-primary:hover .jw-icon-circle {
          transform: translateX(3px);
        }
      `}</style>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        <div className="jw-glass rounded-[32px] px-6 pt-14 pb-10 sm:px-14 sm:pt-16 sm:pb-12 text-center">
          <motion.p
            variants={item}
            className="jw-mono text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ color: "#5EEAD4" }}
          >
            Systems that scale with you
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {[
              { label: "IT Solutions", dot: "#5EEAD4" },
              { label: "Consulting", dot: "#8B6EFF" },
              { label: "Outsourcing", dot: "#FF8A3D" },
              { label: "Training", dot: "#60D6FF" },
            ].map(({ label, dot }) => (
              <div
                key={label}
                className="jw-tag jw-mono inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-widest"
                style={{
                  color: "#5EEAD4",
                  background: "rgba(10,15,20,0.75)",
                  border: "1px solid rgba(94,234,212,0.4)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: dot, boxShadow: `0 0 6px ${dot}` }}
                  aria-hidden="true"
                />
                {label}
              </div>
            ))}
          </motion.div>

          <motion.h1
            variants={item}
            className="jw-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
          >
            Build Your Business with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #5EEAD4, #34d399, #8B6EFF, #FF8A3D)",
                backgroundSize: "200% auto",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Jaswisys Technologies
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="w-full max-w-2xl mx-auto mb-10 text-base md:text-lg text-white/70 leading-relaxed font-light"
          >
            We deliver top-notch IT software services, backed by experienced
            professionals, to help businesses thrive.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={handleScrollToServices}
              className="jw-display jw-btn-primary inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "#5EEAD4", color: "#0A0F14" }}
            >
              Explore Services
              <span className="jw-icon-circle" style={{ background: "#0A0F14", color: "#5EEAD4" }} aria-hidden="true">
                →
              </span>
            </button>

            <button
              onClick={handleContactClick}
              className="jw-display jw-btn-secondary inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "transparent", color: "#FF8A3D", border: "1.5px solid #FF8A3D" }}
            >
              Contact Us
              <span className="jw-icon-circle" style={{ border: "1.5px solid #FF8A3D", color: "#FF8A3D" }} aria-hidden="true">
                ↗
              </span>
            </button>
          </motion.div>

          {/* Scroll indicator — now inside the glass panel */}
          <motion.div
            variants={item}
            className="jw-mono flex items-center justify-center gap-2 text-[11px] tracking-widest uppercase mt-10"
            style={{ color: "#8B98A5" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#5EEAD4", boxShadow: "0 0 8px rgba(94,234,212,0.9)" }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            Scroll to explore
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
