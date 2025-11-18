'use client';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
            Brainwalk
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light italic">
            A mindful stroll through ideas worth knowing
          </p>
        </div>

        <div className="space-y-6 pt-8">
          <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
            Discover curated content tailored to your interests.
            One thoughtful piece at a time. No endless scrolling,
            no distractions—just meaningful ideas.
          </p>

          <button
            onClick={onContinue}
            className="mt-8 px-10 py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Begin Your Walk
          </button>
        </div>
      </div>
    </div>
  );
}
