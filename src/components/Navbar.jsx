import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.0.png";
import arrow_icon from "../assets/arrow_icon.png";

const links = [
  { name: "Home", id: "Home" },
  { name: "About", id: "AboutSection" },
  { name: "Services", id: "Services" },
  { name: "Careers", id: "Careers" },
  { name: "Contact", id: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("nav")) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F1C]/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(139,92,246,0.15)]"
          : "bg-[#0B0F1C]/55 backdrop-blur-md"
      }`}
    >
      {/* Faint colour wash that intensifies once the glass panel is active */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-400/10 ${
          scrolled ? "opacity-100" : "opacity-60"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Left cluster: hamburger + logo (always visible, mirrors the reference layout) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex flex-col items-center justify-center gap-[5px] rounded-full ring-1 ring-white/15 hover:ring-cyan-300/40 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70"
            >
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[6px] bg-cyan-300" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[6px] bg-cyan-300" : ""
                }`}
              />
            </button>

            <button
              onClick={() => handleLinkClick("AboutSection")}
              className="relative flex items-center gap-3 group focus:outline-none min-w-0"
            >
              <span className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
                <span className="jaswisys-aurora absolute -inset-2 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={logo}
                  alt="Jaswisys logo"
                  className="relative w-full h-full rounded-full ring-1 ring-white/15 shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="hidden xs:inline text-lg sm:text-xl font-semibold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-300 text-transparent bg-clip-text truncate">
                JASWISYS
              </span>
            </button>
          </div>

          {/* Center pill: quick-jump links in a light glass capsule */}
          <div className="hidden sm:flex items-center bg-gray-200/95 rounded-full px-1.5 py-1.5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-full whitespace-nowrap transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400/70 ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_16px_-2px_rgba(139,92,246,0.55)]" />
                  )}
                  <span className="relative">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right CTA: dark capsule with a leading icon badge */}
          <a
            href="mailto:info@jaswisys.com"
            className="group flex items-center gap-2 shrink-0 bg-[#12172A] text-white text-sm font-medium pl-2 pr-4 py-1.5 rounded-full ring-1 ring-white/10 transition-all duration-300 hover:ring-cyan-300/40 hover:shadow-[0_6px_24px_-4px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-violet-500 to-rose-400">
              <img
                src={arrow_icon}
                width={11}
                alt=""
                className="transition-transform duration-300 group-hover:translate-x-0.5 invert"
              />
            </span>
            <span className="hidden md:inline">Connect</span>
          </a>
        </div>
      </div>

      {/* Slide-down menu, opened by the hamburger at every breakpoint */}
      <div
        className={`absolute top-full left-0 w-full origin-top bg-[#0B0F1C]/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="h-px w-full bg-gradient-to-r from-violet-500 via-cyan-300 to-rose-400 opacity-70" />
        <div className="flex flex-col items-center gap-1 py-6 max-w-7xl mx-auto">
          {links.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              className={`w-full text-center py-3 text-base font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? "bg-gradient-to-r from-violet-300 to-cyan-200 text-transparent bg-clip-text"
                  : "text-white/60"
              } ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              } hover:text-white`}
            >
              {link.name}
            </button>
          ))}

          <a
            href="mailto:info@jaswisys.com"
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-violet-500 to-rose-400 text-white text-sm font-medium px-6 py-2.5 rounded-full"
          >
            Connect
            <img src={arrow_icon} width={12} alt="" />
          </a>
        </div>
      </div>

      <style>{`
        .jaswisys-aurora {
          background: conic-gradient(from 0deg, #8b5cf6, #22d3ee, #fb7185, #8b5cf6);
        }
        @media (prefers-reduced-motion: no-preference) {
          .jaswisys-aurora {
            animation: jaswisysAuroraSpin 8s linear infinite;
          }
        }
        @keyframes jaswisysAuroraSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
