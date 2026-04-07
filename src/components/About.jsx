import { useState, useEffect } from "react";
import aboutImg from "../assets/aboutBg.png";
import AboutVideo from "../assets/About.mp4";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="About" className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={aboutImg}
            alt="About JASWISYS"
            className="rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col text-white leading-relaxed gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Our{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              JASWISYS
            </span>
          </h2>

          <p>
            At <span className="font-semibold">JASWISYS Technologies</span>, we provide IT software services backed by extensive experience. Our team specializes in IT Support, Consulting, Placement, and Training, delivering comprehensive solutions tailored to your business needs.
          </p>

          {/* Read More Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="relative inline-flex items-center gap-2 px-8 py-3 font-semibold text-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 
                animate-gradient-x opacity-40 transition-all duration-500"></span>
              <span className="absolute inset-0 rounded-lg bg-white/10 blur-xl opacity-20"></span>
              <span className="relative z-10 flex items-center gap-2">
                Read More
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2"/>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Modal with Video Background */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={AboutVideo} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Modal Content */}
          <div className="relative z-10 bg-gray-900 bg-opacity-90 p-12 rounded-3xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh] animate-fade-in-scale">
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-4xl font-bold mb-6 text-white">About {" "}<span className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              JASWISYS
            </span></h3>
            <p className="text-white/80 leading-relaxed">
              We provide IT software services backed by extensive experience. Our team specializes in IT Support, Consulting, Placement, and Training, delivering comprehensive solutions tailored to your business needs.
              <br /><br />
              We partner with organizations to streamline operations, enhance efficiency, and implement enterprise-grade security architectures that keep your business running smoothly. Our approach combines technical expertise, industry insight, and proven methodologies to consistently meet and exceed client expectations.
              <br /><br />
              In addition to our core services, we focus on empowering teams through hands-on training, flexible staffing solutions, and strategic IT consulting. By understanding each client’s unique challenges, we design solutions that drive growth, reduce operational risk, and improve overall productivity.
              <br /><br />
              We believe in long-term partnerships—supporting businesses not just with technology, but with insights, guidance, and solutions that enable sustainable success.
            </p>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fadeInScale 0.3s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
}

export default About;
