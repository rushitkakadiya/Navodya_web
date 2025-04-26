
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="bg-gradient-to-r from-geometry-600 to-geometry-700 rounded-3xl p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Geometry Journey?</h2>
            <p className="text-lg opacity-90 mb-8">
              Enroll now to give your child a head start in mastering essential geometry concepts for Class 5.
              Limited seats available for the upcoming batch!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-geometry-700 hover:bg-geometry-50 hover:text-geometry-800 px-8 py-6 text-base">
                Enroll Now and Save 20%
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base">
                Download Syllabus
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-80">
              *Enrollment closes in 7 days. Money-back guarantee for first 14 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
