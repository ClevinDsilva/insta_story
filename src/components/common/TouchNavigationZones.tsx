'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TouchNavigationZonesProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  isPaused?: boolean;
  showControls?: boolean;
}

const TouchNavigationZones = ({
  onPrevious,
  onNext,
  onPause,
  onResume,
  isPaused = false,
  showControls = true,
}: TouchNavigationZonesProps) => {
  const [showLeftFeedback, setShowLeftFeedback] = useState(false);
  const [showRightFeedback, setShowRightFeedback] = useState(false);

  const handleLeftZoneClick = () => {
    setShowLeftFeedback(true);
    setTimeout(() => setShowLeftFeedback(false), 300);
    onPrevious?.();
  };

  const handleRightZoneClick = () => {
    setShowRightFeedback(true);
    setTimeout(() => setShowRightFeedback(false), 300);
    onNext?.();
  };

  const handleCenterClick = () => {
    if (isPaused) {
      onResume?.();
    } else {
      onPause?.();
    }
  };

  return (
    <>
      {/* Left Navigation Zone */}
      <button
        onClick={handleLeftZoneClick}
        className="fixed left-0 top-0 bottom-0 w-1/3 z-10 gesture-zone group"
        aria-label="Previous story"
      >
        {showControls && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${
              showLeftFeedback ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon name="ChevronLeftIcon" size={24} className="text-white" />
            </div>
          </div>
        )}
      </button>

      {/* Center Pause/Resume Zone */}
      <button
        onClick={handleCenterClick}
        className="fixed left-1/3 right-1/3 top-0 bottom-0 z-10 gesture-zone group"
        aria-label={isPaused ? 'Resume story' : 'Pause story'}
      >
        {showControls && isPaused && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 opacity-100 group-hover:opacity-80">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon name="PlayIcon" size={32} className="text-white" variant="solid" />
            </div>
          </div>
        )}
      </button>

      {/* Right Navigation Zone */}
      <button
        onClick={handleRightZoneClick}
        className="fixed right-0 top-0 bottom-0 w-1/3 z-10 gesture-zone group"
        aria-label="Next story"
      >
        {showControls && (
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${
              showRightFeedback ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon name="ChevronRightIcon" size={24} className="text-white" />
            </div>
          </div>
        )}
      </button>
    </>
  );
};

export default TouchNavigationZones;