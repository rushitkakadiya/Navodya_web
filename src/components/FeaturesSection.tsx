
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Interactive Lessons",
    description:
      "Engaging content with animations, videos and interactive examples that make geometry concepts easy to understand."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7v10" />
        <path d="M11 7v10" />
        <path d="m15 7 2 5-2 5" />
      </svg>
    ),
    title: "Practice Exercises",
    description:
      "Hundreds of practice problems sorted by difficulty level to help students master every concept thoroughly."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    ),
    title: "Visual Learning",
    description:
      "Colorful diagrams, illustrations and hands-on activities to visualize geometric concepts clearly."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Progress Tracking",
    description:
      "Monitor your child's progress with regular assessments, quizzes and personalized feedback."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    title: "Regular Worksheets",
    description:
      "Downloadable worksheets and activities that reinforce learning and provide additional practice."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-geometry-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    title: "Doubt Solving",
    description:
      "Access to doubt solving sessions where experienced teachers address students' questions and difficulties."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Features</h2>
          <p className="text-gray-600">
            Our Class 5 geometry course is specially designed to make learning engaging, effective, and enjoyable for young minds.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
