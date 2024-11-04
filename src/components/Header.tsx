import React from 'react';
import { Instagram, Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Instagram className="w-8 h-8 text-purple-600" />
        <Shield className="w-8 h-8 text-purple-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Instagram Profile Analyzer
      </h1>
      <p className="text-gray-600">
        Detect potential fake profiles using advanced analysis
      </p>
    </header>
  );
}