'use client';

import { ContentItem } from '@/lib/supabase';

interface ContentCardProps {
  content: ContentItem;
  currentIndex: number;
  totalCount: number;
  onDeepDive: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ContentCard({
  content,
  currentIndex,
  totalCount,
  onDeepDive,
  onNext,
  onPrevious,
}: ContentCardProps) {
  // Determine font style based on category
  const isLiterary = ['15th century poetry', 'short stories', 'philosophy'].includes(content.category);
  const fontClass = isLiterary ? 'font-serif' : 'font-sans';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-2xl w-full space-y-8">
        {/* Counter */}
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">
            {currentIndex + 1} of {totalCount}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-6">
            {/* Category Tag */}
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                {content.category}
              </span>
            </div>

            {/* Title */}
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 leading-tight ${fontClass}`}>
              {content.title}
            </h2>

            {/* Preview */}
            <p className={`text-lg md:text-xl text-gray-700 leading-relaxed ${fontClass}`}>
              {content.preview}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={onDeepDive}
                className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Deep Dive
              </button>
              <button
                onClick={onNext}
                className="flex-1 px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 hover:scale-105 transform transition-all duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              currentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              currentIndex === totalCount - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
