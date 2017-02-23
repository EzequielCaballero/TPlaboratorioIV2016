-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2017 a las 19:08:46
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pizzeria_tp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL,
  `cantidad_prod` int(11) DEFAULT NULL,
  `precio_final` int(11) DEFAULT NULL,
  `id_operacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_compra`, `cantidad_prod`, `precio_final`, `id_operacion`) VALUES
(7001, 2, 175, 5001),
(7002, 2, 185, 5002),
(7003, 3, 270, 5003),
(7004, 2, 245, 5004),
(7005, 3, 325, 5005),
(7006, 3, 330, 5011),
(7007, 3, 220, 5012),
(7008, 4, 312, 5013),
(7009, 4, 300, 5014),
(7010, 6, 510, 5015),
(7011, 2, 175, 5016),
(7012, 2, 185, 5017),
(7013, 3, 270, 5018),
(7014, 2, 245, 5019),
(7015, 3, 325, 5020),
(7016, 3, 330, 5026),
(7017, 3, 220, 5027),
(7018, 4, 312, 5028),
(7019, 4, 300, 5029),
(7020, 6, 510, 5030),
(7021, 2, 175, 5031),
(7022, 2, 185, 5032),
(7023, 3, 270, 5033),
(7024, 2, 245, 5034),
(7025, 3, 325, 5035),
(7026, 3, 330, 5041),
(7027, 3, 220, 5042),
(7028, 4, 312, 5043),
(7029, 4, 300, 5044),
(7030, 6, 510, 5045),
(7031, 2, 175, 5051),
(7032, 2, 185, 5052),
(7033, 3, 270, 5053),
(7034, 2, 245, 5054),
(7035, 3, 325, 5055),
(7036, 3, 330, 5056),
(7037, 3, 220, 5057),
(7038, 4, 312, 5058),
(7039, 4, 300, 5059),
(7040, 6, 510, 5060),
(7041, 2, 175, 5066),
(7042, 2, 185, 5067),
(7043, 3, 270, 5068),
(7044, 2, 245, 5069),
(7045, 3, 325, 5070),
(7046, 3, 330, 5071),
(7047, 3, 220, 5072),
(7048, 4, 312, 5073),
(7049, 4, 300, 5074),
(7050, 6, 510, 5075),
(7051, 2, 175, 5081),
(7052, 2, 185, 5082),
(7053, 3, 270, 5083),
(7054, 2, 245, 5084),
(7055, 3, 325, 5085),
(7056, 3, 330, 5091),
(7057, 3, 220, 5092),
(7058, 4, 312, 5093),
(7059, 4, 300, 5094),
(7060, 6, 510, 5095),
(7061, 2, 175, 5096),
(7062, 2, 185, 5097),
(7063, 3, 270, 5098),
(7064, 2, 245, 5099),
(7065, 3, 325, 5100),
(7066, 3, 330, 5106),
(7067, 3, 220, 5107),
(7068, 4, 312, 5108),
(7069, 4, 300, 5109),
(7070, 6, 510, 5110),
(7071, 1, 100, 5111),
(7072, 1, 120, 5112),
(7073, 1, 140, 5113),
(7074, 1, 120, 5114),
(7075, 1, 130, 5115),
(7076, 1, 125, 5121),
(7077, 1, 135, 5122),
(7078, 1, 135, 5123),
(7079, 1, 130, 5124),
(7080, 1, 125, 5125),
(7081, 1, 130, 5131),
(7082, 1, 160, 5132),
(7083, 1, 170, 5133),
(7084, 1, 115, 5134),
(7085, 1, 135, 5135),
(7086, 1, 180, 5136),
(7087, 1, 140, 5137),
(7088, 1, 150, 5138),
(7089, 1, 140, 5139),
(7090, 1, 145, 5140),
(7091, 1, 145, 5146),
(7092, 1, 155, 5147),
(7093, 1, 175, 5148),
(7094, 1, 9, 5149),
(7095, 1, 40, 5150),
(7096, 1, 30, 5151),
(7097, 1, 40, 5152),
(7098, 1, 42, 5153),
(7099, 1, 45, 5154),
(7100, 1, 48, 5155),
(7101, 1, 100, 5161),
(7102, 2, 220, 5162),
(7103, 5, 550, 5163),
(7104, 4, 395, 5166),
(7105, 8, 875, 5169),
(7106, 1, 100, 5171),
(7107, 1, 100, 5172),
(7108, NULL, 175, 5173);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_ofertas`
--

CREATE TABLE `compras_ofertas` (
  `id_compra` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compras_ofertas`
--

INSERT INTO `compras_ofertas` (`id_compra`, `id_oferta`) VALUES
(7001, 3001),
(7002, 3002),
(7003, 3003),
(7004, 3004),
(7005, 3005),
(7006, 3006),
(7007, 3007),
(7008, 3008),
(7009, 3009),
(7010, 3010),
(7011, 3001),
(7012, 3002),
(7013, 3003),
(7014, 3004),
(7015, 3005),
(7016, 3006),
(7017, 3007),
(7018, 3008),
(7019, 3009),
(7020, 3010),
(7021, 3001),
(7022, 3002),
(7023, 3003),
(7024, 3004),
(7025, 3005),
(7026, 3006),
(7027, 3007),
(7028, 3008),
(7029, 3009),
(7030, 3010),
(7031, 3001),
(7032, 3002),
(7033, 3003),
(7034, 3004),
(7035, 3005),
(7036, 3006),
(7037, 3007),
(7038, 3008),
(7039, 3009),
(7040, 3010),
(7041, 3001),
(7042, 3002),
(7043, 3003),
(7044, 3004),
(7045, 3005),
(7046, 3006),
(7047, 3007),
(7048, 3008),
(7049, 3009),
(7050, 3010),
(7051, 3001),
(7052, 3002),
(7053, 3003),
(7054, 3004),
(7055, 3005),
(7056, 3006),
(7057, 3007),
(7058, 3008),
(7059, 3009),
(7060, 3010),
(7061, 3001),
(7062, 3002),
(7063, 3003),
(7064, 3004),
(7065, 3005),
(7066, 3006),
(7067, 3007),
(7068, 3008),
(7069, 3009),
(7070, 3010),
(7103, 3006),
(7104, 3001),
(7105, 3005),
(7105, 3006),
(7108, 3001);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_productos`
--

CREATE TABLE `compras_productos` (
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compras_productos`
--

INSERT INTO `compras_productos` (`id_compra`, `id_producto`) VALUES
(7071, 4001),
(7072, 4002),
(7073, 4003),
(7074, 4004),
(7075, 4005),
(7076, 4006),
(7077, 4007),
(7078, 4008),
(7079, 4009),
(7080, 4010),
(7081, 4011),
(7082, 4012),
(7083, 4013),
(7084, 4014),
(7085, 4015),
(7086, 4016),
(7087, 4017),
(7088, 4018),
(7089, 4019),
(7090, 4020),
(7091, 4021),
(7092, 4022),
(7093, 4023),
(7094, 4024),
(7095, 4025),
(7096, 4026),
(7097, 4027),
(7098, 4028),
(7099, 4029),
(7100, 4030),
(7101, 4001),
(7102, 4001),
(7102, 4002),
(7103, 4001),
(7103, 4002),
(7104, 4001),
(7104, 4002),
(7105, 4001),
(7105, 4002),
(7106, 4001),
(7107, 4001);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id_encuesta` int(11) NOT NULL,
  `id_operacion` int(11) NOT NULL,
  `pregunta_1` varchar(50) DEFAULT NULL,
  `pregunta_2` varchar(50) DEFAULT NULL,
  `pregunta_3` varchar(50) DEFAULT NULL,
  `pregunta_4` varchar(50) DEFAULT NULL,
  `pregunta_5` varchar(50) DEFAULT NULL,
  `pregunta_6` varchar(50) DEFAULT NULL,
  `pregunta_7` varchar(50) DEFAULT NULL,
  `pregunta_8` varchar(50) DEFAULT NULL,
  `pregunta_9` varchar(50) DEFAULT NULL,
  `pregunta_10` varchar(50) DEFAULT NULL,
  `pregunta_11` int(11) DEFAULT NULL,
  `pregunta_12` varchar(50) DEFAULT NULL,
  `pregunta_13` varchar(50) DEFAULT NULL,
  `pregunta_14` varchar(50) DEFAULT NULL,
  `pregunta_15` varchar(50) DEFAULT NULL,
  `pregunta_16` varchar(50) DEFAULT NULL,
  `pregunta_17` varchar(305) DEFAULT NULL,
  `pregunta_18` varchar(50) DEFAULT NULL,
  `pregunta_19` varchar(50) DEFAULT NULL,
  `pregunta_20` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id_encuesta`, `id_operacion`, `pregunta_1`, `pregunta_2`, `pregunta_3`, `pregunta_4`, `pregunta_5`, `pregunta_6`, `pregunta_7`, `pregunta_8`, `pregunta_9`, `pregunta_10`, `pregunta_11`, `pregunta_12`, `pregunta_13`, `pregunta_14`, `pregunta_15`, `pregunta_16`, `pregunta_17`, `pregunta_18`, `pregunta_19`, `pregunta_20`) VALUES
