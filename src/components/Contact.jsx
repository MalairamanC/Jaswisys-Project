import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch(() => setError("Failed to send message. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-14 text-white">
          Contact{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Us
          </span>
        </h2>

        {/* Glass Card */}
        <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-10 relative">
          {/* Glow */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-20 rounded-2xl"></div>

          {/* Header */}
          <div className="relative z-10 text-center mb-10">
            <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-400 mt-2 max-w-xl mx-auto">
              Have a project idea or looking to collaborate? Feel free to reach out—we’d love to hear from you.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-10 relative z-10">

            {/* Left - Contact Info + Map */}
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-purple-400" size={22} />
                  <a href="mailto:info@jaswisys.com" className="hover:text-purple-400">info@jaswisys.com</a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-purple-400" size={22} />
                  <a href="tel:+919500355003" className="hover:text-purple-400">+91 9500355003</a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-purple-400 mt-1" size={22} />
                  <div>
                    <p className="font-semibold">Jaswisys Technologies</p>
                    <p className="text-gray-400 text-sm">No.1/4/2, RS Towers, 2nd Floor,
                     New Natham Highway, Oomachikulam, Madurai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  title="Jaswisys Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.123456789!2d78.119!3d9.925!2m3!1f0!2f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c123456789%3A0xabcdef123456789!2sMadurai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right - Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                aria-required="true"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                aria-required="true"
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                aria-required="true"
              />

              {/* Animated Alerts */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-center"
                  >
                    {error}
                  </motion.p>
                )}
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 text-center font-semibold"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {loading && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-blue-400 text-center"
                  >
                    Sending...
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                }`}
                aria-label="Send contact message"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
