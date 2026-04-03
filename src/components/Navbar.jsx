import { useState, useEffect } from "react";
import logo from "../assets/logo1.0.png";
import arrow_icon from "../assets/arrow_icon.png";
import NavbarVideo from "../assets/NavbarVideo1.mp4";

const links = [
  { name: "Home", id: "Home" },
  { name: "About", id: "AboutSection" },
  { name: "Services", id: "Services" },
  { name: "Careers", id: "Careers" },
  { name: "Contact", id: "Contact" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // ✅ Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 w-full z-50 h-12 sm:h-20 backdrop-blur-md">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={NavbarVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-3 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            JASWISYS
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative group font-medium ${
                activeSection === link.id
                  ? "text-pink-400"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 transition-all duration-300 ${
                  activeSection === link.id
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden sm:flex">
          <a
            href="mailto:info@jaswisys.com"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full hover:scale-105 transition text-sm sm:text-base"
          >
            Connect
            <img src={arrow_icon} width={14} alt="arrow icon" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="sm:hidden flex flex-col gap-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full sm:hidden bg-black/80 backdrop-blur-md flex flex-col items-center gap-6 py-6 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            className="font-medium text-white hover:text-gray-300"
          >
            {link.name}
          </button>
        ))}

        <a
          href="mailto:info@jaswisys.com"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full"
        >
          Connect
          <img src={arrow_icon} width={14} alt="arrow icon" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
