import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace these with your actual EmailJS info
  const SERVICE_ID = "service_2rb4as7";
  const TEMPLATE_ID = "template_8yh5o45";
  const PUBLIC_KEY = "vxgoAdH_AIciY17rZ";
  const TO_EMAIL = "info@jaswisys.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch(() => setError("Failed to send message. Please try again."))
      .finally(() => setLoading(false));
  };

  const CONTACT_ROWS = [
    {
      label: "Email",
      value: "info@jaswisys.com",
      href: "mailto:info@jaswisys.com",
      Icon: Mail,
      color: "#5EEAD4",
    },
    {
      label: "Phone",
      value: "+91 94420 05774",
      href: "tel:+919442005774",
      Icon: Phone,
      color: "#7C9CFF",
    },
  ];

  return (
    <section id="contact" className="relative py-28 bg-[#060708] px-4 md:px-6 overflow-hidden">
      <div className="jw-c-grain absolute inset-0 pointer-events-none" aria-hidden="true" />
      <span className="jw-c-corner jw-c-corner-tl" aria-hidden="true" />
      <span className="jw-c-corner jw-c-corner-tr" aria-hidden="true" />
      <span className="jw-c-corner jw-c-corner-bl" aria-hidden="true" />
      <span className="jw-c-corner jw-c-corner-br" aria-hidden="true" />
      <div className="jw-c-glow" style={{ background: "#5EEAD4", top: "-8%", left: "4%" }} aria-hidden="true" />
      <div className="jw-c-glow" style={{ background: "#FF8A3D", bottom: "-10%", right: "6%" }} aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

        .jw-mono { font-family: 'IBM Plex Mono', monospace; }
        .jw-display { font-family: 'Sora', sans-serif; }
        .jw-body { font-family: 'Inter', sans-serif; }

        .jw-c-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: overlay;
        }

        .jw-c-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.14;
          pointer-events: none;
          z-index: 0;
        }

        .jw-c-corner { position: absolute; width: 22px; height: 22px; z-index: 10; opacity: 0.4; }
        .jw-c-corner-tl { top: 24px; left: 24px; border-top: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-c-corner-tr { top: 24px; right: 24px; border-top: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }
        .jw-c-corner-bl { bottom: 24px; left: 24px; border-bottom: 1.5px solid #E9ECEF; border-left: 1.5px solid #E9ECEF; }
        .jw-c-corner-br { bottom: 24px; right: 24px; border-bottom: 1.5px solid #E9ECEF; border-right: 1.5px solid #E9ECEF; }

        @keyframes jwCPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .jw-c-eyebrow-dot { animation: jwCPulse 2.2s ease-in-out infinite; }

        @keyframes jwCRollingColour {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .jw-c-rolling-text {
          background-image: linear-gradient(100deg, #D7FF3F 0%, #5EEAD4 25%, #7C9CFF 50%, #FF8A3D 75%, #D7FF3F 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: jwCRollingColour 8s ease-in-out infinite;
        }

        .jw-c-panel {
          position: relative;
          border-radius: 1.25rem;
          padding: 1px;
          background: linear-gradient(160deg, rgba(94,234,212,0.35) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.04) 100%);
        }
        .jw-c-panel-inner {
          border-radius: 1.2rem;
          background: rgba(12,15,18,0.55);
          backdrop-filter: blur(20px) saturate(1.1);
          -webkit-backdrop-filter: blur(20px) saturate(1.1);
          box-shadow: 0 30px 70px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .jw-c-divider {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%);
        }

        .jw-c-row {
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .jw-c-row:hover {
          transform: translateX(3px);
        }

        .jw-c-icon-chip {
          border: 1.5px solid;
          transition: box-shadow 0.25s ease;
        }

        .jw-c-map-frame {
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        .jw-c-map-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .jw-c-field {
          width: 100%;
          background: rgba(9,11,13,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .jw-c-field::placeholder { color: rgba(230,233,238,0.4); }
        .jw-c-field:focus {
          outline: none;
          border-color: #5EEAD4;
          background: rgba(9,11,13,0.85);
          box-shadow: 0 0 0 3px rgba(94,234,212,0.14);
        }
        .jw-c-field:disabled { opacity: 0.6; cursor: not-allowed; }

        .jw-c-submit {
          box-shadow: 0 10px 30px -10px rgba(94,234,212,0.4);
          transition: box-shadow 0.25s ease, transform 0.2s ease, opacity 0.25s ease;
        }
        .jw-c-submit:not(:disabled):hover {
          box-shadow: 0 14px 36px -8px rgba(94,234,212,0.55);
          transform: translateY(-1px);
        }
        .jw-c-submit:active:not(:disabled) { transform: translateY(0); }

        .jw-c-status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 9999px; margin-right: 8px; flex-shrink: 0; }

        @media (prefers-reduced-motion: reduce) {
          .jw-c-eyebrow-dot { animation: none; }
          .jw-c-rolling-text { animation: none; background-position: 0% 50%; }
          .jw-c-row, .jw-c-field, .jw-c-submit { transition: none; }
        }
      `}</style>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-14">
          <div
            className="jw-mono inline-flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ color: "rgba(230,233,238,0.6)" }}
          >
            <span
              className="jw-c-eyebrow-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#5EEAD4", boxShadow: "0 0 6px #5EEAD4" }}
              aria-hidden="true"
            />
            Let's Talk
          </div>
          <h2 className="jw-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact <span className="jw-c-rolling-text font-extrabold">Us</span>
          </h2>
          <p className="jw-body mt-4 max-w-xl mx-auto text-sm sm:text-base font-light" style={{ color: "rgba(230,233,238,0.62)" }}>
            Have a project idea or looking to collaborate? Reach out — we'd love to hear from you.
          </p>
        </motion.div>

        <motion.div variants={item} className="jw-c-panel">
          <div className="jw-c-panel-inner p-6 md:p-10 grid md:grid-cols-2 gap-10">
            {/* Left - Contact Info + Map */}
            <div className="text-white space-y-6">
              <div className="space-y-3">
                {CONTACT_ROWS.map(({ label, value, href, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="jw-c-row flex items-center gap-4 rounded-xl p-3 border border-transparent hover:border-white/10"
                  >
                    <span
                      className="jw-c-icon-chip w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ color, borderColor: `${color}55`, background: `${color}14` }}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex flex-col">
                      <span className="jw-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: `${color}CC` }}>
                        {label}
                      </span>
                      <span className="jw-body text-sm text-white/90">{value}</span>
                    </span>
                  </a>
                ))}

                <div className="jw-c-row flex items-start gap-4 rounded-xl p-3">
                  <span
                    className="jw-c-icon-chip w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ color: "#FF8A3D", borderColor: "#FF8A3D55", background: "#FF8A3D14" }}
                  >
                    <MapPin size={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="jw-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#FF8A3DCC" }}>
                      Studio
                    </span>
                    <span className="jw-display text-sm font-semibold text-white/90">Jaswisys Technologies Pvt Ltd</span>
                    <span className="jw-body text-xs mt-1 leading-relaxed" style={{ color: "rgba(230,233,238,0.55)" }}>
                      No.1/4/2, RS Towers, 2nd Floor, New Natham Highway, Oomachikulam, Madurai, Tamil Nadu, India
                    </span>
                  </span>
                </div>
              </div>

              <div className="jw-c-divider" />

              <div className="jw-c-map-frame w-full h-56 rounded-xl overflow-hidden">
                <iframe
                  title="Jaswisys Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.123456789!2d78.119!3d9.925!2m3!1f0!2f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c123456789%3A0xabcdef123456789!2sMadurai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.4) invert(0.92) contrast(0.9)" }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right - Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="jw-mono block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "rgba(230,233,238,0.45)" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="jw-c-field"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  aria-required="true"
                />
              </div>

              <div>
                <label className="jw-mono block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "rgba(230,233,238,0.45)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="jw-c-field"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  aria-required="true"
                />
              </div>

              <div>
                <label className="jw-mono block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "rgba(230,233,238,0.45)" }}>
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Tell us about your project"
                  className="jw-c-field resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  aria-required="true"
                />
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="jw-mono text-xs flex items-center justify-center"
                    style={{ color: "#FF8A3D" }}
                  >
                    <span className="jw-c-status-dot" style={{ background: "#FF8A3D" }} />
                    {error}
                  </motion.p>
                )}
                {submitted && (
                  <motion.p
                    key="submitted"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="jw-mono text-xs flex items-center justify-center"
                    style={{ color: "#5EEAD4" }}
                  >
                    <span className="jw-c-status-dot" style={{ background: "#5EEAD4" }} />
                    Message sent — we'll be in touch soon.
                  </motion.p>
                )}
                {loading && (
                  <motion.p
                    key="loading"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="jw-mono text-xs flex items-center justify-center"
                    style={{ color: "#7C9CFF" }}
                  >
                    <span className="jw-c-status-dot" style={{ background: "#7C9CFF" }} />
                    Sending...
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className={`jw-c-submit jw-display w-full py-3.5 rounded-full font-semibold text-sm tracking-wide flex items-center justify-center gap-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{ background: "#5EEAD4", color: "#0A0F14" }}
                aria-label="Send contact message"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <ArrowUpRight size={16} />}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
