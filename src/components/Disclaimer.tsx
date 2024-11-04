import React from 'react';

export function Disclaimer() {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>This tool is available in two modes:</p>
      <p className="mt-2">
        <strong>Simulation Mode:</strong> Uses generated data for demonstration
      </p>
      <p>
        <strong>Real API Mode:</strong> Requires Instagram API credentials for live data
      </p>
      <p className="mt-4">For accurate verification, always refer to Instagram's official verification system.</p>
    </div>
  );
}