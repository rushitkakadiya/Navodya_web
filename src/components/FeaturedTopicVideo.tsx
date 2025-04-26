import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFeaturedTopics } from '@/hooks/use-subjects';
import { ArrowLeft } from 'lucide-react';

const FeaturedTopicVideo: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data: featuredTopics, isLoading, error } = useFeaturedTopics();

  const topic = featuredTopics?.find(t => t.id === topicId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p className="mb-4">Video not found</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      {/* Square back button with rounded corners and grey background */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </button>

      <iframe 
        src={topic.videoUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'black'
        }}
      />
    </div>
  );
};

export default FeaturedTopicVideo; 