import React from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface ModeToggleProps {
  useRealApi: boolean;
  onChange: (value: boolean) => void;
}

export function ModeToggle({ useRealApi, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          !useRealApi
            ? 'bg-purple-100 text-purple-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        <ToggleLeft className="w-5 h-5" />
        Simulation Mode
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          useRealApi
            ? 'bg-purple-100 text-purple-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        <ToggleRight className="w-5 h-5" />
        Real API Mode
      </button>
    </div>
  );
}