'use client';

import { useEffect, useState, useRef } from 'react';

interface StoryProgressIndicatorProps {
  totalStories: number;
  currentStoryIndex: number;
  duration?: number;
  isPaused?: boolean;
  onComplete?: () => void;
  onSegmentComplete?: (index: number) => void;
}

const StoryProgressIndicator = ({
  totalStories,
  currentStoryIndex,
  duration = 5000,
  isPaused = false,
  onComplete,
  onSegmentComplete,
}: StoryProgressIndicatorProps) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  console.log('ProgressIndicator - Current Index:', currentStoryIndex, 'Progress:', progress, 'Paused:', isPaused);

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Reset progress when story changes
    setProgress(0);
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPaused) {
      console.log('Progress paused');
      return;
    }

    console.log('Starting progress for story:', currentStoryIndex);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      console.log('Progress update:', newProgress, 'for story:', currentStoryIndex);

      if (newProgress >= 100) {
        console.log('Progress COMPLETED for story:', currentStoryIndex);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        // Call the appropriate callback
        setTimeout(() => {
          if (currentStoryIndex === totalStories - 1) {
            console.log('Calling onComplete - last story');
            onComplete?.();
          } else {
            console.log('Calling onSegmentComplete with index:', currentStoryIndex);
            onSegmentComplete?.(currentStoryIndex);
          }
        }, 50);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        console.log('Cleaning up interval for story:', currentStoryIndex);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentStoryIndex, duration, isPaused, totalStories, onComplete, onSegmentComplete]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent">
      {Array.from({ length: totalStories }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{
              width:
                index < currentStoryIndex
                  ? '100%'
                  : index === currentStoryIndex
                  ? `${progress}%`
                  : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgressIndicator;