import * as React from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecordedVideoPlayerProps {
  videoUrl: string;
  title?: string;
}

const RecordedVideoPlayer: React.FC<RecordedVideoPlayerProps> = ({ videoUrl, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const navigate = useNavigate();

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    // Initial orientation check
    handleOrientationChange();

    // Listen for orientation changes
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

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
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
          >
            Try Again
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
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </button>

      {/* Video title if provided */}
      {title && (
        <div className="absolute top-4 left-16 z-50 text-white font-medium">
          {title}
        </div>
      )}

      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain"
        onLoadedData={() => setLoading(false)}
        onError={() => {
          setError('Failed to load video');
          setLoading(false);
        }}
      />
    </div>
  );
};

export default RecordedVideoPlayer; 