import { AuthResponse, Book, LoginCredentials, RegisterCredentials, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Fonction pour obtenir l'URL complète d'une image
export const getImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) return null;
  return `${BACKEND_URL}${imagePath}`;
};

// Fonction pour ajouter le token aux headers
const getHeaders = (token?: string, isFormData: boolean = false) => {
  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Fonction pour gérer les réponses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};

export const api = {
  // Authentification
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async getMe(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders(token),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Livres
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_URL}/livres`);
    return handleResponse(response);
  },

  async getMyBooks(token: string): Promise<Book[]> {
    const response = await fetch(`${API_URL}/livres/me/livres`, {
      headers: getHeaders(token),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async getBook(id: number, token: string): Promise<Book> {
    const response = await fetch(`${API_URL}/livres/${id}`, {
      headers: getHeaders(token),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async createBook(book: Omit<Book, 'id' | 'user_id'>, token: string): Promise<Book> {
    const formData = new FormData();
    
    // Ajouter les champs texte
    Object.entries(book).forEach(([key, value]) => {
      if (key !== 'image' && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    // Ajouter le fichier image s'il existe
    if (book.image && typeof book.image === 'object') {
      formData.append('image', book.image);
    }

    const response = await fetch(`${API_URL}/livres`, {
      method: 'POST',
      headers: getHeaders(token, true),
      body: formData,
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async updateBook(id: number, book: Partial<Book>, token: string): Promise<Book> {
    const formData = new FormData();
    
    // Ajouter les champs texte
    Object.entries(book).forEach(([key, value]) => {
      if (key !== 'image' && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Ajouter le fichier image s'il existe
    if (book.image && typeof book.image === 'object') {
      formData.append('image', book.image);
    }

    const response = await fetch(`${API_URL}/livres/${id}`, {
      method: 'PUT',
      headers: getHeaders(token, true),
      body: formData,
      credentials: 'include',
    });
    return handleResponse(response);
  },

  async deleteBook(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/livres/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
      credentials: 'include',
    });
    return handleResponse(response);
  },
}; 