import React from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import { InstagramProfile } from '../types/instagram';

interface ProfilePreviewProps {
  profile: InstagramProfile;
}

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-4">
        <img
          src={profile.profilePicture}
          alt={profile.username}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            {profile.isVerified && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
            {profile.isPrivate && <Lock className="w-5 h-5 text-gray-500" />}
          </div>
          <p className="text-gray-600">{profile.fullName}</p>
          <p className="text-sm text-gray-500 mt-1">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}