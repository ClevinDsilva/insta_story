'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ModalHeader from './ModalHeader';
import SearchBar from './SearchBar';
import ViewerListItem from './ViewerListItem';
import EmptyState from './EmptyState';

interface Viewer {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  avatarAlt: string;
  viewedAt: string;
}

interface ViewersListInteractiveProps {
  viewers: Viewer[];
  totalViews: number;
}

const ViewersListInteractive = ({ viewers, totalViews }: ViewersListInteractiveProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredViewers, setFilteredViewers] = useState(viewers);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

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
  }, [searchQuery, viewers, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/story-viewer');
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [router, isHydrated]);

  const handleClose = () => {
    router.push('/story-viewer');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBackdropClick = () => {
    router.push('/story-viewer');
  };

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative w-full sm:w-[480px] max-h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-instagram-lg overflow-hidden">
          <ModalHeader totalViews={totalViews} onClose={handleClose} />
          <SearchBar onSearch={handleSearch} />
          <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
            <div className="divide-y divide-border">
              {viewers.slice(0, 5).map((viewer) => (
                <ViewerListItem
                  key={viewer.id}
                  username={viewer.username}
                  fullName={viewer.fullName}
                  avatarUrl={viewer.avatarUrl}
                  avatarAlt={viewer.avatarAlt}
                  viewedAt={viewer.viewedAt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div className="relative w-full sm:w-[480px] max-h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-instagram-lg animate-slideUp sm:animate-scaleIn overflow-hidden">
        <ModalHeader totalViews={totalViews} onClose={handleClose} />
        <SearchBar onSearch={handleSearch} />

        <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
          {filteredViewers.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <div className="divide-y divide-border">
              {filteredViewers.map((viewer) => (
                <ViewerListItem
                  key={viewer.id}
                  username={viewer.username}
                  fullName={viewer.fullName}
                  avatarUrl={viewer.avatarUrl}
                  avatarAlt={viewer.avatarAlt}
                  viewedAt={viewer.viewedAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewersListInteractive;