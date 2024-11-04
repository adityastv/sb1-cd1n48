import React from 'react';
import { Users, Image, Calendar, Activity } from 'lucide-react';
import { ProfileMetrics } from '../types/instagram';

interface MetricsDisplayProps {
  metrics: ProfileMetrics;
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon={<Users className="w-5 h-5" />}
        label="Followers"
        value={metrics.followersCount.toLocaleString()}
      />
      <MetricCard
        icon={<Users className="w-5 h-5" />}
        label="Following"
        value={metrics.followingCount.toLocaleString()}
      />
      <MetricCard
        icon={<Image className="w-5 h-5" />}
        label="Posts"
        value={metrics.postsCount.toLocaleString()}
      />
      <MetricCard
        icon={<Activity className="w-5 h-5" />}
        label="Engagement"
        value={`${metrics.engagementRate.toFixed(1)}%`}
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}