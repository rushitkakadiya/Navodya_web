import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLiveClasses } from '@/hooks/use-subjects';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface VideoSDKRoomProps {
  isTeacher?: boolean;
}

const VideoSDKRoom: FC<VideoSDKRoomProps> = ({ isTeacher = false }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [containerHeight, setContainerHeight] = useState<string>('100vh');
  const [iframeHeight, setIframeHeight] = useState<string>('100%');
  const navigate = useNavigate();
  const { subjectId, classId } = useParams<{ subjectId: string; classId: string }>();
  const { data: liveClasses } = useLiveClasses(subjectId);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentClass = liveClasses?.find(c => c.id === classId);

  // Handle fullscreen changes
  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIframeHeight('100vh');
    } else {
      handleOrientationChange();
    }
  };

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    setOrientation(isPortrait ? 'portrait' : 'landscape');

    // Get viewport dimensions
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Calculate safe areas
    const safeTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
    const safeBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0');
    const safeLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0');
    const safeRight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0');

    // Calculate container dimensions with padding
    const padding = 32; // 16px on each side
    const containerH = vh - Math.max(padding * 2, safeTop + safeBottom);
    const containerW = vw - Math.max(padding * 2, safeLeft + safeRight);

    // Set container height
    setContainerHeight(`${containerH}px`);

    // Calculate iframe dimensions
    const iframeH = containerH - padding;
    setIframeHeight(`${iframeH}px`);

    // Force redraw of iframe
    if (iframeRef.current) {
      iframeRef.current.style.height = `${iframeH}px`;
      requestAnimationFrame(() => {
        if (iframeRef.current) {
          iframeRef.current.style.display = 'none';
          iframeRef.current.offsetHeight; // Force reflow
          iframeRef.current.style.display = 'block';
        }
      });
    }
  }, []);

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    const isPortrait = window.innerHeight > window.innerWidth;
    setOrientation(isPortrait ? 'portrait' : 'landscape');

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    
    // Calculate safe area insets
    const topInset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
    const bottomInset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0');
    const leftInset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0');
    const rightInset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0');
    
    // Add padding for better UI (16px on each side)
    const horizontalPadding = Math.max(32, leftInset + rightInset);
    const verticalPadding = Math.max(32, topInset + bottomInset);
    
    // Set iframe height considering safe areas and padding
    setIframeHeight(`${screenHeight - verticalPadding}px`);
    
    // Update body styles
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Force iframe to redraw after a small delay
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.style.display = 'none';
        iframeRef.current.offsetHeight; // Force reflow
        iframeRef.current.style.display = 'block';
      }
    }, 100);
  }, []);

  useEffect(() => {

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
      ref={containerRef}
      className={cn(
        'fixed inset-0 w-full bg-black flex flex-col items-center justify-center overscroll-none',
        'p-4 md:p-8 safe-area-view'
      )}
      style={{
        height: containerHeight,
        zIndex: 50,
      }}
    >
      {/* Square back button with rounded corners and grey background */}
        <button
          onClick={() => navigate('/live-classes')}
        className="fixed top-[max(1.5rem,env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))] z-[60] w-12 h-12 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-xl transition-colors shadow-lg backdrop-blur-sm"
        >
        <ArrowLeft className="h-5 w-5 text-white" />
        </button>

      <div className="relative w-full h-full max-w-[1920px] mx-auto rounded-xl overflow-hidden shadow-2xl">
        <iframe 
          ref={iframeRef}
          src={currentClass.roomUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="w-full h-full bg-black"
          style={{
            height: iframeHeight,
            border: 'none',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
      </div>
    </div>
  );
};

export default VideoSDKRoom;
