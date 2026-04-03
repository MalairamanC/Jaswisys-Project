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
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Hero() {
  const videoRef = useRef(null);
  const glowTopRef = useRef(null);
  const glowBottomRef = useRef(null);
  const rafRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (videoRef.current) videoRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        if (glowTopRef.current) glowTopRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
        if (glowBottomRef.current) glowBottomRef.current.style.transform = `translate3d(0, ${y * -0.2}px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleScrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "mailto:contact@jaswisys.com";
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

      {/* Gradient Overlay (lighter for clarity) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20"
        aria-hidden="true"
      />

      {/* Parallax Glow Circles */}
      <div
        ref={glowTopRef}
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-500/30 blur-3xl rounded-full top-10 left-[-100px]"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={glowBottomRef}
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-blue-500/30 blur-3xl rounded-full bottom-10 right-[-100px]"
        style={{ willChange: "transform" }}
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
          className="inline-flex items-center gap-2 mb-6 px-6 py-2 text-sm rounded-xl
                     border border-transparent
                     bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),linear-gradient(to_right,#a855f7,#ec4899,#3b82f6)]
                     bg-origin-border bg-clip-padding bg-clip-border"
        >
          {[
            { label: "IT Solutions", color: "bg-purple-400" },
            { label: "Consulting", color: "bg-pink-400" },
            { label: "Outsourcing", color: "bg-blue-400" },
            { label: "Training", color: "bg-green-400" },
          ].map(({ label, color }, i) => (
            <span key={label} className="flex items-center gap-2 text-white font-medium text-xs uppercase">
              <span className={`${color} w-2 h-2 rounded-full animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
              {label}
              {i < 3 && <span className="w-px h-3 bg-white/20 mx-3" />}
            </span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
          Build Your Business with{" "}
          <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
            Jaswisys Technologies
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          variants={item}
          className="inline-block mb-8 px-6 py-3 text-base md:text-lg rounded-xl border-[2px] border-white/5 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] animate-gradient-x"
        >
          We deliver top-notch IT software services, backed by experienced professionals, to help businesses thrive.
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={item} className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleScrollToServices}
            className="px-6 py-3 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95 transition duration-300"
          >
            Explore Services →
          </button>
          <button
            onClick={handleContactClick}
            className="px-6 py-3 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95 transition duration-300"
          >
            Contact Us ↗
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 flex flex-col items-center text-gray-300 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="text-xl">↓</span>
      </div>
    </section>
  );
}

export default Hero;
