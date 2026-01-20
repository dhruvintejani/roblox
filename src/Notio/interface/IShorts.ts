export interface User {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  followers: number;
  bio: string;
}

export interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  duration: number;
  user: User;
  isLiked: boolean;
  isSaved: boolean;
  timestamp: string;
  category: string;
  tags: string[];
  views: number;
  location?: string;
  relatedReels?: string[];
}

export interface CommentNode {
  id: string;
  user: { name: string; avatarUrl: string };
  text: string;
  createdAt: number;
  replies: CommentNode[];
};