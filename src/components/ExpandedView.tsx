'use client';

import { ContentItem } from '@/lib/supabase';

interface ExpandedViewProps {
  content: ContentItem;
  onClose: () => void;
}

export default function ExpandedView({ content, onClose }: ExpandedViewProps) {
  const isLiterary = ['15th century poetry', 'short stories', 'philosophy'].includes(content.category);
  const fontClass = isLiterary ? 'font-serif' : 'font-sans';

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-slide-up">
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="font-medium">Back to Feed</span>
          </button>

          {/* Content */}
          <article className="space-y-6">
            {/* Category Tag */}
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                {content.category}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight ${fontClass}`}>
              {content.title}
            </h1>

            {/* Full Content */}
            <div className={`prose prose-lg max-w-none ${fontClass}`}>
              {content.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Bottom Close Button */}
          <div className="pt-8 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue Walking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
