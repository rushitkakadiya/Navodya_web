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
  const [iframeHeight, setIframeHeight] = useState<string>('100%');
  const navigate = useNavigate();
  const { subjectId, classId } = useParams<{ subjectId: string; classId: string }>();
  const { data: liveClasses } = useLiveClasses(subjectId);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  
  const currentClass = liveClasses?.find(c => c.id === classId);

  // Handle fullscreen changes
  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIframeHeight('100vh');
    } else {
      handleOrientationChange();
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      
      // Calculate safe areas and set iframe height
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
      const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0');
      
      const height = isPortrait
        ? `${windowHeight - safeAreaTop - safeAreaBottom}px`
        : '100vh';
      
      setIframeHeight(height);
    };

    // Initial orientation check
    handleOrientationChange();

    // Listen for orientation and fullscreen changes
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Force orientation change after a short delay to handle initial render
    setTimeout(handleOrientationChange, 100);

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

    // Add viewport and safe-area meta tags for proper mobile scaling
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(viewportMeta);

    // Add safe-area CSS variables
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --sat: env(safe-area-inset-top);
        --sab: env(safe-area-inset-bottom);
        --sal: env(safe-area-inset-left);
        --sar: env(safe-area-inset-right);
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.height = '';
      document.head.removeChild(viewportMeta);
      document.head.removeChild(style);
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
      className="fixed inset-0 w-full h-full bg-black flex flex-col overscroll-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      {/* Square back button with rounded corners and grey background */}
        <button
          onClick={() => navigate('/live-classes')}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-50 w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
        >
        <ArrowLeft className="h-5 w-5 text-white" />
        </button>

      <iframe 
        ref={iframeRef}
        src={currentClass.roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{
          border: 'none',
          width: '100%',
          height: iframeHeight,
          display: 'block',
          backgroundColor: 'black',
          flex: 1,
          minHeight: 0,
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
};

export default VideoSDKRoom;
