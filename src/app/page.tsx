'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import InterestSelection from '@/components/InterestSelection';
import ContentCard from '@/components/ContentCard';
import ExpandedView from '@/components/ExpandedView';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getContentByInterests } from '@/lib/contentService';
import { Category, ContentItem } from '@/lib/supabase';

type OnboardingStep = 'welcome' | 'interests' | 'feed';

export default function Home() {
  const [onboardingComplete, setOnboardingComplete, isStorageLoaded] = useLocalStorage<boolean>(
    'brainwalk-onboarding-complete',
    false
  );
  const [selectedInterests, setSelectedInterests] = useLocalStorage<Category[]>(
    'brainwalk-interests',
    []
  );

  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedContent, setExpandedContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app state based on localStorage
  useEffect(() => {
    if (isStorageLoaded) {
      if (onboardingComplete && selectedInterests.length >= 2) {
        setStep('feed');
        loadContent(selectedInterests);
      } else {
        setStep('welcome');
      }
      setIsLoading(false);
    }
  }, [isStorageLoaded, onboardingComplete, selectedInterests]);

  const loadContent = async (interests: Category[]) => {
    setIsLoading(true);
    try {
      const fetchedContent = await getContentByInterests(interests);
      setContent(fetchedContent);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWelcomeContinue = () => {
    setStep('interests');
  };

  const handleInterestsComplete = async (interests: Category[]) => {
    setSelectedInterests(interests);
    setOnboardingComplete(true);
    setStep('feed');
    await loadContent(interests);
  };

  const handleDeepDive = () => {
    if (content[currentIndex]) {
      setExpandedContent(content[currentIndex]);
    }
  };

  const handleCloseExpanded = () => {
    setExpandedContent(null);
  };

  const handleNext = () => {
    if (currentIndex < content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Show loading state while localStorage is being read
  if (!isStorageLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your walk...</p>
        </div>
      </div>
    );
  }

  // Onboarding: Welcome Screen
  if (step === 'welcome') {
    return <WelcomeScreen onContinue={handleWelcomeContinue} />;
  }

  // Onboarding: Interest Selection
  if (step === 'interests') {
    return <InterestSelection onComplete={handleInterestsComplete} />;
  }

  // Main Feed
  if (step === 'feed') {
    // No content available
    if (content.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-white">
          <div className="max-w-md text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              No content available
            </h2>
            <p className="text-lg text-gray-600">
              We couldn't find any content for your selected interests. Try adjusting your preferences.
            </p>
            <button
              onClick={() => {
                setOnboardingComplete(false);
                setStep('interests');
              }}
              className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Update Interests
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <ContentCard
          content={content[currentIndex]}
          currentIndex={currentIndex}
          totalCount={content.length}
          onDeepDive={handleDeepDive}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        {expandedContent && (
          <ExpandedView content={expandedContent} onClose={handleCloseExpanded} />
        )}
      </>
    );
  }

  return null;
}
