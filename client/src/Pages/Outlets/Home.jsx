import HeroSection from "./HomeComponent.jsx/HeroSection";
import ServiceSection from "./HomeComponent.jsx/ServiceSection";
import HeroSection2 from "./HomeComponent.jsx/HeroSection2";
import Reviews from "./HomeComponent.jsx/Reviews";
import Contactus from "./HomeComponent.jsx/Contactus";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServiceSection />

      {/* Secondary Hero Section */}
      <HeroSection2 />

      {/* Testimonials Section */}
      <Reviews />

      {/* CTA Section */}
      <Contactus />
    </div>
  );
}

export default Home;
