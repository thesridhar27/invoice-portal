-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2026 at 09:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invoice_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_name` varchar(255) DEFAULT 'New Client',
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `due_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `user_id`, `client_name`, `total`, `status`, `due_date`, `created_at`) VALUES
(4, 1, 'lila', 88.00, 'paid', '2026-05-07', '2026-05-10 11:41:40'),
(5, 1, 'yukthi Raju', 120.00, 'pending', '2026-05-12', '2026-05-10 11:44:31'),
(6, 1, 'google ', 88.00, 'paid', '2026-05-10', '2026-05-10 16:04:03'),
(8, 5, 'google', 88.00, 'pending', '2026-05-11', '2026-05-11 10:05:41'),
(10, 6, 'Google', 99.00, 'pending', '2026-05-11', '2026-05-11 10:26:09'),
(11, 6, 'Amazon', 100.00, 'paid', '2026-05-11', '2026-05-11 10:26:25'),
(12, 6, 'PVT Limited', 112.00, 'paid', '2026-05-11', '2026-05-11 10:26:47'),
(13, 7, 'Accenture', 95.00, 'paid', '2026-06-01', '2026-06-01 05:07:18'),
(14, 7, 'samsung', 150.00, 'pending', '2026-05-31', '2026-06-01 05:08:54'),
(15, 8, 'Wipro', 200.00, 'pending', '2026-05-13', '2026-06-01 08:40:16'),
(17, 8, 'MTR company', 240.00, 'paid', '2026-06-01', '2026-06-01 08:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `business_name` varchar(150) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `tax_rate` decimal(5,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `business_name`, `currency`, `tax_rate`, `created_at`) VALUES
(1, 'Test User', 'testuser@example.com', '$2y$10$Rmjf3Q.ONqvSnTULWTiR7OU0.HeBqYMs0PDK0RSBH3NDuQX5goh7m', 'Test Company', 'USD', 0.00, '2026-05-09 05:50:32'),
(2, 'Sridhara', 'thesridhar123@gmail.com', 'Passme!23', NULL, 'USD', 0.00, '2026-05-10 16:31:55'),
(3, 'Sreekanth V', 'sreekanth@gmail.com', 'Passme!23', NULL, 'USD', 0.00, '2026-05-11 08:50:47'),
(4, 'Suhas naidu', 'suhas@gmail.com', 'suhas!23', NULL, 'USD', 0.00, '2026-05-11 09:58:08'),
(5, 'Yukthi R', 'yukthi@gmail.com', 'yukthi!23', NULL, 'USD', 0.00, '2026-05-11 10:05:05'),
(6, 'Kavya Amar', 'kavya@gmail.conm', 'kavya!23', NULL, 'USD', 0.00, '2026-05-11 10:24:59'),
(7, 'Uppendra D S', 'uppi2002@gmail.com', 'Uppi@12', NULL, 'USD', 0.00, '2026-06-01 05:05:31'),
(8, 'SRIDHARA P', 'thesridhar12@gmail.com', 'Sridhara@123', NULL, 'USD', 0.00, '2026-06-01 08:37:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
