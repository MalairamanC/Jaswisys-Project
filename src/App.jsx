import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Careers from "./components/Careers.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Video */}
      <main className="pt-20">
        <section id="Home">
          <Hero />
        </section>

       {/* Features Section */}
        <section id="Features">
          <Features />
        </section>

        {/* About Section */}
        <section id="About">
          <About />
        </section>  

        {/* Services Section */}
        <section id="Services">
          <Services/>
        </section>

        {/* Careers Section */}
        <section id="Careers">
          <Careers/>
        </section>

        {/* Contact Section */}
        <section id="Contact">
          <Contact/>
        </section>

        {/* Footer Section */}
        <section id="Footer">
          <Footer/>
        </section>
      
      </main>
    </div>
  );
}