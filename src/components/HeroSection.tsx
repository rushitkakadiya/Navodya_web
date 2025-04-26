
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600">
              <span className="text-sm font-medium">Class 5 Geometry</span>
              <span className="flex h-2 w-2 rounded-full bg-primary-500" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-800 leading-tight">
              Master Geometry <br />
              <span className="text-primary">With Confidence</span>
            </h1>
            
            <p className="text-lg text-secondary-600 max-w-xl">
              Join our comprehensive geometry course designed specifically for Class 5 students. Learn from expert teachers and master essential concepts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="shadow-md">
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-50">
                View Detailed Syllabus
              </Button>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-secondary-700 font-medium">Live Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-secondary-700 font-medium">Practice Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-secondary-700 font-medium">Expert Teachers</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-4 md:inset-12 -top-4 md:-top-8 bg-gradient-to-r from-primary-100/80 to-primary-50/50 rounded-2xl -rotate-6 transform"></div>
            <div className="relative bg-white p-4 md:p-6 rounded-2xl shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary-100/80 to-primary-50/50">
                  <div className="h-16 w-16 rounded-full bg-white/90 shadow-md text-primary flex items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-5">
                <h3 className="font-bold text-xl text-secondary-700">Course Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-50 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-secondary-600 font-medium">Interactive geometry lessons</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-50 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-secondary-600 font-medium">Step-by-step problem solving</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-50 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-secondary-600 font-medium">Regular practice exercises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-50 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-secondary-600 font-medium">Visual learning methods</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
