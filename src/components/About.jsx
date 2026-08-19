import { useState, useEffect, useRef } from "react";
import aboutImg from "../assets/aboutBg.png";
import AboutVideo from "../assets/About.mp4";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ── Aurora blob (signature element) ── */
function AuroraBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #4F46E5 0%, #06B6D4 50%, transparent 80%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, #EC4899 50%, transparent 80%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

/* ── Magnetic tilt card ── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 14);
    y.set(-((e.clientY - cy) / rect.height) * 14);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ── Animated word reveal ── */
function RevealWords({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Glowing stat chips ── */
function StatChip({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "backOut" }}
      className="flex flex-col items-center px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      style={{ boxShadow: "0 0 20px rgba(79,70,229,0.15)" }}
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
        {value}
      </span>
      <span className="text-xs text-white/50 mt-1 tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

/* ── Floating particles for modal ── */
function Particles() {
  const count = 18;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ── */
function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      <section
        id="About"
        ref={sectionRef}
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050B18 0%, #0D1526 50%, #07101F 100%)" }}
      >
        <AuroraBlob />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-14 justify-center md:justify-start"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase font-medium">
              Who We Are
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* ── Image (left) ── */}
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Glow ring */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-60 blur-xl"
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #06B6D4, #A78BFA)",
                  }}
                />
                <img
                  src={aboutImg}
                  alt="About JASWISYS"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                  style={{ transform: "translateZ(30px)" }}
                />

                {/* Corner accent */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl border border-indigo-500/30"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-xl border border-cyan-500/30"
                  animate={{ rotate: [0, -5, 0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </TiltCard>

            {/* ── Content (right) ── */}
            <div className="flex flex-col gap-7">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  About Our{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    JASWISYS
                  </span>
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/60 leading-relaxed text-[1.05rem]"
              >
                At{" "}
                <span className="text-white font-semibold">JASWISYS Technologies</span>, we
                provide IT software services backed by extensive experience. Our team
                specializes in IT Support, Consulting, Placement, and Training — delivering
                comprehensive solutions tailored to your business needs.
              </motion.p>

              {/* Stats row */}
              <div className="flex gap-4 flex-wrap mt-1">
                <StatChip value="2" label="Years" delay={0.6} />
                <StatChip value="5+" label="Clients" delay={0.7} />
                <StatChip value="99%" label="Satisfaction" delay={0.8} />
              </div>

              {/* CTA button — centered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-2 flex justify-center"
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                    boxShadow: "0 0 30px rgba(79,70,229,0.4)",
                  }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Read More</span>
                  <ArrowRight
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
                    size={18}
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-Screen Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden"
          >
            {/* ── VIDEO BACKGROUND (full visibility) ── */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay loop muted playsInline
            >
              <source src={AboutVideo} type="video/mp4" />
            </video>

            {/* Gradient overlay — light tint only, video stays clear */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(5,11,24,0.38)" }}
            />

            {/* ── CLOSE BUTTON (top-right, always visible) ── */}
            <div className="relative z-20 flex justify-end p-6">
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.35, ease: "backOut" }}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* ── SCROLLABLE CONTENT ── */}
            <div className="relative z-10 flex-1 overflow-y-auto">
              <div className="min-h-full flex items-center justify-center px-6 py-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  className="w-full max-w-4xl"
                >
                  {/* Eyebrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="flex items-center gap-2 mb-8"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase font-medium">
                      Our Story
                    </span>
                    <div className="h-px w-20 bg-gradient-to-r from-cyan-400/60 to-transparent" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-5xl md:text-6xl font-bold mb-10 leading-tight"
                  >
                    <span className="text-white">About{" "}</span>
                    <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                      JASWISYS
                    </span>
                  </motion.h3>

                  {/* Two-column text layout on md+ */}
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {[
                      {
                        heading: "Who We Are",
                        body: "We provide IT software services backed by extensive experience. Our team specializes in IT Support, Consulting, Placement, and Training, delivering comprehensive solutions tailored to your business needs.",
                      },
                      {
                        heading: "How We Work",
                        body: "We partner with organizations to streamline operations, enhance efficiency, and implement enterprise-grade security architectures. Our approach combines technical expertise, industry insight, and proven methodologies.",
                      },
                      {
                        heading: "What We Offer",
                        body: "We empower teams through hands-on training, flexible staffing solutions, and strategic IT consulting. By understanding each client's unique challenges, we design solutions that drive growth and reduce operational risk.",
                      },
                      {
                        heading: "Our Promise",
                        body: "We believe in long-term partnerships—supporting businesses not just with technology, but with insights, guidance, and solutions that enable sustainable success.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.06, duration: 0.28 }}
                        className="rounded-2xl p-6"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <h4 className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-3">
                          {item.heading}
                        </h4>
                        <p className="text-white/75 leading-relaxed text-[0.97rem]">{item.body}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.28 }}
                    className="flex gap-4 flex-wrap"
                  >
                    {[
                      { value: "2", label: "Years of Experience" },
                      { value: "5+", label: "Clients Served" },
                      { value: "99%", label: "Satisfaction Rate" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex-1 min-w-[120px] text-center px-6 py-5 rounded-2xl"
                        style={{
                          background: "rgba(79,70,229,0.15)",
                          border: "1px solid rgba(79,70,229,0.3)",
                          backdropFilter: "blur(12px)",
                          boxShadow: "0 0 30px rgba(79,70,229,0.1)",
                        }}
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                          {s.value}
                        </div>
                        <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
              style={{ background: "linear-gradient(to top, rgba(5,11,24,0.5), transparent)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default About;
