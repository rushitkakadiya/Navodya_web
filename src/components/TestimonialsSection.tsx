
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "My daughter used to struggle with geometry, but after joining this course, she's now confidently solving problems on her own. The visual approach makes learning so much easier!",
    author: "Priya Sharma",
    role: "Parent of Class 5 student"
  },
  {
    quote: "The interactive exercises and games make geometry fun for my son. He looks forward to his lessons and has shown remarkable improvement in his understanding of shapes and measurements.",
    author: "Rahul Verma",
    role: "Parent of Class 5 student"
  },
  {
    quote: "As a teacher, I recommend this course to all my students. The curriculum is well-structured and covers all the essential topics in a way that children can easily understand and enjoy.",
    author: "Anita Desai",
    role: "Primary School Teacher"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Parents & Teachers Say</h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what parents and educators have to say about our Class 5 Geometry course.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-geometry-50 border-geometry-100">
              <CardContent className="pt-6">
                <div className="mb-4 text-geometry-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 opacity-50">
                    <path d="M11.94 3.72a.87.87 0 0 0-1.5-.59C9.5 4.59 6.39 7.09 6 12.37c-.35 4.83 2.07 6.1 4.8 5.19 2.1-.7 3.36-3.71 2.5-6.34-.93-2.88-4.39-2.33-4.3-5.94.04-1.18.31-1.97.97-2.91zm7.5 0a.87.87 0 0 0-1.5-.59c-.95 1.46-4.06 3.96-4.45 9.24-.35 4.83 2.07 6.1 4.8 5.19 2.1-.7 3.36-3.71 2.5-6.34-.93-2.88-4.39-2.33-4.3-5.94.04-1.18.31-1.97.97-2.91z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
