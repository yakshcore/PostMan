export type ActiveTab = 'organizer-dashboard' | 'attendee-view' | 'post-generator' | 'analytics';

export type ToneType = 'grateful' | 'professional' | 'takeaways' | 'excited';

export interface EventConfig {
  id: string;
  name: string;
  organizer: string;
  location: string;
  date: string;
  hashtags: string[];
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  guidancePrompt: string;
  bannerImage: string;
  postsCount: number;
  photosCount: number;
  qualityScore: number;
  shareSlug: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  authorAvatar?: string;
  tone: 'Key Takeaways' | 'Thought Leader' | 'Attendee Hype' | 'Grateful Attendee';
  snippet: string;
  fullContent: string;
  status: 'Published to LinkedIn' | 'Draft Copied';
  timeAgo: string;
  likes: number;
  comments: number;
  reposts: number;
  photos?: string[];
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  context: string;
  badge: string;
  progressPercent: number;
  icon: string;
}
