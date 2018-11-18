-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 29-04-2019 a las 06:51:54
-- Versión del servidor: 5.7.24-0ubuntu0.16.04.1
-- Versión de PHP: 7.1.18-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_docppt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `name_user` varchar(45) NOT NULL,
  `lastname_user` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type_idtype` int(11) NOT NULL,
  `departament_iddepartament` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`iduser`, `name_user`, `lastname_user`, `email`, `password`, `type_idtype`, `departament_iddepartament`) VALUES
(1, 'Giampieer', 'Mariscal', 'giampieer24@gmail.com', '111111', 1, 1),
(2, 'Giampieer', 'Mariscal', 'giampieer2424@gmail.com', '111111', 2, 17);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `type_idtype` (`type_idtype`),
  ADD KEY `departament_iddepartament` (`departament_iddepartament`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`type_idtype`) REFERENCES `type` (`idtype`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`departament_iddepartament`) REFERENCES `departaments` (`iddepartaments`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
