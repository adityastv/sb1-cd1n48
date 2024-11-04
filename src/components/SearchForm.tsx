import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (username: string) => void;
  loading: boolean;
}

export function SearchForm({ onSubmit, loading }: SearchFormProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
}