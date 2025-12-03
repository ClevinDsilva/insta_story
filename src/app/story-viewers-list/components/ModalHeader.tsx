'use client';

import Icon from '@/components/ui/AppIcon';

interface ModalHeaderProps {
  totalViews: number;
  onClose: () => void;
}

const ModalHeader = ({ totalViews, onClose }: ModalHeaderProps) => {
  return (
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
    </div>
  );
};

export default ModalHeader;