(8001, 5017, 'Muzzarella', 'al molde', 'salsa', '2-3 por semana', 'buena', 'precio', 'si', 'si', 'de 50 a 100 $', 'si', 1, 'si', 'amigo', 'si', 'si', '10 min', '0', 'si', 'estetica', 'local'),
(8002, 5018, 'Anchoas', 'a la piedra', 'oregano', '1 vez por semana', 'mala', 'calidad', 'no', 'no', 'de 100 a 150 $', 'no', 2, 'no', 'television', 'no', 'no', '30 min', '20', 'no', 'funcional', 'pagina'),
(8003, 5019, 'Napolitana', 'al molde', 'queso', '1-2 por mes', 'intermedia', 'sabor', 'tal vez', 'ni idea', 'de 150 a 300 $', 'no se', 3, 'si', 'radio', 'me da igual', 'irrelevante', '1 hora', '140', 'no lo recuerdo', 'informacion', 'no lo se'),
(8004, 5020, 'Capresse', 'a la piedra', 'masa', '3-6 meses', 'buena', 'otro', 'nunca', 'si', '0', 'si', 4, 'no', 'diario', 'si', 'si', '2 horas', '350', 'si', 'variedad', 'local'),
(8005, 5021, 'Calabresa', 'al molde', 'fiambre', 'nada frencuente', 'mala', 'precio', 'si', 'no', 'de 50 a 100 $', 'no', 5, 'si', 'te corrijo', 'no', 'no', 'Lo que de', '400', 'no', 'otra (especifique)', 'pagina'),
(8006, 5022, 'Americana', 'a la piedra', 'otro', '2-3 por semana', 'intermedia', 'calidad', 'no', 'ni idea', 'de 100 a 150 $', 'no se', 6, 'no', 'amigo', 'me da igual', 'irrelevante', '10 min', '0', 'no lo recuerdo', 'estetica', 'no lo se'),
(8007, 5023, 'Roquefort', 'al molde', 'salsa', '1 vez por semana', 'buena', 'sabor', 'tal vez', 'si', 'de 150 a 300 $', 'si', 7, 'si', 'television', 'si', 'si', '30 min', '20', 'si', 'funcional', 'local'),
(8008, 5025, 'Fugazza', 'a la piedra', 'oregano', '1-2 por mes', 'mala', 'otro', 'nunca', 'no', '0', 'no', 8, 'no', 'radio', 'no', 'no', '1 hora', '140', 'no', 'informacion', 'pagina'),
(8009, 5026, 'Fugazzeta', 'al molde', 'queso', '3-6 meses', 'intermedia', 'precio', 'si', 'ni idea', 'de 50 a 100 $', 'no se', 9, 'si', 'diario', 'me da igual', 'irrelevante', '2 horas', '350', 'no lo recuerdo', 'variedad', 'no lo se'),
(8010, 5027, 'Provolone', 'a la piedra', 'masa', 'nada frencuente', 'buena', 'calidad', 'no', 'si', 'de 100 a 150 $', 'si', 10, 'no', 'te corrijo', 'si', 'si', 'Lo que de', '400', 'si', 'otra (especifique)', 'local'),
(8011, 5028, 'otra', 'al molde', 'fiambre', '2-3 por semana', 'mala', 'sabor', 'tal vez', 'no', 'de 150 a 300 $', 'no', 1, 'si', 'amigo', 'no', 'no', '10 min', '0', 'no', 'estetica', 'pagina'),
(8012, 5029, 'Muzzarella', 'a la piedra', 'otro', '1 vez por semana', 'intermedia', 'otro', 'nunca', 'ni idea', '0', 'no se', 2, 'no', 'television', 'me da igual', 'irrelevante', '30 min', '20', 'no lo recuerdo', 'funcional', 'no lo se'),
(8013, 5046, 'Anchoas', 'al molde', 'salsa', '1-2 por mes', 'buena', 'precio', 'si', 'si', 'de 50 a 100 $', 'si', 3, 'si', 'radio', 'si', 'si', '1 hora', '140', 'si', 'informacion', 'local'),
(8014, 5047, 'Napolitana', 'a la piedra', 'oregano', '3-6 meses', 'mala', 'calidad', 'no', 'no', 'de 100 a 150 $', 'no', 4, 'no', 'diario', 'no', 'no', '2 horas', '350', 'no', 'variedad', 'pagina'),
(8015, 5048, 'Capresse', 'al molde', 'queso', 'nada frencuente', 'intermedia', 'sabor', 'tal vez', 'ni idea', 'de 150 a 300 $', 'no se', 5, 'si', 'te corrijo', 'me da igual', 'irrelevante', 'Lo que de', '400', 'no lo recuerdo', 'otra (especifique)', 'no lo se'),
(8016, 5049, 'Calabresa', 'a la piedra', 'masa', '2-3 por semana', 'buena', 'otro', 'nunca', 'si', '0', 'si', 6, 'no', 'amigo', 'si', 'si', '10 min', '0', 'si', 'estetica', 'local'),
(8017, 5050, 'Americana', 'al molde', 'fiambre', '1 vez por semana', 'mala', 'precio', 'si', 'no', 'de 50 a 100 $', 'no', 7, 'si', 'television', 'no', 'no', '30 min', '20', 'no', 'funcional', 'pagina'),
(8018, 5051, 'Roquefort', 'a la piedra', 'otro', '1-2 por mes', 'intermedia', 'calidad', 'no', 'ni idea', 'de 100 a 150 $', 'no se', 8, 'no', 'radio', 'me da igual', 'irrelevante', '1 hora', '140', 'no lo recuerdo', 'informacion', 'no lo se'),
(8019, 5052, 'Fugazza', 'al molde', 'salsa', '3-6 meses', 'buena', 'sabor', 'tal vez', 'si', 'de 150 a 300 $', 'si', 9, 'si', 'diario', 'si', 'si', '2 horas', '350', 'si', 'variedad', 'local'),
(8020, 5054, 'Fugazzeta', 'a la piedra', 'oregano', 'nada frencuente', 'mala', 'otro', 'nunca', 'no', '0', 'no', 10, 'no', 'te corrijo', 'no', 'no', 'Lo que de', '400', 'no', 'otra (especifique)', 'pagina'),
(8021, 5055, 'Provolone', 'al molde', 'queso', '2-3 por semana', 'intermedia', 'precio', 'si', 'ni idea', 'de 50 a 100 $', 'no se', 1, 'si', 'amigo', 'me da igual', 'irrelevante', '10 min', '0', 'no lo recuerdo', 'estetica', 'no lo se'),
(8022, 5056, 'otra', 'a la piedra', 'masa', '1 vez por semana', 'buena', 'calidad', 'no', 'si', 'de 100 a 150 $', 'si', 2, 'no', 'television', 'si', 'si', '30 min', '20', 'si', 'funcional', 'local'),
(8023, 5057, 'Muzzarella', 'al molde', 'fiambre', '1-2 por mes', 'mala', 'sabor', 'tal vez', 'no', 'de 150 a 300 $', 'no', 3, 'si', 'radio', 'no', 'no', '1 hora', '140', 'no', 'informacion', 'pagina'),
(8024, 5058, 'Anchoas', 'a la piedra', 'otro', '3-6 meses', 'intermedia', 'otro', 'nunca', 'ni idea', '0', 'no se', 4, 'no', 'diario', 'me da igual', 'irrelevante', '2 horas', '350', 'no lo recuerdo', 'variedad', 'no lo se'),
(8025, 5075, 'Napolitana', 'al molde', 'salsa', 'nada frencuente', 'buena', 'precio', 'si', 'si', 'de 50 a 100 $', 'si', 5, 'si', 'te corrijo', 'si', 'si', 'Lo que de', '400', 'si', 'otra (especifique)', 'local'),
(8026, 5076, 'Capresse', 'a la piedra', 'oregano', '2-3 por semana', 'mala', 'calidad', 'no', 'no', 'de 100 a 150 $', 'no', 6, 'no', 'amigo', 'no', 'no', '10 min', '0', 'no', 'estetica', 'pagina'),
(8027, 5077, 'Calabresa', 'al molde', 'queso', '1 vez por semana', 'intermedia', 'sabor', 'tal vez', 'ni idea', 'de 150 a 300 $', 'no se', 7, 'si', 'television', 'me da igual', 'irrelevante', '30 min', '20', 'no lo recuerdo', 'funcional', 'no lo se'),
(8028, 5078, 'Americana', 'a la piedra', 'masa', '1-2 por mes', 'buena', 'otro', 'nunca', 'si', '0', 'si', 8, 'no', 'radio', 'si', 'si', '1 hora', '140', 'si', 'informacion', 'local'),
(8029, 5079, 'Roquefort', 'al molde', 'fiambre', '3-6 meses', 'mala', 'precio', 'si', 'no', 'de 50 a 100 $', 'no', 9, 'si', 'diario', 'no', 'no', '2 horas', '350', 'no', 'variedad', 'pagina'),
(8030, 5080, 'Fugazza', 'a la piedra', 'otro', 'nada frencuente', 'intermedia', 'calidad', 'no', 'ni idea', 'de 100 a 150 $', 'no se', 10, 'no', 'te corrijo', 'me da igual', 'irrelevante', 'Lo que de', '400', 'no lo recuerdo', 'otra (especifique)', 'no lo se'),
(8031, 5081, 'Fugazzeta', 'al molde', 'salsa', '2-3 por semana', 'buena', 'sabor', 'tal vez', 'si', 'de 150 a 300 $', 'si', 1, 'si', 'amigo', 'si', 'si', '10 min', '0', 'si', 'estetica', 'local'),
(8032, 5083, 'Provolone', 'a la piedra', 'oregano', '1 vez por semana', 'mala', 'otro', 'nunca', 'no', '0', 'no', 2, 'no', 'television', 'no', 'no', '30 min', '20', 'no', 'funcional', 'pagina'),
(8033, 5084, 'otra', 'al molde', 'queso', '1-2 por mes', 'intermedia', 'precio', 'si', 'ni idea', 'de 50 a 100 $', 'no se', 3, 'si', 'radio', 'me da igual', 'irrelevante', '1 hora', '140', 'no lo recuerdo', 'informacion', 'no lo se'),
(8034, 5085, 'Muzzarella', 'a la piedra', 'masa', '3-6 meses', 'buena', 'calidad', 'no', 'si', 'de 100 a 150 $', 'si', 4, 'no', 'diario', 'si', 'si', '2 horas', '350', 'si', 'variedad', 'local'),
(8035, 5086, 'Anchoas', 'al molde', 'fiambre', 'nada frencuente', 'mala', 'sabor', 'tal vez', 'no', 'de 150 a 300 $', 'no', 5, 'si', 'te corrijo', 'no', 'no', 'Lo que de', '400', 'no', 'otra (especifique)', 'pagina'),
(8036, 5087, 'Napolitana', 'a la piedra', 'otro', '2-3 por semana', 'intermedia', 'otro', 'nunca', 'ni idea', '0', 'no se', 6, 'no', 'amigo', 'me da igual', 'irrelevante', '10 min', '0', 'no lo recuerdo', 'estetica', 'no lo se'),
(8037, 5104, 'Capresse', 'al molde', 'salsa', '1 vez por semana', 'buena', 'precio', 'si', 'si', 'de 50 a 100 $', 'si', 7, 'si', 'television', 'si', 'si', '30 min', '20', 'si', 'funcional', 'local'),
(8038, 5105, 'Calabresa', 'a la piedra', 'oregano', '1-2 por mes', 'mala', 'calidad', 'no', 'no', 'de 100 a 150 $', 'no', 8, 'no', 'radio', 'no', 'no', '1 hora', '140', 'no', 'informacion', 'pagina'),
(8039, 5106, 'Americana', 'al molde', 'queso', '3-6 meses', 'intermedia', 'sabor', 'tal vez', 'ni idea', 'de 150 a 300 $', 'no se', 9, 'si', 'diario', 'me da igual', 'irrelevante', '2 horas', '350', 'no lo recuerdo', 'variedad', 'no lo se'),
(8040, 5107, 'Roquefort', 'a la piedra', 'masa', 'nada frencuente', 'buena', 'otro', 'nunca', 'si', '0', 'si', 10, 'no', 'te corrijo', 'si', 'si', 'Lo que de', '400', 'si', 'otra (especifique)', 'local'),
(8041, 5108, 'Fugazza', 'al molde', 'fiambre', '2-3 por semana', 'mala', 'precio', 'si', 'no', 'de 50 a 100 $', 'no', 1, 'si', 'amigo', 'no', 'no', '10 min', '0', 'no', 'estetica', 'pagina'),
(8042, 5109, 'Fugazzeta', 'a la piedra', 'otro', '1 vez por semana', 'intermedia', 'calidad', 'no', 'ni idea', 'de 100 a 150 $', 'no se', 2, 'no', 'television', 'me da igual', 'irrelevante', '30 min', '20', 'no lo recuerdo', 'funcional', 'no lo se'),
(8043, 5110, 'Provolone', 'al molde', 'salsa', '1-2 por mes', 'buena', 'sabor', 'tal vez', 'si', 'de 150 a 300 $', 'si', 3, 'si', 'radio', 'si', 'si', '1 hora', '140', 'si', 'informacion', 'local'),
(8044, 5112, 'otra', 'a la piedra', 'oregano', '3-6 meses', 'mala', 'otro', 'nunca', 'no', '0', 'no', 4, 'no', 'diario', 'no', 'no', '2 horas', '350', 'no', 'variedad', 'pagina'),
(8045, 5113, 'Muzzarella', 'al molde', 'queso', 'nada frencuente', 'intermedia', 'precio', 'si', 'ni idea', 'de 50 a 100 $', 'no se', 5, 'si', 'te corrijo', 'me da igual', 'irrelevante', 'Lo que de', '400', 'no lo recuerdo', 'otra (especifique)', 'no lo se'),
(8046, 5114, 'Anchoas', 'a la piedra', 'masa', '2-3 por semana', 'buena', 'calidad', 'no', 'si', 'de 100 a 150 $', 'si', 6, 'no', 'amigo', 'si', 'si', '10 min', '0', 'si', 'estetica', 'local'),
(8047, 5115, 'Napolitana', 'al molde', 'fiambre', '1 vez por semana', 'mala', 'sabor', 'tal vez', 'no', 'de 150 a 300 $', 'no', 7, 'si', 'television', 'no', 'no', '30 min', '20', 'no', 'funcional', 'pagina'),
(8048, 5116, 'Capresse', 'a la piedra', 'otro', '1-2 por mes', 'intermedia', 'otro', 'nunca', 'ni idea', '0', 'no se', 8, 'no', 'radio', 'me da igual', 'irrelevante', '1 hora', '140', 'no lo recuerdo', 'informacion', 'no lo se'),
(8049, 5133, 'Calabresa', 'al molde', 'salsa', '3-6 meses', 'buena', 'precio', 'si', 'si', 'de 50 a 100 $', 'si', 9, 'si', 'diario', 'si', 'si', '2 horas', '350', 'si', 'variedad', 'local'),
(8050, 5134, 'Americana', 'a la piedra', 'oregano', 'nada frencuente', 'mala', 'calidad', 'no', 'no', 'de 100 a 150 $', 'no', 10, 'no', 'te corrijo', 'no', 'no', 'Lo que de', '400', 'no', 'otra (especifique)', 'pagina'),
(8051, 5135, 'Roquefort', 'al molde', 'queso', '2-3 por semana', 'intermedia', 'sabor', 'tal vez', 'ni idea', 'de 150 a 300 $', 'no se', 1, 'si', 'amigo', 'me da igual', 'irrelevante', '10 min', '0', 'no lo recuerdo', 'estetica', 'no lo se'),
(8052, 5136, 'Fugazza', 'a la piedra', 'masa', '1 vez por semana', 'buena', 'otro', 'nunca', 'si', '0', 'si', 2, 'no', 'television', 'si', 'si', '30 min', '20', 'si', 'funcional', 'local'),
(8053, 5137, 'Fugazzeta', 'al molde', 'fiambre', '1-2 por mes', 'mala', 'precio', 'si', 'no', 'de 50 a 100 $', 'no', 3, 'si', 'radio', 'no', 'no', '1 hora', '140', 'no', 'informacion', 'pagina'),
(8054, 5138, 'Provolone', 'a la piedra', 'otro', '3-6 meses', 'intermedia', 'calidad', 'no', 'ni idea', 'de 100 a 150 $', 'no se', 4, 'no', 'diario', 'me da igual', 'irrelevante', '2 horas', '350', 'no lo recuerdo', 'variedad', 'no lo se'),
(8055, 5139, 'otra', 'al molde', 'salsa', 'nada frencuente', 'buena', 'sabor', 'tal vez', 'si', 'de 150 a 300 $', 'si', 5, 'si', 'te corrijo', 'si', 'si', 'Lo que de', '400', 'si', 'otra (especifique)', 'local'),
(8056, 5141, 'Roquefort', 'a la piedra', 'oregano', '2-3 por semana', 'mala', 'otro', 'nunca', 'no', '0', 'no', 6, 'no', 'amigo', 'no', 'no', '10 min', '0', 'no', 'estetica', 'pagina'),
(8057, 5142, 'Fugazza', 'al molde', 'queso', '1 vez por semana', 'intermedia', 'precio', 'si', 'ni idea', 'de 50 a 100 $', 'no se', 7, 'si', 'television', 'me da igual', 'irrelevante', '30 min', '20', 'no lo recuerdo', 'funcional', 'no lo se'),
(8058, 5143, 'Fugazzeta', 'a la piedra', 'masa', '1-2 por mes', 'buena', 'calidad', 'no', 'si', 'de 100 a 150 $', 'si', 8, 'no', 'radio', 'si', 'si', '1 hora', '140', 'si', 'informacion', 'local'),
(8059, 5144, 'Provolone', 'al molde', 'fiambre', '3-6 meses', 'mala', 'sabor', 'tal vez', 'no', 'de 150 a 300 $', 'no', 9, 'si', 'diario', 'no', 'no', '2 horas', '350', 'no', 'variedad', 'pagina'),
(8060, 5145, 'otra', 'a la piedra', 'otro', 'nada frencuente', 'intermedia', 'otro', 'nunca', 'ni idea', '0', 'no se', 10, 'no', 'te corrijo', 'me da igual', 'irrelevante', 'Lo que de', '400', 'no lo recuerdo', 'otra (especifique)', 'no lo se'),
(8061, 5166, 'muzzarella', 'al molde', 'oregano', '1-2 por mes', 'buena', 'Variedad', 'si', 'si', 'de 100 a 150 $', 'si', 7, 'si', 'television', NULL, NULL, '30 min', 'Considero que la página es completa y cumple con los requisitos', 'no', 'Consumo', 'local'),
(8062, 5168, 'muzzarella', 'al molde', 'queso', '2-3 por semana', 'buena', 'precio', 'si', 'si', 'de 100 a 150 $', 'si', 7, 'si', 'radio', 'si', 'si', '30 min', 'Me gusto', 'si', 'Propaganda', 'local'),
(8063, 5169, 'calabresa', 'al molde', 'masa', '1 vez por semana', 'buena', 'Variedad', 'si', 'si', 'de 100 a 150 $', 'si', 7, 'si', 'television', 'si', 'no', '30 min', 'Buena', 'si', 'Propaganda', 'local'),
(8064, 5170, 'napolitana', 'al molde', 'oregano', 'nada frecuente', 'buena', 'precio', 'si', 'si', 'de 150 a 300 $', 'si', 7, 'si', 'radio', 'si', 'si', '1 hora', 'Excelente', 'no', 'variedad', 'local'),
(8065, 5171, 'muzzarella', 'al molde', 'salsa', '1 vez por semana', 'buena', 'precio', 'no', 'si', 'de 100 a 150 $', 'si', 8, 'si', 'amigo', 'si', 'si', '10 min', 'Buena', 'si', 'funcional', 'local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `id_local` int(11) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `id_encargado` int(11) DEFAULT NULL,
  `foto1` varchar(50) DEFAULT NULL,
  `foto2` varchar(50) DEFAULT NULL,
  `foto3` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`id_local`, `direccion`, `id_encargado`, `foto1`, `foto2`, `foto3`) VALUES
(2001, 'Av. 12 de Octubre 2985, Quilmes, Buenos Aires', 1002, 'Local_A1.jpg', 'Local_A2.jpg', 'Local_A3.jpg'),
(2002, 'Díaz Vélez 620, Avellaneda, Buenos Aires', 1003, 'Local_B1.jpg', 'Local_B2.jpg', 'Local_B3.jpg'),
(2003, 'Av. Independencia 2053, CABA', 1004, 'Local_C1.jpg', 'Local_C2.jpg', 'Local_C3.jpg'),
(2004, 'Adolfo Alsina 773, CABA', 1005, 'Local_D1.jpg', 'Local_D2.jpg', 'Local_D3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales_ofertas`
--

CREATE TABLE `locales_ofertas` (
  `id_local` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `locales_ofertas`
--

INSERT INTO `locales_ofertas` (`id_local`, `id_oferta`) VALUES
(2001, 3001),
(2001, 3002),
(2001, 3003),
(2001, 3004),
(2001, 3005),
(2001, 3006),
(2001, 3007),
(2001, 3008),
(2001, 3009),
(2001, 3010),
(2002, 3001),
(2002, 3002),
(2002, 3003),
(2002, 3004),
(2002, 3006),
(2002, 3007),
(2003, 3001),
(2003, 3004),
(2003, 3007),
(2003, 3010),
(2004, 3001),
(2004, 3004),
(2004, 3007),
(2004, 3010);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `id_oferta` int(11) NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `cant_productos` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`id_oferta`, `titulo`, `cant_productos`, `precio`) VALUES
(3001, 'Clasicos', 2, 175),
(3002, 'Clasicos2', 2, 185),
(3003, 'Clasicos3', 3, 270),
(3004, 'Especiales', 2, 245),
(3005, 'Especiales2', 3, 325),
(3006, 'Especiales3', 3, 330),
(3007, 'Combinados', 3, 220),
(3008, 'Combinados2', 4, 312),
(3009, 'Combinados3', 4, 300),
(3010, 'ComboMax', 6, 510);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas_productos`
--

CREATE TABLE `ofertas_productos` (
  `id_oferta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ofertas_productos`
--

INSERT INTO `ofertas_productos` (`id_oferta`, `id_producto`) VALUES
(3001, 4001),
(3001, 4006),
(3002, 4002),
(3002, 4014),
(3003, 4001),
(3003, 4006),
(3003, 4014),
(3004, 4007),
(3004, 4012),
(3005, 4008),
(3005, 4009),
(3005, 4012),
(3006, 4019),
(3006, 4020),
(3006, 4021),
(3007, 4001),
(3007, 4009),
(3007, 4025),
(3008, 4001),
(3008, 4006),
(3008, 4014),
(3008, 4028),
(3009, 4006),
(3009, 4012),
(3009, 4025),
(3009, 4030),
(3010, 4002),
(3010, 4008),
(3010, 4013),
(3010, 4021),
(3010, 4029),
(3010, 4030);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE `operaciones` (
  `id_operacion` int(11) NOT NULL,
  `tipo_operacion` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_local` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`id_operacion`, `tipo_operacion`, `fecha`, `id_local`, `id_usuario`, `total`) VALUES
