'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './hooks/useAuth';
import { api, getImageUrl } from './lib/api';
import { Book } from './types';
import Link from 'next/link';
import Modal from './components/Modal';
import { useToast } from './context/ToastContext';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Tous');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { showToast } = useToast();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await api.getBooks();
      setBooks(data);
    } catch (err) {
      setError('Erreur lors de la récupération des livres');
      showToast('error', 'Erreur lors du chargement des livres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      book.titre.toLowerCase().includes(searchLower) ||
      book.auteur.toLowerCase().includes(searchLower) ||
      book.description.toLowerCase().includes(searchLower);
    
    const matchesGenre = selectedGenre === 'Tous' || book.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  const genres = ['Tous', ...new Set(books.map(book => book.genre))];

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddToFavorites = (bookId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId];
      
      showToast(
        'success',
        prev.includes(bookId)
          ? 'Livre retiré des favoris'
          : 'Livre ajouté aux favoris'
      );
      
      return newFavorites;
    });
  };

  const handleShare = async (bookId: number) => {
    try {
      if (navigator.share) {
        const book = books.find(b => b.id === bookId);
        if (book) {
          await navigator.share({
            title: book.titre,
            text: `Découvrez "${book.titre}" par ${book.auteur}`,
            url: window.location.href,
          });
          showToast('success', 'Livre partagé avec succès');
        }
      } else {
        showToast('info', 'Le partage n\'est pas supporté sur votre appareil');
      }
    } catch (error) {
      showToast('error', 'Erreur lors du partage');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2C3E50]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-[#2C3E50] mb-4">
            Découvrez Notre Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            Explorez notre vaste collection de livres et trouvez votre prochaine lecture favorite.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg animate-fade-in">
            {error}
          </div>
        )}

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un livre ou un auteur..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent transition-all font-sans"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-3 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="genre-select" className="text-sm text-gray-600 mb-1 font-sans">Genre</label>
                <select
                  id="genre-select"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent transition-all font-sans"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div 
                className="relative h-80 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {book.image ? (
                  <img
                    src={getImageUrl(book.image as string)}
                    alt={book.titre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image non disponible</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{book.titre}</h3>
                  <p className="text-gray-200 font-sans">{book.auteur}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(book.id);
                  }}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  aria-label={favorites.includes(book.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <svg className="w-5 h-5" fill={favorites.includes(book.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(book.id);
                  }}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  aria-label="Partager"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        onAddToFavorites={handleAddToFavorites}
        onShare={handleShare}
      />
    </div>
  );
}
