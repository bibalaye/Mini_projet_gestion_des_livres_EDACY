'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-[#2C3E50]">Bibliothèque</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-[#2C3E50] border-b-2 border-[#2C3E50]' 
                  : 'text-gray-600 hover:text-[#2C3E50]'
              }`}
            >
              Accueil
            </Link>
            <Link 
              href="/livres" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/livres') 
                  ? 'text-[#2C3E50] border-b-2 border-[#2C3E50]' 
                  : 'text-gray-600 hover:text-[#2C3E50]'
              }`}
            >
              Livres
            </Link>
            <Link 
              href="/favoris" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/favoris') 
                  ? 'text-[#2C3E50] border-b-2 border-[#2C3E50]' 
                  : 'text-gray-600 hover:text-[#2C3E50]'
              }`}
            >
              Favoris
            </Link>
          </nav>

          {/* Boutons d'authentification Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#2C3E50] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">{user.prenom}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.prenom} {user.nom}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#2C3E50] hover:text-[#1a2634] transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2C3E50] rounded-lg hover:bg-[#1a2634] transition-colors duration-200"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg rounded-b-lg py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/') ? 'text-[#2C3E50]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/livres" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/livres') ? 'text-[#2C3E50]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Livres
              </Link>
              <Link 
                href="/favoris" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/favoris') ? 'text-[#2C3E50]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favoris
              </Link>
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <span className="block text-sm text-gray-600 mb-4">Bonjour, {user.prenom}</span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-[#2C3E50] rounded-lg hover:bg-[#1a2634] transition-colors duration-200"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link 
                    href="/login"
                    className="block w-full px-4 py-2 text-sm font-medium text-[#2C3E50] hover:text-[#1a2634] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    href="/register"
                    className="block w-full px-4 py-2 text-sm font-medium text-white bg-[#2C3E50] rounded-lg hover:bg-[#1a2634] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 