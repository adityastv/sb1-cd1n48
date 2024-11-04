export interface ProfileMetrics {
  followersCount: number;
  followingCount: number;
  postsCount: number;
  accountAge: number;
  engagementRate: number;
  hasProfilePicture: boolean;
  hasWebsite: boolean;
  hasBio: boolean;
}

export interface RiskFactor {
  category: string;
  score: number;
  description: string;
}

export interface PredictionResult {
  isFake: boolean;
  confidence: number;
  metrics: ProfileMetrics;
  reasons: string[];
  riskFactors: RiskFactor[];
}

export interface ProfileAnalysis {
  username: string;
  result: PredictionResult | null;
  loading: boolean;
  error?: string;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  profilePicture: string;
  bio: string;
  isVerified: boolean;
  isPrivate: boolean;
}