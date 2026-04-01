import { useState, useEffect } from "react";
import logo from "../assets/logo1.0.png";
import arrow_icon from "../assets/arrow_icon.png";
import navbarVideo from "../assets/navbarVideo1.mp4"; // Background video

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const links = [
    { name: "Home", id: "Home" },
    { name: "About", id: "AboutSection" },
    { name: "Services", id: "Services" },
    { name: "Careers", id: "Careers" },
    { name: "Contact", id: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
          ) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed w-full z-50 h-12 sm:h-20"> {/* Reduced height */}
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={navbarVideo} type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-3 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-md" /> {/* Smaller logo */}
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-transparent bg-clip-text">JASWISYS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.id)}
              className={`relative font-medium text-white hover:text-gray-200 ${
                activeSection === link.id ? "text-gray-100" : ""
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 transition-all duration-300 ${
                  activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Desktop Connect Button */}
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
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed top-16 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center gap-8 text-xl transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleLinkClick(link.id)}
            className="font-medium text-white hover:text-gray-200"
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