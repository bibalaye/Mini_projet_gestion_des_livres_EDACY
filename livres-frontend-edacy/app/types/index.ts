export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
}

export interface Book {
  id: number;
  titre: string;
  auteur: string;
  annee_publication: number;
  genre: string;
  description: string;
  image: string | null | File;
  user_id: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  nom: string;
  prenom: string;
} 