
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Star, Users, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();

  return (
    <section className="hero-gradient relative py-8 md:py-16 overflow-hidden">
      <div className="container px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-tight">
              Master Your Subjects with <span className="text-primary">Expert Teachers</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Comprehensive courses in Maths, Mental Ability, and Gujarati Language designed by top educators to help students excel.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/live-classes" className="w-full sm:w-auto">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-600 text-white font-medium px-6 md:px-8"
                >
                  Start Learning
                </Button>
              </Link>
              {!currentUser && (
                <Link to="/signup" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button
                    size={isMobile ? "default" : "lg"}
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary-50"
                  >
                    Create Account
                  </Button>
                </Link>
              )}
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap items-center mt-6 md:mt-8 gap-4 md:gap-6">
              <div className="flex items-center">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                <span className="text-sm md:text-base text-gray-700">10K+ students</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                <span className="text-sm md:text-base text-gray-700">4.8 rating</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                <span className="text-sm md:text-base text-gray-700">Lifetime access</span>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative flex justify-center items-end h-[300px] md:h-[400px] lg:h-[480px]">
            {/* Green Circle Background */}
            <div 
              className="absolute bottom-0 w-[240px] md:w-[320px] lg:w-[400px] h-[240px] md:h-[320px] lg:h-[400px] bg-primary-100 rounded-full -z-10"
              style={{
                transform: 'translateY(30%)'
              }}
            />

            {/* Hero Image */}
            <img
              src="https://res.cloudinary.com/dl85uatob/image/upload/v1745416222/hero-image_vgv2gv.png"
              alt="Students learning"
              className="absolute bottom-0 w-[220px] md:w-[280px] lg:w-[340px] h-auto object-contain z-10"
              style={{ 
                transform: 'translateY(15%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