(5001, 'compra', '2017-01-05', 2001, 1002, 175),
(5002, 'compra', '2017-01-05', 2002, 1003, 185),
(5003, 'compra', '2017-01-05', 2003, 1004, 270),
(5004, 'compra', '2017-01-05', 2004, 1005, 245),
(5005, 'compra', '2017-01-05', 2001, 1006, 325),
(5006, 'reserva', '2017-01-05', 2001, 1007, 990),
(5007, 'reserva', '2017-01-05', 2001, 1008, 875),
(5008, 'reserva', '2017-01-05', 2002, 1009, 612),
(5009, 'reserva', '2017-01-05', 2002, 1010, 685),
(5010, 'reserva', '2017-01-05', 2002, 1011, 1200),
(5011, 'compra', '2017-01-06', 2003, 1012, 330),
(5012, 'compra', '2017-01-06', 2003, 1013, 220),
(5013, 'compra', '2017-01-06', 2003, 1014, 312),
(5014, 'compra', '2017-01-06', 2004, 1015, 300),
(5015, 'compra', '2017-01-06', 2004, 1016, 510),
(5016, 'compra', '2017-01-06', 2004, 1017, 175),
(5017, 'compra', '2017-01-06', 2004, 1018, 185),
(5018, 'compra', '2017-01-06', 2004, 1019, 270),
(5019, 'compra', '2017-01-06', 2004, 1020, 245),
(5020, 'compra', '2017-01-06', 2004, 1021, 325),
(5021, 'reserva', '2017-01-06', 2003, 1022, 550),
(5022, 'reserva', '2017-01-06', 2003, 1023, 612),
(5023, 'reserva', '2017-01-06', 2003, 1024, 870),
(5024, 'reserva', '2017-01-06', 2002, 1025, 515),
(5025, 'reserva', '2017-01-06', 2002, 1026, 1187),
(5026, 'compra', '2017-01-07', 2002, 1027, 330),
(5027, 'compra', '2017-01-07', 2001, 1028, 220),
(5028, 'compra', '2017-01-07', 2001, 1029, 312),
(5029, 'compra', '2017-01-07', 2001, 1030, 300),
(5030, 'compra', '2017-01-07', 2001, 1002, 510),
(5031, 'compra', '2017-01-07', 2002, 1003, 175),
(5032, 'compra', '2017-01-07', 2003, 1004, 185),
(5033, 'compra', '2017-01-07', 2004, 1005, 270),
(5034, 'compra', '2017-01-07', 2001, 1006, 245),
(5035, 'compra', '2017-01-07', 2001, 1007, 325),
(5036, 'reserva', '2017-01-07', 2001, 1008, 400),
(5037, 'reserva', '2017-01-07', 2002, 1009, 685),
(5038, 'reserva', '2017-01-07', 2002, 1010, 455),
(5039, 'reserva', '2017-01-07', 2002, 1011, 900),
(5040, 'reserva', '2017-01-07', 2003, 1012, 662),
(5041, 'compra', '2017-01-12', 2003, 1013, 330),
(5042, 'compra', '2017-01-12', 2003, 1014, 220),
(5043, 'compra', '2017-01-12', 2004, 1015, 312),
(5044, 'compra', '2017-01-12', 2004, 1016, 300),
(5045, 'compra', '2017-01-12', 2004, 1017, 510),
(5046, 'reserva', '2017-01-12', 2004, 1018, 360),
(5047, 'reserva', '2017-01-12', 2004, 1019, 470),
(5048, 'reserva', '2017-01-12', 2004, 1020, 395),
(5049, 'reserva', '2017-01-12', 2004, 1021, 130),
(5050, 'reserva', '2017-01-12', 2003, 1022, 415),
(5051, 'compra', '2017-01-13', 2003, 1023, 175),
(5052, 'compra', '2017-01-13', 2003, 1024, 185),
(5053, 'compra', '2017-01-13', 2002, 1025, 270),
(5054, 'compra', '2017-01-13', 2002, 1026, 245),
(5055, 'compra', '2017-01-13', 2002, 1027, 325),
(5056, 'compra', '2017-01-13', 2001, 1028, 330),
(5057, 'compra', '2017-01-13', 2001, 1029, 220),
(5058, 'compra', '2017-01-13', 2001, 1030, 312),
(5059, 'compra', '2017-01-13', 2001, 1002, 300),
(5060, 'compra', '2017-01-13', 2002, 1003, 510),
(5061, 'reserva', '2017-01-13', 2003, 1004, 285),
(5062, 'reserva', '2017-01-13', 2004, 1005, 315),
(5063, 'reserva', '2017-01-13', 2001, 1006, 290),
(5064, 'reserva', '2017-01-13', 2001, 1007, 430),
(5065, 'reserva', '2017-01-13', 2001, 1008, 155),
(5066, 'compra', '2017-01-14', 2002, 1009, 175),
(5067, 'compra', '2017-01-14', 2002, 1010, 185),
(5068, 'compra', '2017-01-14', 2002, 1011, 270),
(5069, 'compra', '2017-01-14', 2003, 1012, 245),
(5070, 'compra', '2017-01-14', 2003, 1013, 325),
(5071, 'compra', '2017-01-14', 2003, 1014, 330),
(5072, 'compra', '2017-01-14', 2004, 1015, 220),
(5073, 'compra', '2017-01-14', 2004, 1016, 312),
(5074, 'compra', '2017-01-14', 2004, 1017, 300),
(5075, 'compra', '2017-01-14', 2004, 1018, 510),
(5076, 'reserva', '2017-01-14', 2004, 1019, 184),
(5077, 'reserva', '2017-01-14', 2004, 1020, 370),
(5078, 'reserva', '2017-01-14', 2004, 1021, 82),
(5079, 'reserva', '2017-01-14', 2003, 1022, 93),
(5080, 'reserva', '2017-01-14', 2003, 1023, 810),
(5081, 'compra', '2017-01-19', 2003, 1024, 175),
(5082, 'compra', '2017-01-19', 2002, 1025, 185),
(5083, 'compra', '2017-01-19', 2002, 1026, 270),
(5084, 'compra', '2017-01-19', 2002, 1027, 245),
(5085, 'compra', '2017-01-19', 2001, 1028, 325),
(5086, 'reserva', '2017-01-19', 2001, 1029, 175),
(5087, 'reserva', '2017-01-19', 2001, 1030, 185),
(5088, 'reserva', '2017-01-19', 2001, 1002, 270),
(5089, 'reserva', '2017-01-19', 2002, 1003, 245),
(5090, 'reserva', '2017-01-19', 2003, 1004, 325),
(5091, 'compra', '2017-01-20', 2004, 1005, 330),
(5092, 'compra', '2017-01-20', 2001, 1006, 220),
(5093, 'compra', '2017-01-20', 2001, 1007, 312),
(5094, 'compra', '2017-01-20', 2001, 1008, 300),
(5095, 'compra', '2017-01-20', 2002, 1009, 510),
(5096, 'compra', '2017-01-20', 2002, 1010, 175),
(5097, 'compra', '2017-01-20', 2002, 1011, 185),
(5098, 'compra', '2017-01-20', 2003, 1012, 270),
(5099, 'compra', '2017-01-20', 2003, 1013, 245),
(5100, 'compra', '2017-01-20', 2003, 1014, 325),
(5101, 'reserva', '2017-01-20', 2004, 1015, 330),
(5102, 'reserva', '2017-01-20', 2004, 1016, 220),
(5103, 'reserva', '2017-01-20', 2004, 1017, 300),
(5104, 'reserva', '2017-01-20', 2004, 1018, 510),
(5105, 'reserva', '2017-01-20', 2004, 1019, 175),
(5106, 'compra', '2017-01-21', 2004, 1020, 330),
(5107, 'compra', '2017-01-21', 2004, 1021, 220),
(5108, 'compra', '2017-01-21', 2003, 1022, 312),
(5109, 'compra', '2017-01-21', 2003, 1023, 300),
(5110, 'compra', '2017-01-21', 2003, 1024, 510),
(5111, 'compra', '2017-01-21', 2002, 1025, 100),
(5112, 'compra', '2017-01-21', 2002, 1026, 120),
(5113, 'compra', '2017-01-21', 2002, 1027, 140),
(5114, 'compra', '2017-01-21', 2001, 1028, 120),
(5115, 'compra', '2017-01-21', 2001, 1029, 130),
(5116, 'reserva', '2017-01-21', 2001, 1030, 310),
(5117, 'reserva', '2017-01-21', 2001, 1002, 270),
(5118, 'reserva', '2017-01-21', 2002, 1003, 900),
(5119, 'reserva', '2017-01-21', 2003, 1004, 1342),
(5120, 'reserva', '2017-01-21', 2004, 1005, 220),
(5121, 'compra', '2017-01-26', 2001, 1006, 125),
(5122, 'compra', '2017-01-26', 2001, 1007, 135),
(5123, 'compra', '2017-01-26', 2001, 1008, 135),
(5124, 'compra', '2017-01-26', 2002, 1009, 130),
(5125, 'compra', '2017-01-26', 2002, 1010, 125),
(5126, 'reserva', '2017-01-26', 2002, 1011, 260),
(5127, 'reserva', '2017-01-26', 2003, 1012, 305),
(5128, 'reserva', '2017-01-26', 2003, 1013, 125),
(5129, 'reserva', '2017-01-26', 2003, 1014, 135),
(5130, 'reserva', '2017-01-26', 2004, 1015, 255),
(5131, 'compra', '2017-01-27', 2004, 1016, 130),
(5132, 'compra', '2017-01-27', 2004, 1017, 160),
(5133, 'compra', '2017-01-27', 2004, 1018, 170),
(5134, 'compra', '2017-01-27', 2004, 1019, 115),
(5135, 'compra', '2017-01-27', 2004, 1020, 135),
(5136, 'compra', '2017-01-27', 2004, 1021, 180),
(5137, 'compra', '2017-01-27', 2003, 1022, 140),
(5138, 'compra', '2017-01-27', 2003, 1023, 150),
(5139, 'compra', '2017-01-27', 2003, 1024, 140),
(5140, 'compra', '2017-01-27', 2002, 1025, 145),
(5141, 'reserva', '2017-01-27', 2002, 1026, 290),
(5142, 'reserva', '2017-01-27', 2002, 1027, 285),
(5143, 'reserva', '2017-01-27', 2001, 1028, 135),
(5144, 'reserva', '2017-01-27', 2001, 1029, 470),
(5145, 'reserva', '2017-01-27', 2001, 1030, 285),
(5146, 'compra', '2017-01-28', 2001, 1002, 145),
(5147, 'compra', '2017-01-28', 2002, 1003, 155),
(5148, 'compra', '2017-01-28', 2003, 1004, 175),
(5149, 'compra', '2017-01-28', 2004, 1005, 9),
(5150, 'compra', '2017-01-28', 2001, 1006, 40),
(5151, 'compra', '2017-01-28', 2001, 1007, 30),
(5152, 'compra', '2017-01-28', 2001, 1008, 40),
(5153, 'compra', '2017-01-28', 2002, 1009, 42),
(5154, 'compra', '2017-01-28', 2002, 1010, 45),
(5155, 'compra', '2017-01-28', 2002, 1011, 48),
(5156, 'reserva', '2017-01-28', 2003, 1012, 300),
(5157, 'reserva', '2017-01-28', 2003, 1013, 454),
(5158, 'reserva', '2017-01-28', 2003, 1014, 70),
(5159, 'reserva', '2017-01-28', 2004, 1015, 127),
(5160, 'reserva', '2017-01-28', 2004, 1016, 378),
(5161, 'compra', '2017-02-11', 2001, 1018, 100),
(5162, 'compra', '2017-02-17', 2001, 1006, 220),
(5163, 'compra', '2017-02-17', 2001, 1006, 550),
(5164, 'reserva', '2017-02-17', 2001, 1006, 100),
(5165, 'reserva', '2017-02-17', 2001, 1006, 120),
(5166, 'compra', '2017-02-18', 2004, 1018, 395),
(5167, 'reserva', '2017-02-18', 2001, 1018, 515),
(5168, 'compra', '2017-02-18', 2003, 1018, 480),
(5169, 'compra', '2017-02-18', 2001, 1018, 875),
(5171, 'compra', '2017-02-18', 2001, 1018, 100),
(5172, 'compra', '2017-02-19', 2001, 1018, 100),
(5173, 'compra', '2017-02-19', 2001, 1018, 175);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `foto1` varchar(50) DEFAULT NULL,
  `foto2` varchar(50) DEFAULT NULL,
  `foto3` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `precio`, `foto1`, `foto2`, `foto3`) VALUES
