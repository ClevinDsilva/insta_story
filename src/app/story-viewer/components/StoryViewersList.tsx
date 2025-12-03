'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StoryViewersListProps {
  viewCount: number;
  onViewersClick: () => void;
}

const StoryViewersList = ({ viewCount, onViewersClick }: StoryViewersListProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handlePressStart = () => {
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  if (!isHydrated) {
    return (
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4">
        <div className="h-12 bg-white/10 backdrop-blur-sm rounded-lg animate-pulse flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-white/20 rounded animate-pulse" />
            <div className="w-20 h-4 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-white/20 rounded animate-pulse" />
            <div className="w-5 h-5 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 px-4">
      <button
        onClick={onViewersClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        className={`w-full flex items-center justify-between px-4 py-3 backdrop-blur-sm rounded-lg transition-all duration-200 haptic-feedback ${
          isPressed 
            ? 'bg-white/30 scale-95' 
            : isHovered 
            ? 'bg-white/20 scale-[1.02]' 
            : 'bg-white/10'
        }`}
        aria-label={`View ${viewCount} story viewers`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-1 rounded-full transition-colors ${
            isHovered ? 'bg-white/20' : 'bg-white/10'
          }`}>
            <Icon 
              name="EyeIcon" 
              size={20} 
              className={`transition-transform ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${viewCount > 0 ? 'text-green-400' : 'text-white'}`} 
            />
          </div>
          <span className="text-sm font-medium text-white">
            Story Viewers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold font-mono px-2 py-1 rounded-full transition-colors ${
            viewCount > 0 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-white/10 text-white/80'
          }`}>
            {viewCount.toLocaleString()}
          </span>
          <Icon 
            name="ChevronRightIcon" 
            size={20} 
            className={`text-white transition-transform ${
              isHovered ? 'translate-x-0.5' : 'translate-x-0'
            }`} 
          />
        </div>
      </button>
    </div>
  );
};

export default StoryViewersList;