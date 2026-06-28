import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Briefcase, Zap, Users, Search,
  ChevronRight, Send, Sparkles, X, CheckCircle
} from "lucide-react";

// ── Job Data ────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "Full Stack Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Coimbatore, TN",
    experience: "2–4 yrs",
    skills: ["React", "Node.js", "MongoDB", "REST API", "TypeScript", "Redux"],
    posted: "3 days ago",
    badge: "Hot",
    accent: "from-orange-500 to-red-500",
    accentSolid: "#f97316",
    dot: "#fb923c",
    desc: "Build scalable web applications end-to-end for enterprise clients across domains.",
    about: "We're looking for a Full Stack Developer who loves turning ideas into reliable, fast, and beautiful products. You'll work closely with our product and design teams to ship features that matter.",
    responsibilities: [
      "Develop and maintain full-stack web applications using React and Node.js",
      "Design and implement RESTful APIs and integrate third-party services",
      "Collaborate with UI/UX designers to translate wireframes into production code",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
    ],
    requirements: [
      "2–4 years of hands-on full-stack development experience",
      "Strong proficiency in React, Node.js, and MongoDB",
      "Familiarity with REST APIs, authentication patterns, and cloud deployments",
      "Good communication and team collaboration skills",
    ],
    perks: ["Remote Fridays", "Learning Budget ₹30k/yr", "Health Insurance", "Flexible Hours"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    experience: "1–3 yrs",
    skills: ["Figma", "Prototyping", "Design Systems", "Tailwind", "User Research"],
    posted: "1 week ago",
    badge: "New",
    accent: "from-purple-500 to-pink-500",
    accentSolid: "#a855f7",
    dot: "#c084fc",
    desc: "Craft intuitive interfaces and experiences for our SaaS products and client solutions.",
    about: "We need a designer who believes great UX is invisible. You'll own the end-to-end design process — from discovery and wireframes to polished, pixel-perfect handoffs.",
    responsibilities: [
      "Lead UX research, user interviews, and usability testing sessions",
      "Create wireframes, interactive prototypes, and final UI designs in Figma",
      "Maintain and evolve our design system across products",
      "Work closely with developers to ensure accurate implementation",
      "Translate complex workflows into simple, delightful experiences",
    ],
    requirements: [
      "1–3 years of product design experience",
      "Expert-level Figma skills with a strong portfolio",
      "Experience building and maintaining design systems",
      "Understanding of front-end constraints (HTML/CSS/Tailwind is a plus)",
    ],
    perks: ["Fully Remote", "Equipment Allowance ₹50k", "Health Insurance", "Creative Fridays"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    type: "Full-time",
    location: "Hybrid – Coimbatore",
    experience: "3–5 yrs",
    skills: ["AWS", "Docker", "CI/CD", "Terraform", "Kubernetes", "Linux"],
    posted: "2 days ago",
    badge: "Urgent",
    accent: "from-red-500 to-rose-600",
    accentSolid: "#ef4444",
    dot: "#f87171",
    desc: "Manage cloud infrastructure, automate deployments, and ensure 99.9% uptime.",
    about: "You'll be the backbone of our engineering organization — building the systems, pipelines, and tooling that let our dev teams ship confidently and fast.",
    responsibilities: [
      "Design and manage AWS cloud infrastructure using Terraform",
      "Build and maintain CI/CD pipelines for multiple product teams",
      "Monitor system health, respond to incidents, and drive post-mortems",
      "Containerize applications with Docker and orchestrate with Kubernetes",
      "Enforce security best practices and compliance standards",
    ],
    requirements: [
      "3–5 years of DevOps / SRE experience",
      "Deep knowledge of AWS services (EC2, ECS, RDS, S3, CloudWatch)",
      "Experience with Terraform, Docker, and Kubernetes",
      "Strong Linux administration and scripting skills",
    ],
    perks: ["On-call Allowance", "Certification Support", "Health Insurance", "Hybrid Model"],
  },
  {
    id: 4,
    title: "Business Development Executive",
    department: "Sales",
    type: "Full-time",
    location: "Coimbatore, TN",
    experience: "1–2 yrs",
    skills: ["Lead Generation", "CRM", "B2B Sales", "Communication", "Negotiation"],
    posted: "5 days ago",
    badge: null,
    accent: "from-teal-400 to-cyan-500",
    accentSolid: "#14b8a6",
    dot: "#2dd4bf",
    desc: "Drive new business, nurture client relationships, and expand our market presence.",
    about: "You'll be the face of JASWISYS to new clients — identifying opportunities, building relationships, and closing deals that fuel our growth.",
    responsibilities: [
      "Identify and qualify new business leads through research and outreach",
      "Manage the full sales cycle from prospecting to contract close",
      "Maintain and update CRM data accurately",
      "Collaborate with delivery teams to ensure smooth client onboarding",
      "Represent JASWISYS at industry events and networking sessions",
    ],
    requirements: [
      "1–2 years of B2B sales or business development experience",
      "Strong verbal and written communication skills in English and Tamil",
      "Familiarity with CRM tools (HubSpot, Zoho, or similar)",
      "Self-motivated with a results-driven attitude",
    ],
    perks: ["Uncapped Commission", "Travel Allowance", "Health Insurance", "Quarterly Bonuses"],
  },
  {
    id: 5,
    title: "Python / ML Engineer",
    department: "AI & Data",
    type: "Full-time",
    location: "Remote",
    experience: "2–4 yrs",
    skills: ["Python", "TensorFlow", "FastAPI", "SQL", "Pandas", "MLflow"],
    posted: "Today",
    badge: "Hot",
    accent: "from-green-400 to-emerald-500",
    accentSolid: "#22c55e",
    dot: "#4ade80",
    desc: "Design and deploy machine-learning pipelines and intelligent automation solutions.",
    about: "Help us build the AI layer that powers our next generation of IT automation products. You'll research, prototype, and productionize ML models that solve real enterprise problems.",
    responsibilities: [
      "Design and implement end-to-end ML pipelines from data prep to deployment",
      "Build and expose ML models via FastAPI microservices",
      "Collaborate with product teams to define AI-powered features",
      "Monitor model performance and retrain as needed",
      "Write clear technical documentation for models and APIs",
    ],
    requirements: [
      "2–4 years of ML engineering or data science experience",
      "Strong Python skills with TensorFlow or PyTorch",
      "Experience deploying models to production (Docker, cloud, MLflow)",
      "Solid understanding of SQL and data pipelines",
    ],
    perks: ["Fully Remote", "GPU Cloud Credits", "Conference Budget", "Health Insurance"],
  },
  {
    id: 6,
    title: "IT Support Specialist",
    department: "Support",
    type: "Contract",
    location: "Coimbatore, TN",
    experience: "0–2 yrs",
    skills: ["Networking", "Windows Server", "Troubleshooting", "ITIL", "Active Directory"],
    posted: "2 weeks ago",
    badge: null,
    accent: "from-blue-400 to-indigo-500",
    accentSolid: "#3b82f6",
    dot: "#60a5fa",
    desc: "Provide technical support to internal teams and client organisations on-site and remotely.",
    about: "You'll be the first line of support for our clients and internal teams — diagnosing issues fast, communicating clearly, and making tech frustrations disappear.",
    responsibilities: [
      "Respond to and resolve IT support tickets within SLA targets",
      "Install, configure, and maintain hardware and software systems",
      "Manage user accounts in Active Directory and Microsoft 365",
      "Document solutions in our internal knowledge base",
      "Escalate complex issues to senior engineers with full context",
    ],
    requirements: [
      "0–2 years of IT support or helpdesk experience",
      "Knowledge of Windows Server, networking basics, and Active Directory",
      "Familiarity with ITIL practices is a plus",
      "Patient, clear communicator with a service-first attitude",
    ],
    perks: ["Contract-to-Hire Path", "On-site Exposure", "Training Support", "Flexible Timings"],
  },
];

const DEPARTMENTS = ["All", ...new Set(JOBS.map((j) => j.department))];
const TYPES = ["All Types", "Full-time", "Contract"];

// ── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.5,
      op: Math.random() * 0.35 + 0.1,
      color: ["168,85,247", "99,102,241", "6,182,212", "167,139,250"][Math.floor(Math.random() * 4)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.op})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

// ── Apply Modal ──────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "#080914", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }} transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg,#6366f1,#06b6d4,#a78bfa)` }} />
        <div className="p-8">
          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Application Sent!</h3>
              <p className="text-white/50 text-sm mb-6">
                Thanks for applying to <span className="text-violet-400">{job.title}</span>. We'll be in touch within 5 business days.
              </p>
              <button onClick={onClose} className="px-6 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)" }}>Done</button>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-white/40 mt-1">{job.department} · {job.location}</p>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", type: "text", placeholder: "Ravi Kumar" },
                  { label: "Email Address", type: "email", placeholder: "ravi@example.com" },
                  { label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">{label}</label>
                    <input type={type} placeholder={placeholder} required
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none transition"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">Resume / Portfolio Link</label>
                  <input type="url" placeholder="https://your-resume.com"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none transition"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">Cover Note (optional)</label>
                  <textarea rows={3} placeholder="Tell us why you're a great fit…"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none transition resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                  />
                </div>
                <button onClick={() => setDone(true)}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 mt-1 hover:opacity-90 active:scale-[0.98] transition"
                  style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4,#a78bfa)" }}
                >
                  <Send size={14} /> Submit Application
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: "easeOut" }}
      onClick={onClick}
      className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 50%, ${job.accentSolid}12, transparent 70%)` }} />

      {/* Left accent bar */}
      <div className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-gradient-to-b ${job.accent} opacity-50 group-hover:opacity-100 transition-all duration-300`} />

      <div className="p-6 pl-7">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: job.dot }} />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{job.department}</span>
          </div>
          <div className="flex items-center gap-2">
            {job.badge && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${job.accent} uppercase tracking-wide`}>
                {job.badge}
              </span>
            )}
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{job.posted}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-violet-300 transition-colors duration-200">
          {job.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>{job.desc}</p>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { Icon: MapPin, val: job.location },
            { Icon: Clock, val: job.experience },
            { Icon: Briefcase, val: job.type },
          ].map(({ Icon, val }) => (
            <span key={val} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Icon size={10} /> {val}
            </span>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills.slice(0, 4).map((s) => (
            <span key={s} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium"
              style={{ color: job.accentSolid, background: `${job.accentSolid}18`, border: `1px solid ${job.accentSolid}30` }}>
              {s}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px]" style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)" }}>
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: job.accentSolid }}>
            View Details
          </span>
          <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Job Detail Page ───────────────────────────────────────────────────────────
function JobDetail({ job, onBack, onApply }) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen"
      style={{ background: "#060610" }}
    >
      <ParticleCanvas />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${job.accentSolid}18 0%, transparent 70%)`, filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm mb-10 hover:text-white transition-colors group"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Openings
        </motion.button>

        {/* Hero block */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${job.accentSolid}, transparent)` }} />

          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: job.dot }} />
                <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{job.department}</span>
                {job.badge && (
                  <span className={`ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${job.accent}`}>
                    {job.badge}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Posted {job.posted}</p>
            </div>
            <button
              onClick={() => onApply(job)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition"
              style={{ background: `linear-gradient(135deg, #6366f1, #06b6d4)`, boxShadow: `0 0 24px ${job.accentSolid}40` }}
            >
              <Send size={14} /> Apply Now
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: MapPin, val: job.location },
              { Icon: Clock, val: job.experience },
              { Icon: Briefcase, val: job.type },
            ].map(({ Icon, val }) => (
              <span key={val} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon size={12} /> {val}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: job.accentSolid }}>About the Role</h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{job.about}</p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: job.accentSolid }}>Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: job.accentSolid }} />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: job.accentSolid }}>Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((r, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: job.accentSolid }} />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ color: job.accentSolid, background: `${job.accentSolid}15`, border: `1px solid ${job.accentSolid}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Perks */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Perks</h2>
              <ul className="space-y-2.5">
                {job.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <Zap size={12} style={{ color: job.accentSolid }} /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: `${job.accentSolid}10`, border: `1px solid ${job.accentSolid}30` }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${job.accentSolid}18, transparent 70%)` }} />
              <Users size={24} className="mx-auto mb-3" style={{ color: job.accentSolid }} />
              <p className="text-sm font-semibold text-white mb-1">Ready to join us?</p>
              <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>We review every application personally.</p>
              <button onClick={() => onApply(job)}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition"
                style={{ background: `linear-gradient(135deg, #6366f1, #06b6d4)` }}>
                Apply Now →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Jobs Page ────────────────────────────────────────────────────────────
