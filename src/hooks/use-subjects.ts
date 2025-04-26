import { useQuery } from '@tanstack/react-query';
import { getSubjects, getFeaturedTopics, getLiveClasses } from '@/lib/firebase';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFeaturedTopics = () => {
  return useQuery({
    queryKey: ['featuredTopics'],
    queryFn: getFeaturedTopics,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useLiveClasses = (subjectId?: string) => {
  return useQuery({
    queryKey: ['liveClasses', subjectId],
    queryFn: () => getLiveClasses(subjectId),
    staleTime: 1000 * 60 * 1, // 1 minute - shorter stale time for live content
  });
}; 