import { PredictionResult, InstagramProfile, ProfileMetrics } from '../types/instagram';

function generateRandomMetrics(username: string): ProfileMetrics {
  // Generate consistent but random-looking metrics based on username
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    followersCount: 100 + (hash % 10000),
    followingCount: 50 + (hash % 500),
    postsCount: 10 + (hash % 100),
    accountAge: 30 + (hash % 365),
    engagementRate: 1 + ((hash % 100) / 10),
    hasProfilePicture: true,
    hasWebsite: (hash % 2) === 0,
    hasBio: true
  };
}

export function simulateAnalysis(username: string): PredictionResult {
  const metrics = generateRandomMetrics(username);
  const isFake = (metrics.followersCount / metrics.followingCount > 20) || 
                 (metrics.accountAge < 30 && metrics.followersCount > 1000);
  
  const confidence = 50 + (Math.random() * 40);
  
  const reasons = [];
  if (metrics.followersCount / metrics.followingCount > 20) {
    reasons.push('Suspicious follower to following ratio');
  }
  if (metrics.accountAge < 30 && metrics.followersCount > 1000) {
    reasons.push('High follower count for a new account');
  }
  if (metrics.engagementRate < 1) {
    reasons.push('Low engagement rate');
  }

  return {
    isFake,
    confidence,
    metrics,
    reasons,
    riskFactors: reasons.map(reason => ({
      category: 'Risk',
      score: 15,
      description: reason
    }))
  };
}

export function simulateProfile(username: string): InstagramProfile {
  return {
    username,
    fullName: username.charAt(0).toUpperCase() + username.slice(1),
    profilePicture: `https://source.unsplash.com/300x300/?portrait&${username}`,
    bio: 'This is a simulated profile for demonstration purposes.',
    isVerified: false,
    isPrivate: false
  };
}