export default function JobsPage() {
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);   // detail view
  const [applyJob, setApplyJob] = useState(null);         // modal

  const filtered = JOBS.filter((j) => {
    const matchDept = dept === "All" || j.department === dept;
    const matchType = type === "All Types" || j.type === type;
    const q = search.toLowerCase();
    return matchDept && matchType &&
      (!q || j.title.toLowerCase().includes(q) || j.skills.some((s) => s.toLowerCase().includes(q)) || j.department.toLowerCase().includes(q));
  });

  // If a job is selected, show detail page
  if (selectedJob) {
    return (
      <>
        <AnimatePresence mode="wait">
          <JobDetail key={selectedJob.id} job={selectedJob} onBack={() => setSelectedJob(null)} onApply={setApplyJob} />
        </AnimatePresence>
        <AnimatePresence>
          {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#060610" }} aria-label="Careers">
        {/* Glows */}
        <div className="absolute w-[520px] h-[520px] rounded-full pointer-events-none top-[-120px] left-[-160px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute w-[420px] h-[420px] rounded-full pointer-events-none bottom-0 right-[-100px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <ParticleCanvas />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#a78bfa", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)" }}>
              <Sparkles size={11} /> We're Hiring
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Join{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#6366f1,#06b6d4,#a78bfa)" }}>
                JASWISYS Technologies
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
              Work with passionate professionals building next-gen IT solutions. Pick a role and grow with us.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles, skills…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              />
            </div>
            {[{ val: dept, set: setDept, opts: DEPARTMENTS }, { val: type, set: setType, opts: TYPES }].map((sel, i) => (
              <select key={i} value={sel.val} onChange={(e) => sel.set(e.target.value)}
                className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
              >
                {sel.opts.map((o) => <option key={o} value={o} style={{ background: "#0d0d1a" }}>{o}</option>)}
              </select>
            ))}
          </motion.div>

          {/* Count */}
          <motion.p key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.25)" }}>
            {filtered.length} opening{filtered.length !== 1 ? "s" : ""} found
          </motion.p>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.length ? (
                filtered.map((job, i) => (
                  <JobCard key={job.id} job={job} index={i} onClick={() => setSelectedJob(job)} />
                ))
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-20" style={{ color: "rgba(255,255,255,0.25)" }}>
                  <div className="text-5xl mb-3">🔎</div>
                  <p className="text-lg">No openings match your filters.</p>
                  <p className="text-sm mt-1">Try a different search or department.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-16 rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08), transparent 70%)" }} />
            <h2 className="text-2xl font-bold text-white mb-2">Don't see your role?</h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              We're always looking for talented people. Send your resume and we'll reach out when the right opportunity opens.
            </p>
            <a href="mailto:careers@jaswisys.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.03] transition"
              style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4,#a78bfa)" }}
            >
              <Send size={13} /> Send Open Application
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </>
  );
}
