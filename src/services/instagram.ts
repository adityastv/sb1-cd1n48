import axios from 'axios';
import { differenceInDays, parseISO } from 'date-fns';
import { ProfileMetrics, InstagramProfile } from '../types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v12.0';
const ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

interface InstagramAPIResponse {
  id: string;
  username: string;
  media_count: number;
  followers_count: number;
  follows_count: number;
  biography: string;
  profile_picture_url: string;
  name: string;
  is_verified: boolean;
  is_private: boolean;
  media: {
    data: Array<{
      id: string;
      timestamp: string;
      like_count: number;
      comments_count: number;
    }>;
  };
}

export async function fetchInstagramData(username: string) {
  try {
    const response = await axios.get<InstagramAPIResponse>(
      `${INSTAGRAM_API_URL}/users/${username}`,
      {
        params: {
          fields: 'id,username,media_count,followers_count,follows_count,biography,profile_picture_url,name,is_verified,is_private,media{id,timestamp,like_count,comments_count}',
          access_token: ACCESS_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Instagram profile not found');
    }
    throw new Error('Failed to fetch Instagram data');
  }
}

export async function getProfileMetrics(data: InstagramAPIResponse): Promise<ProfileMetrics> {
  const recentPosts = data.media.data.slice(0, 10);
  const totalEngagement = recentPosts.reduce(
    (sum, post) => sum + post.like_count + post.comments_count,
    0
  );
  const avgEngagement = totalEngagement / recentPosts.length;
  const engagementRate = (avgEngagement / data.followers_count) * 100;

  // Calculate account age from the first post
  const oldestPost = data.media.data[data.media.data.length - 1];
  const accountAge = oldestPost 
    ? differenceInDays(new Date(), parseISO(oldestPost.timestamp))
    : 0;

  return {
    followersCount: data.followers_count,
    followingCount: data.follows_count,
    postsCount: data.media_count,
    accountAge,
    engagementRate,
    hasProfilePicture: Boolean(data.profile_picture_url),
    hasWebsite: data.biography.includes('http'),
    hasBio: Boolean(data.biography.trim()),
  };
}

export async function getInstagramProfile(data: InstagramAPIResponse): Promise<InstagramProfile> {
  return {
    username: data.username,
    fullName: data.name,
    profilePicture: data.profile_picture_url,
    bio: data.biography,
    isVerified: data.is_verified,
    isPrivate: data.is_private,
  };
}

export function analyzePostFrequency(data: InstagramAPIResponse) {
  if (data.media.data.length < 2) return 0;

  const dates = data.media.data.map(post => parseISO(post.timestamp));
  const totalDays = differenceInDays(dates[0], dates[dates.length - 1]);
  return data.media.data.length / (totalDays || 1);
}

export function detectSpamPatterns(data: InstagramAPIResponse) {
  const patterns = {
    suspiciousHashtags: 0,
    identicalComments: 0,
    rapidPosting: 0,
  };

  // Analyze post captions and comments for spam patterns
  data.media.data.forEach((post, index) => {
    if (index > 0) {
      const timeDiff = differenceInDays(
        parseISO(post.timestamp),
        parseISO(data.media.data[index - 1].timestamp)
      );
      if (timeDiff < 1/24) { // Less than 1 hour between posts
        patterns.rapidPosting++;
      }
    }
  });

  return patterns;
}