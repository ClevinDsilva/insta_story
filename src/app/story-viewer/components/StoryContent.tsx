'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StoryContentProps {
  imageUrl: string;
  videoUrl?: string;
  alt: string;
  username: string;
  avatarUrl: string;
  timestamp: string;
  onClose: () => void;
}

const StoryContent = ({
  imageUrl,
  videoUrl,
  alt,
  username,
  avatarUrl,
  timestamp,
  onClose,
}: StoryContentProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formattedTime, setFormattedTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const formatTimestamp = (ts: string) => {
      const date = new Date(ts);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
    };

    setFormattedTime(formatTimestamp(timestamp));
  }, [isHydrated, timestamp]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/80 text-sm">Loading story...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3 text-center p-4">
            <Icon name="ExclamationTriangleIcon" size={48} className="text-white/60" />
            <span className="text-white/80 text-lg font-medium">Failed to load story</span>
            <span className="text-white/60 text-sm">Please try again later</span>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Story Image/Video */}
      <div className={`absolute inset-0 flex items-center justify-center ${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {videoUrl ? (
          <video
            src={videoUrl}
            className="max-w-full max-h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleLoad}
            onError={handleError}
          />
        ) : (
          <AppImage
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            priority
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>

      {/* Top Overlay - User Info */}
      <div className="absolute top-14 left-0 right-0 z-20 bg-gradient-to-b from-black/70 via-black/40 to-transparent pt-4 pb-8 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <AppImage
                src={avatarUrl}
                alt={`${username}'s profile picture`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                width={40}
                height={40}
              />
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {username}
              </span>
              {isHydrated && formattedTime && (
                <span className="text-xs text-white/80 font-mono">
                  {formattedTime}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors haptic-feedback"
            aria-label="Close story"
          >
            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryContent;