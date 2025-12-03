// types/story.ts
export interface StoryViewer {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  viewedAt: string;
}

export interface Story {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  alt: string;
  timestamp: string;
  duration?: number;
  viewers: StoryViewer[];
}

export interface StoryUser {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  stories: Story[];
}

export interface StorySession {
  storyId: string;
  userId: string;
  viewedAt: string;
  progress: number;
}