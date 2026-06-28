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
  "rgba(192,90,255,VAL)",
  "rgba(244,80,170,VAL)",
  "rgba(56,145,255,VAL)",
  "rgba(52,220,170,VAL)",
  "rgba(255,160,60,VAL)",
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
        className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-black/25"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      <div
        ref={glowTopRef}
        className="absolute w-[520px] h-[520px] rounded-full top-[-60px] left-[-140px]"
        style={{
          willChange: "transform",
          zIndex: 2,
          background:
            "radial-gradient(circle, rgba(168,60,255,0.38) 0%, rgba(120,30,220,0.15) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "glowPulse 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div
        ref={glowMidRef}
        className="absolute w-[360px] h-[360px] rounded-full"
        style={{
          willChange: "transform",
          zIndex: 2,
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(52,211,180,0.22) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "glowPulse 8s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />

      <div
        ref={glowBottomRef}
        className="absolute w-[520px] h-[520px] rounded-full bottom-[-60px] right-[-140px]"
        style={{
          willChange: "transform",
          zIndex: 2,
          background:
            "radial-gradient(circle, rgba(56,130,255,0.35) 0%, rgba(20,80,220,0.12) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "glowPulse 7s ease-in-out infinite 1s",
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-5xl"
      >
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
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl"
              style={{
                background:
                  "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)) padding-box, linear-gradient(135deg, #a855f7, #ec4899, #3b82f6) border-box",
                border: "1.5px solid transparent",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className={`${color} w-2 h-2 rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <span className="text-white font-medium text-xs uppercase tracking-widest whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-6"
        >
          Build Your Business with{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #34d399, #22d3ee, #60a5fa, #a78bfa)",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Jaswisys Technologies
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="w-full max-w-2xl mx-auto mb-8 px-6 py-3 text-base md:text-lg text-white/80 leading-relaxed"
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
            className="relative px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:scale-[1.05] active:scale-[0.97] transition-transform duration-200"
            style={{
              background:
                "linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #a855f7, #06b6d4, #3b82f6) border-box",
              border: "2px solid transparent",
              boxShadow: "0 0 24px rgba(168,85,247,0.25)",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-blue-400 bg-clip-text text-transparent font-semibold">
              Explore Services
            </span>
          </button>

          <button
            onClick={handleContactClick}
            className="relative px-8 py-3 rounded-xl text-sm font-semibold tracking-wide hover:scale-[1.05] active:scale-[0.97] transition-transform duration-200"
            style={{
              background:
                "linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #f59e0b, #ef4444, #ec4899) border-box",
              border: "2px solid transparent",
              boxShadow: "0 0 24px rgba(245,158,11,0.2)",
            }}
          >
            <span className="bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              Contact Us
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase text-white/60">
          Scroll
        </span>

        <div
          className="relative w-7 h-11 rounded-full p-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #a855f7, #ec4899, #22d3ee, #34d399)",
            boxShadow:
              "0 0 18px rgba(236,72,153,0.45), 0 0 28px rgba(34,211,238,0.35)",
          }}
        >
          <div className="relative w-full h-full rounded-full bg-black/70 backdrop-blur-sm">
            <motion.span
              className="absolute left-1/2 top-2 w-1.5 h-1.5 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff, #22d3ee, #ec4899)",
                boxShadow: "0 0 12px rgba(34,211,238,0.9)",
              }}
              animate={{ y: [0, 17, 0], opacity: [1, 0.35, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
