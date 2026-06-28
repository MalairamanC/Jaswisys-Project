import { useState, useEffect, useRef } from "react";
import ServicesVideo from "../assets/ServicesBg.mp4";
import supportImg from "../assets/support.png";
import consultingImg from "../assets/consulting.png";
import outsourcingImg from "../assets/outsourcing.png";
import trainingImg from "../assets/training.png";

const services = [
  {
    title: "Support",
    tag: "AMS & IT Ops",
    number: "01",
    description:
      "Seamless IT support combining structured processes with hands-on expertise across high-demand technologies.",
    fullInfo:
      "Jaswisys has a committed team delivering high-quality SAP support (AMS), including help desk services, performance tuning, and custom development. We analyze systems and mitigate risks associated with critical upgrades, ensuring minimal disruption to your organization.",
    image: supportImg,
    color: "#7c6af7",
    rgb: "124,106,247",
  },
  {
    title: "Consulting",
    tag: "HR & IT Strategy",
    number: "02",
    description:
      "Expert advisory in recruitment, HR processes, IT optimization, and BPO operations to accelerate growth.",
    fullInfo:
      "Jaswisys helps organizations improve recruitment processes across IT, BPO, Finance and HR sectors. Contract to Hire (C2H), One-time Placement, Part-time fulfillment, and Work-package models provide expert guidance tailored to your goals.",
    image: consultingImg,
    color: "#22c9a0",
    rgb: "34,201,160",
  },
  {
    title: "Outsourcing",
    tag: "Staffing & Scale",
    number: "03",
    description:
      "Flexible staffing, SAP consultancy, and end-to-end startup support — scale on demand.",
    fullInfo:
      "We specialize in sourcing top-tier IT professionals for staff augmentation, training, and project-based engagements. Flexible resourcing models including hybrid teams ensure the right talent at the right time. Business process consulting reduces costs and transforms operations.",
    image: outsourcingImg,
    color: "#f4a23a",
    rgb: "244,162,58",
  },
  {
    title: "Training",
    tag: "Upskill & Certify",
    number: "04",
    description:
      "Tailored SAP, cloud, and emerging-tech programs to continuously upskill teams and drive performance.",
    fullInfo:
      "Jaswisys Tech provides comprehensive training in SAP technologies and cloud solutions. We take a holistic approach to assessing training needs and develop programs aligned with company objectives and individual career development for lasting organizational growth.",
    image: trainingImg,
    color: "#3ab8f4",
    rgb: "58,184,244",
  },
];

