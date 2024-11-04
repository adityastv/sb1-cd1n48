import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { PredictionResult } from '../types/instagram';

interface AnalysisResultProps {
  username: string;
  result: PredictionResult;
}

export function AnalysisResult({ username, result }: AnalysisResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-4 mb-6">
        {result.isFake ? (
          <AlertTriangle className="w-8 h-8 text-red-500" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-500" />
        )}
        <div>
          <h3 className="text-xl font-semibold">
            {result.isFake ? 'Potentially Fake Profile' : 'Likely Authentic Profile'}
          </h3>
          <p className="text-gray-600">
            Confidence: {result.confidence.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Risk Factors:</h4>
          <ul className="space-y-2">
            {result.riskFactors.map((factor, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded"
              >
                <span className="w-16 text-sm font-medium">
                  {factor.score}%
                </span>
                <span>{factor.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}