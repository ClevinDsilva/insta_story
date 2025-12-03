'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Viewer {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  viewedAt: string;
}

interface EngagementModalControllerProps {
  isOpen: boolean;
  onClose: () => void;
  viewers: Viewer[];
  totalViews: number;
}

const EngagementModalController = ({
  isOpen,
  onClose,
  viewers,
  totalViews,
}: EngagementModalControllerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredViewers, setFilteredViewers] = useState(viewers);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredViewers(viewers);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredViewers(
        viewers.filter(
          (viewer) =>
            viewer.username.toLowerCase().includes(query) ||
            viewer.fullName.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, viewers]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatViewTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:w-[480px] max-h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-instagram-lg animate-slideUp sm:animate-scaleIn overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Icon name="EyeIcon" size={20} className="text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">
                Viewers
              </h2>
              <span className="text-sm text-muted-foreground font-mono">
                {totalViews}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors haptic-feedback"
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={20} className="text-foreground" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search viewers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>
        </div>

        {/* Viewers List */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
          {filteredViewers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Icon
                name="UserGroupIcon"
                size={48}
                className="text-muted-foreground mb-3"
              />
              <p className="text-sm text-muted-foreground text-center">
                {searchQuery ? 'No viewers found' : 'No viewers yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredViewers.map((viewer) => (
                <div
                  key={viewer.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                >
                  <AppImage
                    src={viewer.avatarUrl}
                    alt={viewer.fullName}
                    className="w-11 h-11 rounded-full object-cover"
                    width={44}
                    height={44}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {viewer.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {viewer.fullName}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                    {formatViewTime(viewer.viewedAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementModalController;