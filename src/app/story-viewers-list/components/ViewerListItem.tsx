'use client';

import AppImage from '@/components/ui/AppImage';

interface ViewerListItemProps {
  username: string;
  fullName: string;
  avatarUrl: string;
  avatarAlt: string;
  viewedAt: string;
}

const ViewerListItem = ({ username, fullName, avatarUrl, avatarAlt, viewedAt }: ViewerListItemProps) => {
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
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors">
      <AppImage
        src={avatarUrl}
        alt={avatarAlt}
        className="w-11 h-11 rounded-full object-cover"
        width={44}
        height={44}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {username}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {fullName}
        </p>
      </div>
      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
        {formatViewTime(viewedAt)}
      </span>
    </div>
  );
};

export default ViewerListItem;