(4001, 'Muzzarella', 100, 'muzzarella_1.png', 'muzzarella_2.png', 'muzzarella_3.png'),
(4002, 'Muzzarella_Doble', 120, 'muzzarella_doble_1.png', 'muzzarella_doble_2.png', 'muzzarella_doble_3.png'),
(4003, 'Muzzarella c/ Anchoas', 140, 'muzzarella_anchoas_1.png', 'muzzarella_anchoas_2.png', 'muzzarella_anchoas_3.png'),
(4004, 'Muzzarella c/ Morron', 120, 'muzzarella_morron_1.png', 'muzzarella_morron_2.png', 'muzzarella_morron_3.png'),
(4005, 'Muzzarella c/ Panceta', 130, 'muzzarella_panceta_1.png', 'muzzarella_panceta_2.png', 'muzzarella_panceta_3.png'),
(4006, 'Napolitana', 125, 'napolitana_1.png', 'napolitana_2.png', 'napolitana_3.png'),
(4007, 'Napolitana_especial', 135, 'napolitana_especial_1.png', 'napolitana_especial_2.png', 'napolitana_especial_3.png'),
(4008, 'Capresse', 135, 'caprese_1.png', 'caprese_2.png', 'caprese_3.png'),
(4009, 'Calabresa', 130, 'calabresa_1.png', 'calabresa_2.png', 'calabresa_3.png'),
(4010, 'Americana', 125, 'americana_1.png', 'americana_2.png', 'americana_3.png'),
(4011, 'Alemana', 130, 'alemana_1.png', 'alemana_2.png', 'alemana_3.png'),
(4012, 'Roquefort', 160, 'roquefort_1.png', 'roquefort_2.png', 'roquefort_3.png'),
(4013, 'Roquefort c/ Jamon', 170, 'roquefort_jamon_1.png', 'roquefort_jamon_2.png', 'roquefort_jamon_3.png'),
(4014, 'Fugazza', 115, 'fugazza_1.png', 'fugazza_2.png', 'fugazza_3.png'),
(4015, 'Fugazza c/ Jamon', 135, 'fugazza_jamon_1.png', 'fugazza_jamon_2.png', 'fugazza_jamon_3.png'),
(4016, 'Fugazzeta Rellena', 180, 'fugazzeta_1.png', 'fugazzeta_2.png', 'fugazzeta_3.png'),
(4017, 'Palmito', 140, 'palmito_1.png', 'palmito_2.png', 'palmito_3.png'),
(4018, 'Palmito c/ Jamon', 150, 'palmito_jamon_1.png', 'palmito_jamon_2.png', 'palmito_jamon_3.png'),
(4019, 'Parmesana', 140, 'parmesana_1.png', 'parmesana_2.png', 'parmesana_3.png'),
(4020, 'Provolone', 145, 'provolone_1.png', 'provolone_2.png', 'provolone_3.png'),
(4021, 'Cuatro Quesos', 145, 'cuatroQuesos_1.png', 'cuatroQuesos_2.png', 'cuatroQuesos_3.png'),
(4022, 'Anana al caramelo', 155, 'anana_1.png', 'anana_2.png', 'anana_3.png'),
(4023, 'Argenta', 175, 'argenta_1.png', 'argenta_2.png', 'argenta_3.png'),
(4024, 'Faina (porcion)', 9, 'faina_1.png', 'faina_2.png', 'faina_3.png'),
(4025, 'Gaseosa (2L)', 40, 'gaseosa_1.png', 'gaseosa_2.png', 'gaseosa_3.png'),
(4026, 'Agua mineral (2L)', 30, 'agua_1.png', 'agua_2.png', 'agua_3.png'),
(4027, 'Cerveza Quilmes (1L)', 40, 'cerveza_quilmes_1.png', 'cerveza_quilmes_2.png', 'cerveza_quilmes_2.png'),
(4028, 'Cerveza Brahma (1L)', 42, 'cerveza_brahma_1.png', 'cerveza_brahma_2.png', 'cerveza_brahma_3.png'),
(4029, 'Cerveza Heineken (1L)', 45, 'cerveza_heineken_1.png', 'cerveza_heineken_2.png', 'cerveza_heineken_3.png'),
(4030, 'Cerveza Stella Artois (1L)', 48, 'cerveza_stella_1.png', 'cerveza_stella_2.png', 'cerveza_stella_3.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_sesiones`
--

CREATE TABLE `registro_sesiones` (
  `id_registro` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo_usuario` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `registro_sesiones`
--

INSERT INTO `registro_sesiones` (`id_registro`, `id_usuario`, `nombre`, `tipo_usuario`, `fecha`, `hora`) VALUES
(9001, 1018, 'Lane, Katherine', 'Cliente', '2017-02-10', '09:01:41'),
(9002, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '8:46:24'),
(9003, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '8:51:51'),
(9004, 1018, 'Lane, Katherine', 'Cliente', '2017-02-13', '8:52:27'),
(9005, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '8:52:31'),
(9006, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '8:55:21'),
(9007, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:9:58'),
(9008, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:16:50'),
(9009, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:20:24'),
(9010, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:37:20'),
(9011, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:39:43'),
(9012, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:41:30'),
(9013, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '20:59:18'),
(9014, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '21:39:36'),
(9015, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '22:49:25'),
(9016, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-13', '22:58:32'),
(9017, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-15', '23:23:35'),
(9018, 1018, 'Lane, Katherine', 'Cliente', '2017-02-15', '23:32:32'),
(9019, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-15', '23:32:36'),
(9020, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-15', '23:35:8'),
(9021, 1018, 'Lane, Katherine', 'Cliente', '2017-02-16', '0:8:42'),
(9022, 1018, 'Lane, Katherine', 'Cliente', '2017-02-16', '0:20:38'),
(9023, 1018, 'Lane, Katherine', 'Cliente', '2017-02-16', '0:25:41'),
(9024, 1018, 'Lane, Katherine', 'Cliente', '2017-02-16', '20:49:37'),
(9025, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-16', '21:9:2'),
(9026, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-16', '21:13:18'),
(9027, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-16', '21:13:58'),
(9028, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-16', '21:25:45'),
(9029, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '8:17:41'),
(9030, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '8:20:25'),
(9031, 1002, 'Reed, Kevin', 'Encargado', '2017-02-17', '8:23:4'),
(9032, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '8:23:26'),
(9033, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '8:24:19'),
(9034, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '8:25:33'),
(9035, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '8:25:52'),
(9036, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '8:26:22'),
(9037, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '19:53:13'),
(9038, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '19:53:17'),
(9039, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:1:51'),
(9040, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:9:39'),
(9041, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:13:0'),
(9042, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:21:14'),
(9043, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:32:5'),
(9044, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:32:39'),
(9045, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:34:49'),
(9046, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:37:25'),
(9047, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:38:31'),
(9048, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:39:38'),
(9049, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:44:58'),
(9050, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:48:39'),
(9051, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:49:54'),
(9052, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:52:9'),
(9053, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:52:35'),
(9054, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:53:21'),
(9055, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:54:8'),
(9056, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:56:23'),
(9057, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:56:42'),
(9058, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '20:58:27'),
(9059, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:1:5'),
(9060, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:2:8'),
(9061, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:3:6'),
(9062, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:3:28'),
(9063, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:5:0'),
(9064, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:11:49'),
(9065, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:12:35'),
(9066, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:13:24'),
(9067, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:15:5'),
(9068, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:18:57'),
(9069, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:19:5'),
(9070, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:19:14'),
(9071, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:28:30'),
(9072, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '21:28:35'),
(9073, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '21:32:42'),
(9074, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '21:36:15'),
(9075, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:20:3'),
(9076, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:25:36'),
(9077, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:31:48'),
(9078, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:33:1'),
(9079, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:33:51'),
(9080, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '22:34:12'),
(9081, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:36:32'),
(9082, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:37:33'),
(9083, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:42:52'),
(9084, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '22:42:59'),
(9085, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:46:13'),
(9086, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '22:46:20'),
(9087, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '22:53:34'),
(9088, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:2:17'),
(9089, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:3:40'),
(9090, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '23:6:52'),
(9091, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:11:27'),
(9092, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-17', '23:14:8'),
(9093, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:14:32'),
(9094, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:19:51'),
(9095, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:20:57'),
(9096, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:26:20'),
(9097, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:29:39'),
(9098, 1018, 'Lane, Katherine', 'Cliente', '2017-02-17', '23:29:54'),
(9099, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:30:0'),
(9100, 1006, 'George, Johnny', 'Empleado', '2017-02-17', '23:31:26'),
(9101, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-19', '23:52:19'),
(9102, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-19', '23:57:59'),
(9103, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '0:11:1'),
(9104, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '0:11:9'),
(9105, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '1:4:26'),
(9106, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '1:34:18'),
(9107, 1018, 'Lane, Katherine', 'Cliente', '2017-02-20', '2:48:58'),
(9108, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '11:42:25'),
(9109, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '12:5:11'),
(9110, 1031, 'gonzalez, natalia', 'Cliente', '2017-02-20', '12:10:7'),
(9111, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '12:10:27'),
(9112, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '12:40:6'),
(9113, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '13:14:59'),
(9114, 1001, 'Robertson, Jonathan', 'Administrador', '2017-02-20', '13:21:0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `cantidad_prod` int(11) DEFAULT NULL,
  `precio_final` int(11) DEFAULT NULL,
  `id_operacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `fecha_entrega`, `cantidad_prod`, `precio_final`, `id_operacion`) VALUES
(6001, '2017-01-08', 10, 990, 5006),
(6002, '2017-01-08', 9, 875, 5007),
(6003, '2017-01-08', 8, 612, 5008),
(6004, '2017-01-09', 8, 685, 5009),
(6005, '2017-01-09', 11, 1200, 5010),
(6006, '2017-01-09', 6, 550, 5021),
(6007, '2017-01-09', 8, 612, 5022),
(6008, '2017-01-09', 10, 870, 5023),
(6009, '2017-01-10', 5, 515, 5024),
(6010, '2017-01-10', 13, 1187, 5025),
(6011, '2017-01-10', 5, 400, 5036),
(6012, '2017-01-10', 8, 685, 5037),
(6013, '2017-01-10', 5, 455, 5038),
(6014, '2017-01-11', 8, 900, 5039),
(6015, '2017-01-11', 2, 662, 5040),
(6016, '2017-01-15', 3, 360, 5046),
(6017, '2017-01-15', 5, 470, 5047),
(6018, '2017-01-15', 3, 395, 5048),
(6019, '2017-01-15', 1, 130, 5049),
(6020, '2017-01-15', 3, 415, 5050),
(6021, '2017-01-16', 2, 285, 5061),
(6022, '2017-01-16', 2, 315, 5062),
(6023, '2017-01-16', 2, 290, 5063),
(6024, '2017-01-16', 3, 430, 5064),
(6025, '2017-01-16', 1, 155, 5065),
(6026, '2017-01-18', 2, 184, 5076),
(6027, '2017-01-18', 6, 370, 5077),
(6028, '2017-01-18', 2, 82, 5078),
(6029, '2017-01-18', 2, 93, 5079),
(6030, '2017-01-18', 10, 810, 5080),
(6031, '2017-01-22', 2, 175, 5086),
(6032, '2017-01-22', 2, 185, 5087),
(6033, '2017-01-22', 3, 270, 5088),
(6034, '2017-01-23', 4, 245, 5089),
(6035, '2017-01-23', 5, 325, 5090),
(6036, '2017-01-24', 6, 330, 5101),
(6037, '2017-01-24', 7, 220, 5102),
(6038, '2017-01-24', 8, 300, 5103),
(6039, '2017-01-24', 6, 510, 5104),
(6040, '2017-01-24', 2, 175, 5105),
(6041, '2017-01-25', 2, 310, 5116),
(6042, '2017-01-25', 3, 270, 5117),
(6043, '2017-01-25', 8, 900, 5118),
(6044, '2017-01-25', 17, 1342, 5119),
(6045, '2017-01-25', 2, 220, 5120),
(6046, '2017-01-29', 2, 260, 5126),
(6047, '2017-01-29', 3, 305, 5127),
(6048, '2017-01-29', 1, 125, 5128),
(6049, '2017-01-30', 1, 135, 5129),
(6050, '2017-01-30', 3, 255, 5130),
(6051, '2017-01-30', 2, 290, 5141),
(6052, '2017-01-30', 2, 285, 5142),
(6053, '2017-01-31', 1, 135, 5143),
(6054, '2017-01-31', 3, 470, 5144),
(6055, '2017-01-31', 2, 285, 5145),
(6056, '2017-01-31', 2, 300, 5156),
(6057, '2017-01-31', 5, 454, 5157),
(6058, '2017-02-01', 2, 70, 5158),
(6059, '2017-02-01', 3, 127, 5159),
(6060, '2017-02-01', 4, 378, 5160),
(6061, '2017-02-22', 1, 100, 5164),
(6062, '2017-02-20', 1, 120, 5165),
(6063, '2017-02-21', 5, 515, 5167);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas_ofertas`
--

CREATE TABLE `reservas_ofertas` (
  `id_reserva` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservas_ofertas`
--

INSERT INTO `reservas_ofertas` (`id_reserva`, `id_oferta`) VALUES
(6001, 3001),
(6001, 3002),
(6001, 3003),
(6001, 3004),
(6002, 3005),
(6002, 3006),
(6002, 3007),
(6003, 3008),
(6003, 3009),
(6004, 3001),
(6004, 3010),
(6005, 3002),
(6005, 3003),
(6005, 3004),
(6005, 3005),
(6006, 3006),
(6006, 3007),
(6007, 3008),
(6007, 3009),
(6008, 3001),
(6008, 3002),
(6008, 3010),
(6009, 3003),
(6009, 3004),
(6010, 3005),
(6010, 3006),
(6010, 3007),
(6010, 3008),
(6011, 3009),
(6012, 3001),
(6012, 3010),
(6013, 3002),
(6013, 3003),
(6014, 3004),
(6014, 3005),
(6014, 3006),
(6015, 3007),
(6015, 3008),
(6017, 3007),
(6027, 3009),
(6030, 3009),
(6030, 3010),
(6031, 3001),
(6032, 3002),
(6033, 3003),
(6034, 3004),
(6035, 3005),
(6036, 3006),
(6037, 3007),
(6038, 3008),
(6038, 3009),
(6039, 3010),
(6040, 3001),
(6041, 3002),
(6042, 3003),
(6043, 3004),
(6043, 3005),
(6043, 3006),
(6044, 3007),
(6044, 3008),
(6044, 3009),
(6044, 3010),
(6047, 3001),
(6057, 3003),
(6060, 3006),
(6063, 3003),
(6063, 3004);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas_productos`
--

CREATE TABLE `reservas_productos` (
  `id_reserva` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservas_productos`
--

INSERT INTO `reservas_productos` (`id_reserva`, `id_producto`) VALUES
(6001, 4014),
(6005, 4023),
(6011, 4001),
(6015, 4005),
(6016, 4001),
(6016, 4002),
(6016, 4003),
(6017, 4004),
(6017, 4005),
(6018, 4006),
(6018, 4007),
(6018, 4008),
(6019, 4009),
(6020, 4010),
(6020, 4011),
(6020, 4012),
(6021, 4013),
(6021, 4014),
(6022, 4015),
(6022, 4016),
(6023, 4017),
(6023, 4018),
(6024, 4019),
(6024, 4020),
(6024, 4021),
(6025, 4022),
(6026, 4023),
(6026, 4024),
(6027, 4025),
(6027, 4026),
(6028, 4027),
(6028, 4028),
(6029, 4029),
(6029, 4030),
(6041, 4010),
(6045, 4001),
(6045, 4002),
(6046, 4003),
(6046, 4004),
(6047, 4005),
(6048, 4006),
(6049, 4007),
(6050, 4008),
(6050, 4009),
(6050, 4010),
(6051, 4011),
(6051, 4012),
(6052, 4013),
(6052, 4014),
(6053, 4015),
(6054, 4016),
(6054, 4017),
(6054, 4018),
(6055, 4019),
(6055, 4020),
(6056, 4021),
(6056, 4022),
(6057, 4023),
(6057, 4024),
(6058, 4025),
(6058, 4026),
(6059, 4027),
(6059, 4028),
(6059, 4029),
(6060, 4030),
(6061, 4001),
(6062, 4002);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `coordenadas` varchar(50) DEFAULT NULL,
  `clave` varchar(50) DEFAULT NULL,
  `tipo_user` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `id_local` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `edad`, `sexo`, `correo`, `direccion`, `coordenadas`, `clave`, `tipo_user`, `estado`, `id_local`) VALUES
