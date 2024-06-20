-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2024 lúc 06:32 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hcmus_automatic_schedule`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `accountID` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`accountID`, `email`, `password`) VALUES
(6, 'votrangiahao@gmail.com', '$2b$10$/ZW7/FaGlweFVmBasIhDsOAGJufmdOzShgapCnNRd9juUHOXWiIPO');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lecturer`
--

CREATE TABLE `lecturer` (
  `lecturerID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `lecturerName` varchar(255) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `faculty` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lecturer`
--

INSERT INTO `lecturer` (`lecturerID`, `accountID`, `lecturerName`, `gender`, `faculty`, `birthday`, `address`, `phone`) VALUES
(2, 6, 'giahao', 'M', 'lorem', '2002-01-20', 'dong nai', '1234567881');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permission`
--

CREATE TABLE `permission` (
  `accountID` int(11) NOT NULL,
  `permissionRead` tinyint(1) NOT NULL DEFAULT 0,
  `permissionCreate` tinyint(1) NOT NULL DEFAULT 0,
  `permissionUpdate` tinyint(1) NOT NULL DEFAULT 0,
  `permissionDelete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `permission`
--

INSERT INTO `permission` (`accountID`, `permissionRead`, `permissionCreate`, `permissionUpdate`, `permissionDelete`) VALUES
(6, 0, 0, 0, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountID`),
  ADD UNIQUE KEY `accountID` (`accountID`);

--
-- Chỉ mục cho bảng `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`lecturerID`),
  ADD UNIQUE KEY `lecturerID` (`lecturerID`);

--
-- Chỉ mục cho bảng `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`accountID`),
  ADD UNIQUE KEY `accountID` (`accountID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `lecturerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
