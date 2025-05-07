'use client';

import { useState, useEffect } from 'react';
import { Book } from '../types';
import { api, getImageUrl } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import BookForm from '../components/BookForm';
import Modal from '../components/Modal';
import ProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const { user, getToken } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error('Token non trouvé');
      }
      const data = await api.getMyBooks(token);
      setBooks(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des livres:', err);
      showToast('error', 'Erreur lors de la récupération des livres');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (book: Omit<Book, 'id' | 'user_id'>) => {
    try {
      const token = getToken();
      if (!token) return;
      
      await api.createBook(book, token);
      setShowFormModal(false);
      showToast('success', 'Livre créé avec succès');
      fetchBooks();
    } catch (err) {
      showToast('error', 'Erreur lors de la création du livre');
    }
  };

  const handleUpdateBook = async (book: Omit<Book, 'id' | 'user_id'>) => {
    try {
      const token = getToken();
      if (!token || !selectedBook) return;
      
      await api.updateBook(selectedBook.id, book, token);
      setShowFormModal(false);
      setSelectedBook(null);
      showToast('success', 'Livre mis à jour avec succès');
      fetchBooks();
    } catch (err) {
      showToast('error', 'Erreur lors de la mise à jour du livre');
    }
  };

  const handleDeleteBook = async () => {
    try {
      const token = getToken();
      if (!token || !bookToDelete) return;
      
      await api.deleteBook(bookToDelete.id, token);
      setShowDeleteModal(false);
      setBookToDelete(null);
      showToast('success', 'Livre supprimé avec succès');
      fetchBooks();
    } catch (err) {
      showToast('error', 'Erreur lors de la suppression du livre');
    }
  };

 

  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!user ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div className="max-w-2xl mx-auto px-4">
                <svg
                  className="mx-auto h-16 w-16 text-[#2C3E50] mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h2 className="text-3xl font-serif font-bold text-[#2C3E50] mb-4">
                  Accès Restreint
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Pour gérer vos livres, vous devez être connecté à votre compte.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/login"
                    className="px-6 py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2634] transition-colors duration-200"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-3 border-2 border-[#2C3E50] text-[#2C3E50] rounded-lg hover:bg-[#2C3E50] hover:text-white transition-colors duration-200"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#2C3E50]">Gestion des Livres</h1>
                <button
                  onClick={() => {
                    setSelectedBook(null);
                    setShowFormModal(true);
                  }}
                  className="px-6 py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2634] transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <svg 
                    className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Ajouter un livre</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 group">
                      {book.image && typeof book.image === 'string' ? (
                        <img
                          src={getImageUrl(book.image)}
                          alt={book.titre}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">Image non disponible</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#2C3E50] mb-2">{book.titre}</h2>
                      <p className="text-gray-600 mb-2">Auteur: {book.auteur}</p>
                      <p className="text-gray-600 mb-2">Année: {book.annee_publication}</p>
                      <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                      <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            setShowFormModal(true);
                          }}
                          className="px-4 py-2 text-[#2C3E50] hover:bg-[#2C3E50]/10 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => {
                            setBookToDelete(book);
                            setShowDeleteModal(true);
                          }}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {books.length === 0 && (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun livre trouvé</h3>
                  <p className="mt-1 text-gray-500">
                    Commencez par ajouter un nouveau livre à votre collection.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de formulaire */}
        {showFormModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#2C3E50]">
                    {selectedBook ? 'Modifier le livre' : 'Ajouter un livre'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowFormModal(false);
                      setSelectedBook(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Fermer la fenêtre"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                  <BookForm
                    initialData={selectedBook || undefined}
                    onSubmit={selectedBook ? handleUpdateBook : handleCreateBook}
                    onCancel={() => {
                      setShowFormModal(false);
                      setSelectedBook(null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmation de suppression */}
        {showDeleteModal && bookToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-xs w-full mx-4">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-[#2C3E50]">Confirmer la suppression</h2>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setBookToDelete(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Fermer la fenêtre"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-red-500 mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-center text-sm">
                    Êtes-vous sûr de vouloir supprimer le livre "{bookToDelete.titre}" ?
                    Cette action est irréversible.
                  </p>
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setBookToDelete(null);
                      }}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDeleteBook}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 