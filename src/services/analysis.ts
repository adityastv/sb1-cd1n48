import { ProfileMetrics } from '../types/instagram';
import { InstagramAPIResponse, analyzePostFrequency, detectSpamPatterns } from './instagram';

export function calculateRiskScore(metrics: ProfileMetrics, apiData: InstagramAPIResponse): number {
  let riskScore = 0;
  
  // Follower to Following Ratio Analysis
  const followRatio = metrics.followersCount / metrics.followingCount;
  if (followRatio > 10) riskScore += 15; // Unusually high followers
  if (followRatio < 0.1) riskScore += 10; // Following too many accounts
  
  // Account Age Analysis
  if (metrics.accountAge < 30) riskScore += 15;
  if (metrics.accountAge < 7) riskScore += 10;
  
  // Engagement Rate Analysis
  if (metrics.engagementRate < 1) riskScore += 15; // Very low engagement
  if (metrics.engagementRate > 20) riskScore += 10; // Suspiciously high engagement
  
  // Profile Completeness
  if (!metrics.hasProfilePicture) riskScore += 20;
  if (!metrics.hasBio) riskScore += 10;
  
  // Post Frequency Analysis
  const postFrequency = analyzePostFrequency(apiData);
  if (postFrequency > 5) riskScore += 15; // Too many posts per day
  if (postFrequency < 0.01) riskScore += 5; // Very inactive
  
  // Spam Pattern Analysis
  const spamPatterns = detectSpamPatterns(apiData);
  if (spamPatterns.rapidPosting > 3) riskScore += 15;
  
  return Math.min(riskScore, 100);
}

export function getRiskFactors(metrics: ProfileMetrics, apiData: InstagramAPIResponse) {
  const factors = [];
  const followRatio = metrics.followersCount / metrics.followingCount;
  
  if (followRatio > 10) {
    factors.push({
      category: 'Follower Ratio',
      score: 15,
      description: 'Unusually high number of followers compared to following'
    });
  }
  
  if (metrics.accountAge < 30) {
    factors.push({
      category: 'Account Age',
      score: 15,
      description: 'Recently created account'
    });
  }
  
  if (metrics.engagementRate < 1) {
    factors.push({
      category: 'Engagement',
      score: 15,
      description: 'Extremely low engagement rate'
    });
  }

  const spamPatterns = detectSpamPatterns(apiData);
  if (spamPatterns.rapidPosting > 3) {
    factors.push({
      category: 'Posting Pattern',
      score: 15,
      description: 'Unusual rapid posting behavior detected'
    });
  }
  
  return factors;
}