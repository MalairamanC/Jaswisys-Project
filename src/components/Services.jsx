import { useState, useEffect } from "react";
import ServicesVideo from "../assets/ServicesBg.mp4";
import supportImg from "../assets/support.png";
import consultingImg from "../assets/consulting.png";
import outsourcingImg from "../assets/outsourcing.png";
import trainingImg from "../assets/training.png";

const services = [
  {
    title: "Support",
    description:
      "We deliver comprehensive IT support services(AMS&Others) designed to ensure seamless operations, combining structured processes with practical, hands-on expertise across high-demand technologies.",
    fullInfo:
      "Jaswisys has a committed team dedicated to delivering high-quality SAP support(AMS), including help desk services, performance tuning, and custom development. We analyze systems and mitigate risks associated with critical upgrades, ensuring minimal disruption to your organization.",
    image: supportImg,
    shape: "circle",
    gradient: "from-blue-500 via-purple-500 to-pink-600",
  },
  {
    title: "Consulting",
    description:
      "We deliver expert consulting in recruitment and HR processes, alongside optimizing IT, finance, and BPO operations, enabling organizations to improve efficiency, reduce costs, and accelerate business growth.",
    fullInfo:
      "We help organizations improve recruitment processes across IT, BPO, Finance and HR sectors Contract to Hire (C2H) services, One time Placement services, Part-time fulfillment (hourly basis), and Work-package model provide expert guidance on recruitment.",
    image: consultingImg,
    shape: "square",
    gradient: "from-green-400 via-teal-500 to-blue-600",
  },
  {
    title: "Outsourcing",
    description:
      "We provide flexible staffing, SAP consultancy, IT outsourcing solutions, and end-to-end startup support, enabling businesses to scale efficiently and adapt to evolving market demands.",
    fullInfo:
      "We specialize in sourcing top-tier IT professionals for staff augmentation, training, and project-based engagements. Our flexible resourcing models, including hybrid teams, ensure you have the right talent at the right time to meet your business needs.In addition, we provide business process consulting services that help organizations analyze, streamline, and transform their operations. Our goal is to reduce costs, improve efficiency, and enhance the overall experience for both employees and customers.",
    image: outsourcingImg,
    shape: "blob",
    gradient: "from-yellow-400 via-orange-500 to-red-600",
  },
  {
    title: "Training",
    description:
      "We provide tailored training programs designed to upskill teams in the latest technologies and industry best practices, enabling continuous learning and improved performance.",
    fullInfo:
      "Jaswisys Tech provides a comprehensive range of training programs, including SAP technologies and cloud solutions. We focus on upskilling teams across all modules, delivering tailored programs to enhance skills in the latest technologies and industry best practices.Our SAP training services are designed for individuals who, with in-depth knowledge of business processes, contribute to both personal and organizational growth. We take a holistic approach to assessing SAP training needs and develop specific programs aligned with company objectives and individual career development.",
    image: trainingImg,
    shape: "diamond",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
  },
];

function Services() {
  const [activeModal, setActiveModal] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={ServicesVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">
          Our{" "}
          <span className="bg-gradient-to-r from-green-400 via-teal-500-indigo-500 to-blue-600 text-transparent bg-clip-text">
            Services
          </span>
        </h2>
        <p className="text-center text-white/70 mb-16">
          We are delivering high-quality services that help your business grow
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group relative p-1 rounded-3xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]`}
            >
              {/* Card Gradient Border */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background:
                    "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #facc15, #3b82f6)",
                }}
              ></div>

              {/* Inner Card */}
              <div className="relative flex items-center gap-6 p-6 bg-gray-900 rounded-2xl z-10">
                {/* Left Image */}
                <div
                  className={`relative flex-shrink-0 w-28 h-28 shadow-lg ${
                    service.shape === "circle"
                      ? "circle-animated-outline"
                      : service.shape === "square"
                      ? "square-animated-outline"
                      : service.shape === "diamond"
                      ? "diamond-animated-outline"
                      : "blob-animated-outline"
                  }`}
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 ${
                      service.shape === "circle"
                        ? "rounded-full animate-glow"
                        : service.shape === "square"
                        ? "rounded-lg animate-glow"
                        : service.shape === "diamond"
                        ? "rotate-45 animate-glow"
                        : "blob-shape animate-blob"
                    } blur-2xl opacity-40 bg-gradient-to-r ${service.gradient}`}
                  ></div>

                  {/* Image */}
                  <div
                    className={`w-full h-full overflow-hidden relative z-10 ${
                      service.shape === "circle"
                        ? "rounded-full"
                        : service.shape === "square"
                        ? "rounded-lg"
                        : service.shape === "diamond"
                        ? "rotate-45 overflow-hidden"
                        : "blob-shape animate-blob"
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text & Button */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white relative inline-block">
                      {service.title}
                      <span
                        className={`absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r ${service.gradient} rounded-full group-hover:w-full transition-all duration-500`}
                      ></span>
                    </h3>
                    <p className="text-white/80 mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => setActiveModal(i)}
                    className={`mt-4 relative px-6 py-2 rounded-full font-semibold text-white border-2 border-transparent group overflow-hidden transition-all duration-300`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 z-0 transition-all duration-300`}
                    ></span>
                    <span className="relative z-10">Read More</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Video background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={servicesVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Modal content */}
          <div className="relative z-10 bg-gray-900 p-12 rounded-3xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh] transform scale-90 opacity-0 animate-fade-in-scale">
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={() => setActiveModal(null)}
            >
              ×
            </button>
            <h3 className="text-4xl font-bold mb-6 text-white">
              {services[activeModal].title}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {services[activeModal].fullInfo}
            </p>

            {/* Enquire Now Button - centered and with same service gradient */}
            <div className="flex justify-center mt-8">
              <a
                href="mailto:info@jaswisys.com"
                className={`relative inline-block px-6 py-3 rounded-full font-semibold text-white border-2 border-transparent group overflow-hidden transition-all duration-300`}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${services[activeModal].gradient} opacity-100 z-0 transition-all duration-300`}
                ></span>
                <span className="relative z-10">Enquire Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
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

export default Services;
