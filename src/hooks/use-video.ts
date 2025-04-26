import { useQuery } from '@tanstack/react-query';
import { getVideoDocument } from '@/lib/firebase';
import { DocumentData } from 'firebase/firestore';

export interface VideoDocument {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number;
  subjectId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useVideo = (videoId: string) => {
  return useQuery<VideoDocument>({
    queryKey: ['video', videoId],
    queryFn: async () => {
      const data = await getVideoDocument(videoId);
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnail: data.thumbnail,
        duration: data.duration,
        subjectId: data.subjectId,
        topicId: data.topicId,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as VideoDocument;
    },
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}; 