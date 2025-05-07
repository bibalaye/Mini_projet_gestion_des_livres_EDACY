import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types';
import { api } from '../lib/api';

const TOKEN_KEY = 'token';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fonction pour récupérer le token
  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return !!getToken();
  };

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUser = async (token: string) => {
    try {
      const userData = await api.getMe(token);
      setUser(userData);
      setError(null);
    } catch (error) {
      setError('Session expirée, veuillez vous reconnecter');
      logout();
    }
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser(token);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await api.login(credentials);
      localStorage.setItem(TOKEN_KEY, response.token);
      setUser(response.user);
      setError(null);
      router.push('/livres');
    } catch (error) {
      setError('Email ou mot de passe incorrect');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      const response = await api.register(credentials);
      localStorage.setItem(TOKEN_KEY, response.token);
      setUser(response.user);
      setError(null);
      router.push('/livres');
    } catch (error) {
      setError('Erreur lors de l\'inscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setError(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    getToken,
  };
} 