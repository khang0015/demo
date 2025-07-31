import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PartnersSection from "@/components/partners-section";
import TestimonialsSection from "@/components/testimonials-section";
import InsightsSection from "@/components/insights-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <PartnersSection />
      <TestimonialsSection />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
