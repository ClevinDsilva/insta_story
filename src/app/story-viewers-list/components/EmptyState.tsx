import Icon from '@/components/ui/AppIcon';

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
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
  );
};

export default EmptyState;