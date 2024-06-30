-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 30, 2024 lúc 07:22 PM
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
(6, 'votrangiahao@gmail.com', '$2b$10$/ZW7/FaGlweFVmBasIhDsOAGJufmdOzShgapCnNRd9juUHOXWiIPO'),
(7, 'lorem@gmail.com', '$2b$10$AN7Kk7FrboLvxuCh9.jI1OhlSy.HB/qWAyDgx502BxNAzzYVOr8fO'),
(8, 'test22@gmail.com', '$2b$10$l.0gp/3sIbnBSo/viqG0x.jLNJMAxVxrjMKqUN7Y9sAmlDofeKgXq'),
(9, 'kkk@gmail.com', '$2b$10$SxUuw2/dahZmd49OS7NtRu/.B871Tc6DMWW.JpbV0CwGAW05lh8v6'),
(10, 'sleep@gmail.com', '$2b$10$dJUxaygialQaCwic2DBSXu/iPuQiGO6GhtNpu2rTLwklemRxxiEPO');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

CREATE TABLE `course` (
  `courseID` int(11) NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  `cohort` varchar(255) DEFAULT NULL,
  `classSize` int(11) DEFAULT NULL,
  `timeStart` varchar(255) DEFAULT NULL,
  `timeEnd` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `lecturerID` int(11) NOT NULL,
  `subjectID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `scheduleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `birthday` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lecturer`
--

INSERT INTO `lecturer` (`lecturerID`, `accountID`, `lecturerName`, `gender`, `faculty`, `birthday`, `address`, `phone`) VALUES
(3, 7, 'lorem1', 'M', 'toan tin', '2002-02-20', 'dong nai', '1111111111'),
(4, 8, 'haoooo', 'F', 'toan', '2002-01-20', 'dong nai 2', '1123123312'),
(5, 9, 'hhhhkkk', 'M', 'test', '2002-01-12', 'dong nai', '1012992929'),
(6, 10, 'sleep', 'F', 'aksd', '2002-01-20', 'asd', '1101010101');

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
(6, 1, 1, 1, 1),
(7, 0, 0, 0, 0),
(8, 0, 0, 0, 0),
(9, 0, 0, 0, 0),
(10, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `roomID` int(11) NOT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `roomType` bit(1) DEFAULT NULL,
  `location` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `scheduleID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `yearStart` varchar(255) DEFAULT NULL,
  `yearEnd` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject`
--

CREATE TABLE `subject` (
  `subjectID` int(11) NOT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `subjectType` bit(1) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Chỉ mục cho bảng `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseID`),
  ADD UNIQUE KEY `courseID` (`courseID`);

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
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomID`),
  ADD UNIQUE KEY `roomID` (`roomID`);

--
-- Chỉ mục cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleID`),
  ADD UNIQUE KEY `scheduleID` (`scheduleID`);

--
-- Chỉ mục cho bảng `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subjectID`),
  ADD UNIQUE KEY `subjectID` (`subjectID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `lecturerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `subject`
--
ALTER TABLE `subject`
  MODIFY `subjectID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
