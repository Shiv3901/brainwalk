'use client';

import { useState } from 'react';
import { Category } from '@/lib/supabase';

const INTERESTS: Category[] = [
  '15th century poetry',
  '1600s history',
  'tech news',
  'short stories',
  'philosophy',
  'science',
];

interface InterestSelectionProps {
  onComplete: (selectedInterests: Category[]) => void;
}

export default function InterestSelection({ onComplete }: InterestSelectionProps) {
  const [selected, setSelected] = useState<Category[]>([]);
  const [error, setError] = useState('');

  const toggleInterest = (interest: Category) => {
    setError('');
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selected.length < 2) {
      setError('Please select at least 2 interests to continue');
      return;
    }
    onComplete(selected);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-serif font-bold text-gray-900">
            What interests you?
          </h2>
          <p className="text-lg text-gray-600">
            Select at least 2 topics to personalize your content feed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INTERESTS.map((interest) => {
            const isSelected = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-105'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium capitalize">
                    {interest}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-white bg-white'
                        : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-gray-900"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            {selected.length} of 6 selected
            {selected.length > 0 && selected.length < 2 && ' (need at least 2)'}
          </p>
          <button
            onClick={handleContinue}
            disabled={selected.length < 2}
            className={`px-10 py-4 rounded-full text-lg font-medium transition-all duration-200 ${
              selected.length >= 2
                ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Feed
          </button>
        </div>
      </div>
    </div>
  );
}
