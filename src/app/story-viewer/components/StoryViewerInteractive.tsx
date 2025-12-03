'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import StoryProgressIndicator from '@/components/common/StoryProgressIndicator';
import TouchNavigationZones from '@/components/common/TouchNavigationZones';
import EngagementModalController from '@/components/common/EngagementModalController';
import StoryContent from './StoryContent';
import StoryViewersList from './StoryViewersList';

interface Viewer {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  viewedAt: string;
}

interface Story {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  alt: string;
  timestamp: string;
  viewers: Viewer[];
}

interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  stories: Story[];
}

interface StoryViewerInteractiveProps {
  initialUser: User;
}

// Session Storage utility functions
const StoryViewTracking = {
  markStoryAsViewed: (storyId: string, userId: string, username: string, fullName: string, avatarUrl: string) => {
    const viewKey = `story_view_${storyId}_${userId}`;
    const hasViewed = sessionStorage.getItem(viewKey);
    
    if (!hasViewed) {
      const viewData = {
        storyId,
        userId,
        username,
        fullName,
        avatarUrl,
        viewedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(viewKey, JSON.stringify(viewData));
      return true;
    }
    return false;
  },

  getStoryViews: (storyId: string): Viewer[] => {
    const views: Viewer[] = [];
    const sessionKeys = Object.keys(sessionStorage);
    
    sessionKeys.forEach(key => {
      if (key.startsWith(`story_view_${storyId}_`)) {
        try {
          const viewData = JSON.parse(sessionStorage.getItem(key) || '{}');
          if (viewData.userId) {
            views.push({
              id: viewData.userId,
              username: viewData.username,
              fullName: viewData.fullName,
              avatarUrl: viewData.avatarUrl,
              viewedAt: viewData.viewedAt,
            });
          }
        } catch (error) {
          console.error('Error parsing view data:', error);
        }
      }
    });
    
    return views.sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime());
  },

  getTotalViewsCount: (storyId: string): number => {
    const sessionKeys = Object.keys(sessionStorage);
    return sessionKeys.filter(key => key.startsWith(`story_view_${storyId}_`)).length;
  },

  clearStoryViews: (storyId: string) => {
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.startsWith(`story_view_${storyId}_`)) {
        sessionStorage.removeItem(key);
      }
    });
  },
};

const StoryViewerInteractive = ({ initialUser }: StoryViewerInteractiveProps) => {
  const router = useRouter();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showViewersModal, setShowViewersModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sessionViewers, setSessionViewers] = useState<Viewer[]>([]);
  const [totalSessionViews, setTotalSessionViews] = useState(0);

  const currentStory = initialUser.stories[currentStoryIndex];
  const totalStories = initialUser.stories.length;

  // Track story view in Session Storage
  const trackStoryView = useCallback((storyId: string) => {
    if (!isHydrated) return;

    // Mock current user data - in real app, this would come from auth context
    const currentUser = {
      id: 'current_user_001',
      username: 'you',
      fullName: 'Current User',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    };

    const isNewView = StoryViewTracking.markStoryAsViewed(
      storyId,
      currentUser.id,
      currentUser.username,
      currentUser.fullName,
      currentUser.avatarUrl
    );

    if (isNewView) {
      console.log('📊 New view tracked for story:', storyId);
      // Update viewers list and count
      const views = StoryViewTracking.getStoryViews(storyId);
      const totalViews = StoryViewTracking.getTotalViewsCount(storyId);
      setSessionViewers(views);
      setTotalSessionViews(totalViews);
    }
  }, [isHydrated]);

  // Load session viewers when story changes
  useEffect(() => {
    if (!isHydrated || !currentStory) return;

    const views = StoryViewTracking.getStoryViews(currentStory.id);
    const totalViews = StoryViewTracking.getTotalViewsCount(currentStory.id);
    setSessionViewers(views);
    setTotalSessionViews(totalViews);

    // Track the view
    trackStoryView(currentStory.id);
  }, [isHydrated, currentStory, trackStoryView]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fallback automatic progression timer
  useEffect(() => {
    if (!isHydrated || isPaused || showViewersModal) {
      return;
    }

    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isHydrated, isPaused, showViewersModal, currentStoryIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isHydrated) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (showViewersModal) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isHydrated, showViewersModal, currentStoryIndex, totalStories]);

  const handlePrevious = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      handleClose();
    }
  }, [currentStoryIndex]);

  const handleNext = useCallback(() => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  }, [currentStoryIndex, totalStories]);

  const handleSegmentComplete = useCallback((segmentIndex: number) => {
    if (segmentIndex === currentStoryIndex) {
      if (currentStoryIndex < totalStories - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else {
        handleClose();
      }
    }
  }, [currentStoryIndex, totalStories]);

  const handleComplete = useCallback(() => {
    handleClose();
  }, []);

  const handleClose = useCallback(() => {
    router.push('/story-viewers-list');
  }, [router]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleViewersClick = useCallback(() => {
    setIsPaused(true);
    setShowViewersModal(true);
  }, []);

  const handleCloseViewersModal = useCallback(() => {
    setShowViewersModal(false);
    setIsPaused(false);
  }, []);

  // Combine original viewers with session storage viewers
  const allViewers = [...currentStory.viewers, ...sessionViewers];
  const uniqueViewers = allViewers.filter((viewer, index, self) => 
    index === self.findIndex(v => v.id === viewer.id)
  );
  const totalViews = uniqueViewers.length;

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/80 text-lg">Loading stories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Story Progress Indicator */}
      <StoryProgressIndicator
        key={currentStoryIndex}
        totalStories={totalStories}
        currentStoryIndex={currentStoryIndex}
        duration={5000}
        isPaused={isPaused}
        onComplete={handleComplete}
        onSegmentComplete={handleSegmentComplete}
      />

      {/* Story Content */}
      <StoryContent
        imageUrl={currentStory.imageUrl}
        videoUrl={currentStory.videoUrl}
        alt={currentStory.alt}
        username={initialUser.username}
        avatarUrl={initialUser.avatarUrl}
        timestamp={currentStory.timestamp}
        onClose={handleClose}
      />

      {/* Touch Navigation Zones */}
      <TouchNavigationZones
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPause={handlePause}
        onResume={handleResume}
        isPaused={isPaused}
        showControls={true}
      />

      {/* Story Viewers List */}
      <StoryViewersList
        viewCount={totalViews}
        onViewersClick={handleViewersClick}
      />

      {/* Engagement Modal */}
      <EngagementModalController
        isOpen={showViewersModal}
        onClose={handleCloseViewersModal}
        viewers={uniqueViewers}
        totalViews={totalViews}
      />

      {/* Session Storage Stats Overlay */}
      
    </div>
  );
};

export default StoryViewerInteractive;