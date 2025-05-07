import { useState, useRef } from 'react';
import { Book } from '../types';
import { getImageUrl } from '../lib/api';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (book: Omit<Book, 'id' | 'user_id'>) => Promise<void>;
  onCancel: () => void;
}

export default function BookForm({ initialData, onSubmit, onCancel }: BookFormProps) {
  const [titre, setTitre] = useState(initialData?.titre || '');
  const [auteur, setAuteur] = useState(initialData?.auteur || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [annee_publication, setAnneePublication] = useState(initialData?.annee_publication || new Date().getFullYear());
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.image ? getImageUrl(initialData.image as string) : '');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Créer une URL pour la prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({
        titre,
        auteur,
        description,
        annee_publication,
        genre,
        image: image || '',
      });
    } catch (err) {
      setError('Erreur lors de la sauvegarde du livre');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialData ? 'Modifier le livre' : 'Ajouter un livre'}
      </h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
            Titre
          </label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="auteur">
            Auteur
          </label>
          <input
            type="text"
            id="auteur"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="annee_publication">
            Année de publication
          </label>
          <input
            type="number"
            id="annee_publication"
            value={annee_publication}
            onChange={(e) => setAnneePublication(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image du livre
          </label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={!initialData}
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Aperçu"
                className="max-w-xs max-h-48 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {initialData ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
} 