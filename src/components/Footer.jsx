import { useState } from "react";
import { Twitter, Facebook, Linkedin, Instagram, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import Logo from "../assets/logo1.0.png";
import footerVideo from "../assets/footerVideo.mp4";

function Footer() {
  const [showMessage, setShowMessage] = useState(false);

  const links = {
    company: [
      { label: "About", href: "#Features" },
      { label: "Services", href: "#services" },
      { label: "Careers", href: "#Careers" },
      { label: "Contact", href: "#contact" },
    ],
    product: [
      { label: "Features", href: "#" },
      { label: "Support", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const socials = [
    { icon: Twitter, url: "https://twitter.com/jaswisys", label: "Twitter" },
    { icon: Facebook, url: "https://facebook.com/jaswisys", label: "Facebook" },
    { icon: Linkedin, url: "https://linkedin.com/company/jaswisystechnologies", label: "LinkedIn" },
    { icon: Instagram, url: "https://instagram.com/jaswisystechnologies", label: "Instagram" },
  ];

  const handleScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    emailjs
      .send(
        "service_2rb4as7",
        "template_cqm9blh",
        "user_email",
        "vxgoAdH_AIciY17rZ"
      )
      .then(() => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        e.target.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to subscribe. Try again.");
      });
  };

  return (
    <footer className="relative text-gray-300 pt-16 pb-8 px-6 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={footerVideo}
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Jaswisys logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              JASWISYS
            </h2>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 pt-2">
            {socials.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition transform hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {links.company.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="relative inline-block text-gray-400 hover:text-white transition group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            {links.product.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative inline-block text-gray-400 hover:text-white transition group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for product updates and tech insights.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email"
              className="bg-transparent px-3 py-2 text-sm outline-none flex-1"
            />
            <button
              type="submit"
              className="px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
            >
              <Mail size={18} />
            </button>
          </form>

          {/* Success Message */}
          {showMessage && (
            <div className="mt-3 text-green-400 text-sm">
              ✅ Subscription successful!
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Jaswisys Technologies. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
