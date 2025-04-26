import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLiveClasses } from '@/hooks/use-subjects';

interface VideoSDKRoomProps {
  isTeacher?: boolean;
}

const VideoSDKRoom: React.FC<VideoSDKRoomProps> = ({ isTeacher = false }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const navigate = useNavigate();
  const { subjectId, classId } = useParams<{ subjectId: string; classId: string }>();
  const { data: liveClasses } = useLiveClasses(subjectId);
  
  const currentClass = liveClasses?.find(c => c.id === classId);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    // Initial orientation check
    handleOrientationChange();

    // Listen for orientation changes
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    const initializeRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!currentClass) {
          throw new Error('Live class not found');
        }

        if (currentClass.status !== 'live') {
          throw new Error('This class is not live at the moment');
        }

      } catch (error) {
        console.error('Failed to initialize room:', error);
        setError(error instanceof Error ? error.message : 'Failed to set up live classroom');
        toast.error('Failed to set up live classroom. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initializeRoom();

    // Lock body scroll and hide overflow when component mounts
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';

    // Add viewport meta tag for proper mobile scaling
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(viewportMeta);

    return () => {
      // Cleanup
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.height = '';
      document.head.removeChild(viewportMeta);
    };
  }, [currentClass]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Joining live class...</p>
        </div>
      </div>
    );
  }

  if (error || !currentClass) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p className="mb-4">{error || 'Live class not found'}</p>
          <button 
            onClick={() => navigate('/live-classes')}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
          >
            Back to Live Classes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-black"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Square back button with rounded corners and grey background */}
        <button
          onClick={() => navigate('/live-classes')}
        className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors"
        >
        <ArrowLeft className="h-5 w-5 text-white" />
        </button>

      <iframe 
        src={currentClass.roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{
          border: 'none',
          width: '100%',
          height: orientation === 'landscape' ? '100vh' : 'calc(100vh - 1px)',
          display: 'block',
          backgroundColor: 'black',
          position: 'absolute',
          top: orientation === 'landscape' ? '0' : 'auto'
        }}
      />
    </div>
  );
};

export default VideoSDKRoom;
