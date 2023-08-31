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
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.',
  `bank` int DEFAULT NULL,
  `gif_link` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `considerations` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `women_clothes` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `men_clothes` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_references` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_turn` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_date` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_references` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_turn` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_date` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_mother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_father` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `boyfriend_mother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_father` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `godmother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `godfather` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `wedding_date` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stepId` bigint unsigned NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `userId` bigint unsigned NOT NULL,
  `history` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `stepId` (`stepId`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`stepId`) REFERENCES `steps` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
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
  `phone` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;







INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `description`, `bank`, `gif_link`, `considerations`, `women_clothes`, `men_clothes`, `event_references`, `event_location`, `event_turn`, `event_date`, `event`, `church_references`, `church_location`, `church_turn`, `church_date`, `church`, `girlfriend_mother`, `girlfriend_father`, `boyfriend_mother`, `boyfriend_father`, `godmother`, `godfather`, `wedding_date`, `girlfriend_email`, `boyfriend_email`, `girlfriend_name`, `boyfriend_name`, `stepId`, `createdAt`, `updatedAt`, `userId`, `history`) VALUES
(1, 1, 'Paquete 1', 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '2023-08-29 14:51:32', '2023-08-29 14:51:32', 1, NULL);
INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `description`, `bank`, `gif_link`, `considerations`, `women_clothes`, `men_clothes`, `event_references`, `event_location`, `event_turn`, `event_date`, `event`, `church_references`, `church_location`, `church_turn`, `church_date`, `church`, `girlfriend_mother`, `girlfriend_father`, `boyfriend_mother`, `boyfriend_father`, `godmother`, `godfather`, `wedding_date`, `girlfriend_email`, `boyfriend_email`, `girlfriend_name`, `boyfriend_name`, `stepId`, `createdAt`, `updatedAt`, `userId`, `history`) VALUES
(2, 2, 'Paquete 2', 1, 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2023-08-29 14:56:45', '2023-08-29 14:56:45', 1, NULL);
INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `description`, `bank`, `gif_link`, `considerations`, `women_clothes`, `men_clothes`, `event_references`, `event_location`, `event_turn`, `event_date`, `event`, `church_references`, `church_location`, `church_turn`, `church_date`, `church`, `girlfriend_mother`, `girlfriend_father`, `boyfriend_mother`, `boyfriend_father`, `godmother`, `godfather`, `wedding_date`, `girlfriend_email`, `boyfriend_email`, `girlfriend_name`, `boyfriend_name`, `stepId`, `createdAt`, `updatedAt`, `userId`, `history`) VALUES
(3, 3, 'Paquete 3', 0, 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2023-08-29 14:56:52', '2023-08-29 14:56:52', 1, NULL);

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Client', NULL, NULL);
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Admin', NULL, NULL);


INSERT INTO `steps` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Datos de los novios', NULL, NULL);
INSERT INTO `steps` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Datos de los familiares', NULL, NULL);
INSERT INTO `steps` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'Datos de la ceremonia', NULL, NULL);
INSERT INTO `steps` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(4, 'Datos del evento', NULL, NULL),
(5, 'Personas de compañía', NULL, NULL),
(6, 'Código de vestimenta y otros...', NULL, NULL);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`, `phone`) VALUES
(1, 'Peso Pluma', 'dev@alowee.com', '$2a$10$6IQzPP2x2MXemEVZLIDscusw0Wgxrt2MNXP3wkQW396DBL8eitSRq', 1, 2, '2023-08-24 12:10:29', '2023-08-24 12:10:29', 3125547870);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;