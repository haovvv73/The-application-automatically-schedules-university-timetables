-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 06, 2024 lúc 03:58 PM
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
(1, 'votrangiahao@gmail.com', '$2b$10$/ZW7/FaGlweFVmBasIhDsOAGJufmdOzShgapCnNRd9juUHOXWiIPO'),
(12, 'haovvv73@gmail.com', '$2b$10$iu8L7LucshLpyX86HLnpbeQ4C7q0ZU0z4294L38aZJAveYeLGuufm'),
(13, 'trinhthanhdeo@gmail.com', '$2b$10$Zo1RkkCsE5nmoTqUb5CSReyty8tr7q7yeaZGjSt/ElhVa2.NdR8Ae'),
(14, 'huynhthanhson@gmail.com', '$2b$10$pgYl3pq7.X5hhzCJckl.juQqeBtlM.vsVEcW30U.iceMpYN5fRw/a'),
(15, 'havanthao@gmail.com', '$2b$10$3vtb.jvoN.Xvk8Zg9ikuZuTTmjIPvYSWKHYEzHep1A8VEwHJ0R3Bi'),
(16, 'trantuananh@gmail.com', '$2b$10$rH4oJ6lOBbgD4W4fTix2huLBFglevhROCs51CNRljN5qcfp5Dg6KC'),
(17, 'ngominhman@gmail.com', '$2b$10$L5lQDba3zoJuz1r41YwObOaPgLsrq2efVV9FT3OHeLRDy.6krhTGy'),
(18, 'lynhubinh@gmail.com', '$2b$10$2MOjFMLI6ANYW7YIrlnGbeEWz4tKIBusXz4tCx2ATNu2IrMRI57fK'),
(19, 'nguyenthikieutrang@gmaail.com', '$2b$10$JWV3BvAnuWSbrh.GTlh7iOIFKlf3oWd4xBpfZRDIlyqCTA.DTRkQ.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

CREATE TABLE `course` (
  `courseID` int(11) NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  `cohort` varchar(255) DEFAULT NULL,
  `classSize` varchar(1000) DEFAULT NULL,
  `timeStart` varchar(255) DEFAULT NULL,
  `timeEnd` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `type` int(1) NOT NULL DEFAULT 0,
  `location` int(1) NOT NULL,
  `lecturerID` varchar(255) NOT NULL,
  `subjectID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `scheduleID` int(11) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`courseID`, `className`, `cohort`, `classSize`, `timeStart`, `timeEnd`, `day`, `type`, `location`, `lecturerID`, `subjectID`, `roomID`, `scheduleID`, `deleted`) VALUES
(39, 'kinh te chinh tri mac lenin', 'k20', 'k20', '2024-07-26T00:30:00.000Z', '2024-07-26T04:50:00.000Z', 'mon', 1, 0, '[20]', 16, 15, 151, b'0'),
(40, 'giai tich 1A', 'k20', 'k20', '2024-07-26T00:30:00.000Z', '2024-07-26T04:00:00.000Z', 'tue', 1, 1, '[17]', 17, 13, 151, b'0'),
(41, 'vi tich phan 1A', 'k20', 'k20', '2024-07-26T05:40:00.000Z', '2024-07-26T08:10:00.000Z', 'tue', 0, 1, '[18]', 18, 14, 151, b'0'),
(42, 'anh van 1', 'k20', 'k20', '2024-07-26 01:00:00', '2024-07-26 04:00:00', 'wed', 1, 1, '[8]', 13, 13, 151, b'0'),
(43, 'the duc 1', 'k20', 'k20', '2024-07-26T00:30:00.000Z', '2024-07-26T02:10:00.000Z', 'thu', 1, 1, '[15]', 14, 13, 151, b'0'),
(44, 'Phap luat dai cuong', 'k20', 'k20', '2024-07-26T02:10:00.000Z', '2024-07-26T04:50:00.000Z', 'thu', 1, 1, '[21]', 12, 13, 151, b'0'),
(45, 'triet hoc maclenin', 'k20', 'k20', '2024-07-26T00:30:00.000Z', '2024-07-26T04:50:00.000Z', 'fri', 1, 1, '[16]', 15, 13, 151, b'0'),
(46, 'dai so tuyen tinh', 'k20', 'k20', '2024-07-26T00:30:00.000Z', '2024-07-26T04:00:00.000Z', 'sat', 0, 1, '[19]', 19, 14, 151, b'0'),
(47, 'Phap luat dai cuong', 'k21', 'k21', '2024-07-26 07:30:00', '2024-07-26 10:00:00', 'fri', 1, 1, '[8]', 12, 13, 152, b'0');

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
(1, 1, 'admin', 'M', 'admin', '2002-01-20', 'admin address', '1234567891'),
(8, 12, 'gia hao', 'M', 'toan ung dung', '2002-01-20', 'dong nai', '0123456789'),
(15, 13, 'Trinh Thanh Deo', 'M', 'toan', '1982-01-12', 'adress', '1111111111'),
(16, 14, 'Huynh Thanh Son', 'M', 'toan', '1980-01-30', 'adress', '1111111111'),
(17, 15, 'Ha Van Thao', 'M', 'toan', '1982-03-07', 'adress', '1111111111'),
(18, 16, 'Tran Tuan Anh A', 'M', 'toan', '1982-07-07', 'adress', '1111111111'),
(19, 17, 'Ngo Minh Man', 'M', 'toan', '1982-04-04', 'adress', '1111111111'),
(20, 18, 'Ly Nhu Binh', 'M', 'toan', '1982-08-08', 'adress', '1111111111'),
(21, 19, 'Nguyen Thi Kieu Trang', 'M', 'toan', '1982-02-22', 'adress', '1111111111');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `notiID` int(11) NOT NULL,
  `lecturerID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `notiType` varchar(255) DEFAULT NULL,
  `description` varchar(700) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`notiID`, `lecturerID`, `title`, `notiType`, `description`, `sender`, `time`, `date`, `deleted`) VALUES
(74, 20, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(75, 17, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(76, 18, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(77, 8, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(78, 15, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(79, 21, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(80, 16, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(81, 19, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 20TTH in Semester 1 2024-11-12 2028-11-12', 'HCMUS ADMIN', '01:14:17', '26/07/2024', b'0'),
(82, 1, 'Change Time', 'message', 'Change New Time For course: anh van 1', 'gia hao', '01:24:27', '26/07/2024', b'0'),
(83, 8, 'Your request success', 'success', 'Your request has update please check it !', 'HCMUS ADMIN', '01:24:48', '26/07/2024', b'0'),
(84, 8, 'New schedule time-table', 'message', 'New Schedule For TKB Lop 21TTH in Semester 1 2024-07-05 2024-08-04', 'HCMUS ADMIN', '09:52:47', '26/07/2024', b'0'),
(85, 1, 'Change Time', 'message', 'Change New Time For course: Phap luat dai cuong', 'gia hao', '09:55:51', '26/07/2024', b'0'),
(86, 8, 'Your request success', 'success', 'Your request has update please check it !', 'HCMUS ADMIN', '09:56:17', '26/07/2024', b'0');

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
(1, 1, 1, 1, 1),
(7, 0, 0, 0, 0),
(8, 0, 0, 0, 0),
(9, 0, 0, 0, 0),
(10, 0, 0, 0, 0),
(11, 0, 0, 0, 0),
(12, 0, 0, 0, 0),
(13, 0, 0, 0, 0),
(14, 0, 0, 0, 0),
(15, 0, 0, 0, 0),
(16, 0, 0, 0, 0),
(17, 0, 0, 0, 0),
(18, 0, 0, 0, 0),
(19, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request`
--

CREATE TABLE `request` (
  `requestID` int(11) NOT NULL,
  `lecturerID` int(11) DEFAULT NULL,
  `scheduleID` int(11) DEFAULT NULL,
  `courseID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `time2` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `timeSelect` int(11) NOT NULL DEFAULT 0,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `request`
--

INSERT INTO `request` (`requestID`, `lecturerID`, `scheduleID`, `courseID`, `title`, `content`, `status`, `time`, `time2`, `reason`, `date`, `timeSelect`, `deleted`) VALUES
(38, 8, 151, 42, 'Change Time', 'Change New Time For course: anh van 1', 'success', 'wed_01:00-04:00', 'sat_10:00-04:00', 'busy', '01:24:27 26/07/2024', 1, b'0'),
(39, 8, 152, 47, 'Change Time', 'Change New Time For course: Phap luat dai cuong', 'success', 'fri_07:30-10:00', 'sat_07:03-10:00', 'busy', '09:55:51 26/07/2024', 1, b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `roomID` int(11) NOT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `roomType` bit(1) DEFAULT NULL,
  `location` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`roomID`, `roomName`, `capacity`, `roomType`, `location`, `description`, `deleted`) VALUES
(1, 'F202', 120, b'1', b'1', 'F202', b'0'),
(13, 'E103', 200, b'1', b'1', 'linh trung ', b'0'),
(14, 'E203', 200, b'0', b'1', 'linh trung practice\n', b'0'),
(15, 'F203', 200, b'1', b'0', 'nguyen van cu', b'0'),
(16, 'F206', 200, b'0', b'0', 'nguyen van cu practice', b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `scheduleID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `yearStart` varchar(255) DEFAULT NULL,
  `yearEnd` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `schedule`
--

INSERT INTO `schedule` (`scheduleID`, `title`, `yearStart`, `yearEnd`, `semester`, `deleted`) VALUES
(151, 'TKB Lop 20TTH', '2024-11-12', '2028-11-12', 1, b'0'),
(152, 'TKB Lop 21TTH', '2024-07-05', '2024-08-04', 1, b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject`
--

CREATE TABLE `subject` (
  `subjectID` int(11) NOT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `subject`
--

INSERT INTO `subject` (`subjectID`, `subjectName`, `credit`, `description`, `duration`, `deleted`) VALUES
(11, 'Toan Roi Rac', 1, 'Mon hoc voi toan logic', 1, b'0'),
(12, 'Phap luat dai cuong', 3, 'Pháp luật đại cương', 3, b'0'),
(13, 'anh van 1', 4, 'Anh văn 1', 4, b'0'),
(14, 'the duc 1', 1, 'Thể dục 1', 2, b'0'),
(15, 'triet hoc maclenin', 4, 'Triết học Mác - Lênin', 5, b'0'),
(16, 'kinh te chinh tri mac lenin', 4, 'Kinh tế chính trị Mác - Lênin', 5, b'0'),
(17, 'giai tich 1A', 3, 'Giải tích 1A', 4, b'0'),
(18, 'vi tich phan 1A', 2, 'Vi tích phân 1A', 3, b'0'),
(19, 'dai so tuyen tinh', 4, 'Đại số tuyến tính', 4, b'0');

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
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notiID`),
  ADD UNIQUE KEY `notiID` (`notiID`);

--
-- Chỉ mục cho bảng `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`accountID`),
  ADD UNIQUE KEY `accountID` (`accountID`);

--
-- Chỉ mục cho bảng `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`requestID`),
  ADD UNIQUE KEY `requestID` (`requestID`);

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
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `lecturerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `notiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT cho bảng `request`
--
ALTER TABLE `request`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT cho bảng `subject`
--
ALTER TABLE `subject`
  MODIFY `subjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
