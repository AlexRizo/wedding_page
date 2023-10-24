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

DROP TABLE IF EXISTS `gentlemen`;
CREATE TABLE `gentlemen` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `number` bigint NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `gentlemen_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guests`;
CREATE TABLE `guests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `orderId` bigint unsigned DEFAULT NULL,
  `publicId` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ladies`;
CREATE TABLE `ladies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `number` bigint NOT NULL,
  `orderId` bigint unsigned NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `ladies_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `layoutPictureId` bigint unsigned NOT NULL DEFAULT '1',
  UNIQUE KEY `id` (`id`),
  KEY `layoutPictureId` (`layoutPictureId`),
  CONSTRAINT `layouts_ibfk_1` FOREIGN KEY (`layoutPictureId`) REFERENCES `layouts_pictures` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `layouts_pictures`;
CREATE TABLE `layouts_pictures` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `serial_number` bigint NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `stepId` bigint unsigned NOT NULL DEFAULT '1',
  `boyfriend_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `wedding_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `godfather` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `godmother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_father` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `boyfriend_mother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `girlfriend_father` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `girlfriend_mother` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `church_references` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `event_references` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gif_link` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bank` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `history` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `men_clothes` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `women_clothes` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `considerations` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.',
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `userId` bigint unsigned NOT NULL,
  `layoutId` bigint unsigned DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `stepId` (`stepId`),
  KEY `userId` (`userId`),
  KEY `layoutId` (`layoutId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`stepId`) REFERENCES `steps` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`layoutId`) REFERENCES `layouts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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



INSERT INTO `gentlemen` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(5, 'Yahritza y su Esencia', 1, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `gentlemen` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(6, 'Herencia de Patrones', 2, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `gentlemen` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(7, 'Fuerza Régida', 3, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `gentlemen` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(8, 'Alfredo Olivas', 4, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');



INSERT INTO `images` (`id`, `name`, `url`, `orderId`, `publicId`, `createdAt`, `updatedAt`) VALUES
(94, 'boyfriend_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695400491/h5hgr4wmucgsaw0elycv.webp', 3, 'h5hgr4wmucgsaw0elycv', '2023-09-22 10:34:52', '2023-09-22 10:34:52');
INSERT INTO `images` (`id`, `name`, `url`, `orderId`, `publicId`, `createdAt`, `updatedAt`) VALUES
(95, 'girlfriend_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695400491/to5swhqrzsfgyubnyjan.jpg', 3, 'to5swhqrzsfgyubnyjan', '2023-09-22 10:34:52', '2023-09-22 10:34:52');
INSERT INTO `images` (`id`, `name`, `url`, `orderId`, `publicId`, `createdAt`, `updatedAt`) VALUES
(96, 'godfather_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695401174/yq3pkp1k8noa4libkror.webp', 3, 'yq3pkp1k8noa4libkror', '2023-09-22 10:46:14', '2023-09-22 10:46:14');
INSERT INTO `images` (`id`, `name`, `url`, `orderId`, `publicId`, `createdAt`, `updatedAt`) VALUES
(97, 'godfather_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695401174/pnvv1uymc3zatm5ztxhg.jpg', 3, 'pnvv1uymc3zatm5ztxhg', '2023-09-22 10:46:14', '2023-09-22 10:46:14'),
(98, 'boyfriend_parents_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695401174/sefoqpsziakkv8glgfvm.jpg', 3, 'sefoqpsziakkv8glgfvm', '2023-09-22 10:46:15', '2023-09-22 10:46:15'),
(99, 'girlfriend_parents_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695401174/xsqvg22bcp14i1urmoe7.webp', 3, 'xsqvg22bcp14i1urmoe7', '2023-09-22 10:46:15', '2023-09-22 10:46:15'),
(100, 'church_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695401662/p8k8hxtpnqdho9rknafx.jpg', 3, 'p8k8hxtpnqdho9rknafx', '2023-09-22 10:54:23', '2023-09-22 10:54:23'),
(101, 'event_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1695402305/xlqcrnq1bfez3oxexxth.jpg', 3, 'xlqcrnq1bfez3oxexxth', '2023-09-22 11:05:06', '2023-09-22 11:05:06'),
(102, 'boyfriend_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824547/toicuotvxkms8pjgti48.jpg', 1, 'toicuotvxkms8pjgti48', '2023-10-20 11:55:46', '2023-10-20 11:55:46'),
(103, 'girlfriend_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824547/o98joixqsivczcl83mwt.jpg', 1, 'o98joixqsivczcl83mwt', '2023-10-20 11:55:47', '2023-10-20 11:55:47'),
(104, 'godfather_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824661/cbr6rcuckblyigckauyo.webp', 1, 'cbr6rcuckblyigckauyo', '2023-10-20 11:57:40', '2023-10-20 11:57:40'),
(105, 'godmother_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824661/vfgojcsqga1s43pdnmnn.jpg', 1, 'vfgojcsqga1s43pdnmnn', '2023-10-20 11:57:40', '2023-10-20 11:57:40'),
(106, 'boyfriend_parents_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824661/qgjdronetvrjn22984rm.jpg', 1, 'qgjdronetvrjn22984rm', '2023-10-20 11:57:40', '2023-10-20 11:57:40'),
(107, 'girlfriend_parents_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697824661/g2nxrwqcvtqdbcfnqu5h.jpg', 1, 'g2nxrwqcvtqdbcfnqu5h', '2023-10-20 11:57:41', '2023-10-20 11:57:41'),
(108, 'church_photo', 'https://res.cloudinary.com/dhgb3akqr/image/upload/v1697825424/ic0ztlbm4js4g7tv3qpr.jpg', 1, 'ic0ztlbm4js4g7tv3qpr', '2023-10-20 12:10:23', '2023-10-20 12:10:23');

INSERT INTO `ladies` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(5, 'Peso Pluma', 1, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `ladies` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(6, 'Jesús Ortiz Paz', 2, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `ladies` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(7, 'Natanael Cano', 3, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');
INSERT INTO `ladies` (`id`, `name`, `number`, `orderId`, `createdAt`, `updatedAt`) VALUES
(8, 'Gabriel Ballesteros', 4, 3, '2023-09-26 12:18:44', '2023-09-26 12:18:44');

INSERT INTO `layouts` (`id`, `name`, `description`, `layoutPictureId`) VALUES
(1, 'Invitación 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac lacinia orci. In egestas, ligula nec ullamcorper mattis, urna ante efficitur lacus, in congue risus velit ut ligula.', 1);
INSERT INTO `layouts` (`id`, `name`, `description`, `layoutPictureId`) VALUES
(2, 'Invitación 2', 'Quisque ornare ex eu ante faucibus, quis blandit risus euismod. Fusce non tincidunt nunc.', 1);
INSERT INTO `layouts` (`id`, `name`, `description`, `layoutPictureId`) VALUES
(3, 'Invitación 3', 'Fusce ut mauris posuere, bibendum diam at, fringilla nisl.', 1);
INSERT INTO `layouts` (`id`, `name`, `description`, `layoutPictureId`) VALUES
(4, 'Invitación 4', 'Nunc vulputate suscipit ornare. Suspendisse efficitur pulvinar nibh, ac consectetur erat mollis id.', 1);

INSERT INTO `layouts_pictures` (`id`, `url`) VALUES
(1, '/assets/img/image-not-found.jpg');


INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `stepId`, `boyfriend_name`, `girlfriend_name`, `boyfriend_email`, `girlfriend_email`, `wedding_date`, `godfather`, `godmother`, `boyfriend_father`, `boyfriend_mother`, `girlfriend_father`, `girlfriend_mother`, `church`, `church_time`, `church_location`, `church_references`, `event`, `event_time`, `event_location`, `event_references`, `gif_link`, `bank`, `history`, `men_clothes`, `women_clothes`, `considerations`, `description`, `updatedAt`, `createdAt`, `userId`, `layoutId`) VALUES
(1, 1, 'Paquete 1', 0, 4, 'Peso Pluma', 'Natanael Cano', 'esperancita@gmail', 'pesopluma@gmail', '2023-10-28', 'Alfredito Olivas', 'Yaritza y su esencia', 'Padre del hijo', 'Madre del hijo', 'Padre de la hija', 'Madre de la hija', 'San Francisco de Asís', '12:15', 'Calle Aldama, #540', 'adsadasdasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '2023-10-20 12:10:22', '2023-08-29 14:51:32', 1, NULL);
INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `stepId`, `boyfriend_name`, `girlfriend_name`, `boyfriend_email`, `girlfriend_email`, `wedding_date`, `godfather`, `godmother`, `boyfriend_father`, `boyfriend_mother`, `girlfriend_father`, `girlfriend_mother`, `church`, `church_time`, `church_location`, `church_references`, `event`, `event_time`, `event_location`, `event_references`, `gif_link`, `bank`, `history`, `men_clothes`, `women_clothes`, `considerations`, `description`, `updatedAt`, `createdAt`, `userId`, `layoutId`) VALUES
(2, 2, 'Paquete 2', 1, 4, 'Peso Pluma', 'Natanael Cano', 'pp@gmail', 'nata@gmail', '2023-09-30', 'Jesús Ortiz Paz', 'Yaritza y su Esencia ', 'Gabito Ballesteros', 'Grupo Frontera', 'Eslabón Armado', 'Chino Pacas', 'San Francisco de Asís', '14:00', 'Calle Aldama, #540', NULL, 'El edén', '17:00', 'https://goo.gl/maps/sT1Y4Ki1JSMhoAPJA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.', '2023-09-14 12:12:40', '2023-08-29 14:56:45', 1, NULL);
INSERT INTO `orders` (`id`, `serial_number`, `name`, `status`, `stepId`, `boyfriend_name`, `girlfriend_name`, `boyfriend_email`, `girlfriend_email`, `wedding_date`, `godfather`, `godmother`, `boyfriend_father`, `boyfriend_mother`, `girlfriend_father`, `girlfriend_mother`, `church`, `church_time`, `church_location`, `church_references`, `event`, `event_time`, `event_location`, `event_references`, `gif_link`, `bank`, `history`, `men_clothes`, `women_clothes`, `considerations`, `description`, `updatedAt`, `createdAt`, `userId`, `layoutId`) VALUES
(3, 3, 'Paquete 3', 0, 7, 'Peso Pluma', 'Natanael Cano', 'pp@gmail.com', 'nata@gmail.com', '2023-09-30', 'Padrino de prueba', 'Madrina de prueba', 'Padre del hijo', 'Madre del hijo', 'Padre de la hija', 'Madre de la hija', 'San Francisco de Asís', '19:00', 'Calle Aldama, #540', 'Sobre el jardín de la Villa', 'El edén', '22:00', 'El edén', 'Rumbo al ISENCO de colima', 'https://articulo.mercadolibre.com.mx/MLM-939829606-bloqueo-de-motocicleta-bloqueo-de-freno-de-disco-', '6542 8818 0019 0000', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.', 'Traje Negro', 'Vestido Negro', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non providen', 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.', '2023-10-05 11:14:26', '2023-08-29 14:56:52', 1, NULL);

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
(6, 'Código de vestimenta y otros...', NULL, NULL),
(7, 'Selecciona una invitación', NULL, NULL);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`, `phone`) VALUES
(1, 'Peso Pluma', 'dev@alowee.com', '$2a$10$6IQzPP2x2MXemEVZLIDscusw0Wgxrt2MNXP3wkQW396DBL8eitSRq', 1, 2, '2023-08-24 12:10:29', '2023-08-24 12:10:29', 3125547870);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;