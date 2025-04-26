
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const curriculum = [
  {
    id: 1,
    title: "Introduction to Geometry",
    description: "Learn about points, lines, planes and basic geometric vocabulary.",
    lessons: 5,
    duration: "2 weeks",
    topics: ["Basic concepts", "Points & Lines", "Planes & Surfaces"]
  },
  {
    id: 2,
    title: "2D Shapes and Properties",
    description: "Study different 2D shapes, their properties and classifications.",
    lessons: 8,
    duration: "3 weeks",
    topics: ["Triangles", "Quadrilaterals", "Circles", "Polygons"]
  },
  {
    id: 3,
    title: "Angles and Measurements",
    description: "Understand different types of angles and how to measure them.",
    lessons: 6,
    duration: "2 weeks",
    topics: ["Types of Angles", "Angle Measurement", "Adjacent Angles"]
  },
  {
    id: 4,
    title: "Perimeter and Area",
    description: "Calculate perimeter and area of various 2D shapes.",
    lessons: 7,
    duration: "3 weeks",
    topics: ["Perimeter concepts", "Area formulas", "Word problems"]
  },
  {
    id: 5,
    title: "Symmetry and Patterns",
    description: "Explore symmetry, patterns and transformations.",
    lessons: 5,
    duration: "2 weeks",
    topics: ["Line Symmetry", "Rotational Symmetry", "Patterns"]
  },
  {
    id: 6,
    title: "Practice and Assessment",
    description: "Test your knowledge with quizzes, worksheets and problem-solving exercises.",
    lessons: 4,
    duration: "2 weeks", 
    topics: ["Mock Tests", "Problem Solving", "Final Assessment"]
  }
];

const CurriculumSection = () => {
  return (
    <section className="py-20 bg-white" id="curriculum">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Curriculum</h2>
          <p className="text-gray-600">
            Our comprehensive curriculum covers all essential geometry topics for Class 5 students,
            with engaging lessons and activities to make learning fun and effective.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.map((module) => (
            <Card key={module.id} className="border border-gray-200 hover:border-geometry-300 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex justify-between items-start">
                  <span>Module {module.id}: {module.title}</span>
                  <Badge variant="outline" className="bg-geometry-50 text-geometry-700 border-geometry-200">
                    {module.lessons} lessons
                  </Badge>
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-1">Duration: {module.duration}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
