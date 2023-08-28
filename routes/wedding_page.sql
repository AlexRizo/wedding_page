/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `companions`;
CREATE TABLE `companions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `guestId` bigint unsigned NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guests`;
CREATE TABLE `guests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ladies_gentlemen`;
CREATE TABLE `ladies_gentlemen` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `number` bigint NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `serial_number` bigint NOT NULL,
  `boyfriend_name` varchar(50) NOT NULL,
  `girlfriend_name` varchar(50) NOT NULL,
  `boyfriend_email` varchar(50) NOT NULL,
  `girlfriend_email` varchar(50) NOT NULL,
  `wedding_date` timestamp NOT NULL,
  `godfather` varchar(50) NOT NULL,
  `godmother` varchar(50) NOT NULL,
  `boyfriend_father` varchar(50) NOT NULL,
  `boyfriend_mother` varchar(50) NOT NULL,
  `girldfriend_father` varchar(50) NOT NULL DEFAULT '',
  `girldfriend_mother` varchar(50) NOT NULL,
  `church` varchar(50) NOT NULL,
  `church_date` varchar(5) NOT NULL,
  `church_turn` varchar(2) NOT NULL,
  `church_location` varchar(100) NOT NULL,
  `church_references` varchar(100) DEFAULT NULL,
  `event` varchar(50) NOT NULL,
  `event_date` varchar(5) NOT NULL,
  `event_turn` varchar(2) NOT NULL,
  `event_location` varchar(100) NOT NULL,
  `event_references` varchar(100) DEFAULT NULL,
  `men_clothes` varchar(100) NOT NULL,
  `women_clothes` varchar(100) NOT NULL,
  `considerations` varchar(200) NOT NULL,
  `gif_link` varchar(100) DEFAULT NULL,
  `bank` varchar(25) DEFAULT NULL,
  `history` varchar(1000) NOT NULL,
  `stepId` bigint unsigned NOT NULL DEFAULT '1',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `steps`;
CREATE TABLE `steps` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `roleId` bigint unsigned NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;









INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Client', NULL, NULL);
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Admin', NULL, NULL);


INSERT INTO `steps` (`id`, `name`) VALUES
(1, 'Paso 1');
INSERT INTO `steps` (`id`, `name`) VALUES
(2, 'Paso 2');
INSERT INTO `steps` (`id`, `name`) VALUES
(3, 'Paso 3');
INSERT INTO `steps` (`id`, `name`) VALUES
(4, 'Paso 4'),
(5, 'Paso 5'),
(6, 'Paso 6');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Peso Pluma', 'dev@alowee.com', '$2a$10$6IQzPP2x2MXemEVZLIDscusw0Wgxrt2MNXP3wkQW396DBL8eitSRq', 1, 2, '2023-08-24 12:10:29', '2023-08-24 12:10:29');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;