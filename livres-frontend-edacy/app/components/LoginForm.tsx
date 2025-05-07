'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const validateForm = () => {
    if (!email) {
      showToast('error', 'Veuillez entrer votre email');
      return false;
    }
    if (!password) {
      showToast('error', 'Veuillez entrer votre mot de passe');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('error', 'Veuillez entrer un email valide');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login({ email, password });
      showToast('success', 'Connexion réussie !');
      router.push('/');
    } catch (err) {
      showToast('error', 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#2C3E50] mb-2">Connexion</h2>
        <p className="text-gray-600">Bienvenue dans votre bibliothèque personnelle</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent transition-all"
            placeholder="votre@email.com"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent transition-all"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2C3E50] text-white py-3 px-4 rounded-lg hover:bg-[#1a2634] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Connexion en cours...
            </div>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>
    </div>
  );
} 