const ICONS = [
  <svg key="s" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 20, height: 20 }}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    <path d="M12 8v4l3 3" strokeLinecap="round" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 20, height: 20 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
  </svg>,
  <svg key="o" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 20, height: 20 }}>
    <polyline points="16 3 21 3 21 8" /><polyline points="4 20 9 15" /><line x1="21" y1="3" x2="14" y2="10" />
    <polyline points="8 3 3 3 3 8" /><line x1="3" y1="3" x2="10" y2="10" />
    <polyline points="16 21 21 21 21 16" />
  </svg>,
  <svg key="t" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 20, height: 20 }}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" strokeLinejoin="round" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeLinejoin="round" />
  </svg>,
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Card({ service, index, icon, onClick }) {
  const ref = useRef();
  const visible = useInView(ref);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={onMove}
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        cursor: "pointer",
        transform: visible
          ? hov ? "translateY(-6px) scale(1.013)" : "translateY(0) scale(1)"
          : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.45s cubic-bezier(.22,.68,0,1.2), opacity 0.55s ease ${index * 0.1}s, box-shadow 0.35s`,
        boxShadow: hov
          ? `0 24px 70px rgba(${service.rgb},0.22), 0 0 0 1px rgba(${service.rgb},0.35)`
          : "0 4px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        minHeight: 340,
        background: "#08090f",
      }}
    >
      {/* ── Image area (top ~45% of card) ── */}
      <div style={{
        position: "relative",
        height: 180,
        flexShrink: 0,
        overflow: "hidden",
      }}>
        {/* Image */}
        <img
          src={service.image}
          alt={service.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(.22,.68,0,1.2)",
            display: "block",
          }}
        />
        {/* Gradient overlay fading image into card body */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(8,9,15,0.1) 0%,
            rgba(8,9,15,0.0) 40%,
            rgba(8,9,15,0.65) 80%,
            rgba(8,9,15,1) 100%
          )`,
        }} />
        {/* Colored tint on hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `rgba(${service.rgb},0.12)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s",
          mixBlendMode: "screen",
        }} />
        {/* Number badge — top left */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 16,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          color: "rgba(255,255,255,0.5)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 100,
          padding: "0.2rem 0.6rem",
        }}>{service.number}</div>
        {/* Tag pill — top right */}
        <div style={{
          position: "absolute",
          top: 14,
          right: 16,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: service.color,
          background: `rgba(${service.rgb},0.18)`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid rgba(${service.rgb},0.3)`,
          borderRadius: 100,
          padding: "0.2rem 0.65rem",
        }}>{service.tag}</div>
      </div>

      {/* ── Card body ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "1.4rem 1.6rem 1.6rem",
        gap: "0.85rem",
        background: hov
          ? `radial-gradient(280px circle at ${pos.x}% ${(pos.y - 50) * 0.6 + 50}%, rgba(${service.rgb},0.1) 0%, #08090f 65%)`
          : "#08090f",
        transition: "background 0.35s",
      }}>
        {/* Icon + Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: `rgba(${service.rgb},0.14)`,
            border: `1px solid rgba(${service.rgb},0.28)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.color,
            flexShrink: 0,
            transform: hov ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2)",
          }}>
            {icon}
          </div>
          <h3 style={{
            margin: 0,
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}>{service.title}</h3>
        </div>

        {/* Description */}
        <p style={{
          margin: 0,
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.75,
          flex: 1,
        }}>{service.description}</p>

        {/* CTA row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0.75rem",
          borderTop: `1px solid rgba(255,255,255,${hov ? 0.08 : 0.04})`,
          transition: "border-color 0.3s",
        }}>
          <span style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: service.color,
            opacity: hov ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}>Learn more</span>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `rgba(${service.rgb},${hov ? 0.2 : 0.08})`,
            border: `1px solid rgba(${service.rgb},${hov ? 0.45 : 0.2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.color,
            transform: hov ? "translateX(3px)" : "translateX(0)",
            transition: "all 0.3s",
          }}>
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom colored glow line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "8%",
        right: "8%",
        height: 1.5,
        background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        opacity: hov ? 0.7 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Spotlight follow on body */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(250px circle at ${pos.x}% ${pos.y}%, rgba(${service.rgb},0.06), transparent 70%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />
    </div>
  );
}

function Modal({ service, icon, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 10);
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        background: `rgba(2,3,12,${mounted ? 0.9 : 0})`,
        backdropFilter: mounted ? "blur(18px)" : "blur(0px)",
        WebkitBackdropFilter: mounted ? "blur(18px)" : "blur(0px)",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div style={{
        position: "relative",
        background: "#09090f",
        border: `1px solid rgba(${service.rgb},0.28)`,
        borderRadius: 26,
        maxWidth: 560,
        width: "100%",
        overflow: "hidden",
        transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        opacity: mounted ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2), opacity 0.3s",
        boxShadow: `0 40px 100px rgba(${service.rgb},0.2), 0 0 0 1px rgba(${service.rgb},0.15)`,
      }}>
        {/* Image header */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img
            src={service.image}
            alt={service.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, rgba(9,9,15,0.2) 0%, rgba(9,9,15,0.0) 40%, rgba(9,9,15,0.85) 100%)`,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `rgba(${service.rgb},0.15)`,
            mixBlendMode: "screen",
          }} />
          {/* Floating title over image */}
          <div style={{
            position: "absolute", bottom: 18, left: 22,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `rgba(${service.rgb},0.2)`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: `1px solid rgba(${service.rgb},0.35)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: service.color,
            }}>{icon}</div>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: service.color,
                marginBottom: 3,
              }}>{service.tag}</div>
              <h3 style={{
                margin: 0, fontSize: "1.5rem", fontWeight: 800,
                color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1,
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}>{service.title}</h3>
            </div>
          </div>
          {/* Close button */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.8rem 2.2rem 2.2rem" }}>
          {/* Colored divider */}
          <div style={{
            height: 2, borderRadius: 2, marginBottom: "1.5rem",
            background: `linear-gradient(90deg, ${service.color}, rgba(${service.rgb},0.1))`,
          }} />

          <p style={{
            margin: "0 0 2rem",
            fontSize: "0.93rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.85,
          }}>{service.fullInfo}</p>

          <a
            href="mailto:info@jaswisys.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.8rem 1.8rem",
              borderRadius: 100,
              background: `linear-gradient(135deg, ${service.color}, rgba(${service.rgb},0.55))`,
              color: "#fff", fontWeight: 700, fontSize: "0.88rem",
              textDecoration: "none", letterSpacing: "0.02em",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Enquire now
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [modal, setModal] = useState(null);
  const titleRef = useRef();
  const titleVisible = useInView(titleRef);

  return (
    <section style={{
      position: "relative",
      padding: "7rem 0 8rem",
      overflow: "hidden",
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    }}>
      {/* ── Background video ── */}
      <video
        autoPlay loop muted playsInline
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={ServicesVideo} type="video/mp4" />
      </video>
      {/* Dark overlay on video */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(4,5,15,0.82)",
      }} />
      {/* Subtle dot-grid over video */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        backgroundImage: `
          radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 100%)",
      }} />
      {/* Ambient color orbs */}
      <div style={{
        position: "absolute", top: -180, left: -120, zIndex: 2,
        width: 650, height: 650,
        background: "radial-gradient(circle, rgba(124,106,247,0.12), transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -120, right: -80, zIndex: 2,
        width: 550, height: 550,
        background: "radial-gradient(circle, rgba(34,201,160,0.09), transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1160, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "4.5rem",
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            opacity: titleVisible ? 1 : 0,
            transition: "transform 0.6s cubic-bezier(.22,.68,0,1.2), opacity 0.6s ease",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: "1.4rem",
            padding: "0.32rem 1rem",
            borderRadius: 100,
            background: "rgba(124,106,247,0.1)",
            border: "1px solid rgba(124,106,247,0.28)",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#7c6af7",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c6af7", display: "inline-block" }} />
            What we do
          </div>

          <h2 style={{
            fontSize: "clamp(2.5rem,5.5vw,3.8rem)",
            fontWeight: 800, color: "#fff",
            letterSpacing: "-0.04em", lineHeight: 1.08,
            margin: "0 0 1.1rem",
          }}>
            Our{" "}
            <span style={{
              background: "linear-gradient(90deg,#7c6af7,#22c9a0,#f4a23a,#3ab8f4,#7c6af7)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "hueSlide 5s linear infinite",
            }}>Services</span>
          </h2>

          <p style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.38)",
            maxWidth: 430,
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            High-quality solutions built to help your business grow, adapt, and thrive.
          </p>
        </div>

        {/* 2×2 Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
        }}>
          {services.map((s, i) => (
            <Card key={i} service={s} index={i} icon={ICONS[i]} onClick={() => setModal(i)} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: "3.5rem",
          textAlign: "center",
          opacity: titleVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}>
          <a
            href="mailto:info@jaswisys.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "0.85rem 2.1rem",
              borderRadius: 100,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 600, fontSize: "0.88rem",
              textDecoration: "none", letterSpacing: "0.02em",
              transition: "border-color 0.3s, color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(124,106,247,0.5)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(124,106,247,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Talk to our team
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Modal */}
      {modal !== null && (
        <Modal service={services[modal]} icon={ICONS[modal]} onClose={() => setModal(null)} />
      )}

      <style>{`
        @keyframes hueSlide {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @media (max-width: 680px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
