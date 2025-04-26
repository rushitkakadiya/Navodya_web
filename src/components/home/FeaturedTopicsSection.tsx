import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Video } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFeaturedTopics } from "@/hooks/use-subjects";
import { Skeleton } from "@/components/ui/skeleton";

// Default thumbnail for geometry topics
const DEFAULT_GEOMETRY_THUMBNAIL = "https://images.unsplash.com/photo-1509228468518-180dd4864904";

const FeaturedTopicsSection = () => {
  const { subscribed } = useAuth();
  const isMobile = useIsMobile();
  const { data: featuredTopics, isLoading, error } = useFeaturedTopics();

  useEffect(() => {
    if (featuredTopics) {
      console.log('Detailed Featured Topics Data:', 
        featuredTopics.map(topic => ({
          id: topic.id,
          title: topic.title,
          thumbnail: topic.thumbnail,
          hasValidThumbnail: topic.thumbnail && topic.thumbnail.startsWith('http')
        }))
      );
    }
  }, [featuredTopics]);

  const getTopicThumbnail = (topic: any) => {
    // Log the incoming thumbnail value
    console.log(`Getting thumbnail for topic "${topic.title}":`, {
      originalThumbnail: topic.thumbnail,
      isValid: topic.thumbnail && topic.thumbnail.startsWith('http')
    });

    if (topic.thumbnail && topic.thumbnail.startsWith('http')) {
      return topic.thumbnail;
    }
    return DEFAULT_GEOMETRY_THUMBNAIL;
  };

  if (error) {
    console.error('Featured Topics Error:', error);
    return (
      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-8">
          <div className="text-center text-red-500">
            Error loading featured topics. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <div className="container px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-800">Featured Topics</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Start your learning journey with these popular topics
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden card-shadow">
                <div className="relative pb-[56.25%]">
                  <Skeleton className="absolute inset-0" />
                </div>
                <div className="p-4 md:p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : featuredTopics && featuredTopics.length > 0 ? (
            featuredTopics.map((topic) => {
              const thumbnailUrl = getTopicThumbnail(topic);
              
              return (
            <Link 
                  key={topic.id}
                  to={`/featured-video/${topic.id}`}
              className="bg-white rounded-xl shadow-sm border overflow-hidden card-shadow"
            >
                  <div className="relative pb-[56.25%]">
                <img 
                      src={thumbnailUrl}
                  alt={topic.title}
                      className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                      onError={(e) => {
                        console.error('Error loading thumbnail:', thumbnailUrl);
                        (e.target as HTMLImageElement).src = DEFAULT_GEOMETRY_THUMBNAIL;
                      }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
                    <Video className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  {topic.duration}
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-gray-800">{topic.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-primary-50 text-primary rounded-full">
                        {topic.subjectId}
                  </span>
                  {!subscribed && (
                    <span className="bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No featured topics available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopicsSection;
