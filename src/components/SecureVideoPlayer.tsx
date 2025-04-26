import React, { useEffect, useRef } from 'react';
import { Stream } from '@cloudflare/stream-react';
import { cn } from '@/lib/utils';

interface SecureVideoPlayerProps {
  videoId: string;
  className?: string;
}

export function SecureVideoPlayer({ videoId, className }: SecureVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={playerRef} className={cn("relative w-full aspect-video rounded-lg overflow-hidden", className)}>
      <Stream 
        controls
        responsive={false}
        src={videoId}
        primaryColor="#0055FF"
        // Disable right click
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        // Custom player config
        streamRef={(player: any) => {
          if (player) {
            // Disable keyboard shortcuts
            player.config.keyboard = false;
            // Hide download button
            player.config.controlBar.downloadButton = false;
            // Hide sharing options
            player.config.sharing = false;
          }
        }}
      />
    </div>
  );
}
