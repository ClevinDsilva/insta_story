import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StoryViewerInteractive from './components/StoryViewerInteractive';

export const metadata: Metadata = {
  title: 'Story Viewer - Instagram Stories Clone',
  description: 'View Instagram-style stories with tap navigation, progress tracking, and engagement metrics in an immersive full-screen experience.'
};

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

export default function StoryViewerPage() {
  // Enhanced mock data with 8 different stories
  const mockUser: User = {
    id: 'user_001',
    username: 'travel_explorer',
    fullName: 'Sarah Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    stories: [
      {
        id: 'story_001',
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        alt: 'Beautiful mountain landscape with snow-capped peaks during golden hour',
        timestamp: '2025-11-21T03:30:00.000Z',
        viewers: [
          {
            id: 'viewer_001',
            username: 'john_doe',
            fullName: 'John Doe',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T03:35:00.000Z'
          },
          {
            id: 'viewer_002',
            username: 'emily_smith',
            fullName: 'Emily Smith',
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T03:40:00.000Z'
          },
          {
            id: 'viewer_003',
            username: 'mike_wilson',
            fullName: 'Michael Wilson',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T03:45:00.000Z'
          }
        ]
      },
      
      {
        id: 'story_003',
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: 'Beautiful scenic drive through mountains - video content',
        timestamp: '2025-11-21T04:30:00.000Z',
        viewers: [
          {
            id: 'viewer_002',
            username: 'emily_smith',
            fullName: 'Emily Smith',
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T04:35:00.000Z'
          },
          {
            id: 'viewer_004',
            username: 'lisa_brown',
            fullName: 'Lisa Brown',
            avatarUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T04:40:00.000Z'
          }
        ]
      },
      {
        id: 'story_004',
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        alt: 'Northern lights dancing in the night sky over a frozen lake',
        timestamp: '2025-11-21T05:00:00.000Z',
        viewers: [
          {
            id: 'viewer_001',
            username: 'john_doe',
            fullName: 'John Doe',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T05:05:00.000Z'
          },
          {
            id: 'viewer_005',
            username: 'david_lee',
            fullName: 'David Lee',
            avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T05:10:00.000Z'
          }
        ]
      },
      {
        id: 'story_005',
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: 'Colorful hot air balloons floating in morning sky - video content',
        timestamp: '2025-11-21T05:20:00.000Z',
        viewers: [
          {
            id: 'viewer_003',
            username: 'mike_wilson',
            fullName: 'Michael Wilson',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T05:25:00.000Z'
          },
          {
            id: 'viewer_006',
            username: 'anna_garcia',
            fullName: 'Anna Garcia',
            avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
            viewedAt: '2025-11-21T05:30:00.000Z'
          }
        ]
      },
      
    ]
  };

  return (
    <>
      <Header />
      <StoryViewerInteractive initialUser={mockUser} />
    </>
  );
}