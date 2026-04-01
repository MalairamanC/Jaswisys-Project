import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import emailjs from "emailjs-com";

const jobsData = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    descFull: [
      "As a Frontend Developer at JASWISYS, you will create responsive, scalable, and high-performance interfaces using React, Tailwind, and modern web technologies.",
      "Collaborate with backend teams, designers, and stakeholders to deliver a seamless user experience while following best practices and coding standards."
    ]
  },
  {
    title: "Backend Developer",
    location: "Chennai",
    type: "Full-time",
    descFull: [
      "Join our backend team to design, implement, and maintain scalable APIs and database systems that power enterprise-grade applications.",
      "Work closely with frontend and DevOps teams to ensure system reliability, performance, and security across platforms."
    ]
  },
  {
    title: "UI/UX Intern",
    location: "Remote",
    type: "Intern",
    descFull: [
      "Assist in designing intuitive UI/UX components for web and mobile applications. Gain hands-on experience with design tools and user research methods.",
      "Collaborate with developers and product managers to ensure seamless user experiences that align with business goals."
    ]
  }
];

export default function ModernCareers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", resume: null });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedJob(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredJobs = jobsData.filter(
    (job) =>
      (filter === "All" || job.type === filter) &&
      job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setFormData({ ...formData, resume: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.resume) {
      alert("Please complete all fields and upload your resume.");
      return;
    }

    // EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          job_title: selectedJob.title,
          to_email: "career@jaswisys.com"
        },
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      )
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
          setSelectedJob(null);
          setFormData({ name: "", email: "", resume: null });
          setSubmitted(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("There was an error sending your application. Please try again.");
      });
  };

  return (
    <section id="Careers" className="py-24 bg-gray-950 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Careers at{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            JASWISYS
          </span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400">
          Join our dynamic team and shape the future of technology with us.
        </motion.p>
      </div>

      {/* Search + Filter */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-4 mb-12">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {["All", "Full-time", "Intern", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg ${
                filter === type
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  : "bg-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List View */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4">
        {filteredJobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 p-6 rounded-xl flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <div className="text-sm text-gray-400 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> {job.type}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="ml-4 border border-gray-600 hover:border-white hover:bg-gray-800 px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-8 rounded-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedJob.title}</h3>

            <div className="mb-4 text-gray-400">
              <span className="flex items-center gap-2 mb-2">
                <MapPin size={16} /> {selectedJob.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {selectedJob.type}
              </span>
            </div>

            {selectedJob.descFull.map((para, i) => (
              <p key={i} className="mb-4 text-gray-300">
                {para}
              </p>
            ))}

            {submitted ? (
              <p className="text-green-400 font-semibold text-center">
                Application submitted successfully!
              </p>
            ) : (
              <form
                className="flex flex-col gap-4 mt-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="px-4 py-2 rounded bg-gray-800 text-white"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded bg-gray-800 text-white"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="file"
                  name="resume"
                  onChange={handleFormChange}
                  className="text-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold"
                >
                  Submit Application
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}