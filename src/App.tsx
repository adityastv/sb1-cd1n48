import React from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { AnalysisResult } from './components/AnalysisResult';
import { ProfilePreview } from './components/ProfilePreview';
import { MetricsDisplay } from './components/MetricsDisplay';
import { Disclaimer } from './components/Disclaimer';
import { ModeToggle } from './components/ModeToggle';
import { useProfileAnalysis } from './hooks/useProfileAnalysis';

export function App() {
  const { analysis, profile, analyze, useRealApi, setUseRealApi } = useProfileAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Header />
          <ModeToggle useRealApi={useRealApi} onChange={setUseRealApi} />
          <SearchForm onSubmit={analyze} loading={analysis.loading} />
          
          {profile && <ProfilePreview profile={profile} />}
          
          {analysis.result && (
            <>
              <MetricsDisplay metrics={analysis.result.metrics} />
              <AnalysisResult 
                username={analysis.username} 
                result={analysis.result} 
              />
            </>
          )}
          
          {analysis.error && (
            <div className="text-red-500 text-center mb-6">
              {analysis.error}
            </div>
          )}
          
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}