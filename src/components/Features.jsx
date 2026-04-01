import FeaturesBg from "../assets/FeaturesBg.png";

const features = [
  {
    title: "Our Vision",
    desc: "Our vision is to be a global leader in innovation and technology. We deliver cutting-edge enterprise solutions that inspire others and help our customers achieve greater value and long-term success."
  },
  {
    title: "Our Mission",
    desc: "Our mission is to become the most reliable technology services company by serving as a trusted partner and consistently exceeding customer expectations through innovative solutions and exceptional service."
  },
  {
    title: "Our Value",
    desc: "We are committed to creating value for our customers by delivering high-quality IT solutions that enhance user experience, optimize operations, and drive business growth."
  }
];

function FeatureCard({ title, desc }) {
  return (
    <div className="relative group w-full max-w-sm">

      {/* Gradient Border */}
      <div className="absolute -inset-[2px] rounded-xl 
      bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
      opacity-0 group-hover:opacity-100 blur-sm 
      transition duration-500"></div>

      {/* Card */}
      <div className="relative p-6 rounded-xl bg-gray-900/80 backdrop-blur-md
      shadow-lg transition-all duration-300 
      group-hover:-translate-y-2 group-hover:shadow-2xl
      flex flex-col items-center text-center">

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-white relative">
          <span className="relative inline-block 
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
          text-transparent bg-clip-text">

            {title}

            {/* Underline */}
            <span className="absolute left-0 -bottom-1 h-[3px] w-0 
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            rounded-full transition-all duration-300 
            group-hover:w-full"></span>

          </span>
        </h3>

        {/* Description */}
        <p className="text-gray-100 text-sm leading-relaxed">
          {desc}
        </p>

      </div>
    </div>
  );
}

function Features() {
  return (
    <section
      id="AboutSection"   // ✅ IMPORTANT (for Navbar scroll)
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${FeaturesBg})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 px-6">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
            text-transparent bg-clip-text">
              JASWISYS
            </span>
          </h2>

          <p className="text-gray-200">
            We deliver innovative solutions with a strong focus on security, performance, and scalability, ensuring reliable operations across global platforms
          </p>
        </div>

        {/* Grid Layout */}
        <div className="max-w-6xl mx-auto px-6 grid gap-8 
        sm:grid-cols-2 lg:grid-cols-3 place-items-center">

          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              desc={feature.desc}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;

