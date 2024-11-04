import { useState } from 'react';
import { ProfileAnalysis, InstagramProfile } from '../types/instagram';
import { analyzeProfile, fetchInstagramProfile } from '../services/api';
import { simulateAnalysis, simulateProfile } from '../services/simulation';

export function useProfileAnalysis() {
  const [analysis, setAnalysis] = useState<ProfileAnalysis>({
    username: '',
    result: null,
    loading: false,
  });
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [useRealApi, setUseRealApi] = useState(false);

  const analyze = async (username: string) => {
    setAnalysis(prev => ({ ...prev, username, loading: true, error: undefined }));
    setProfile(null);
    
    try {
      if (useRealApi && import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN) {
        const [result, profileData] = await Promise.all([
          analyzeProfile(username),
          fetchInstagramProfile(username)
        ]);
        setAnalysis(prev => ({ ...prev, result, loading: false }));
        setProfile(profileData);
      } else {
        // Simulate a delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));
        const result = simulateAnalysis(username);
        const profileData = simulateProfile(username);
        setAnalysis(prev => ({ ...prev, result, loading: false }));
        setProfile(profileData);
      }
    } catch (error) {
      setAnalysis(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to analyze profile',
      }));
    }
  };

  return { analysis, profile, analyze, useRealApi, setUseRealApi };
}