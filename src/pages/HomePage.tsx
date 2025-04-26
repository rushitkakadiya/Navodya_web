import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/home/HeroSection";
import SubjectsSection from "@/components/home/SubjectsSection";
import FeaturedTopicsSection from "@/components/home/FeaturedTopicsSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SubjectsSection />
        <FeaturedTopicsSection />
        <CTASection />
        <section className="py-10 md:py-16">
          <div className="container px-4 md:px-8">
            <div className="max-w-xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
