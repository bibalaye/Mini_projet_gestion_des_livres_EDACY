'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold text-[#2C3E50] opacity-10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-[#2C3E50] mb-4">
                Page en Construction
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Cette page sera bientôt disponible. Nous travaillons dur pour vous offrir une meilleure expérience.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2634] transition-colors duration-200"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Nous revenons bientôt avec de nouvelles fonctionnalités
          </p>
        </div>
      </div>
    </div>
  );
} 