import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { GraduationCap, BookOpen, Users, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const { currentUser, subscribed } = useAuth();
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#dcf1e9] to-[#e8f5f0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#c5e8dd] to-[#dcf1e9] rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
        className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-l from-[#c5e8dd] to-[#dcf1e9] rounded-full translate-x-1/2 translate-y-1/2 blur-xl"
      />
      
      <div className="container px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-800">Join our learning community</span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
            Ready to Start Your <span className="text-primary relative inline-block">Learning Journey?
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-1 left-0 h-[6px] bg-primary/20 rounded-full -z-10"
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">
            Join EduSpark today and get access to all our courses, study materials, and live classes.
          </motion.p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { icon: GraduationCap, title: "Expert Teachers", desc: "Learn from the best" },
              { icon: BookOpen, title: "Quality Content", desc: "Comprehensive materials" },
              { icon: Users, title: "Interactive Learning", desc: "Engage and excel" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group flex flex-col items-center p-6 bg-white/40 hover:bg-white/60 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative">
                  <feature.icon className="w-10 h-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute -top-1 -right-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
