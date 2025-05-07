'use client';

import { useEffect, useRef } from 'react';
import { Book } from '../types';
import { getImageUrl } from '../lib/api';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onAddToFavorites: (bookId: number) => void;
  onShare: (bookId: number) => void;
};

export default function Modal({ isOpen, onClose, book, onAddToFavorites, onShare }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 scale-100 opacity-100 shadow-2xl"
      >
        <div className="relative">
          <div className="relative h-64">
            {book.image && typeof book.image === 'string' ? (
              <img
                src={getImageUrl(book.image)}
                alt={book.titre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image non disponible</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2C3E50] mb-1">
                {book.titre}
              </h2>
              <p className="text-lg text-gray-600 font-sans">{book.auteur}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onAddToFavorites(book.id)}
                className="p-2 bg-[#2C3E50] rounded-full text-white hover:bg-[#1a2634] transition-colors"
                aria-label="Ajouter aux favoris"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                onClick={() => onShare(book.id)}
                className="p-2 bg-[#2C3E50] rounded-full text-white hover:bg-[#1a2634] transition-colors"
                aria-label="Partager"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2C3E50] mb-3">Détails</h3>
              <div className="space-y-2 text-gray-600 font-sans">
                <p><span className="font-medium">Année de publication:</span> {book.annee_publication}</p>
                <p><span className="font-medium">Genre:</span> {book.genre}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2C3E50] mb-3">Description</h3>
              <p className="text-gray-600 font-sans leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 