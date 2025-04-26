import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useSubjects } from "@/hooks/use-subjects";
import { Skeleton } from "@/components/ui/skeleton";

const SubjectsSection = () => {
  const { data: subjects, isLoading, error } = useSubjects();

  if (error) {
    return (
      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-8">
          <div className="text-center text-red-500">
            Error loading subjects. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <div className="container px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-800">Popular Subjects</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Explore our comprehensive courses designed by expert educators
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <Skeleton className="w-full h-full" />
                </AspectRatio>
                <div className="p-4 md:p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            subjects?.map((subject) => (
            <Link 
              key={subject.id} 
              to={`/subjects/${subject.id}`}
              className="bg-white rounded-xl shadow-sm border overflow-hidden card-shadow"
            >
              <AspectRatio ratio={16/9}>
                <img 
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </AspectRatio>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-800">{subject.name}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    </div>
                      <span className="text-xs md:text-sm text-gray-500">{subject.topics} Topics</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-700 p-0">
                    Explore <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