(1001, 'Jonathan', 'Robertson', 41, 'M', 'jrobertson0@utexas.edu', 'Av. Santa Fe 1780, CABA', '-34.595960, -58.393046', 'utn_1234', 'administrador', 'activo', NULL),
(1002, 'Kevin', 'Reed', 53, 'M', 'kreed1@seattletimes.com', 'Almte Brown 560, Quilmes, Buenos Aires', '-34.720926, -58.256849', 'QDIGnRxGis', 'encargado', 'activo', 2001),
(1003, 'Kathy', 'Fields', 29, 'F', 'kfields2@shop-pro.jp', 'Ing Marconi 623, Avellaneda, Buenos Aires', '-34.660427, -58.365360', 'Bkbcrmq4', 'encargado', 'activo', 2002),
(1004, 'Ryan', 'Flores', 90, 'M', 'rflores3@wp.com', 'Av. Belgrano 3357, CABA', '-34.615337, -58.413722', 'e95YSb', 'encargado', 'activo', 2003),
(1005, 'Wanda', 'Armstrong', 61, 'F', 'warmstrong4@shinystat.com', 'Bartolome Mitre 2073, CABA', '-34.608181, -58.395859', 'hMjl0Plr', 'encargado', 'activo', 2004),
(1006, 'Johnny', 'George', 43, 'M', 'jgeorge5@addtoany.com', 'Moreno 211,  Quilmes, Buenos Aires', '-34.716069, -58.263133', 'aNQND1', 'empleado', 'activo', 2001),
(1007, 'Ruby', 'Greene', 107, 'F', 'rgreene6@jiathis.com', 'Urquiza 1619, Quilmes, Buenos Aires', '-34.732405, -58.269354', '3M5OhaDWQC', 'empleado', 'activo', 2001),
(1008, 'Clarence', 'Marshall', 106, 'M', 'cmarshall7@simplemachines.org', 'Irala 3121, Quilmes, Buenos Aires', '-34.749217, -58.287041', 'XGFXoXzEPy', 'empleado', 'activo', 2001),
(1009, 'Robin', 'Nguyen', 77, 'F', 'rnguyen8@newsvine.com', 'Italia 37 Avellaneda, Buenos Aires', '-34.664783, -58.362143', 'tM5J6Zgs', 'empleado', 'activo', 2002),
(1010, 'Steven', 'Kelley', 71, 'M', 'skelley9@fastcompany.com', 'Colón 516, Avellaneda, Buenos Aires', '-34.664253, -58.370676', 'jQVIVhzAAig', 'empleado', 'activo', 2002),
(1011, 'Sandra', 'Barnes', 31, 'F', 'sbarnesa@51.la', 'Laprida 80, Avellaneda, Buenos Aires', '-34.663267, -58.361694', 'wZmy39ZA', 'empleado', 'activo', 2002),
(1012, 'Jonathan', 'Davis', 45, 'M', 'jdavisb@naver.com', 'Sta Elena 447, CABA', '-34.648353, -58.384410', 'T5Z3gDLX', 'empleado', 'activo', 2003),
(1013, 'Chris', 'Ramos', 54, 'M', 'cramosc@tripadvisor.com', 'Rocha 1516, CABA', '-34.642329, -58.372007', 'octnxflBNa', 'empleado', 'activo', 2003),
(1014, 'Mark', 'Wright', 24, 'M', 'mwrightd@slideshare.net', 'Rondeau 3061, CABA', '-34.636137, -58.407063', 'lIzmlPLAye', 'empleado', 'activo', 2003),
(1015, 'Jacqueline', 'Morrison', 37, 'F', 'jmorrisone@bbc.co.uk', 'Valentin Gomez 3530, CABA', '-34.604934, -58.415451', 'ljf5b8hGC', 'empleado', 'activo', 2004),
(1016, 'Ruth', 'Hicks', 64, 'F', 'rhicksf@technorati.com', 'Av. Caseros 548, CABA', '-34.626864, -58.373081', 'ZS39olp', 'empleado', 'activo', 2004),
(1017, 'Eugene', 'Carter', 54, 'M', 'ecarterg@auda.org.au', 'Carlos Calvo 750, CABA', '-34.619744, -58.376566', '4YOG7QtUkjL7', 'empleado', 'activo', 2004),
(1018, 'Katherine', 'Lane', 52, 'F', 'klaneh@yahoo.co.jp', 'Santander 443, CABA', '-34.633922, -58.427315', 'nJHNO1Fl4B9G', 'cliente', 'activo', NULL),
(1019, 'Nicholas', 'Ramos', 104, 'M', 'nramosi@wordpress.com', 'Somellera 1751, CABA', '-34.643839, -58.436698', 'NapD4sTII', 'cliente', 'inactivo', NULL),
(1020, 'Robert', 'Ward', 95, 'M', 'rwardj@hubpages.com', 'Costa Rica 4737, CABA', '-34.587648, -58.427676', 'ceyFdg', 'cliente', 'inactivo', NULL),
(1021, 'Paul', 'Hernandez', 35, 'M', 'phernandezk@google.com.hk', 'Carlos Calvo 2451, CABA', '-34.620737, -58.400394', 'V1IuTeLzp', 'cliente', 'inactivo', NULL),
(1022, 'Denise', 'Stone', 69, 'F', 'dstonel@quantcast.com', 'Uspallata 2761, CABA', '-34.638554, -58.400827', 'MeBn39Jx', 'cliente', 'inactivo', NULL),
(1023, 'Catherine', 'George', 62, 'F', 'cgeorgem@facebook.com', 'Beruti 281, Avellaneda, Buenos Aires', '-34.663134, -58.369286', 'qHQdqWqHGN', 'cliente', 'inactivo', NULL),
(1024, 'Angela', 'Perez', 37, 'F', 'aperezn@netlog.com', 'Basavilbaso 759, Sarandi­, Buenos Aires', '-34.682841, -58.355645', 'PdCrVHju', 'cliente', 'inactivo', NULL),
(1025, 'Theresa', 'Ramos', 23, 'F', 'tramoso@chicagotribune.com', 'Cotagaita 357, Wilde, Buenos Aires', '-34.702306, -58.327858', 'OSSYbU', 'cliente', 'activo', NULL),
(1026, 'Mary', 'Jackson', 94, 'F', 'mjacksonp@dedecms.com', 'Maipú 1120, Don Bosco, Buenos Aires', '-34.705391, -58.298700', 'aOKQirYbIDb', 'cliente', 'activo', NULL),
(1027, 'Donna', 'Lopez', 104, 'F', 'dlopezq@devhub.com', '25 de Mayo 153, Bernal, Buenos Aires', '-34.711621, -58.284553', 'L5hXoIC4u4Jz', 'cliente', 'activo', NULL),
(1028, 'Willie', 'Murray', 110, 'M', 'wmurrayr@cornell.edu', 'Almte Solier 5910, Wilde, Buenos Aires', '-34.704560, -58.325909', 'OdheCwn6', 'cliente', 'activo', NULL),
(1029, 'Nicholas', 'Wells', 41, 'M', 'nwellss@myspace.com', 'Azcuenaga 1045, Quilmes, Buenos Aires', '-34.727223, -58.271923', 'OASxar', 'cliente', 'activo', NULL),
(1030, 'Kathryn', 'Matthews', 62, 'F', 'kmatthewst@tiny.cc', 'O Higgins 2176, Quilmes, Buenos Aires', '-34.737425, -58.269974', 'BsZAxPasYT', 'cliente', 'inactivo', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`);

--
-- Indices de la tabla `compras_ofertas`
--
ALTER TABLE `compras_ofertas`
  ADD PRIMARY KEY (`id_compra`,`id_oferta`);

--
-- Indices de la tabla `compras_productos`
--
ALTER TABLE `compras_productos`
  ADD PRIMARY KEY (`id_compra`,`id_producto`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id_encuesta`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id_local`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id_oferta`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`id_operacion`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `registro_sesiones`
--
ALTER TABLE `registro_sesiones`
  ADD PRIMARY KEY (`id_registro`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`);

--
-- Indices de la tabla `reservas_ofertas`
--
ALTER TABLE `reservas_ofertas`
  ADD PRIMARY KEY (`id_reserva`,`id_oferta`);

--
-- Indices de la tabla `reservas_productos`
--
ALTER TABLE `reservas_productos`
  ADD PRIMARY KEY (`id_reserva`,`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7109;
--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id_encuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8066;
--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `id_local` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2005;
--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id_oferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3011;
--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `id_operacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5174;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4031;
--
-- AUTO_INCREMENT de la tabla `registro_sesiones`
--
ALTER TABLE `registro_sesiones`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9115;
--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6064;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1031;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
