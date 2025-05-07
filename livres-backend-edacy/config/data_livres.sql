-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.4.3 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table livres_db.livres : ~11 rows (environ)
INSERT INTO `livres` (`id`, `titre`, `auteur`, `annee_publication`, `genre`, `description`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
	(7, 'Harry Potter à l\'école des sorciers', 'J.K. Rowling', 1997, 'Fantasy', 'Premier tome de la célèbre saga du jeune sorcier Harry Potter.', '/uploads/image-1746621512542-596143075.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:38:32'),
	(8, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 'Conte philosophique', 'Une rencontre entre un aviateur et un petit prince venu d’une autre planète.', '/uploads/image-1746621788608-78204954.jpeg', 1, '2025-05-07 12:34:43', '2025-05-07 12:43:08'),
	(9, '1984', 'George Orwell', 1949, 'Science-fiction / Dystopie', 'Un roman d’anticipation qui dénonce le totalitarisme et la surveillance.', '/uploads/image-1746621834504-659846561.jpeg', 1, '2025-05-07 12:34:43', '2025-05-07 12:43:54'),
	(10, 'L\'Alchimiste', 'Paulo Coelho', 1988, 'Roman initiatique', 'L’histoire de Santiago, un jeune berger en quête de trésor et de destin.', '/uploads/image-1746621878010-704845194.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:44:38'),
	(11, 'Les Misérables', 'Victor Hugo', 1862, 'Roman historique / Drame', 'Les aventures de Jean Valjean dans la France du XIXe siècle.', '/uploads/image-1746621926476-476786542.jpeg', 1, '2025-05-07 12:34:43', '2025-05-07 12:45:26'),
	(12, 'Orgueil et Préjugés', 'Jane Austen', 1813, 'Roman sentimental', 'Une histoire d’amour et de mœurs dans l’Angleterre du XIXe siècle.', '/uploads/image-1746621985425-644880106.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:46:25'),
	(13, 'Le Seigneur des Anneaux', 'J.R.R. Tolkien', 1954, 'Fantasy épique', 'Une quête pour détruire l’Anneau unique et sauver la Terre du Milieu.', '/uploads/image-1746622032510-955221673.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:47:12'),
	(14, 'Da Vinci Code', 'Dan Brown', 2003, 'Thriller', 'Une enquête mêlant art, religion et société secrète.', '/uploads/image-1746622083665-937243550.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:48:03'),
	(15, 'Autant en emporte le vent', 'Margaret Mitchell', 1936, 'Roman historique', 'Une saga romantique pendant la guerre de Sécession.', '/uploads/image-1746622162709-298130195.jpeg', 1, '2025-05-07 12:34:43', '2025-05-07 12:49:22'),
	(16, 'Cinquante nuances de Grey', 'E.L. James', 2011, 'Romance / Érotique', 'La relation complexe entre Anastasia Steele et Christian Grey.', '/uploads/image-1746622204986-898476991.jpg', 1, '2025-05-07 12:34:43', '2025-05-07 12:50:04'),
	(37, 'Guide de création d\'une plateforme marketplace avec Jhipster', 'abiboulaye', 2025, 'Développement ', 'Dans cet e-book, je vous guide pas à pas pour concevoir une plateforme moderne, sécurisée et scalable à l’aide de JHipster, un framework puissant combinant Spring Boot et Angular/React', '/uploads/image-1746625340055-719979891.png', 4, '2025-05-07 13:42:20', '2025-05-07 13:42:20');

-- Listage des données de la table livres_db.users : ~2 rows (environ)
INSERT INTO `users` (`id`, `email`, `password`, `nom`, `prenom`, `created_at`, `updated_at`) VALUES
	(1, 'test@test.com', '$2a$10$5QAvHSk8f.afWJnfYHf9t.eQg9gvtf.0I0WhSIxuoevI2O1s4A4m6', 'test', 'utilisateur', '2025-05-07 12:32:36', '2025-05-07 12:32:57'),
	(4, 'test@gmail.com', '$2a$10$zIs/3K.B3yml1FuI7ZkNUufS4DA2HZzwxE0jHINjtdGomNEGFEwO6', 'sy', 'abiboulaye', '2025-05-07 13:40:35', '2025-05-07 13:40:35');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
