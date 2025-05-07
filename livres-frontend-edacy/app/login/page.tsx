'use client';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Gestion de Livres
        </h1>
      </div>
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
} 