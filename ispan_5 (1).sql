-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-02-15 15:52:14
-- 伺服器版本： 10.4.25-MariaDB
-- PHP 版本： 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ispan_5`
--

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `id` int(30) UNSIGNED NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `valid` tinyint(10) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`id`, `category_name`, `valid`, `created_at`) VALUES
(1, '背包', 1, '2022-11-05 11:38:58'),
(2, '耳機', 1, '2022-11-05 11:38:59'),
(3, '散熱器', 1, '2022-11-05 11:40:21'),
(4, '鍵盤', 1, '2022-11-05 11:40:21'),
(5, '滑鼠', 1, '2022-11-05 11:40:56'),
(6, '滑鼠墊', 1, '2022-11-05 11:40:56'),
(7, '周邊產品', 1, '2022-11-05 11:42:29'),
(8, '視訊工具', 1, '2022-11-05 11:42:29');

-- --------------------------------------------------------

--
-- 資料表結構 `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `order_list_id` int(255) NOT NULL,
  `order_list_detail_id` int(255) NOT NULL,
  `rate` tinyint(5) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `is_comment` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(5) NOT NULL,
  `user_rate` tinyint(5) NOT NULL,
  `user_comment` varchar(255) NOT NULL,
  `sellers_id` int(5) NOT NULL,
  `sellers_rate` tinyint(5) NOT NULL,
  `sellers_comment` varchar(255) NOT NULL,
  `seller_is_comment` tinyint(1) NOT NULL DEFAULT 0,
  `product_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `comment`
--

INSERT INTO `comment` (`id`, `order_list_id`, `order_list_detail_id`, `rate`, `comment`, `is_comment`, `user_id`, `user_rate`, `user_comment`, `sellers_id`, `sellers_rate`, `sellers_comment`, `seller_is_comment`, `product_id`) VALUES
(1, 1, 1, 5, 'good', 1, 1, 0, '', 17, 3, '好!', 1, 1),
(2, 7, 7, 5, '超棒', 1, 2, 0, '', 17, 4, '普通', 1, 7),
(3, 3, 3, 5, '超棒', 1, 3, 0, '', 17, 5, '出貨快速!', 1, 3),
(4, 12, 12, 4, '還不錯', 1, 2, 0, '', 17, 5, '態度良好', 1, 3),
(5, 13, 13, 5, '品質良好', 1, 3, 0, '', 17, 5, '很貼心包裝很完整', 1, 1),
(6, 23, 23, 5, '超實用又好看', 1, 17, 0, '', 6, 4, '態度佳', 1, 1),
(7, 15, 15, 5, '實用cp高', 1, 5, 0, '', 17, 5, 'good!', 1, 3),
(8, 19, 19, 5, '背包很帥氣', 1, 3, 0, '', 17, 5, '出貨迅速', 1, 7),
(9, 25, 25, 4, '推薦買很牢固', 1, 17, 0, '', 6, 5, '良好溝通也願意幫我快速出貨', 1, 7),
(29, 41, 6, 4, '很棒', 1, 17, 0, '', 17, 5, '超棒', 1, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `price` varchar(100) NOT NULL,
  `limited` varchar(10000) NOT NULL,
  `coupon_code` varchar(20) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `coupon`
--

INSERT INTO `coupon` (`id`, `title`, `price`, `limited`, `coupon_code`, `start_time`, `end_time`, `created_at`) VALUES
(1, '滿1000折100', '100', '1000', 'ISPAN20230126', '2023-01-27', '2023-02-27', '2023-01-26'),
(2, '滿2000折200', '400', '4000', 'ISPAN20230127', '2023-01-28', '2023-03-03', '2023-01-26'),
(3, '', '500', '5000', 'ISPAN02', '2023-02-05', '2023-02-07', '2023-02-15'),
(5, '', '20', '200', 'ISPAN00', '2023-02-15', '2023-02-22', '2023-02-15');

-- --------------------------------------------------------

--
-- 資料表結構 `delivery_status`
--

CREATE TABLE `delivery_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `delivery_status`
--

INSERT INTO `delivery_status` (`id`, `status`) VALUES
(1, '未出貨'),
(2, '已出貨'),
(3, '運送中'),
(4, '商品已送達目的地');

-- --------------------------------------------------------

--
-- 資料表結構 `delivery_way`
--

CREATE TABLE `delivery_way` (
  `id` int(11) NOT NULL,
  `delivery_way_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `delivery_way`
--

INSERT INTO `delivery_way` (`id`, `delivery_way_name`) VALUES
(1, '7-11取貨付款'),
(2, '7-11取貨不付款'),
(3, '離島郵寄(需先付款，澎湖/金門/馬祖/蘭嶼/綠島/琉球各離島地區)'),
(4, '本島宅配到府(需先付款)'),
(5, '海外速運');

-- --------------------------------------------------------

--
-- 資料表結構 `follow_list`
--

CREATE TABLE `follow_list` (
  `id` int(11) NOT NULL,
  `follower` int(10) NOT NULL,
  `followed` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `follow_list`
--

INSERT INTO `follow_list` (`id`, `follower`, `followed`) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 4),
(4, 4, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `order_list`
--

CREATE TABLE `order_list` (
  `id` int(200) UNSIGNED NOT NULL,
  `sellers_id` int(10) NOT NULL,
  `payment_price` mediumtext NOT NULL,
  `delivery_fee` varchar(100) NOT NULL,
  `user_id` int(200) NOT NULL,
  `recip_name` varchar(20) NOT NULL,
  `recip_email` varchar(20) NOT NULL,
  `recip_phone` varchar(20) NOT NULL,
  `recip_address` varchar(30) NOT NULL,
  `payment_method` tinyint(5) NOT NULL,
  `date` date NOT NULL,
  `delivery_status` int(10) NOT NULL,
  `delivery_way` int(10) NOT NULL,
  `order_list_status` tinyint(2) NOT NULL DEFAULT 1,
  `order_transfer_img` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_list`
--

INSERT INTO `order_list` (`id`, `sellers_id`, `payment_price`, `delivery_fee`, `user_id`, `recip_name`, `recip_email`, `recip_phone`, `recip_address`, `payment_method`, `date`, `delivery_status`, `delivery_way`, `order_list_status`, `order_transfer_img`) VALUES
(1, 17, '6490', '60', 1, 'Baby', 'a123451@ispan5.com', '0912345', 'Taipei', 1, '2022-11-07', 1, 1, 1, '/images/bankTransferImg.png'),
(2, 17, '2190', '100', 2, 'Ada', 'a123452@ispan5.com', '0912345672', '桃園市桃園區春日路2號', 1, '2022-11-07', 2, 2, 1, '/images/bankTransferImg.png'),
(3, 17, '2190', '60', 3, 'Eden', 'a123453@ispan5.com', '0912345673', '桃園市桃園區春日路3號', 2, '2022-11-07', 3, 3, 1, '/images/bankTransferImg.png'),
(4, 17, '2190', '100', 4, 'Amy', 'a123454@ispan5.com', '0912345674', '桃園市桃園區春日路4號', 3, '2022-11-07', 4, 4, 1, '/images/bankTransferImg.png'),
(5, 17, '1290', '60', 5, 'Xylia', 'a123455@ispan5.com', '0912345675', '桃園市桃園區春日路5號', 1, '2022-11-07', 1, 1, 1, '/images/bankTransferImg.png'),
(6, 17, '890', '100', 1, 'Emma', 'a123451@ispan5.com', '0912345671', '桃園市桃園區春日路1號', 3, '2022-11-07', 2, 2, 1, '/images/bankTransferImg.png'),
(7, 17, '2190', '60', 2, 'Yetta', 'a123452@ispan5.com', '0912345672', '桃園市桃園區春日路2號', 4, '2022-11-07', 3, 3, 1, '/images/bankTransferImg.png'),
(8, 17, '2990', '100', 3, 'Yetta', 'a123453@ispan5.com', '0912345673', '桃園市桃園區春日路3號', 2, '2022-11-07', 4, 4, 1, '/images/bankTransferImg.png'),
(9, 17, '1490', '60', 4, 'Susie', 'a123454@ispan5.com', '0912345674', '桃園市桃園區春日路4號', 4, '2022-11-07', 1, 1, 1, '/images/bankTransferImg.png'),
(10, 17, '2790', '100', 5, 'Joa', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 2, '2022-11-07', 2, 2, 1, '/images/bankTransferImg.png'),
(11, 17, '6490', '100', 1, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 3, 2, 2, '/images/bankTransferImg.png'),
(12, 17, '2190', '100', 2, 'Jo', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(13, 17, '6490', '100', 3, 'Eden', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 1, 2, 2, '/images/bankTransferImg.png'),
(14, 17, '2190', '60', 4, 'Ada', 'a123454@ispan5.com', '0912345674', '桃園市桃園區春日路4號', 4, '2022-11-07', 2, 3, 1, '/images/bankTransferImg.png'),
(15, 17, '2190', '100', 5, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 3, '2022-11-07', 3, 2, 1, '/images/bankTransferImg.png'),
(16, 17, '2190', '60', 1, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 4, 2, 2, '/images/bankTransferImg.png'),
(17, 17, '1290', '100', 2, 'Susie', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 1, 1, 1, '/images/bankTransferImg.png'),
(18, 17, '890', '100', 2, 'Susie', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 2, 4, 1, '/images/bankTransferImg.png'),
(19, 17, '2190', '100', 3, 'Ada', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 2, '/images/bankTransferImg.png'),
(20, 17, '2990', '60', 4, 'Joe', 'a123454@ispan5.com', '0912345674', '桃園市桃園區春日路4號', 4, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(21, 6, '1490', '100', 17, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 1, '2022-11-07', 1, 2, 1, '/images/bankTransferImg.png'),
(22, 6, '2790', '60', 17, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 2, 2, 2, '/images/bankTransferImg.png'),
(23, 6, '6490', '100', 17, 'Eileen', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 1, '/images/bankTransferImg.png'),
(24, 6, '2190', '60', 17, 'Xylia', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(25, 6, '2190', '100', 17, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 3, '2022-11-07', 1, 2, 1, '/images/bankTransferImg.png'),
(26, 6, '2990', '60', 17, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 2, 2, 2, '/images/bankTransferImg.png'),
(27, 6, '1490', '100', 17, 'Eileen', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 1, '/images/bankTransferImg.png'),
(28, 6, '2790', '60', 17, 'Xylia', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(29, 6, '6490', '100', 17, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 3, '2022-11-07', 1, 2, 1, '/images/bankTransferImg.png'),
(30, 6, '2190', '60', 17, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 2, 2, 2, '/images/bankTransferImg.png'),
(31, 6, '1490', '100', 17, 'Eileen', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 1, '/images/bankTransferImg.png'),
(32, 6, '2790', '60', 17, 'Xylia', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(33, 6, '6490', '100', 17, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 3, '2022-11-07', 1, 2, 1, '/images/bankTransferImg.png'),
(34, 6, '2190', '60', 17, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 2, 2, 2, '/images/bankTransferImg.png'),
(35, 6, '2190', '100', 17, 'Eileen', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 1, '/images/bankTransferImg.png'),
(36, 6, '2990', '60', 17, 'Xylia', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(37, 6, '1490', '100', 17, 'Yetta', 'a123455@ispan5.com', '0912345670', '7-ELEVEN 經國店', 3, '2022-11-07', 1, 2, 1, '/images/bankTransferImg.png'),
(38, 6, '2790', '60', 17, 'Joe', 'a123451@ispan5.com', '0912345671', '新北市八里區中山路二段6號8號', 1, '2023-02-13', 2, 2, 2, '/images/bankTransferImg.png'),
(39, 6, '6490', '100', 17, 'Eileen', 'a123452@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 3, 1, 1, '/images/bankTransferImg.png'),
(40, 6, '2190', '60', 17, 'Xylia', 'a123453@ispan5.com', '0912345671', '全家-桃鶯店', 1, '2022-11-07', 4, 1, 1, '/images/bankTransferImg.png'),
(41, 17, '2870', '100', 17, '小巴', 'test9@test.com', '0909451544', '桃園市龜山區光峰路千禧新城15號1樓', 1, '2023-02-15', 1, 2, 2, ''),
(42, 17, '2870', '100', 17, '小七', 'test9@test.com', '0909451544', '新北市八里區中山路二段6號8號', 1, '2023-02-15', 1, 2, 2, '');

-- --------------------------------------------------------

--
-- 資料表結構 `order_list_detail`
--

CREATE TABLE `order_list_detail` (
  `id` int(200) UNSIGNED NOT NULL,
  `order_list_id` int(200) NOT NULL,
  `product_id` int(200) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `price` mediumtext NOT NULL,
  `amount` int(30) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_list_detail`
--

INSERT INTO `order_list_detail` (`id`, `order_list_id`, `product_id`, `product_name`, `price`, `amount`, `created_at`) VALUES
(1, 1, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2022-11-07 00:00:00'),
(2, 2, 2, 'ASUS-OG BP4701', '2190', 1, '2022-11-07 00:00:00'),
(3, 3, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(4, 4, 4, 'ASUS-ROG Ranger BP1503 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(5, 5, 5, 'ASUS-ROG Ranger BC1001 Waist Pack', '1290', 1, '2022-11-07 00:00:00'),
(6, 6, 6, 'ASUS-ROG Ranger BC1002 Crossbody Bag', '890', 1, '2022-11-07 00:00:00'),
(7, 7, 7, 'ASUS-ROG Ranger BP2500 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(8, 8, 8, 'ASUS-ROG Cetra True Wireless', '2990', 1, '2022-11-07 00:00:00'),
(9, 9, 9, 'ASUS-ROG Cetra II Core Moonlight White', '1490', 1, '2022-11-07 00:00:00'),
(10, 10, 10, 'ASUS-ROG Cetra II', '2790', 1, '2022-11-07 00:00:00'),
(11, 11, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2023-02-13 13:53:47'),
(12, 12, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2023-02-13 13:53:47'),
(13, 13, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2022-11-07 00:00:00'),
(14, 14, 2, 'ASUS-OG BP4701', '2190', 1, '2022-11-07 00:00:00'),
(15, 15, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(16, 16, 4, 'ASUS-ROG Ranger BP1503 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(17, 17, 5, 'ASUS-ROG Ranger BC1001 Waist Pack', '1290', 1, '2022-11-07 00:00:00'),
(18, 18, 6, 'ASUS-ROG Ranger BC1002 Crossbody Bag', '890', 1, '2022-11-07 00:00:00'),
(19, 19, 7, 'ASUS-ROG Ranger BP2500 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(20, 20, 8, 'ASUS-ROG Cetra True Wireless', '2990', 1, '2022-11-07 00:00:00'),
(21, 21, 9, 'ASUS-ROG Cetra II Core Moonlight White', '1490', 1, '2022-11-07 00:00:00'),
(22, 22, 10, 'ASUS-ROG Cetra II', '2790', 1, '2022-11-07 00:00:00'),
(23, 23, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2023-02-13 13:53:47'),
(24, 24, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2023-02-13 13:53:47'),
(25, 25, 7, 'ASUS-ROG Ranger BP2500 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(26, 26, 8, 'ASUS-ROG Cetra True Wireless', '2990', 1, '2022-11-07 00:00:00'),
(27, 27, 9, 'ASUS-ROG Cetra II Core Moonlight White', '1490', 1, '2022-11-07 00:00:00'),
(28, 28, 10, 'ASUS-ROG Cetra II', '2790', 1, '2022-11-07 00:00:00'),
(29, 29, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2023-02-13 13:53:47'),
(30, 30, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2023-02-13 13:53:47'),
(31, 31, 9, 'ASUS-ROG Cetra II Core Moonlight White', '1490', 1, '2022-11-07 00:00:00'),
(32, 32, 10, 'ASUS-ROG Cetra II', '2790', 1, '2022-11-07 00:00:00'),
(33, 33, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2023-02-13 13:53:47'),
(34, 34, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2023-02-13 13:53:47'),
(35, 35, 7, 'ASUS-ROG Ranger BP2500 Gaming Backpack', '2190', 1, '2022-11-07 00:00:00'),
(36, 36, 8, 'ASUS-ROG Cetra True Wireless', '2990', 1, '2022-11-07 00:00:00'),
(37, 37, 9, 'ASUS-ROG Cetra II Core Moonlight White', '1490', 1, '2022-11-07 00:00:00'),
(38, 38, 10, 'ASUS-ROG Cetra II', '2790', 1, '2022-11-07 00:00:00'),
(39, 39, 1, 'ASUS-ROG Archer Backpack 17', '6490', 1, '2023-02-13 13:53:47'),
(40, 40, 3, 'ASUS-ROG Ranger BP3703 Gaming Backpack', '2190', 1, '2023-02-13 13:53:47'),
(41, 45, 8, 'ASUS-ROG Cetra True Wireless', '2990', 3, '2023-02-15 14:28:02'),
(42, 42, 8, 'ASUS-ROG Cetra True Wireless', '2990', 3, '2023-02-15 14:29:32'),
(43, 41, 6, 'ASUS-ROG Ranger BC1002 Crossbody Bag', '890', 3, '2023-02-15 21:59:27'),
(44, 42, 6, 'ASUS-ROG Ranger BC1002 Crossbody Bag', '890', 3, '2023-02-15 22:05:46');

-- --------------------------------------------------------

--
-- 資料表結構 `order_list_status`
--

CREATE TABLE `order_list_status` (
  `id` int(11) NOT NULL,
  `status` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_list_status`
--

INSERT INTO `order_list_status` (`id`, `status`) VALUES
(1, '未付款'),
(2, '已付款');

-- --------------------------------------------------------

--
-- 資料表結構 `payment_type`
--

CREATE TABLE `payment_type` (
  `id` int(11) NOT NULL,
  `type_name` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `payment_type`
--

INSERT INTO `payment_type` (`id`, `type_name`) VALUES
(1, 'ATM轉帳'),
(2, '貨到付款'),
(3, 'Line Pay'),
(4, '信用卡(綠界科技)');

-- --------------------------------------------------------

--
-- 資料表結構 `product_list`
--

CREATE TABLE `product_list` (
  `id` int(250) UNSIGNED NOT NULL,
  `category_id` varchar(30) NOT NULL,
  `brand` varchar(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `images` varchar(200) NOT NULL,
  `images2` varchar(200) NOT NULL,
  `price` mediumtext NOT NULL,
  `introduce` text NOT NULL,
  `storage` int(10) NOT NULL,
  `rate` float DEFAULT NULL,
  `favorites` int(10) NOT NULL,
  `status_id` int(10) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `product_list`
--

INSERT INTO `product_list` (`id`, `category_id`, `brand`, `product_name`, `images`, `images2`, `price`, `introduce`, `storage`, `rate`, `favorites`, `status_id`, `valid`, `created_at`) VALUES
(1, '1', 'AsusRog', 'ASUS-ROG Archer Backpack 17', '/images/AsusRog/backpack/ASUSROGArcherBackpack17.png', '/images2/AsusRog/backpack/ASUSROGArcherBackpack17.png', '6490', '擁有 22 升大容量，主夾層以拉鍊區隔設計，保護隨行物品。', 448, 4, 0, 1, 1, '2022-11-16'),
(2, '1', 'AsusRog', 'ASUS-OG BP4701', '/images/AsusRog/backpack/ASUSROGBP4701.png', '/images2/AsusRog/backpack/ASUSROGBP4701.png', '2190', 'BP4701 電競後背包，可完美地收納 17 吋筆記型電腦及您的所有物品。 酷帥的電馭文符碼設計外型，搭配醒目的反光標誌，展現不同以往的潮流風格。', 341, 4.5, 0, 1, 1, '2022-11-16'),
(3, '1', 'AsusRog', 'ASUS-ROG Ranger BP3703 Gaming Backpack', '/images/AsusRog/backpack/ASUSROGRangerBP3703GamingBackpack.png', '/images2/AsusRog/backpack/ASUSROGRangerBP3703GamingBackpack.png', '2190', 'Ranger BP3703 RGB 兩用式電競背包配備充電線走線孔、防盜拉鍊及防潑水表面，最大可容納 17 吋筆電，適用於旅行。', 451, 3, 0, 1, 1, '2022-11-16'),
(4, '1', 'AsusRog', 'ASUS-ROG Ranger BP1503 Gaming Backpack', '/images/AsusRog/backpack/ASUSROGRangerBP1503GamingBackpack.png', '/images2/AsusRog/backpack/ASUSROGRangerBP1503GamingBackpack.png', '2190', 'Ranger BP1503 輕量級電競背包，防潑水材質、多口袋設計，以及可放置 15 吋筆電寬敞的容納空間。', 504, 2, 0, 1, 1, '2022-11-16'),
(5, '1', 'AsusRog', 'ASUS-ROG Ranger BC1001 Waist Pack', '/images/AsusRog/backpack/ASUSROGRangerBC1001WaistPack.png', '/images2/AsusRog/backpack/ASUSROGRangerBC1001WaistPack.png', '1290', 'Ranger BC1001 百搭斜垮包，防潑水面料、防水拉鍊以及反光 logo 設計，且搭載三個分層方便收納。', 629, 5, 0, 1, 1, '2022-11-16'),
(6, '1', 'AsusRog', 'ASUS-ROG Ranger BC1002 Crossbody Bag', '/images/AsusRog/backpack/ASUSROGRangerBC1002CrossbodyBag.png', '/images2/AsusRog/backpack/ASUSROGRangerBC1002CrossbodyBag.png', '890', 'Ranger BC1002 肩背小包具備多個口袋、防潑水拉鍊及輕量化設計。', 418, 3, 0, 1, 1, '2022-11-16'),
(7, '1', 'AsusRog', 'ASUS-ROG Ranger BP2500 Gaming Backpack', '/images/AsusRog/backpack/ASUSROGRangerBP2500GamingBackpack.png', '/images2/AsusRog/backpack/ASUSROGRangerBP2500GamingBackpack.png', '2190', '性能帶著走 潮流帶著走。', 464, 2, 0, 1, 1, '2022-11-16'),
(8, '2', 'AsusRog', 'ASUS-ROG Cetra True Wireless', '/images/AsusRog/earPhone/ASUSROGCetraTrueWireless.png', '/images2/AsusRog/earPhone/ASUSROGCetraTrueWireless.png', '2990', 'ROG Cetra True Wireless  ROG Cetra 真無線電競耳機具備低延遲無線連線、ANC、搭配無線充電盒可提供最長 27 小時電池續航力、IPX4 防水，以及可透過 Armoury Crate 支援 EQ/虛擬 7.1 聲道  遊戲模式: 提供低延遲音訊與視訊同步，為玩家帶來勝利優勢 主動降噪 (ANC): 混合式主動降噪技術可偵測並過濾來自耳機內部與外部的噪音，提供沈浸式音訊體驗 超長電池續航力: 具備 27 小時電池續航力以及快速充電技術 無線充電: 耳機盒可用相容的無線充電板進行充電 快速觸控: 輕觸控制區即可於遊戲中迅速調整 IPX4 防水: IPX4 防水功能可提供額外的保護力', 361, 5, 0, 1, 1, '2022-11-16'),
(9, '2', 'AsusRog', 'ASUS-ROG Cetra II Core Moonlight White', '/images/AsusRog/earPhone/ASUSROGCetraIICoreMoonlightWhite.png', '/images2/AsusRog/earPhone/ASUSROGCetraIICoreMoonlightWhite.png', '1490', 'ROG Cetra II Core Moonlight White  ROG Cetra II Core 月光版入耳式電競耳機搭載液態矽膠 (LSR) 驅動單體以及3.5 mm 接頭相容於 PC、筆電、手機、ROG Phone 5、PlayStation 5、Xbox Series X/S 以及任天堂 Switch 創新的液態矽膠 (LSR) 驅動單體提供穩定的音訊、令人驚艷的強烈低音，以及最佳化的遊戲音效 90° 的接頭可在進行手遊時提供更高的舒適性 輕量金屬外殼提供吸睛的外觀與防刮性，提升潮流感與耐用性 人體工學設計搭配超柔軟 LSR 耳翼與耳塞可提供極舒適的配戴感受 3.5 mm 接頭支援多種平台，包括手機、PC、Mac、PlayStation® 5、Xbox Series X/S 以及任天堂 Switch™', 378, 3.5, 0, 1, 1, '2022-11-16'),
(10, '2', 'AsusRog', 'ASUS-ROG Cetra II', '/images/AsusRog/earPhone/ASUSROGCetraII.png', '/images2/AsusRog/earPhone/ASUSROGCetraII.png', '2790', 'ROG Cetra II  ROG Cetra II 入耳式電競耳機，具備降噪麥克風、主動降噪技術 (ANC)、液態矽膠 (LSR) 驅動單體、Aura Sync RGB 燈效、USB-C 接頭相容於 ROG Phone 5、PC、手機以及任天堂 Switch 搭載主動降噪科技 (ANC)，可消除環境音，隨時隨地提供沉浸式音效體驗 環境模式可讓外界的聲音傳入，可用於需要聽到四周聲音的情況 創新的液態矽膠 (LSR) 驅動單體提供穩定的音訊、令人驚艷的強烈低音，以及最佳化的遊戲音效 先進隱藏式麥克風具備降噪科技，確保傳遞清晰的語音通訊 採用超柔軟液態矽膠 (LSR) 材質的耳翼與耳塞，符合人體工學設計，提供舒適配戴體驗 重量極輕並採用防刮金屬外殼，打造質感外觀 可自訂的多色循環 RGB 燈效，光彩奪目又潮流十足 USB-C® 接頭提供多平台相容性，包括手機、PC、Mac 以及任天堂 Switch™', 447, 2.5, 0, 1, 1, '2022-11-16'),
(11, '2', 'AsusRog', 'ASUS-ROG Cetra Core', '/images/AsusRog/earPhone/ASUSROGCetraCore.png', '/images2/AsusRog/earPhone/ASUSROGCetraCore.png', '2590', 'ROG Cetra Core  ROG Cetra Core 入耳式電競耳機搭載 10mm ASUS Essence 驅動單體及 3.5mm 連接線，可用於 PC、筆電、手機及任天堂 Switch 10mm 大尺寸 ASUS Essence 驅動單體可提供令人驚豔的強烈低音及完美遊戲音效 為手持使用優化：90 度的連接頭設計，提供輕鬆無阻的手機遊戲體驗 3.5mm 連接器提供多平台支援，包括手機、PC、Mac、PS4、Xbox 及任天堂 Switch 提供三種尺寸的人體工學耳塞與耳翼，以及一對泡棉耳塞，以確保穩固且舒適的佩戴感受 內建線控設計提供快速方便的控制，包含播放、暫停以及音量調整', 383, 5, 0, 1, 1, '2022-11-16'),
(12, '2', 'AsusRog', 'ASUS-ROG Cetra', '/images/AsusRog/earPhone/ASUSROGCetra.png', '/images2/AsusRog/earPhone/ASUSROGCetra.png', '2590', 'ROG Cetra  ROG Cetra 入耳式電競耳機具備主動降噪功能 (ANC)、10mm ASUS Essence 單體及 USB-C 連接器，可用於 PC、手機及任天堂 Switch 主動降噪技術可消除環境噪音，隨時隨地皆可提供沉浸式遊戲體驗 10mm 大尺寸 ASUS Essence 單體可提供令人驚豔的強烈低音及完美遊戲音效 環境模式可讓外界的聲音傳入，可用於需要聽到四周聲音的情況 提供三種尺寸的人體工學耳塞與耳翼，以及一對泡棉耳塞，以確保穩固且舒適的佩戴感受 USB-C 連接器提供多平台支援，包括手機、PC、Mac 及任天堂 Switch', 457, 5, 0, 1, 1, '2022-11-16'),
(13, '2', 'AsusRog', 'ASUS-ROG Cetra II Core', '/images/AsusRog/earPhone/ASUSROGCetraIICore.png', '/images2/AsusRog/earPhone/ASUSROGCetraIICore.png', '1490', 'ROG Cetra II Core  ROG Cetra II Core 入耳式電競耳機搭載液態矽膠 (LSR) 驅動單體以及3.5 mm 接頭相容於 PC、筆電、手機、ROG Phone 5、PlayStation 5、Xbox Series X/S 與任天堂 Switch 創新的液態矽膠 (LSR) 驅動單體提供穩定的音訊、令人驚艷的強烈低音，以及最佳化的遊戲音效 90° 的接頭可在進行手遊時提供更高的舒適性 輕量金屬外殼提供吸睛的外觀與防刮性，提升潮流感與耐用性 人體工學設計搭配超柔軟 LSR 耳翼與耳塞可提供極舒適的配戴感受 3.5 mm 接頭支援多種平台，包括手機、PC、Mac、PlayStation® 5、Xbox Series X/S 以及任天堂 Switch™', 559, 5, 0, 1, 1, '2022-11-16'),
(14, '2', 'AsusRog', 'ASUS-ROG Cetra RGB', '/images/AsusRog/earPhone/ASUSROGCetraRGB.png', '/images2/AsusRog/earPhone/ASUSROGCetraRGB.png', '2990', 'ROG Cetra RGB  ROG Cetra RGB 入耳式電競耳機具備主動降噪功能 (ANC)、10mm ASUS Essence 單體及 USB-C 連接器，可用於 PC、手機及任天堂 Switch，並支援 Aura Sync 同步燈效 主動降噪技術可消除環境噪音，隨時隨地提供沉浸式遊戲體驗 10mm 大尺寸 ASUS Essence 單體可提供令人驚豔的強烈低音及完美遊戲音效 環境模式可讓外界的聲音傳入，可用於需要聽到四周聲音的情況 提供三種尺寸的人體工學耳塞與耳翼，以及一對泡棉耳塞，以確保穩固且舒適的佩戴感受 USB-C 連接器提供多平台支援，包括手機、PC、Mac 及任天堂 Switch 可自訂的多色循環 RGB 燈效，光彩奪目又潮流十足', 608, 4, 0, 1, 1, '2022-11-16'),
(15, '2', 'AsusRog', 'ASUS-ROG Delta S Animate', '/images/AsusRog/earPhone/ASUSROGDeltaSAnimate.png', '/images2/AsusRog/earPhone/ASUSROGDeltaSAnimate.png', '6490', 'ROG Delta S Animate  極輕 USB-C 電競耳麥，搭載可自訂 AniMe Matrix™ 燈效、hi-fi ESS 9281 四核心 DAC、MQA 解碼器、AI 降噪麥克風，與 PC、PlayStation® 5 以及任天堂 Switch™ 相容 可自訂的 AniMe Matrix™ 顯示器以及 Soundwave 燈光效果，讓你展現個人風格 引領業界的 Hi-Res ESS 9281 四核心DAC™ 技術，加上 MQA編解碼器提供無比細膩逼真的音質 獨家 ASUS Essence 驅動單體以及氣密腔體設計，為你帶來「聲」歷其境的音效體驗 具備 ASUS AI 降噪麥克風，提供極致清晰的遊戲語音 僅 310g，符合人體工學的快速散熱 D 形耳殼，確保配戴舒適感 USB-C® 連接頭支援 PC、Mac、手機裝置以及任天堂 Switch™ 以及 PlayStation® 等遊戲主機', 408, 3, 0, 1, 1, '2022-11-16'),
(16, '2', 'AsusRog', 'ASUS-ROG Delta S Core', '/images/AsusRog/earPhone/ASUSROGDeltaSCore.png', '/images2/AsusRog/earPhone/ASUSROGDeltaSCore.png', '2890', 'ROG Delta S Core  極輕 3.5 mm 電競耳機，搭載 50 mm ASUS Essence 驅動單體、虛擬 7.1 環繞音效、與 PC、PlayStation® 5、Nintendo Switch™ 、 Xbox 相容 獨家 50 mm ASUS Essence 驅動單體及氣密腔體，打造沉浸音質體驗 提供 Windows Sonic 支援的虛擬 7.1 環繞音效 經Discord 與 TeamSpeak 認證吊桿麥克風，提供清晰的遊戲內語音交流 重量極輕，僅 270g 提供絕佳舒適度 符合人體工學的 D 形耳罩，確保長時間使用的舒適感 3.5 mm 連接提供多平台支援，包括 PC、Mac、PlayStation®、任天堂 Switch™、Xbox 以及手機裝置', 447, 4.5, 0, 1, 1, '2022-11-16'),
(17, '2', 'AsusRog', 'ASUS-ROG Delta S Wireless', '/images/AsusRog/earPhone/ASUSROGDeltaSWireless.png', '/images2/AsusRog/earPhone/ASUSROGDeltaSWireless.png', '6190', 'ROG Delta S Wireless  輕量Delta S Wireless具備 2.4 GHz 和藍牙連線功能、50 mm ASUS Essence 驅動單體、具備 AI 降噪功能的 AI 波束賦形麥克風，與 PC 、 Mac、任天堂 Switch、Sony PlayStation® 相容。 提供 2.4 GHz 低延遲及藍牙無線雙模連線功能 獨家 50 mm ASUS Essence 驅動單體及氣密腔體，打造沉浸音質體驗 領先業界ROG AI 波束賦形麥克風，同時搭載 AI 降噪技術，提供清晰的遊戲內語音交流 快速充電功能，充 15 分鐘即可使用 3 小時，總電量高達 25 小時 輕量化及符合人體工學的D形耳罩設計，打造極致配戴舒適感 可支援 PC、Mac、PlayStation® 5、任天堂 Switch™ 及行動裝置等多平台', 387, 5, 0, 1, 1, '2022-11-16'),
(18, '2', 'AsusRog', 'ASUS-ROG Fusion II 500', '/images/AsusRog/earPhone/ASUSROGFusionII500.png', '/images2/AsusRog/earPhone/ASUSROGFusionII500.png', '4590', 'ROG Fusion II 500  RGB 電競耳機具備 Hi-Res ESS 9280 四核心 DAC™、渾厚低音以及沈浸式虛擬 7.1 環繞音效，具備 AI 降噪功能的 AI 波束賦形麥克風、遊戲語音音量控制，相容於 PC、PlayStation® 5、任天堂 Switch™ 以及 Xbox  虛擬 7.1 環繞音效，搭載 Hi-Fi 等級 ESS 9280 四核心 DAC™ 以及 50 mm ASUS Essence 驅動單體，提供強勁低音和身歷其境的逼真音效 ROG AI 波束賦形麥克風，具備 AI 降噪功能，提供清晰的遊戲內語音交流 遊戲語音音量控制，輕鬆平衡遊戲音效與語音溝通音量 多種自定義選項、預設燈效模式以及超過 1680 萬色的 RGB 燈效選擇 舒適輕便的設計搭配人體工學耳罩，完美貼合 可透過 3.5 mm、USB-C® 與 USB-A 連接，相容於 PC、Mac、PlayStation®、任天堂 Switch™、Xbox 以及手機', 381, 4, 0, 1, 1, '2022-11-16'),
(19, '2', 'AsusRog', 'ASUS-ROG Fusion II 300', '/images/AsusRog/earPhone/ASUSROGFusionII300.png', '/images2/AsusRog/earPhone/ASUSROGFusionII300.png', '3490', 'ROG Fusion II 300  RGB 電競耳機具備 Hi-Res ESS 9280 四核心 DAC™、渾厚低音以及沈浸式虛擬 7.1 環繞音效，具備 AI 降噪功能的 AI 波束賦形麥克風，相容於 PC、PlayStation® 5 以及任天堂 Switch™ 搭載 Hi-Fi 等級 ESS 9280 四核心 DAC™，提供高傳真、無可匹敵的遊戲音效 虛擬 7.1 環繞音效以及 50 mm ASUS Essence 驅動單體，傳遞渾厚低音與聲歷其境的音效體驗 ROG AI 波束賦形麥克風，具備 AI 降噪功能，提供清晰的遊戲內語音交流 多種自定義選項、預設燈效模式以及超過 1680 萬色的 RGB 燈效選擇 舒適輕便的設計搭配人體工學耳罩，完美貼合 可透過 USB-C ® 與 USB-A 轉接器相容於 PC、Mac、PlayStation®、任天堂 Switch™ 以及手機', 399, 5, 0, 1, 1, '2022-11-16'),
(20, '2', 'AsusRog', 'ASUS-ROG Strix Go Core Moonlight White', '/images/AsusRog/earPhone/ASUSROGStrixGoCoreMoonlightWhite.png', '/images2/AsusRog/earPhone/ASUSROGStrixGoCoreMoonlightWhite.png', '4990', 'ROG Strix Go Core Moonlight White  ROG Strix Go Core 月光版電競耳機，提供沉浸式遊戲音效體驗以及絕佳配戴舒適感，支援多平台相容性包括 PC、Mac、手機以及 PlayStation® 5、Xbox® Series X 與 S、任天堂 Switch™ 等遊戲主機 獨家氣密腔體及 40 mm ASUS Essence 驅動單體可提供極為豐富且純淨的聲音，以及經過最佳化的渾厚低音，打造沉浸式聽覺體驗 超輕量僅 252g，可折疊的設計提供無可比擬的配戴舒適感，特別是針對長時間遊戲或攜帶出門使用 多平台相容性包含 PC、Mac、手機以及 PlayStation® 5、Xbox® Series X 與 S、任天堂 Switch™ 等遊戲主機 耳罩上的實體控制鍵可輕鬆調整音量以及麥克風靜音 經 Discord 與 TeamSpeak 認證，經優化的麥克風可傳遞清晰通話品質', 361, NULL, 0, 1, 1, '2022-11-16'),
(21, '2', 'AsusRog', 'ASUS-ROG Delta Core', '/images/AsusRog/earPhone/ASUSROGDeltaCore.png', '/images2/AsusRog/earPhone/ASUSROGDeltaCore.png', '2990', 'ROG Delta Core  ROG Delta Core電競耳機提供沉浸式音效體驗以及極度舒適的配戴感受，與PC、PS4、Xbox One、任天堂Switch以及手機裝置相容 獨家 ASUS Essence 單體、氣密腔體以及 Audio Signal Diversion 技術，為您帶來「聲」歷其境的音效體驗 支援多平台，包括 PC、Mac、Xbox One、任天堂Switch以及手機裝置 符合人體工學的 D 型 ROG Hybrid 耳罩，提升配戴舒適感 耳罩上的實體按鈕，方便玩家調整音量與麥克風靜音', 449, NULL, 0, 1, 1, '2022-11-16'),
(22, '2', 'AsusRog', 'ASUS-ROG Strix Fusion 500', '/images/AsusRog/earPhone/ASUSROGStrixFusion500.png', '/images2/AsusRog/earPhone/ASUSROGStrixFusion500.png', '4590', 'ROG Strix Fusion 500  ROG Strix Fusion 500電競耳機可用行動應用程式控制耳機之間的RGB同步燈效，並搭載Hi-Fi等級ESS DAC與擴大器，具備7.1聲道虛擬環繞音效 Hi-Fi等級ESS ES9018 DAC與SABRE9601K擴大器可提供真實、無可比擬的遊戲音效 獨家氣密腔體設計以及ASUS Essence驅動器，提供身歷其境的音效體驗 與Bongiovi Acoustics共同開發隨插即用的7.1聲道虛擬環繞音效 可使用專用行動應用程式，透過藍芽在多個耳機上同步RGB燈光效果 透過耳機觸控面板即時調整音量、播放功能和RGB同步燈效 ROG Hybrid耳墊提升配戴的舒適感以及隔音效果 優化的數位麥克風可提供清晰的通話音質', 557, NULL, 0, 1, 1, '2022-11-16'),
(23, '2', 'AsusRog', 'ASUS-ROG Strix Fusion 300 PNK LTD', '/images/AsusRog/earPhone/ASUSROGStrixFusion300PNKLTD.png', '/images2/AsusRog/earPhone/ASUSROGStrixFusion300PNKLTD.png', '3490', 'ROG Strix Fusion 300 PNK LTD  ROG Strix Fusion 300 PNK LTD電競耳機與PC、PS4、以及Xbox One相容，搭載7.1虛擬環繞音效以及獨家氣密腔體設計，提供身歷其境的遊玩體驗。 獨家氣密腔體設計，讓您沉浸在豐厚廣闊的電競音效中 獨家50mm ASUS Essence驅動器，提供不失真的純淨音質以及震撼的重低音 精細的硬體設計，提供隨插即用的7.1 聲道虛擬環繞音效 採用 100% 蛋白質皮革耳墊，提升舒適性與隔音效果 與 PC、行動裝置、PS4以及Xbox等多平台相容', 581, NULL, 0, 1, 1, '2022-11-16'),
(24, '2', 'AsusRog', 'ASUS-ROG Delta White Edition', '/images/AsusRog/earPhone/ASUSROGDeltaWhiteEdition.png', '/images2/AsusRog/earPhone/ASUSROGDeltaWhiteEdition.png', '3990', 'ROG Delta White Edition  搭載 Hi-Res ESS Quad-DAC 的 RGB 電競耳機，具備環狀 RGB 燈效以及 USB-C 連接頭，可支援PC、遊戲主機和手機 引領業界的 HI-RES ESS Quad-DAC，為你帶來完美細膩的逼真音效 USB-C 接頭支援多平台，包括 PC、Mac、行動電話及 PS4* 可自訂的多色環狀 RGB 燈效，讓你展現個人風格 獨家 ASUS Essence 驅動單體、氣密腔體以及 Audio Signal Diversion 技術，提供「聲」歷其境的音效體驗 符合人體工學的 D 型 ROG Hybrid 耳罩，提升配戴舒適感 *使用 USB-C 轉 USB 2.0 轉接頭', 416, NULL, 0, 1, 1, '2022-11-16'),
(25, '3', 'AsusRog', 'ASUS-ROG RYUO III 360 ARGB WHITE EDITION', '/images/AsusRog/heatSink/ASUSROGRYUOIII360ARGBWHITEEDITION.png', '/images2/AsusRog/heatSink/ASUSROGRYUOIII360ARGBWHITEEDITION.png', '9290', 'ROG Ryuo III 360 White Edition 一體式水冷 CPU 散熱器搭配 Asetek 第 8 代幫浦解決方案、Anime Matrix™ LED Display，以及 ROG ARGB 散熱風扇', 480, NULL, 0, 1, 1, '2022-11-16'),
(26, '3', 'AsusRog', 'ASUS-ROG RYUO III 360 ARGB', '/images/AsusRog/heatSink/ASUSROGRYUOIII360ARGB.png', '/images2/AsusRog/heatSink/ASUSROGRYUOIII360ARGB.png', '8990', 'ROG Ryuo III 360 一體式 CPU 水冷散熱器搭配 Asetek 第 8 代幫浦解決方案、Anime Matrix™ LED Display，以及 ROG ARGB 散熱風扇', 399, NULL, 0, 1, 1, '2022-11-16'),
(27, '3', 'AsusRog', 'ASUS-ROG RYUO III 240 ARGB WHITE EDITION', '/images/AsusRog/heatSink/ASUSROGRYUOIII240ARGBWHITEEDITION.png', '/images2/AsusRog/heatSink/ASUSROGRYUOIII240ARGBWHITEEDITION.png', '7290', 'ROG Ryuo III 240 White Edition 一體式水冷 CPU 散熱器搭配 Asetek 第 8 代幫浦解決方案、Anime Matrix™ LED Display，以及 ROG ARGB 散熱風扇', 379, NULL, 0, 1, 1, '2022-11-16'),
(28, '3', 'AsusRog', 'ASUS-ROG RYUO III 240 ARGB', '/images/AsusRog/heatSink/ASUSROGRYUOIII240ARGB.png', '/images2/AsusRog/heatSink/ASUSROGRYUOIII240ARGB.png', '6990', 'ROG Ryuo III 240 一體式 CPU 水冷散熱器搭配 Asetek 第 8 代幫浦解決方案、Anime Matrix™ LED Display，以及 ROG ARGB 散熱風扇', 443, NULL, 0, 1, 1, '2022-11-16'),
(29, '3', 'AsusRog', 'ASUS-ROG RYUJIN II 360 ARGB', '/images/AsusRog/heatSink/ASUSROGRYUJINII360ARGB.png', '/images2/AsusRog/heatSink/ASUSROGRYUJINII360ARGB.png', '9290', 'ROG Ryujin II 360 一體式 CPU 液體散熱器，配備 3.5 吋 LCD、嵌入式幫浦風扇，以及 3 個 ROG 120mm ARGB 散熱器風扇', 352, NULL, 0, 1, 1, '2022-11-16'),
(30, '3', 'AsusRog', 'ASUS-ROG RYUJIN II 240', '/images/AsusRog/heatSink/ASUSROGRYUJINII240.png', '/images2/AsusRog/heatSink/ASUSROGRYUJINII240.png', '8490', 'ROG Ryujin II 240 一體式 CPU 液體散熱器，配備 3.5 吋 LCD、嵌入式幫浦風扇，以及 2 個 Noctua iPPC 2000 PWM 120mm 散熱器風扇', 463, NULL, 0, 1, 1, '2022-11-16'),
(31, '3', 'AsusRog', 'ASUS-ROG STRIX LC II 360 ARGB WHITE EDITION', '/images/AsusRog/heatSink/ASUSROGSTRIXLCII360ARGBWHITEEDITION.png', '/images2/AsusRog/heatSink/ASUSROGSTRIXLCII360ARGBWHITEEDITION.png', '6690', 'ROG Strix LC II 360 ARGB White Edition 一體式CPU水冷散熱器支援 Aura Sync、Intel®> LGA 1700/1200/1150/1151/1152/1155/1156/2011/2011-3/2066、AMD AM5/AM4/TR4，以及 3 個 ROG 120 mm 可定址 RGB 散熱器風扇', 566, NULL, 0, 1, 1, '2022-11-16'),
(32, '3', 'AsusRog', 'ASUS-ROG STRIX LC II 240 ARGB WHITE EDITION', '/images/AsusRog/heatSink/ASUSROGSTRIXLCII240ARGBWHITEEDITION.png', '/images2/AsusRog/heatSink/ASUSROGSTRIXLCII240ARGBWHITEEDITION.png', '5290', 'ROG Strix LC II 240 ARGB White Edition 多合一 CPU 液冷器支援 Aura Sync、Intel®> LGA 1700/1200/1150/1151/1152/1155/1156/2011/2011-3/2066、AMD AM5/AM4/TR4，以及 3 個 ROG 120 mm 可定址 RGB 散熱器風扇', 587, NULL, 0, 1, 1, '2022-11-16'),
(33, '3', 'AsusRog', 'ASUS-ROG STRIX LC II 280 ARGB', '/images/AsusRog/heatSink/ASUSROGSTRIXLCII280ARGB.png', '/images2/AsusRog/heatSink/ASUSROGSTRIXLCII280ARGB.png', '5490', 'ROG Strix LC II 280 ARGB 一體式水冷散熱器配備 Aura Sync、支援 Intel®LGA 1700/1150/1151/1155/1156/1200/2066 與 AMD AM5/AM4/TR4，以及 ROG 140 mm ARGB 散熱器風扇', 361, NULL, 0, 1, 1, '2022-11-16'),
(34, '3', 'AsusRog', 'ASUS-ROG STRIX LC II 360 ARGB', '/images/AsusRog/heatSink/ASUSROGSTRIXLCII360ARGB.png', '/images2/AsusRog/heatSink/ASUSROGSTRIXLCII360ARGB.png', '6390', 'ROG Strix LC II 360 ARGB White Edition 一體式CPU水冷散熱器支援 Aura Sync、Intel®> LGA 1700/1200/1150/1151/1152/1155/1156/2011/2011-3/2066、AMD AM5/AM4/TR4，以及 3 個 ROG 120 mm 可定址 RGB 散熱器風扇', 425, NULL, 0, 1, 1, '2022-11-16'),
(35, '4', 'AsusRog', 'ASUS-ROG-Strix-Scope-19', '/images/AsusRog/keyboard/ASUSROGStrixScope19.png', '/images2/AsusRog/keyboard/ASUSROGStrixScope19.png', '3490', 'ROG Strix Scope  ROG Strix Scope RGB 機械式電競鍵盤，採用 Cherry MX 鍵軸、鋁合金框架、搭載Aura燈效同步技術以及提升FPS 遊戲識別的銀色WASD按鍵群 為 FPS 遊戲而生：超寬且符合人體工學設計的 Xccurate Ctrl 鍵可降低按錯鍵的機率，提供更高的 FPS 精準度 隱形鍵：按下此鍵可隱藏所有應用程式並切換為靜音，立即保護個人隱私；再次按下即可恢復原狀 Quick-toggle 開關：可將按鍵快速切換為功能鍵或媒體控制鍵 Cherry MX 鍵軸：採用德國製微動開關驅動器，可提供精準的輸入與觸覺回饋 耐用的結構：鋁合金上蓋帶有斜線紋路，嶄露風格同時也適合日常使用 不受限的自訂功能：Aura Sync RGB LED 技術提供無限個人化選項 巨集、管理及記憶體', 385, NULL, 0, 1, 1, '2022-11-16'),
(36, '4', 'AsusRog', 'ASUS-ROG-Falchion-NX', '/images/AsusRog/keyboard/ASUSROGFalchionNX.png', '/images2/AsusRog/keyboard/ASUSROGFalchionNX.png', '3990', 'ROG Falchion NX 65% 無線機械式電競鍵盤搭載 68 鍵，具備無線 Aura Sync 燈效、互動式觸控板、鍵盤保護蓋、ROG NX 機械軸，以及長達 450 小時的電池續航力', 408, NULL, 0, 1, 1, '2022-11-16'),
(37, '4', 'AsusRog', 'ASUS-ROG Strix Scope NX TKL Moonlight White', '/images/AsusRog/keyboard/ASUSROGStrixScopeNXTKLMoonlightWhite.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeNXTKLMoonlightWhite.png', '3190', 'ROG Strix Scope NX TKL 月光版機械式鍵盤專為 FPS 遊戲而生，搭載 ROG NX 軸、鋁合金框架、Aura Sync 同步燈效', 450, NULL, 0, 1, 1, '2022-11-16'),
(38, '4', 'AsusRog', 'ASUS-ROG-Azoth', '/images/AsusRog/keyboard/ASUSROGAzoth.png', '/images2/AsusRog/keyboard/ASUSROGAzoth.png', '7490', 'ROG Azoth 75%無線客製化電競機械鍵盤具備矽膠Gasket結構設計、三層消音泡綿和金屬上蓋、可客製熱插拔預潤 ROG NX 機械式鍵軸、ROG 鍵盤穩定器、PBT 二色成型鍵帽和潤滑套件、三模連線含 2.4 GHz SpeedNova 技術、OLED 顯示器、三向控制旋鈕、三種傾斜角度，並支援 Mac', 348, NULL, 0, 1, 1, '2022-11-16'),
(39, '4', 'AsusRog', 'ASUS-ROG Falchion Ace', '/images/AsusRog/keyboard/ASUSROGFalchionAce.png', '/images2/AsusRog/keyboard/ASUSROGFalchionAce.png', '2990', 'ROG Falchion Ace 65% 輕巧電競鍵盤具備ROG NX 機械軸，ROG 鍵軸穩定器、吸音泡綿、互動式觸控板、雙 Type-C 連接埠、三種鍵盤傾斜角度，以及保護蓋', 426, NULL, 0, 1, 1, '2022-11-16'),
(40, '4', 'AsusRog', 'ASUS-ROG Strix Flare II Animate', '/images/AsusRog/keyboard/ASUSROGStrixFlareIIAnimate.png', '/images2/AsusRog/keyboard/ASUSROGStrixFlareIIAnimate.png', '4990', 'ROG Strix Flare II Animate 機械式電競鍵盤配備 AniMe Matrix™ LED 顯示器、8000 Hz 輪詢率、 ROG NX 機械軸或 Cherry MX 機械軸、可插拔式鍵軸、金屬媒體控制鍵以及具備燈效散射功能的腕托', 548, NULL, 0, 1, 1, '2022-11-16'),
(41, '4', 'AsusRog', 'ASUS-ROG Strix Flare II', '/images/AsusRog/keyboard/ASUSROGStrixFlareII.png', '/images2/AsusRog/keyboard/ASUSROGStrixFlareII.png', '3990', 'ROG Strix Flare II 機械式電競鍵盤具備 8000 Hz 輪詢率、ROG NX 機械軸、金屬媒體控制鍵以及可拆式腕托', 615, NULL, 0, 1, 1, '2022-11-16'),
(42, '4', 'AsusRog', 'ASUS-ROG Strix Scope RX TKL Wireless Deluxe', '/images/AsusRog/keyboard/ASUSROGStrixScopeRXTKLWirelessDeluxe.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeRXTKLWirelessDeluxe.png', '4590', 'ROG Strix Scope RX TKL Wireless Deluxe 無線光軸鍵盤，專為 FPS 玩家打造，具備三模連線功能、ROG RX 光軸、加寬版 Ctrl 鍵、PBT 鍵帽、Aura Sync RGB、磁吸式腕托以及鋁合金上蓋', 398, NULL, 0, 1, 1, '2022-11-16'),
(43, '4', 'AsusRog', 'ASUS-ROG Strix Scope NX Wireless Deluxe', '/images/AsusRog/keyboard/ASUSROGStrixScopeNXWirelessDeluxe.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeNXWirelessDeluxe.png', '4590', 'ROG Strix Scope NX RGB Wireless Deluxe 機械式電競鍵盤，具備三模連線功能、ROG NX 機械紅軸 / 青軸 / 茶軸、PBT 鍵帽、鋁合金上蓋、磁吸式腕托以及可提升 FPS 精準度的加寬版 Ctrl 鍵', 439, NULL, 0, 1, 1, '2022-11-16'),
(44, '4', 'AsusRog', 'ASUS-ROG PBT Doubleshot Keycap Set for ROG RX Switches', '/images/AsusRog/keyboard/ASUSROGPBTDoubleshotKeycapSetforROGRXSwitches.png', '/images2/AsusRog/keyboard/ASUSROGPBTDoubleshotKeycapSetforROGRXSwitches.png', '1290', 'ROG PBT 二色成型 RX 光軸鍵帽採用頂級耐用的 PBT 材質，專為 ROG RX 光學鍵軸設計，提供更長的使用壽命與絕佳的鍵擊體驗。', 362, NULL, 0, 1, 1, '2022-11-16'),
(45, '4', 'AsusRog', 'ASUS-ROG Strix Scope NX TKL', '/images/AsusRog/keyboard/ASUSROGStrixScopeNXTKL.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeNXTKL.png', '2490', 'ROG Strix Scope NX TKL RGB 機械式電競鍵盤，搭載 ROG NX 鍵軸，具備鋁合金框架、Aura Sync燈效同步技術', 375, NULL, 0, 1, 1, '2022-11-16'),
(46, '4', 'AsusRog', 'ASUS-ROG Strix Scope NX', '/images/AsusRog/keyboard/ASUSROGStrixScopeNX.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeNX.png', '2990', 'ROG Strix Scope NX RGB 機械式電競鍵盤，搭載 ROG NX 鍵軸，具備鋁合金框架、Aura Sync燈效同步技術以及提升FPS 遊戲識別的銀色WASD按鍵群', 380, NULL, 0, 1, 1, '2022-11-16'),
(47, '4', 'AsusRog', 'ASUS-ROG Claymore II', '/images/AsusRog/keyboard/ASUSROGClaymoreII.png', '/images2/AsusRog/keyboard/ASUSROGClaymoreII.png', '7290', 'ROG Claymore II 模組化 80% / 100% 電競鍵盤，搭載 ROG RX 光軸、可拆式數字鍵盤與腕托、有線與無線 2.4G 連接模式、可自訂快捷鍵、音量調整滾輪以及無線 Aura Sync 燈效', 393, NULL, 0, 1, 1, '2022-11-16'),
(48, '4', 'AsusRog', 'ASUS-ROG Strix Scope Deluxe', '/images/AsusRog/keyboard/ASUSROGStrixScopeDeluxe.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeDeluxe.png', '2990', 'ROG Strix Scope Deluxe RGB 機械式電競鍵盤採用 Cherry MX 鍵軸、鋁合金框架、搭載人體工學腕墊、Aura Sync 燈效同步技術以及提升FPS 遊戲識別的銀色WASD按鍵群', 437, NULL, 0, 1, 1, '2022-11-16'),
(49, '4', 'AsusRog', 'ASUS-ROG Strix Scope PBT', '/images/AsusRog/keyboard/ASUSROGStrixScopePBT.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopePBT.png', '7290', 'ROG Strix Scope PBT 機械式電競鍵盤採用 Cherry MX 鍵軸、鋁合金邊框，以及專為 FPS 遊戲設計的超寬 Ctrl 鍵', 515, NULL, 0, 1, 1, '2022-11-16'),
(50, '4', 'AsusRog', 'ASUS-ROG Strix Scope TKL Deluxe', '/images/AsusRog/keyboard/ASUSROGStrixScopeTKLDeluxe.png', '/images2/AsusRog/keyboard/ASUSROGStrixScopeTKLDeluxe.png', '2890', 'ROG Strix Scope TKL Deluxe RGB 機械式電競鍵盤採用 Cherry MX 鍵軸、鋁合金框架、搭載人體工學腕墊、Aura Sync 燈效同步', 592, NULL, 0, 1, 1, '2022-11-16'),
(51, '4', 'AsusRog', 'ASUS-ROG Falchion', '/images/AsusRog/keyboard/ASUSROGFalchion.png', '/images2/AsusRog/keyboard/ASUSROGFalchion.png', '1290', 'ROG Falchion 65% 無線機械式電競鍵盤搭載 68 鍵，具備無線 Aura Sync 燈效、互動式觸控板、鍵盤保護蓋、Cherry MX 鍵軸，以及長達 450 小時的電池續航力', 389, NULL, 0, 1, 1, '2022-11-16'),
(52, '5', 'AsusRog', 'ASUS-ROG Harpe Ace Aim Lab Edition', '/images/AsusRog/mouse/ASUSROGHarpeAceAimLabEdition.png', '/images2/AsusRog/mouse/ASUSROGHarpeAceAimLabEdition.png', '4990', '超輕量的 ROG Harpe Ace Aim Lab Edition 是一款 54g 的無線電競滑鼠，經專業玩家測試認可的外型、36,000-dpi ROG AimPoint 光學感測器、ROG SpeedNova 無線技術、三模連線功能、ROG 微動開關、五個可編程按鈕，以及 Aim Lab Settings Optimizer 智能最佳化滑鼠設定。', 469, NULL, 0, 1, 1, '2022-11-16'),
(53, '5', 'AsusRog', 'ASUS-ROG Gladius III Wireless AimPoint', '/images/AsusRog/mouse/ASUSROGGladiusIIIWirelessAimPoint.png', '/images2/AsusRog/mouse/ASUSROGGladiusIIIWirelessAimPoint.png', '3490', '79g 輕量的無線 RGB 電競滑鼠，配備 36,000-dpi ROG AimPoint 光學感測器、具備三模連線(2.4 GHz、藍牙、有線 USB 2.0)、ROG SpeedNova 無線技術、新一代獨家可更換微動開關插槽 II、ROG 微動開關、0 毫秒點擊延遲樞軸按鈕機構、人體工學設計、ROG Paracord、100% PTFE 滑鼠腳、六個可編程按鈕和滑鼠防滑貼。', 388, NULL, 0, 1, 1, '2022-11-16'),
(54, '5', 'AsusRog', 'ASUS-ROG Keris Wireless AimPoint', '/images/AsusRog/mouse/ASUSROGKerisWirelessAimPoint.png', '/images2/AsusRog/mouse/ASUSROGKerisWirelessAimPoint.png', '3190', '75g 輕量無線 RGB 電競滑鼠，配備 36,000-dpi ROG AimPoint 光學感測器、具備三模連線(2.4 GHz、藍牙、有線 USB 2.0)、ROG SpeedNova 無線技術、新一代獨家可更換微動開關插槽 II、ROG 微動開關、PBT 按鈕、ROG Paracord、100% PTFE 滑鼠腳、五個可編程按鈕和滑鼠防滑貼。', 410, NULL, 0, 1, 1, '2022-11-16'),
(55, '5', 'AsusRog', 'ASUS-ROG Strix Impact III', '/images/AsusRog/mouse/ASUSROGStrixImpactIII.png', '/images2/AsusRog/mouse/ASUSROGStrixImpactIII.png', '1290', 'ROG Strix Impact III 是一款輕量、準雙手通用、59g 的有線 RGB 電競滑鼠，適用於 FPS 遊戲，配備 12,000-dpi 光學感測器、點擊近乎零延遲、可更換滑鼠開關插槽、ROG 微動開關、ROG Paracord、100% PTFE 滑鼠腳及耐用設計。', 397, NULL, 0, 1, 1, '2022-11-16'),
(56, '5', 'AsusRog', 'ASUS-ROG Spatha X', '/images/AsusRog/mouse/ASUSROGSpathaX.png', '/images2/AsusRog/mouse/ASUSROGSpathaX.png', '3990', '無線電競滑鼠具備雙模連線功能 (有線 / 2.4 GHz)、磁吸式充電底座、12 顆可編程按鍵、經特別調校的 19,000 dpi 光學感測器、獨家可更換微動開關插槽、ROG 微動開關、ROG Paracord 以及 Aura Sync RGB 燈效', 370, NULL, 0, 1, 1, '2022-11-16'),
(57, '5', 'AsusRog', 'ASUS-ROG Strix Impact II Moonlight White', '/images/AsusRog/mouse/ASUSROGStrixImpactIIMoonlightWhite.png', '/images2/AsusRog/mouse/ASUSROGStrixImpactIIMoonlightWhite.png', '990', '雙手通用、人體工學電競滑鼠，配備 6,200 DPI 光學感測器、可更換微動開關插槽以及 AURA SYNC RGB 燈光效果', 404, NULL, 0, 1, 1, '2022-11-16'),
(58, '5', 'AsusRog', 'ASUS-ROG Strix Impact II', '/images/AsusRog/mouse/ASUSROGStrixImpactII.png', '/images2/AsusRog/mouse/ASUSROGStrixImpactII.png', '990', 'ROG Strix Impact II 雙手通用、人體工學電競滑鼠，配備 6,200 dpi 光學感測器、輕量化設計及 Aura Sync RGB 燈光效果', 506, NULL, 0, 1, 1, '2022-11-16'),
(59, '5', 'AsusRog', 'ASUS-ROG Pugio II', '/images/AsusRog/mouse/ASUSROGPugioII.png', '/images2/AsusRog/mouse/ASUSROGPugioII.png', '4590', 'ROG Pugio II 雙手通用、輕量無線電競滑鼠，具備 16,000 dpi 光學感測器、7 顆可編程按鍵、可自訂側鍵、DPI 滾輪調整功能以及 Aura Sync RGB 燈光效果', 612, NULL, 0, 1, 1, '2022-11-16'),
(60, '5', 'AsusRog', 'ASUS-ROG Keris', '/images/AsusRog/mouse/ASUSROGKeris.png', '/images2/AsusRog/mouse/ASUSROGKeris.png', '1990', '輕量 FPS 電競滑鼠，具備特別調校的 ROG 16,000 dpi 感測器、獨家可更換微動開關插槽、PBT 材質左右按鍵、ROG Omni 滑鼠腳、ROG Paracord 連接線以及 Aura Sync RGB 燈效', 380, NULL, 0, 1, 1, '2022-11-16'),
(61, '5', 'AsusRog', 'ASUS-ROG Keris Wireless', '/images/AsusRog/mouse/ASUSROGKerisWireless.png', '/images2/AsusRog/mouse/ASUSROGKerisWireless.png', '1990', '輕量 FPS 無線電競滑鼠，具備三模連線功能 (有線 / 2.4 GHz / 藍牙)、特別調校的 ROG 16,000 dpi 感測器、獨家可更換微動開關插槽、PBT 材質左右按鍵、可拆換側鍵、ROG Omni 滑鼠腳、ROG Paracord 連接線以及 Aura Sync RGB 燈效', 490, NULL, 0, 1, 1, '2022-11-16'),
(62, '6', 'AsusRog', 'ASUS-ROG Hone Ace Aim Lab Edition', '/images/AsusRog/mousePad/ASUSROGHoneAceAimLabEdition.png', '/images2/AsusRog/mousePad/ASUSROGHoneAceAimLabEdition.png', '990', 'ROG Hone Ace Aim Lab Edition 是一款大尺寸電競滑鼠墊，可搭配 Aim Lab X ROG 360 訓練關卡使用，協助玩家提高準度。Hone Ace 的混合型亂紋布表面可提供流暢滑動和控制能力，並採用防水、防油及防塵的保護性奈米塗層表面，以及柔軟防滑橡膠底材。', 374, NULL, 0, 1, 1, '2022-11-16'),
(63, '6', 'AsusRog', 'ASUS-ROG Sheath Electro Punk', '/images/AsusRog/mousePad/ASUSROGSheathElectroPunk.png', '/images2/AsusRog/mousePad/ASUSROGSheathElectroPunk.png', '1290', 'ROG Scabbard II EVA 限定版滑鼠墊，結合了 NERV 及 EVA 靈感設計元素，具備奈米保護塗層，防潑水、防油、防塵的表面，抗磨損、平縫邊緣以及防滑橡膠底座', 361, NULL, 0, 1, 1, '2022-11-16'),
(64, '6', 'AsusRog', 'ASUS-ROG Scabbard II', '/images/AsusRog/mousePad/ASUSROGScabbardII.png', '/images2/AsusRog/mousePad/ASUSROGScabbardII.png', '790', '具備奈米保護塗層的中/大型滑鼠桌墊，防潑水、防油、防塵的表面，抗磨損、平縫邊緣以及防滑橡膠底座', 435, NULL, 0, 1, 1, '2022-11-16'),
(65, '6', 'AsusRog', 'ASUS-ROG Sheath BLK LTD', '/images/AsusRog/mousePad/ASUSROGSheathBLKLTD.png', '/images2/AsusRog/mousePad/ASUSROGSheathBLKLTD.png', '1290', 'ROG Sheath BLK 特大面積滑鼠墊，為遊戲強化的表面材質、抗磨損車邊縫線以及防滑橡膠底面設計', 378, NULL, 0, 1, 1, '2022-11-16'),
(66, '6', 'AsusRog', 'ASUS-ROG Strix Slice Mousepad', '/images/AsusRog/mousePad/ASUSROGStrixSliceMousepad.png', '/images2/AsusRog/mousePad/ASUSROGStrixSliceMousepad.png', '690', 'ROG Strix Slice 電競滑鼠墊擁有超薄、硬質且平滑的表面，以及防滑底座、高耐用性與可攜性，光學和雷射滑鼠皆完美適用。', 426, NULL, 0, 1, 1, '2022-11-16'),
(67, '6', 'AsusRog', 'ASUS-ROG Sheath', '/images/AsusRog/mousePad/ASUSROGSheath.png', '/images2/AsusRog/mousePad/ASUSROGSheath.png', '1290', '玩家夢寐以求的極致戰鬥舞台', 520, NULL, 0, 1, 1, '2022-11-16'),
(68, '6', 'AsusRog', 'ASUS-ROG Strix Edge', '/images/AsusRog/mousePad/ASUSROGStrixEdge.png', '/images2/AsusRog/mousePad/ASUSROGStrixEdge.png', '590', 'ASUS ROG Strix Edge直版電競滑鼠墊，搭配抗磨損縫線以及防滑橡膠底面設計', 616, NULL, 0, 1, 1, '2022-11-16'),
(69, '6', 'AsusRog', 'ASUS-ROG Scabbard', '/images/AsusRog/mousePad/ASUSROGScabbard.png', '/images2/AsusRog/mousePad/ASUSROGScabbard.png', '1390', '加大版電競滑鼠墊，防刮耐磨、防潑水設計，搭配夜光字體、抗磨損縫線以及防滑橡膠底面設計', 393, NULL, 0, 1, 1, '2022-11-16'),
(70, '6', 'AsusRog', 'ASUS-ROG Balteus', '/images/AsusRog/mousePad/ASUSROGBalteus.png', '/images2/AsusRog/mousePad/ASUSROGBalteus.png', '2190', 'ROG Balteus RGB 電競滑鼠墊具備 15 區 Aura Sync 燈光效果、直式硬質表面、USB 連接埠及防滑底座', 441, NULL, 0, 1, 1, '2022-11-16'),
(71, '7', 'AsusRog', 'ASUS-ROG Destrier Ergo Gaming Chair', '/images/AsusRog/PeripheralPproducts/ASUSROGDestrierErgoGamingChair.png', '/images2/AsusRog/PeripheralPproducts/ASUSROGDestrierErgoGamingChair.png', '24900', 'ROG Destrier Ergo電競椅是一款具電馭風格、未來感十足並可極致調整的人體工學電競椅，配有多功能座椅調節提供完美坐姿。特殊手遊模式扶手設計、及可拆式隔音屏可避免外部干擾並提供身歷其境的遊戲體驗。', 347, NULL, 0, 1, 1, '2022-11-16'),
(72, '7', 'AsusRog', 'ASUS-ROG Chariot Gaming Chair', '/images/AsusRog/PeripheralPproducts/ASUSROGChariotGamingChair.png', '/images2/AsusRog/PeripheralPproducts/ASUSROGChariotGamingChair.png', '16900', 'ROG Chariot RGB 電競椅以賽車風格打造，具備可調節的高密度泡棉頭枕、記憶棉腰枕、4D 扶手、傾斜機構以及耐用的四級氣壓升降', 377, NULL, 0, 1, 1, '2022-11-16'),
(73, '7', 'AsusRog', 'ASUS-ROG Chariot Core Gaming Chair', '/images/AsusRog/PeripheralPproducts/ASUSROGChariotCoreGamingChair.png', '/images2/AsusRog/PeripheralPproducts/ASUSROGChariotCoreGamingChair.png', '12900', 'ROG Chariot Core 電競椅以賽車風格打造，具備記憶棉腰枕、4D 扶手、傾斜機構以及耐用的四級氣壓升降', 384, NULL, 0, 1, 1, '2022-11-16'),
(74, '8', 'AsusRog', 'ASUS-ROG Strix XG32UQ', '/images/AsusRog/videoTool/ASUSROGStrixXG32UQ.png', '/images2/AsusRog/videoTool/ASUSROGStrixXG32UQ.png', '29900', 'ROG Strix XG32UQ HDMI 2.1 電競顯示器 — 32 吋 4K UHD (3840 x 2160)、快速 IPS、160 Hz (超頻)、1 ms GTG、NVIDIA G-SYNC 相容、FreeSync Premium Pro、可變超頻驅動、DisplayHDR 600、96% DCI-P3、DisplayPort 1.4', 332, NULL, 0, 1, 1, '2022-11-16'),
(75, '8', 'AsusRog', 'ASUS-ROG Strix XG32AQ', '/images/AsusRog/videoTool/ASUSROGStrixXG32AQ.png', '/images2/AsusRog/videoTool/ASUSROGStrixXG32AQ.png', '14900', 'ROG Strix XG32AQ 電競顯示器 – 32 吋 WQHD (2560 x 1440)、Fast IPS、175Hz (超頻)、1ms (GTG)、ELMB SYNC、相容 NVIDIA G-SYNC、可變過載、DisplayHDR™ 600', 432, NULL, 0, 1, 1, '2022-11-16'),
(76, '8', 'AsusRog', 'ASUS-ROG STRIX XG17AHP', '/images/AsusRog/videoTool/ASUSROGSTRIXXG17AHP.png', '/images2/AsusRog/videoTool/ASUSROGSTRIXXG17AHP.png', '16900', 'ROG Strix XG17AHP 可攜式 USB Type-C 電競螢幕 – 17.3 吋、IPS、FHD (FullHD，1920x1080)、240Hz (144Hz 以上)、Adaptive-Sync、零眩光、USB-C、Micro-HDMI、內建電池可連接筆電、攝影機或遊戲主機、智慧保護殼、護眼功能', 533, NULL, 0, 1, 1, '2022-11-16'),
(77, '8', 'AsusRog', 'ASUS-ROG Swift PG32UQ', '/images/AsusRog/videoTool/ASUSROGSwiftPG32UQ.png', '/images2/AsusRog/videoTool/ASUSROGSwiftPG32UQ.png', '35900', 'ROG Swift PG32UQ HDMI 2.1 電競螢幕 — 32 吋、 4K UHD (3840 x 2160)、IPS、144 Hz、1ms MPRT、相容 NVIDA G-SYNC、DSC、ELMB Sync、可變超頻驅動、DisplayHDR 600、98% DCI-P3、量子點技術、DisplayPort 1.4', 634, NULL, 0, 1, 1, '2022-11-16'),
(78, '8', 'AsusRog', 'ASUS-ROG Strix XG16AHP', '/images/AsusRog/videoTool/ASUSROGStrixXG16AHP.png', '/images2/AsusRog/videoTool/ASUSROGStrixXG16AHP.png', '12900', 'ROG Strix XG16AHP-W 可攜式 144Hz 電競螢幕 — 15.6 吋 FHD (1920 x 1080)、144 Hz、IPS 面板、NVIDIA G-SYNC 相容就緒、防眩光、內建 7800 mAh 電池、背面可折疊支架、USB Type-C、micro HDMI、ESS 擴大器、ROG 三腳支架和 ROG 保護套', 393, NULL, 0, 1, 1, '2022-11-16'),
(79, '8', 'AsusRog', 'ASUS-ROG Strix XG279Q GUNDAM EDITION', '/images/AsusRog/videoTool/ASUSROGStrixXG279QGUNDAMEDITION.png', '/images2/AsusRog/videoTool/ASUSROGStrixXG279QGUNDAMEDITION.png', '18988', 'ROG Swift PG279QM HDR電競螢幕 – 27 吋 QHD (2560 x 1440)、NVIDIA Reflex Latency Analyzer、240 Hz、Fast IPS、1 ms (GTG)、DisplayHDR™ 400', 458, NULL, 0, 1, 1, '2022-11-16'),
(80, '8', 'AsusRog', 'ASUS-ROG Strix XG35VQ', '/images/AsusRog/videoTool/ASUSROGStrixXG35VQ.png', '/images2/AsusRog/videoTool/ASUSROGStrixXG35VQ.png', '27900', 'ROG Strix XG35VQ 曲面電競顯示器 —35吋UWQHD (3440x1440)、100Hz 、Adaptive-Sync顯示技術 (FreeSync™)、Extreme Low Motion Blur(1ms MPRT)', 357, NULL, 0, 1, 1, '2022-11-16'),
(81, '8', 'AsusRog', 'ASUS-ROG Swift 360Hz PG259QNR', '/images/AsusRog/videoTool/ASUSROGSwift360HzPG259QNR.png', '/images2/AsusRog/videoTool/ASUSROGSwift360HzPG259QNR.png', '24900', 'ASUS ROG SWIFT 360Hz PG259QNR eSports NVIDIA® G-SYNC® 電競螢幕 – 24.5 吋 FHD (1920 x 1080)、NVIDIA Reflex Latency Analyzer、360 Hz、Fast IPS、1 ms (GTG)、ROG 桌面安裝套件', 373, NULL, 0, 1, 1, '2022-11-16'),
(82, '8', 'AsusRog', 'ASUS-ROG STRIX XG27WQ', '/images/AsusRog/videoTool/ASUSROGSTRIXXG27WQ.png', '/images2/AsusRog/videoTool/ASUSROGSTRIXXG27WQ.png', '12900', 'ROG Strix XG27AQ HDR 電競顯示器 – 27 吋 WQHD (2560 x 1440)、Fast IPS、可超頻 170Hz (144Hz 以上)、1ms (GTG)、ELMB SYNC、相容 G-SYNC、DisplayHDR™ 400', 426, NULL, 0, 1, 1, '2022-11-16'),
(83, '1', 'Razer', 'Razer Tactical Pro 17.3 Backpack v2', '/images/Razer/backpack/RazerTacticalPro173Backpackv2.png', '/images2/Razer/backpack/RazerTacticalPro173Backpackv2.png', '3843', '具備 18 吋筆記型電腦隔層的捲口式旅行後背包', 356, NULL, 0, 1, 1, '2022-11-16'),
(84, '1', 'Razer', 'Razer Concourse Pro Backpack 17.3', '/images/Razer/backpack/RazerConcourseProBackpack173.png', '/images2/Razer/backpack/RazerConcourseProBackpack173.png', '4890', '具備 18 吋筆記型電腦隔層的遊戲用後背包', 413, NULL, 0, 1, 1, '2022-11-16'),
(85, '1', 'Razer', 'Razer Recon 15 Rolltop Backpack', '/images/Razer/backpack/RazerRecon15RolltopBackpack.png', '/images2/Razer/backpack/RazerRecon15RolltopBackpack.png', '2793', '適合各種天候的超大容量多用途上開式背包', 508, NULL, 0, 1, 1, '2022-11-16'),
(86, '1', 'Razer', 'Razer Tactical 15.6 Backpack v2', '/images/Razer/backpack/RazerTactical156Backpackv2.png', '/images2/Razer/backpack/RazerTactical156Backpackv2.png', '4090', '具備 15.6 吋筆記型電腦隔層的旅行用後背包', 638, NULL, 0, 1, 1, '2022-11-16'),
(87, '1', 'Razer', 'Razer Rogue 15 Backpack V3', '/images/Razer/backpack/RazerRogue15BackpackV3.png', '/images2/Razer/backpack/RazerRogue15BackpackV3.png', '3190', '具備 16 吋筆記型電腦隔層的旅行用後背包', 424, NULL, 0, 1, 1, '2022-11-16'),
(88, '1', 'Razer', 'Razer Rogue 13 Backpack V3', '/images/Razer/backpack/RazerRogue13BackpackV3.png', '/images2/Razer/backpack/RazerRogue13BackpackV3.png', '1890', '具備 13 吋筆記型電腦隔層的輕便旅行後背包', 475, NULL, 0, 1, 1, '2022-11-16'),
(89, '1', 'Razer', 'Razer Rogue 17 Backpack V3', '/images/Razer/backpack/RazerRogue17BackpackV3.png', '/images2/Razer/backpack/RazerRogue17BackpackV3.png', '4890', '具備 18 吋筆記型電腦隔層的旅行用後背包', 364, NULL, 0, 1, 1, '2022-11-16'),
(90, '2', 'Razer', 'Razer Opus X - green', '/images/Razer/earPhone/RazerOpusXgreen.png', '/images2/Razer/earPhone/RazerOpusXgreen.png', '3390', '無線低延遲耳麥，搭載主動抗噪技術。', 379, NULL, 0, 1, 1, '2022-11-16'),
(91, '2', 'Razer', 'Razer Opus X - Quartz', '/images/Razer/earPhone/RazerOpusXQuartz.png', '/images2/Razer/earPhone/RazerOpusXQuartz.png', '3390', '無線低延遲耳麥，搭載主動抗噪技術。', 426, NULL, 0, 1, 1, '2022-11-16'),
(92, '2', 'Razer', 'Razer Hammerhead True Wireless Earbuds - black', '/images/Razer/earPhone/RazerHammerheadTrueWirelessEarbudsblack.png', '/images2/Razer/earPhone/RazerHammerheadTrueWirelessEarbudsblack.png', '3999', '無線低延遲耳機，搭載 Razer Chroma™ RGB', 384, NULL, 0, 1, 1, '2022-11-16'),
(93, '2', 'Razer', 'Razer Hammerhead BT', '/images/Razer/earPhone/RazerHammerheadBT.png', '/images2/Razer/earPhone/RazerHammerheadBT.png', '3790', 'Razer Hammerhead BT', 466, NULL, 0, 1, 1, '2022-11-16'),
(94, '2', 'Razer', 'Razer Hammerhead Duo - Nintendo Switch', '/images/Razer/earPhone/RazerHammerheadDuoNintendoSwitch.png', '/images2/Razer/earPhone/RazerHammerheadDuoNintendoSwitch.png', '2290', '雙驅動單體入耳式耳機。', 550, NULL, 0, 1, 1, '2022-11-16'),
(95, '2', 'Razer', 'Razer Leviathan V2 Pro', '/images/Razer/earPhone/RazerLeviathanV2Pro.png', '/images2/Razer/earPhone/RazerLeviathanV2Pro.png', '16290', '搭配重低音揚聲器的人工智慧波束賦形電腦遊戲 Soundbar', 595, NULL, 0, 1, 1, '2022-11-16'),
(96, '2', 'Razer', 'Razer Leviathan V2', '/images/Razer/earPhone/RazerLeviathanV2.png', '/images2/Razer/earPhone/RazerLeviathanV2.png', '7990', '搭配重低音揚聲器的電腦遊戲 Soundbar', 430, NULL, 0, 1, 1, '2022-11-16'),
(97, '2', 'Razer', 'Razer Leviathan V2 X', '/images/Razer/earPhone/RazerLeviathanV2X.png', '/images2/Razer/earPhone/RazerLeviathanV2X.png', '3499', '電腦遊戲 Soundbar', 420, NULL, 0, 1, 1, '2022-11-16'),
(98, '2', 'Razer', 'Razer Barracuda Pro', '/images/Razer/earPhone/RazerBarracudaPro.png', '/images2/Razer/earPhone/RazerBarracudaPro.png', '8099', '具備混合式主動抗噪技術的無線遊戲耳麥。', 354, NULL, 0, 1, 1, '2022-11-16'),
(99, '2', 'Razer', 'Razer Barracuda - Mercury', '/images/Razer/earPhone/RazerBarracudaMercury.png', '/images2/Razer/earPhone/RazerBarracudaMercury.png', '5190', '多平台無線遊戲行動耳麥。', 384, NULL, 0, 1, 1, '2022-11-16'),
(100, '2', 'Razer', 'Razer Barracuda - Quartz', '/images/Razer/earPhone/RazerBarracudaQuartz.png', '/images2/Razer/earPhone/RazerBarracudaQuartz.png', '5190', '多平台無線遊戲行動耳麥。', 444, NULL, 0, 1, 1, '2022-11-16'),
(101, '2', 'Razer', 'Razer Barracuda X - Black', '/images/Razer/earPhone/RazerBarracudaXBlack.png', '/images2/Razer/earPhone/RazerBarracudaXBlack.png', '3390', '多平台無線遊戲行動耳麥。', 395, NULL, 0, 1, 1, '2022-11-16'),
(102, '2', 'Razer', 'Razer Barracuda X - Mercury', '/images/Razer/earPhone/RazerBarracudaXMercury.png', '/images2/Razer/earPhone/RazerBarracudaXMercury.png', '3390', '多平台無線遊戲行動耳麥。', 470, NULL, 0, 1, 1, '2022-11-16'),
(103, '2', 'Razer', 'Razer Barracuda X - Quartz', '/images/Razer/earPhone/RazerBarracudaXQuartz.png', '/images2/Razer/earPhone/RazerBarracudaXQuartz.png', '3390', '多平台無線遊戲行動耳麥。', 532, NULL, 0, 1, 1, '2022-11-16'),
(104, '8', 'Razer', 'Razer raptor 27 hero desktop', '/images/Razer/videoTool/Razerraptor27herodesktop.png', '/images2/Razer/videoTool/Razerraptor27herodesktop.png', '30000', '全新 Razer Raptor 更加提升了功能和清晰度，可百分百滿足你的遊戲視覺需求，且具有處理速度勝過以往的 165Hz 更新率，加上經過 THX® 認證的嶄新視覺清晰度。最新一代 Raptor 完美結合了時尚外型和超高效能，依然採用的 QHD (2560 x 1440px) 解析度的 IPS 面板，且保有流線造型的具纜線整理底座，不論是你的畫面還是你的桌面，都能呈現流暢美觀的視覺感受。', 636, NULL, 0, 1, 1, '2022-11-16'),
(105, '7', 'Razer', 'Razer HEAD CUSHION', '/images/Razer/PeripheralPhroducts/RAZERHEADCUSHION.png', '/images2/Razer/PeripheralPhroducts/RAZERHEADCUSHION.png', '1290', 'RAZER 頭枕 舒適感再升級 如果你想要更完美舒適的支撐，就用 Razer 頭枕能讓你的電競椅舒適度再升級，採用超厚記憶泡綿，能夠真正滿足你對舒適度的極高要求。', 380, NULL, 0, 1, 1, '2022-11-16'),
(106, '7', 'Razer', 'Razer HEAD CUSHION CHROMA', '/images/Razer/PeripheralPhroducts/RAZERHEADCUSHIONCHROMA.png', '/images2/Razer/PeripheralPhroducts/RAZERHEADCUSHIONCHROMA.png', '3390', 'RAZER CHROMA 頭枕 閃亮量的舒適感。 想要更完美舒適的支撐，就用 Razer Chroma 頭枕讓你的電競椅舒適度再升級，採用厚實柔軟的絨質記憶泡綿，讓你的所有動作都舒適無比，更可利用 Razer Chroma™ RGB，打造專屬於你的遊戲燈光效果。', 432, NULL, 0, 1, 1, '2022-11-16'),
(107, '7', 'Razer', 'Razer LUMBAR CUSHION', '/images/Razer/PeripheralPhroducts/RAZERLUMBARCUSHION.png', '/images2/Razer/PeripheralPhroducts/RAZERLUMBARCUSHION.png', '1899', 'RAZER LUMBAR CUSHION 提供極致舒適感 利用 Razer 腰墊，讓你的座椅具備完美的人體工學。在柔軟黑色天鵝絨內包裹了厚實記憶泡綿軟墊，以精心雕塑的腰墊曲線完美支撐你的腰部，讓你的脊椎不會歪斜。在支撐力與舒適度間取得了恰到好處的平衡，帶給你無懈可擊的乘坐體驗。 精心雕塑的腰墊曲線 你的下背部能以最理想的角度靠在 Razer 腰墊上，這款腰墊的設計就是要讓你坐在椅子上也能擁有一整天的隨時支撐，且輕鬆地維持健康姿勢。', 352, NULL, 0, 1, 1, '2022-11-16'),
(108, '7', 'Razer', 'Razer UNIVERSAL CHAIR CASTER STUDS', '/images/Razer/PeripheralPhroducts/RAZERUNIVERSALCHAIRCASTERSTUDS.png', '/images2/Razer/PeripheralPhroducts/RAZERUNIVERSALCHAIRCASTERSTUDS.png', '599', 'RAZER UNIVERSAL CHAIR CASTER STUDS 穩固不移 將輪子更換成 Razer 通用椅腳輪栓，讓你穩穩固守勝利。這款腳輪栓是隨裝即用的升級產品，能為你的設置提供超高穩定性和支撐力，無論遊戲戰場有多激烈，都能讓你堅守陣地。   防滑橡膠底部 輪栓配備柔軟的橡膠底部，能完美搭配木質、磁磚、地毯和強化複合地板，提供絕佳的穩定性，在遊戲時減少不必要的移動。', 364, NULL, 0, 1, 1, '2022-11-16'),
(109, '7', 'Razer', 'TEAM Razer FLOOR RUG', '/images/Razer/PeripheralPhroducts/TEAMRAZERFLOORRUG.png', '/images2/Razer/PeripheralPhroducts/TEAMRAZERFLOORRUG.png', '2490', 'TEAM RAZER FLOOR RUG 為地板提供柔軟的防護 用 Team Razer 地墊為你的電競椅和地板提供安全防護，同時提升作戰基地的舒適度，這款地墊以柔軟耐用的布料製成，適合日常使用，並可減少腳輪移動所產生的噪音。 柔軟絨滑觸感 給你小巧俐落的效能表現 以柔軟絨毛聚酯纖維製成，Team Razer 地墊的軟絨觸感能讓你的腳底舒適無比，更能在投入遊戲時溫暖呵護你的雙腳。', 443, NULL, 0, 1, 1, '2022-11-16'),
(110, '7', 'Razer', 'TEAM Razer FLOOR MAT', '/images/Razer/PeripheralPhroducts/TEAMRAZERFLOORMAT.png', '/images2/Razer/PeripheralPhroducts/TEAMRAZERFLOORMAT.png', '3990', 'TEAM RAZER FLOOR MAT 高效保護 為基地鋪設強大保護，讓你的終極電競戰鬥基地更臻完美。為你介紹 Team Razer 地墊，硬面設計讓你能隨意使用電競椅，並提供完整的保護，連地板都滴水不 漏。 硬質材質 這款地墊的表面不僅讓你能輕鬆移動電競椅，而且還能在滾動椅子時帶來獨特的回饋感，讓你隨時能知道椅子是不是滾出墊子的範圍。', 381, NULL, 0, 1, 1, '2022-11-16'),
(111, '6', 'Razer', 'Razer Goliathus Extended Chroma - Quartz', '/images/Razer/mousePad/RazerGoliathusExtendedChromaQuartz.png', '/images2/Razer/mousePad/RazerGoliathusExtendedChromaQuartz.png', '3599', 'Razer Chroma™ 繽紛加持 讓所有遊戲滑鼠都變得更好使 細緻布質表面', 410, NULL, 0, 1, 1, '2022-11-16'),
(112, '6', 'Razer', 'Razer Goliathus Chroma', '/images/Razer/mousePad/RazerGoliathusChroma.png', '/images2/Razer/mousePad/RazerGoliathusChroma.png', '3599', 'Razer Chroma™ 繽紛加持 讓所有遊戲滑鼠都變得更好使 細緻布質表面', 541, NULL, 0, 1, 1, '2022-11-16'),
(113, '6', 'Razer', 'Razer Goliathus Mobile Stealth Edition', '/images/Razer/mousePad/RazerGoliathusMobileStealthEdition.png', '/images2/Razer/mousePad/RazerGoliathusMobileStealthEdition.png', '349', '1.5 MM 超薄設計 紋理布面提供高速控制 微紋理追蹤細微動作', 633, NULL, 0, 1, 1, '2022-11-16'),
(114, '6', 'Razer', 'Razer Goliathus Extended Chroma - Mercury', '/images/Razer/mousePad/RazerGoliathusExtendedChromaMercury.png', '/images2/Razer/mousePad/RazerGoliathusExtendedChromaMercury.png', '3599', 'Razer Chroma™ 繽紛加持 讓所有遊戲滑鼠都變得更好使 細緻布質表面', 384, NULL, 0, 1, 1, '2022-11-16'),
(115, '6', 'Razer', 'Razer Goliathus Chroma - Black', '/images/Razer/mousePad/RazerGoliathusChromaBlack.png', '/images2/Razer/mousePad/RazerGoliathusChromaBlack.png', '3599', 'Razer Chroma™ 繽紛加持 讓所有遊戲滑鼠都變得更好使 細緻布質表面', 434, NULL, 0, 1, 1, '2022-11-16'),
(116, '6', 'Razer', 'Razer Goliathus Extended Chroma - Black', '/images/Razer/mousePad/RazerGoliathusExtendedChromaBlack.png', '/images2/Razer/mousePad/RazerGoliathusExtendedChromaBlack.png', '3599', 'Razer Chroma™ 繽紛加持 讓所有遊戲滑鼠都變得更好使 細緻布質表面', 357, NULL, 0, 1, 1, '2022-11-16'),
(117, '6', 'Razer', 'Razer Goliathus Chroma 3XL - Black', '/images/Razer/mousePad/RazerGoliathusChroma3XLBlack.png', '/images2/Razer/mousePad/RazerGoliathusChroma3XLBlack.png', '3599', '細緻布質表面 Ultra-Large 3XL Size Razer Chroma™ RGB 加持', 354, NULL, 0, 1, 1, '2022-11-16'),
(118, '5', 'Razer', 'Razer Naga V2 Pro', '/images/Razer/mouse/RazerNagaV2Pro.png', '/images2/Razer/mouse/RazerNagaV2Pro.png', '5899', '搭載 HyperScroll Pro 滾輪的 MMO 無線遊戲滑鼠', 426, NULL, 0, 1, 1, '2022-11-16'),
(119, '5', 'Razer', 'Razer Naga V2 HyperSpeed', '/images/Razer/mouse/RazerNagaV2HyperSpeed.png', '/images2/Razer/mouse/RazerNagaV2HyperSpeed.png', '3399', '具備 19 顆可編程按鍵的人體工學無線 MMO 遊戲滑鼠', 382, NULL, 0, 1, 1, '2022-11-16'),
(120, '5', 'Razer', 'Razer Naga Left Handed Edition', '/images/Razer/mouse/RazerNagaLeftHandedEdition.png', '/images2/Razer/mouse/RazerNagaLeftHandedEdition.png', '3690', '人體工學設計 MMO 遊戲滑鼠，適合慣用左手的使用者', 457, NULL, 0, 1, 1, '2022-11-16'),
(121, '5', 'Razer', 'Razer Naga Trinity', '/images/Razer/mouse/RazerNagaTrinity.png', '/images2/Razer/mouse/RazerNagaTrinity.png', '3690', '組合式 MOBA/MMO 遊戲滑鼠', 530, NULL, 0, 1, 1, '2022-11-16'),
(122, '5', 'Razer', 'Razer Naga X', '/images/Razer/mouse/RazerNagaX.png', '/images2/Razer/mouse/RazerNagaX.png', '2490', '具備 16 顆按鍵的人體工學 MMO 遊戲滑鼠', 581, NULL, 0, 1, 1, '2022-11-16'),
(123, '5', 'Razer', 'Razer Basilisk Ultimate with Charging Dock', '/images/Razer/mouse/RazerBasiliskUltimatewithChargingDock.png', '/images2/Razer/mouse/RazerBasiliskUltimatewithChargingDock.png', '6190', '具備 11 顆可編程按鍵的無線遊戲滑鼠', 364, NULL, 0, 1, 1, '2022-11-16'),
(124, '5', 'Razer', 'Razer Basilisk Ultimate', '/images/Razer/mouse/RazerBasiliskUltimate.png', '/images2/Razer/mouse/RazerBasiliskUltimate.png', '4890', '具備 11 顆可編程按鍵的無線遊戲滑鼠', 490, NULL, 0, 1, 1, '2022-11-16'),
(125, '5', 'Razer', 'Razer Basilisk X HyperSpeed', '/images/Razer/mouse/RazerBasiliskXHyperSpeed.png', '/images2/Razer/mouse/RazerBasiliskXHyperSpeed.png', '1910', '採用 Razer™ HyperSpeed 技術的遊戲滑鼠', 396, NULL, 0, 1, 1, '2022-11-16'),
(126, '5', 'Razer', 'Razer DeathAdder V3 Pro - Black', '/images/Razer/mouse/RazerDeathAdderV3ProBlack.png', '/images2/Razer/mouse/RazerDeathAdderV3ProBlack.png', '4999', '搭載 Razer HyperScroll 傾斜滾輪的可自訂無線遊戲滑鼠', 407, NULL, 0, 1, 1, '2022-11-16'),
(127, '5', 'Razer', 'Razer DeathAdder V3 Pro - White', '/images/Razer/mouse/RazerDeathAdderV3ProWhite.png', '/images2/Razer/mouse/RazerDeathAdderV3ProWhite.png', '4999', '搭載 Razer HyperScroll 傾斜滾輪的可自訂無線遊戲滑鼠', 381, NULL, 0, 1, 1, '2022-11-16'),
(128, '5', 'Razer', 'Razer Deathadder V2 Pro', '/images/Razer/mouse/RazerDeathadderV2Pro.png', '/images2/Razer/mouse/RazerDeathadderV2Pro.png', '4090', '具備同級最佳人體工學設計的無線遊戲滑鼠', 358, NULL, 0, 1, 1, '2022-11-16'),
(129, '5', 'Razer', 'Razer DeathAdder V2 - Special Edition', '/images/Razer/mouse/RazerDeathAdderV2SpecialEdition.png', '/images2/Razer/mouse/RazerDeathAdderV2SpecialEdition.png', '2490', '具有同級最佳人體工學設計的有線遊戲滑鼠', 402, NULL, 0, 1, 1, '2022-11-16'),
(130, '5', 'Razer', 'Razer DeathAdder V2 X HyperSpeed', '/images/Razer/mouse/RazerDeathAdderV2XHyperSpeed.png', '/images2/Razer/mouse/RazerDeathAdderV2XHyperSpeed.png', '1799', '具備同級最佳人體工學設計的無線遊戲滑鼠', 561, NULL, 0, 1, 1, '2022-11-16'),
(131, '4', 'Razer', 'Razer DeathStalker V2 Pro - Linear Optical Switch - US - Black', '/images/Razer/keyboard/RazerDeathStalkerV2ProLinearOpticalSwitchUSBlack.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ProLinearOpticalSwitchUSBlack.png', '6499', '搭載 Razer Chroma™ RGB 功能的無線矮軸光學遊戲鍵盤', 639, NULL, 0, 1, 1, '2022-11-16'),
(132, '4', 'Razer', 'Razer DeathStalker V2 Pro - Clicky Optical Switch - US - Black', '/images/Razer/keyboard/RazerDeathStalkerV2ProClickyOpticalSwitchUSBlack.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ProClickyOpticalSwitchUSBlack.png', '6499', '搭載 Razer Chroma™ RGB 功能的無線矮軸光學遊戲鍵盤', 418, NULL, 0, 1, 1, '2022-11-16'),
(133, '4', 'Razer', 'Razer DeathStalker V2 Pro - Clicky Optical Switch - US - White', '/images/Razer/keyboard/RazerDeathStalkerV2ProClickyOpticalSwitchUSWhite.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ProClickyOpticalSwitchUSWhite.png', '6499', '搭載 Razer Chroma™ RGB 功能的無線矮軸光學遊戲鍵盤', 456, NULL, 0, 1, 1, '2022-11-16'),
(134, '4', 'Razer', 'Razer DeathStalker V2 Pro Tenkeyless - Linear Optical Switch - US - Black', '/images/Razer/keyboard/RazerDeathStalkerV2ProTenkeylessLinearOpticalSwitchUSBlack.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ProTenkeylessLinearOpticalSwitchUSBlack.png', '6299', '無線矮軸 RGB 無數字鍵區光學鍵盤', 339, NULL, 0, 1, 1, '2022-11-16'),
(135, '4', 'Razer', 'Razer DeathStalker V2 Pro Tenkeyless - Linear Optical Switch - US - White', '/images/Razer/keyboard/RazerDeathStalkerV2ProTenkeylessLinearOpticalSwitchUSWhite.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ProTenkeylessLinearOpticalSwitchUSWhite.png', '6299', '無線矮軸 RGB 無數字鍵區光學鍵盤', 405, NULL, 0, 1, 1, '2022-11-16'),
(136, '4', 'Razer', 'Razer DeathStalker V2 - Linear Optical Switch - US', '/images/Razer/keyboard/RazerDeathStalkerV2LinearOpticalSwitchUS.png', '/images2/Razer/keyboard/RazerDeathStalkerV2LinearOpticalSwitchUS.png', '4999', '矮軸 RGB 光學遊戲鍵盤', 438, NULL, 0, 1, 1, '2022-11-16'),
(137, '4', 'Razer', 'Razer DeathStalker V2 - Clicky Optical Switch - US', '/images/Razer/keyboard/RazerDeathStalkerV2ClickyOpticalSwitchUS.png', '/images2/Razer/keyboard/RazerDeathStalkerV2ClickyOpticalSwitchUS.png', '4999', '矮軸 RGB 光學遊戲鍵盤', 388, NULL, 0, 1, 1, '2022-11-16'),
(138, '4', 'Razer', 'Razer BlackWidow V3 Pro - Green Switch - Traditional Chinese', '/images/Razer/keyboard/RazerBlackWidowV3ProGreenSwitchTraditionalChinese.png', '/images2/Razer/keyboard/RazerBlackWidowV3ProGreenSwitchTraditionalChinese.png', '7290', 'Razer 綠色機械軸', 444, NULL, 0, 1, 1, '2022-11-16'),
(139, '4', 'Razer', 'Razer x A Bathing Ape BlackWidow V3 - Green Switch - US', '/images/Razer/keyboard/RazerxABathingApeBlackWidowV3GreenSwitchUS.png', '/images2/Razer/keyboard/RazerxABathingApeBlackWidowV3GreenSwitchUS.png', '6290', '整合 Razer Chroma RGB 功能的機械式遊戲鍵盤', 511, NULL, 0, 1, 1, '2022-11-16'),
(140, '4', 'Razer', 'Razer BlackWidow V3 - Green Switch - US - Halo Infinite', '/images/Razer/keyboard/RazerBlackWidowV3GreenSwitchUSHaloInfinite.png', '/images2/Razer/keyboard/RazerBlackWidowV3GreenSwitchUSHaloInfinite.png', '5490', '整合 Razer Chroma RGB 功能的機械式遊戲鍵盤', 627, NULL, 0, 1, 1, '2022-11-16'),
(141, '4', 'Razer', 'Razer BlackWidow V3 Tenkeyless - Yellow Switch - US', '/images/Razer/keyboard/RazerBlackWidowV3TenkeylessYellowSwitchUS.png', '/images2/Razer/keyboard/RazerBlackWidowV3TenkeylessYellowSwitchUS.png', '3190', '具備 Razer Chroma RGB 的精巧機械式鍵盤', 380, NULL, 0, 1, 1, '2022-11-16'),
(142, '4', 'Razer', 'Razer BlackWidow V3 Mini HyperSpeed - Phantom Edition - Yellow Switch - US', '/images/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedPhantomEditionYellowSwitchUS.png', '/images2/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedPhantomEditionYellowSwitchUS.png', '6090', '整合 Razer Chroma™ RGB 功能的 65% 無線機械式遊戲鍵盤', 458, NULL, 0, 1, 1, '2022-11-16'),
(143, '4', 'Razer', 'Razer BlackWidow V3 Mini HyperSpeed - Green Switch - US', '/images/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedGreenSwitchUS.png', '/images2/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedGreenSwitchUS.png', '5390', '整合 Razer Chroma™ RGB 功能的 65% 無線機械式遊戲鍵盤', 381, NULL, 0, 1, 1, '2022-11-16'),
(144, '4', 'Razer', 'Razer BlackWidow V3 Mini HyperSpeed - Yellow Switch - US', '/images/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedYellowSwitchUS.png', '/images2/Razer/keyboard/RazerBlackWidowV3MiniHyperSpeedYellowSwitchUS.png', '5390', '整合 Razer Chroma™ RGB 功能的 65% 無線機械式遊戲鍵盤', 363, NULL, 0, 1, 1, '2022-11-16'),
(145, '4', 'Razer', 'Razer BlackWidow (Green Switch) - Traditional Chinese Layout', '/images/Razer/keyboard/RazerBlackWidowGreenSwitchTraditionalChineseLayout.png', '/images2/Razer/keyboard/RazerBlackWidowGreenSwitchTraditionalChineseLayout.png', '4390', '採用 Razer™ 機械式綠軸的遊戲鍵盤', 438, NULL, 0, 1, 1, '2022-11-16'),
(146, '3', 'Razer', 'Razer Kunai Chroma - 120MM - 1 Fan', '/images/Razer/heatSink/RazerKunaiChroma120MM1Fan.png', '/images2/Razer/heatSink/RazerKunaiChroma120MM1Fan.png', '1349', '高效能 aRGB 風扇', 347, NULL, 0, 1, 1, '2022-11-16'),
(147, '3', 'Razer', 'Razer Kunai Chroma - 140MM - 1 Fan', '/images/Razer/heatSink/RazerKunaiChroma140MM1Fan.png', '/images2/Razer/heatSink/RazerKunaiChroma140MM1Fan.png', '1499', '高效能 aRGB 風扇', 407, NULL, 0, 1, 1, '2022-11-16'),
(148, '3', 'Razer', 'Razer Kunai Chroma - 120MM - 3 Fans', '/images/Razer/heatSink/RazerKunaiChroma120MM3Fans.png', '/images2/Razer/heatSink/RazerKunaiChroma120MM3Fans.png', '3999', '高效能 aRGB 風扇', 507, NULL, 0, 1, 1, '2022-11-16'),
(149, '3', 'Razer', 'Razer Kunai Chroma - 140MM - 3 Fans', '/images/Razer/heatSink/RazerKunaiChroma140MM3Fans.png', '/images2/Razer/heatSink/RazerKunaiChroma140MM3Fans.png', '4499', '高效能 aRGB 風扇', 646, NULL, 0, 1, 1, '2022-11-16'),
(150, '8', 'Logitech', 'Logitech_C930e_1', '/images/Logitech/videoTool/LogitechC930e1.png', '/images2/Logitech/videoTool/LogitechC930e1.png', '3899', 'C930e 提供更優異的視訊會議。RightLight™ 2 增強了 HD 1080p/30 fps 視訊，還有可在任何環境提供飽滿、優美視訊品質的高精準鏡頭。優異的影像感應器提供始終如一的 HD 品質影像，即使變焦放大也不會出現鋸齒或模糊情況。擁有可拆卸隱私遮罩', 418, NULL, 0, 1, 1, '2022-11-16'),
(151, '8', 'Logitech', 'Logitech_C925eHD_1', '/images/Logitech/videoTool/LogitechC925eHD1.png', '/images2/Logitech/videoTool/LogitechC925eHD1.png', '3490', '支援1080P FULL HD視訊，自動對焦 高速720P 60幀拍攝無殘影 隨插即用，輕鬆連接免除配對煩惱 配備 RightLight 2技術及廣角大光圈 全尺寸麥克風，收音範圍更廣', 488, NULL, 0, 1, 1, '2022-11-16'),
(152, '8', 'Logitech', 'Logitech_StreamCam_3', '/images/Logitech/videoTool/LogitechStreamCam3.png', '/images2/Logitech/videoTool/LogitechStreamCam3.png', '3390', '智慧自動對焦與曝光 FULL HD 1080p/60fps 優質音訊 Full HD垂直視訊 多種安裝選擇', 381, NULL, 0, 1, 1, '2022-11-16'),
(153, '8', 'Logitech', 'Logitech_C922PROSTREAM_1', '/images/Logitech/videoTool/LogitechC922PROSTREAM1.png', '/images2/Logitech/videoTool/LogitechC922PROSTREAM1.png', '3390', '單人適用，專為直播主設計可串流播放與錄製鮮明逼真的Full HD 1080p視訊直播實況時，可輕鬆整合遊戲背景精準調校的自動對焦功能兩個全向式麥克風立體聲音效附贈可調整的桌上型三腳架', 413, NULL, 0, 1, 1, '2022-11-16'),
(154, '8', 'Logitech', 'Logitech_C920RHDPRO_1', '/images/Logitech/videoTool/LogitechC920RHDPRO1.png', '/images2/Logitech/videoTool/LogitechC920RHDPRO1.png', '3290', '單人適用，超值選擇完整的Full HD1080P視訊通話HD自動光線校正功能配備二個麥克風，完整立體聲小巧靈活外型，更彈性的空間使用 Full HD 1080p 視訊通話，適用於Skype最新版本 優異的自動光源調整功能 雙麥克風立體聲音效 內建H.264 視訊壓縮技術 真實 Full HD 1080p 感應器', 435, NULL, 0, 1, 1, '2022-11-16'),
(155, '8', 'Logitech', 'Logitech_C615HD_1', '/images/Logitech/videoTool/LogitechC615HD1.png', '/images2/Logitech/videoTool/LogitechC615HD1.png', '2390', '單人適用，可360度旋轉小巧靈活寬螢幕HD1080P 視訊通話快速自動對焦，保持視訊銳利清晰內建隔 噪麥克風，清晰傳送聲音配備HD光線校正功能', 381, NULL, 0, 1, 1, '2022-11-16'),
(156, '8', 'Logitech', 'Logitech_C310HD_1', '/images/Logitech/videoTool/LogitechC310HD1.png', '/images2/Logitech/videoTool/LogitechC310HD1.png', '999', '單人適用，小巧靈活寬螢幕HD720P 視訊通話內建隔噪麥克風，清晰傳送聲音會調整照明條件，呈現鮮明對比影像配附通用夾具，可固定在螢幕或架子上 HD 720p 高品質視訊通話 可一鍵上傳至Facebook及YouTuBe 最高可達 五百萬畫素 照片拍攝 實用有趣的影像軟體 修正補光及雜訊過濾技術', 468, NULL, 0, 1, 1, '2022-11-16');
INSERT INTO `product_list` (`id`, `category_id`, `brand`, `product_name`, `images`, `images2`, `price`, `introduce`, `storage`, `rate`, `favorites`, `status_id`, `valid`, `created_at`) VALUES
(157, '8', 'Logitech', 'Logitech_C270HD_1', '/images/Logitech/videoTool/LogitechC270HD1.png', '/images2/Logitech/videoTool/LogitechC270HD1.png', '799', '單人適用，小巧靈活 寬螢幕HD720P 視訊通話 內建隔噪麥克風，清晰傳送聲音 會調整照明條件，呈現鮮明對比影像 配附通用夾具，可固定在螢幕或架子上', 545, NULL, 0, 1, 1, '2022-11-16'),
(158, '8', 'Logitech', 'Logitech_BRIO', '/images/Logitech/videoTool/LogitechBRIO.png', '/images2/Logitech/videoTool/LogitechBRIO.png', '6799', '適用於視訊會議的終極網路攝影機Brio 擁有商務認證，具有整合的光學與紅外線感應器，支援 Windows Hello。', 643, NULL, 0, 1, 1, '2022-11-16'),
(159, '8', 'Logitech', 'Logitech_C920e', '/images/Logitech/videoTool/LogitechC920e.png', '/images2/Logitech/videoTool/LogitechC920e.png', '3899', '最適合大量部署的 1080p 商務網路攝影機 完美取景/固定的 78° 視角可以擷取「恰到好處」適合使用者與其環境的視野', 394, NULL, 0, 1, 1, '2022-11-16'),
(160, '8', 'Logitech', 'Logitech_brio500bk2', '/images/Logitech/videoTool/Logitechbrio500bk2.png', '/images2/Logitech/videoTool/Logitechbrio500bk2.png', '3590', 'brio500 提供更優異的視訊會議。', 475, NULL, 0, 1, 1, '2022-11-16'),
(161, '7', 'Logitech', 'Logitech_DRIVINGFORCE_1', '/images/Logitech/PeripheralPhroducts/LogitechDRIVINGFORCE1.png', '/images2/Logitech/PeripheralPhroducts/LogitechDRIVINGFORCE1.png', '1990', 'DRIVING FORCE 方向盤為選配支援羅技 G923、G29 或 G920 Driving Force 賽車方向盤 適用於G29 DRIVING FORCE方向盤 採用堅固鋼齒輪軸體 手工縫製真皮 兩年保固 換檔可保持加速的六檔變速器', 391, NULL, 0, 1, 1, '2022-11-16'),
(162, '7', 'Logitech', 'Logitech_G923_1xdfs', '/images/Logitech/PeripheralPhroducts/LogitechG9231xdfs.png', '/images2/Logitech/PeripheralPhroducts/LogitechG9231xdfs.png', '11900', '將經典設計現代化。新配色、優異的拉絲金屬、汽車風格的皮革縫合和拋光踏板，為 G923 提供了專業的外觀。形式追隨功能，具有整合的中心標記和旋轉轉盤。', 396, NULL, 0, 1, 1, '2022-11-16'),
(163, '7', 'Logitech', 'Logitech_G29', '/images/Logitech/PeripheralPhroducts/LogitechG29.png', '/images2/Logitech/PeripheralPhroducts/LogitechG29.png', '8990', 'G29 賽車方向盤組', 420, NULL, 0, 1, 1, '2022-11-16'),
(164, '7', 'Logitech', 'Logitech_F310_1', '/images/Logitech/PeripheralPhroducts/LogitechF3101.png', '/images2/Logitech/PeripheralPhroducts/LogitechF3101.png', '699', 'Logitech F310 手把', 394, NULL, 0, 1, 1, '2022-11-16'),
(165, '7', 'Logitech', 'Logitech_EXTREME3DPRO_1', '/images/Logitech/PeripheralPhroducts/LogitechEXTREME3DPRO1.png', '/images2/Logitech/PeripheralPhroducts/LogitechEXTREME3DPRO1.png', '1190', 'Logitech EXTREME3D PRO', 440, NULL, 0, 1, 1, '2022-11-16'),
(166, '7', 'Logitech', 'LogitechGSaitekPRO_1', '/images/Logitech/PeripheralPhroducts/LogitechGSaitekPRO1.png', '/images2/Logitech/PeripheralPhroducts/LogitechGSaitekPRO1.png', '6390', 'Logitech GSaitek PRO 賽車組', 550, NULL, 0, 1, 1, '2022-11-16'),
(167, '7', 'Logitech', 'LogitechGSaitekPRO_2', '/images/Logitech/PeripheralPhroducts/LogitechGSaitekPRO2.png', '/images2/Logitech/PeripheralPhroducts/LogitechGSaitekPRO2.png', '5590', 'Logitech GSaitek PRO 賽車組', 582, NULL, 0, 1, 1, '2022-11-16'),
(168, '7', 'Logitech', 'Logitech_F710_1', './images/Logitech/PeripheralPhroducts/LogitechF7101.png', '/images2/Logitech/PeripheralPhroducts/LogitechF7101.png', '1590', 'Logitech F710 手把', 364, NULL, 0, 1, 1, '2022-11-16'),
(169, '6', 'Logitech', 'Logitech_G2401', '/images/Logitech/mousePad/LogitechG2401.png', '/images2/Logitech/mousePad/LogitechG2401.png', '599', '穩定的橡膠底座 舒適的布質構造 捲起方便、隨身攜帶', 464, NULL, 0, 1, 1, '2022-11-16'),
(170, '6', 'Logitech', 'Logitech_G640_2', '/images/Logitech/mousePad/LogitechG6402.png', '/images2/Logitech/mousePad/LogitechG6402.png', '1190', '適度的表面磨擦力 一致的表面紋理 穩固的橡膠底座 舒適的布料構造', 398, NULL, 0, 1, 1, '2022-11-16'),
(171, '6', 'Logitech', 'Logitech_G440_1', '/images/Logitech/mousePad/LogitechG4401.png', '/images2/Logitech/mousePad/LogitechG4401.png', '899', '高速與高精確度融合 低表面摩擦 一致的追蹤表面 堅實的穩定底座', 420, NULL, 0, 1, 1, '2022-11-16'),
(172, '6', 'Logitech', 'Logitech_High_Resolution', '/images/Logitech/mousePad/LogitechHighResolution.png', '/images2/Logitech/mousePad/LogitechHighResolution.png', '1290', '大尺寸遊戲鼠墊', 436, NULL, 0, 1, 1, '2022-11-16'),
(173, '5', 'Logitech', 'Logitech_G502Hero_2', '/images/Logitech/mouse/LogitechG502Hero2.png', '/images2/Logitech/mouse/LogitechG502Hero2.png', '1288', 'G502 hero 線材皆改為塑料線材，照片僅供參考。請以實品為主 HERO 25K 感應器 11 個可自訂按鈕 可調校配重砝碼 1680 萬色LIGHTSYNC RGB  採用高性能HERO 25K 感應器 最高DPI可達25600 最高速度可達400 IPS 5個可自訂配重和平衡砝碼 1680萬色RGB背光 11個可自訂按鍵和控制鍵', 387, NULL, 0, 1, 1, '2022-11-16'),
(174, '5', 'Logitech', 'Logitech_G102-_RGB_5', '/images/Logitech/mouse/LogitechG102RGB5.png', '/images2/Logitech/mouse/LogitechG102RGB5.png', '488', '挑選一種顏色、混合三種顏色、選擇有趣的動畫預先設定、或是建立您自己的效果。一切任您選擇！ 您甚至可以將滑鼠與其他羅技 G 系列 LIGHTSYNC 設備同步，使其成為完美搭配。將您的背光設定成「螢幕取樣器」，使其與您的螢幕同步。將您的滑鼠設定成會回應遊戲、影片等內容而變換色彩。  ◎七彩光學效果 ◎遊戲等級8000 DPI感應器 ◎通過遊戲測試的經典設計 ◎機械按鍵張力系統 ◎最高加速度30G', 432, NULL, 0, 1, 1, '2022-11-16'),
(175, '5', 'Logitech', 'Logitech_g502xb32', '/images/Logitech/mouse/Logitechg502xb32.png', '/images2/Logitech/mouse/Logitechg502xb32.png', '2290', 'Logitech G502 羅技優秀滑鼠', 533, NULL, 0, 1, 1, '2022-11-16'),
(176, '5', 'Logitech', 'Logitech_G403HERO_1', '/images/Logitech/mouse/LogitechG403HERO1.png', '/images2/Logitech/mouse/LogitechG403HERO1.png', '1490', '◎採用高效能HERO 16K 感應器 ◎最高DPI可達16000 ◎最高速度可達400+ IPS ◎人體工學外型設計 ◎1毫秒回報速率及先進的按鍵張力系統 ◎可自訂背光/按鈕和內建記憶體 ◎10公克可卸除砝碼', 601, NULL, 0, 1, 1, '2022-11-16'),
(177, '5', 'Logitech', 'Logitech_G402HYPERIONFURY_1', '/images/Logitech/mouse/LogitechG402HYPERIONFURY1.png', '/images2/Logitech/mouse/LogitechG402HYPERIONFURY1.png', '890', '4 個可讓您更完善控制遊戲的設定。可立即切換四個 DPI 設定。在迅速逃離之前 (4000 DPI) 狙擊地圖另一端的敵人 (250 DPI)。利用即時 DPI 切換，您可靈活對混亂的戰鬥做出精確的回應。  ◎Fusion Engine 複合感應器 ◎8個可自訂按鈕 ◎即時切換 DPI ◎32 位元 ARM 處理器 ◎1毫秒回報速率 ◎高速點擊 ◎全速USB ◎主按2000萬次點擊壽命', 381, NULL, 0, 1, 1, '2022-11-16'),
(178, '5', 'Logitech', 'Logitech_PROHERO_1', '/images/Logitech/mouse/LogitechPROHERO1.png', '/images2/Logitech/mouse/LogitechPROHERO1.png', '2290', '◎採用高效能HERO 16K感應器 ◎零濾波，精確反應玩家手部的移動 ◎彈簧按鍵張力系統提供優異的反應 ◎提供優異效能及約達5000萬次點擊壽命 ◎具備LIGHTSYNC RGB背光', 433, NULL, 0, 1, 1, '2022-11-16'),
(179, '5', 'Logitech', 'Logitech_M110_1', '/images/Logitech/mouse/LogitechM1101.png', '/images2/Logitech/mouse/LogitechM1101.png', '329', '享受靜謐體驗，輕鬆安裝隨插即用，左右手通用舒適設計', 355, NULL, 0, 1, 1, '2022-11-16'),
(180, '5', 'Logitech', 'Logitech_M90_1', '/images/Logitech/mouse/LogitechM901.png', '/images2/Logitech/mouse/LogitechM901.png', '199', '全尺寸左右手皆適用光學追蹤定位技術輕鬆安裝隨插即用一年有限保固 BSMI證號:T41126 有線設計，免除更換電池的過程 採用高解析度光學感應器 隨插即用有線滑鼠 400dpi解析度光學感應器', 386, NULL, 0, 1, 1, '2022-11-16'),
(181, '5', 'Logitech', 'Logitech_M100r_-_1', '/images/Logitech/mouse/LogitechM100r1.png', '/images2/Logitech/mouse/LogitechM100r1.png', '269', '•USB隨插即用，快速又容易 •有線設計，免除更換電池的過程 •雙手均適用的舒適設計 •1000 dpi高解析度光學追蹤技術', 412, NULL, 0, 1, 1, '2022-11-16'),
(182, '4', 'Logitech', 'Logitech_G512RGB_-_2', '/images/Logitech/keyboard/LogitechG512RGB2.png', '/images2/Logitech/keyboard/LogitechG512RGB2.png', '1988', '◎GX Clicky 敲擊感軸 (青軸) ◎附USB2.0 轉接埠 ◎1680萬色 LIGHTSYNC RGB 可自訂燈效 ◎航空等級鋁合金上蓋 ◎Logitech 羅技台灣地區販售鍵盤，皆為中文標示有注音倉頡版本', 383, NULL, 0, 1, 1, '2022-11-16'),
(183, '4', 'Logitech', 'Logitech_G813', '/images/Logitech/keyboard/LogitechG813.png', '/images2/Logitech/keyboard/LogitechG813.png', '3388', '所有鍵盤皆有注音標示，無單純英文鍵盤 GL 青軸 - 清晰的敲擊聲和觸感回饋 GL 觸感軸 - 柔和的碰觸感提供相當程度的觸感回饋 GL 線性軸 - 完全順暢的按鍵感受  ◎超纖薄的流暢設計美學 ◎低平外觀的機械軸 ◎鋁合金蓋板優質材料 ◎精密設計的無邊音量轉鈕 ◎1680萬色RGB背光', 432, NULL, 0, 1, 1, '2022-11-16'),
(184, '4', 'Logitech', 'Logitech_G413se', '/images/Logitech/keyboard/LogitechG413se.png', '/images2/Logitech/keyboard/LogitechG413se.png', '1588', '觸感機械軸 優異的鍵盤設計搭配最佳的簡潔性。此鍵盤具有遊戲等級觸感機械軸，讓您隨時都能發揮完美表現 PBT鍵帽 頂級耐熱耐磨鍵帽使用最耐用的材料之一製作 LED背光 白光LED背光增強了焦點和清晰度，便利的設計讓您更輕鬆地遊玩遊戲 鋁質頂殼 G413SE採用黑色拉絲鋁質骨架，具有最小的彎曲度和最佳的耐用性', 542, NULL, 0, 1, 1, '2022-11-16'),
(185, '4', 'Logitech', 'Logitech_G213PRODIGYRGB_1', '/images/Logitech/keyboard/LogitechG213PRODIGYRGB1.png', '/images2/Logitech/keyboard/LogitechG213PRODIGYRGB1.png', '1190', '◎所有鍵盤皆有注音標示，無單純英文鍵盤 ◎具備多鍵輸入功能的效能調整鍵 ◎1680萬色RGB背光 ◎防潑濺經久耐用 ◎一體式掌墊和調整型腳架 ◎專用媒體控制鍵 ◎可使用Logitech 羅技遊戲軟體進行自訂', 635, NULL, 0, 1, 1, '2022-11-16'),
(186, '4', 'Logitech', 'Logitech_G813W1', '/images/Logitech/keyboard/LogitechG813W1.png', '/images2/Logitech/keyboard/LogitechG813W1.png', '3380', '◎超纖薄的流暢設計美學 ◎低平外觀的機械軸 ◎鋁合金蓋板優質材料 ◎精密設計的無邊音量轉鈕 ◎1680萬色RGB背光', 363, NULL, 0, 1, 1, '2022-11-16'),
(187, '4', 'Logitech', 'Logitech_G610ORIONBLUE_1', '/images/Logitech/keyboard/LogitechG610ORIONBLUE1.png', '/images2/Logitech/keyboard/LogitechG610ORIONBLUE1.png', '2290', '採用可靠Cherry MX Blue機械青軸 具有清脆較強段落感的敲擊聲 可承受約5000萬次敲擊 可自訂白色背光效果 簡約舒適的全尺寸鍵盤設計 所有鍵盤皆有注音標示，無單純英文鍵盤  ◎Cherry MX 機械式青軸軸承 ◎可自訂白色背光系統 ◎ARX 控制整合 ◎人體工學鍵帽設計', 472, NULL, 0, 1, 1, '2022-11-16'),
(188, '4', 'Logitech', 'Logitech_Pro keyboard', '/images/Logitech/keyboard/LogitechProkeyboard.png', '/images2/Logitech/keyboard/LogitechProkeyboard.png', '3990', '專為職業選手量身打造 青軸V2 超便攜的精簡設計 約1680萬色RGB背光 銷售重點 所有鍵盤皆有注音標示，無單純英文鍵盤 無數字建台設計為滑鼠帶來更多移動空間。耐用、精簡的設計使其可輕鬆放入行李中，前往參加世界各地的賽事。', 330, NULL, 0, 1, 1, '2022-11-16'),
(189, '4', 'Logitech', 'Logitech_PROX_2', '/images/Logitech/keyboard/LogitechPROX2.png', '/images2/Logitech/keyboard/LogitechPROX2.png', '4690', '所有鍵盤皆有注音標示，無單純英文鍵盤 無數字建台設計為滑鼠帶來更多移動空間。 耐用、精簡的設計使其可輕鬆放入行李中，前往參加世界各地的賽事。  ◎專為職業選手量身打造 ◎可更換式機械鍵軸 ◎超便攜的精簡設計 ◎約1680萬色RGB背光 ◎BSMI證號：D41126', 415, NULL, 0, 1, 1, '2022-11-16'),
(190, '4', 'Logitech', 'Logitech_G413_-SILVER_1', '/images/Logitech/keyboard/LogitechG413SILVER1.png', '/images2/Logitech/keyboard/LogitechG413SILVER1.png', '2690', '所有鍵盤皆有注音標示，無單純英文鍵盤  ◎Romer-G 鍵軸 ◎LED白色背光 ◎鋁鎂合金頂蓋、懸浮按鍵設計 ◎腳架可調高度 ◎底部線材收納設計 ◎USB轉接插孔 ◎FN搭配多媒體熱鍵 ◎26Keys Rollover無衝突', 421, NULL, 0, 1, 1, '2022-11-16'),
(191, '4', 'Logitech', 'Logitech_G413_-CARBON_1', '/images/Logitech/keyboard/LogitechG413CARBON1.png', '/images2/Logitech/keyboard/LogitechG413CARBON1.png', '2490', '所有鍵盤皆有注音標示，無單純英文鍵盤  ◎Romer-G 鍵軸 ◎LED白色背光 ◎鋁鎂合金頂蓋、懸浮按鍵設計 ◎腳架可調高度 ◎底部線材收納設計 ◎USB轉接插孔 ◎FN搭配多媒體熱鍵 ◎26Keys Rollover無衝突', 344, NULL, 0, 1, 1, '2022-11-16'),
(192, '2', 'Logitech', 'Logitech_G633S7.1_LIGHTSYNC_1', '/images/Logitech/earPhone/LogitechG633S71LIGHTSYNC1.png', '/images2/Logitech/earPhone/LogitechG633S71LIGHTSYNC1.png', '2290', '◎DTS HEADPHONE:X 2.0環繞音效 ◎加大的PRO-G 50公釐單體 ◎1680萬色 LIGHTSYNC RGB ◎清晰的6公釐翻轉靜音麥克風 ◎多平台相容性', 404, NULL, 0, 1, 1, '2022-11-16'),
(193, '2', 'Logitech', 'Logitech_G4317.1_1', '/images/Logitech/earPhone/LogitechG431711.png', '/images2/Logitech/earPhone/LogitechG431711.png', '1990', '◎DTS HEADPHONE:X 2.0環繞音效 ◎加大的50mm驅動單體 ◎舒適優質的人造皮革耳墊 ◎清晰的6mm翻轉靜音麥克風', 535, NULL, 0, 1, 1, '2022-11-16'),
(194, '2', 'Logitech', 'Logitech_PROX_1', '/images/Logitech/earPhone/LogitechPROX1.png', '/images2/Logitech/earPhone/LogitechPROX1.png', '3990', 'DTS HEADPHONE:X 2.0環繞音效 先進的50公釐單體 BLUE VOICE先進麥克風技術 舒適記憶泡綿耳墊與製作工藝 優質USB外接音效卡 PRO-G 50 公釐單體 專業調校等化器 新一代的環繞音效', 648, NULL, 0, 1, 1, '2022-11-16'),
(195, '2', 'Logitech', 'Logitech League of Legends PRO X', '/images/Logitech/earPhone/LogitechLeagueofLegendsPROX.png', '/images2/Logitech/earPhone/LogitechLeagueofLegendsPROX.png', '3688', '◎DTS HEADPHONE:X 2.0環繞音效 ◎先進的50公釐單體 ◎BLUE VOICE先進麥克風技術 ◎舒適記憶泡綿耳墊與製作工藝 ◎優質USB外接音效卡', 413, NULL, 0, 1, 1, '2022-11-16'),
(196, '2', 'Logitech', 'Logitech_G733_RGB_4_7', '/images/Logitech/earPhone/LogitechG733RGB47.png', '/images2/Logitech/earPhone/LogitechG733RGB47.png', '3688', '雙層記憶泡綿可與您的頭部和面部輪廓保持柔順貼合。減少頭部壓力，並為長時間遊玩提供了持久的舒適感受。柔軟且可調整的懸掛頭帶可確保完美貼合  ◎LIGHTSPEED 無線傳輸技術 ◎輕盈舒適重量僅 278公克 ◎DTS HEADPHONE: X 2.0， 7.1聲道環繞 ◎BLUE VO!CE 麥克風技術', 420, NULL, 0, 1, 1, '2022-11-16'),
(197, '2', 'Logitech', 'Logitech_GPROXLIGHTSPEED_2', '/images/Logitech/earPhone/LogitechGPROXLIGHTSPEED2.png', '/images2/Logitech/earPhone/LogitechGPROXLIGHTSPEED2.png', '4988', 'LIGHTSPEED 無線技術BLUE VO!CE 麥克風技術DTS headphone: x 2.0 7.1聲道環繞PRO-G 50公釐單體 提供驚人清晰的聲音成像', 330, NULL, 0, 1, 1, '2022-11-16'),
(198, '2', 'Logitech', 'Logitech_GG435_3', '/images/Logitech/earPhone/LogitechGG4353.png', '/images2/Logitech/earPhone/LogitechGG4353.png', '2690', '遊玩遊戲、播放音樂、以及和朋友一起玩樂。G435 遊戲耳機麥克風可以透過遊戲等級的 LIGHTSPEED 無線技術與藍牙，連線到您的 PC、手機和其他裝置。其可提供強大、乾淨的聲音，而波束成形麥克風則能降低背景噪音。其也使用至少 22% 消費後回收塑膠製作。利用 G435，玩樂永不終止。', 401, NULL, 0, 1, 1, '2022-11-16'),
(199, '2', 'Logitech', 'Logitech_G7351', '/images/Logitech/earPhone/LogitechG7351.png', '/images2/Logitech/earPhone/LogitechG7351.png', '4888', 'Logitech G7351 羅技優秀耳機', 438, NULL, 0, 1, 1, '2022-11-16'),
(200, '2', 'Logitech', 'Logitech_High_Resolution', '/images/Logitech/earPhone/LogitechHighResolution.png', '/images2/Logitech/earPhone/LogitechHighResolution.png', '3990', 'Logitech High Resolution G535 羅技優秀耳機', 375, NULL, 0, 1, 1, '2022-11-16'),
(201, '2', 'Logitech', 'Logitech G933s RGB', '/images/Logitech/earPhone/LogitechG933sRGB.png', '/images2/Logitech/earPhone/LogitechG933sRGB.png', '5990', 'DTS Headphone:X 2.0環繞音效加大的PRO-G 50公釐單體約1680萬色 LIGHTSYNC RGB舒適的人造皮革耳墊多平台相容性', 438, NULL, 0, 1, 1, '2022-11-16'),
(202, '2', 'Logitech', 'Logitech ASTRO A10', '/images/Logitech/earPhone/LogitechASTROA10.png', '/images2/Logitech/earPhone/LogitechASTROA10.png', '1990', 'ASTRO A10 優秀的耳機', 564, NULL, 0, 1, 1, '2022-11-16'),
(203, '2', 'Logitech', 'Logitech_G335_5', '/images/Logitech/earPhone/LogitechG3355.png', '/images2/Logitech/earPhone/LogitechG3355.png', '2990', '兼容多平台相容性 ( PS5 / PC / Mac ) 長達15公尺的無線範圍 超過15小時的續航時間/長久舒配戴 使用ASTRO AUDIO V2 調較', 607, NULL, 0, 1, 1, '2022-11-16'),
(204, '2', 'Logitech', 'Logitech_A50MODKIT1', '/images/Logitech/earPhone/LogitechA50MODKIT1.png', '/images2/Logitech/earPhone/LogitechA50MODKIT1.png', '1290', '個性化自訂 人造皮革耳墊 人造皮革頭帶', 423, NULL, 0, 1, 1, '2022-11-16'),
(205, '1', 'Logitech', 'Logitech_BAG', '/images/Logitech/backpack/LogitechBAG.png', '/images2/Logitech/backpack/LogitechBAG.png', '1290', '電競多功能後背包 尺寸:長44,寬30,高6', 468, NULL, 0, 1, 1, '2022-11-16'),
(255, '1', 'Razer', '滑鼠測試', '/uploads/ASUS-ROG Gladius III Wireless AimPoint.png', '/uploads/ASUS-ROG Gladius III Wireless AimPoint.png', '652', '', 1258, NULL, 0, 1, 1, '2023-02-14'),
(256, '1', 'AsusRog', '背包測試', '/uploads/ASUSROGArcherBackpack17.png', '/uploads/ASUSROGBP4701.png', '954', '', 123, NULL, 0, 1, 1, '2023-02-15'),
(257, '1', 'AsusRog', '背包測試2', '/uploads/ASUSROGArcherBackpack17.png', '/uploads/ASUSROGBP4701.png', '985', '', 125, NULL, 0, 1, 1, '2023-02-15'),
(258, '1', 'AsusRog', 'test', './uploads/RazerBarracudaMercury.png', './uploads/RazerBarracudaPro.png', '1', '', 1, NULL, 0, 1, 1, '2023-02-15');

-- --------------------------------------------------------

--
-- 資料表結構 `product_status`
--

CREATE TABLE `product_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `product_status`
--

INSERT INTO `product_status` (`id`, `status`) VALUES
(1, '已上架'),
(2, '未上架'),
(3, '缺貨');

-- --------------------------------------------------------

--
-- 資料表結構 `receipt`
--

CREATE TABLE `receipt` (
  `id` int(250) UNSIGNED NOT NULL,
  `order_list_id` int(250) NOT NULL,
  `total` mediumtext NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `receipt`
--

INSERT INTO `receipt` (`id`, `order_list_id`, `total`, `created_at`) VALUES
(1, 1, '1438', '2022-11-07 09:24:08'),
(2, 2, '1598', '2022-11-07 09:24:08'),
(3, 3, '1146', '2022-11-07 09:24:08'),
(4, 4, '1469', '2022-11-07 09:24:08'),
(5, 5, '618', '2022-11-07 09:24:09'),
(6, 6, '4275', '2022-11-07 09:24:09'),
(7, 7, '45420', '2022-11-07 09:24:09'),
(8, 8, '38461', '2022-11-07 09:24:09'),
(9, 9, '5437', '2022-11-07 09:24:09'),
(10, 10, '1429', '2022-11-07 09:24:09');

-- --------------------------------------------------------

--
-- 資料表結構 `sellers`
--

CREATE TABLE `sellers` (
  `id` int(5) UNSIGNED NOT NULL,
  `sellers_number` int(5) NOT NULL,
  `company_name` varchar(20) NOT NULL,
  `tax_id` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `valid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `sellers`
--

INSERT INTO `sellers` (`id`, `sellers_number`, `company_name`, `tax_id`, `description`, `created_at`, `valid`) VALUES
(1, 6, 'allen company', '12345678', 'allen company', '2022-11-11 13:21:31', 1),
(2, 7, 'kobe company', '12345677', 'kobe company', '2022-11-11 13:25:41', 1),
(3, 17, '小七的賣場', '77777777', '小七的賣場', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `selling_product`
--

CREATE TABLE `selling_product` (
  `id` int(250) UNSIGNED NOT NULL,
  `sellers_id` int(5) NOT NULL,
  `product_id` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `selling_product`
--

INSERT INTO `selling_product` (`id`, `sellers_id`, `product_id`) VALUES
(1, 17, 1),
(2, 17, 2),
(3, 17, 3),
(4, 17, 4),
(5, 17, 5),
(6, 17, 6),
(7, 17, 7),
(8, 17, 8),
(9, 17, 9),
(10, 17, 10),
(11, 17, 11),
(12, 17, 12),
(13, 17, 13),
(14, 17, 14),
(15, 17, 15),
(16, 17, 16),
(17, 17, 17),
(18, 17, 18),
(19, 17, 19),
(20, 17, 20),
(21, 6, 21),
(22, 6, 22),
(23, 6, 23),
(24, 6, 24),
(25, 6, 25),
(26, 6, 26),
(27, 6, 27),
(28, 6, 28),
(29, 6, 29),
(30, 6, 30),
(31, 6, 31),
(32, 6, 32),
(33, 6, 33),
(34, 6, 34),
(35, 6, 35),
(36, 6, 36),
(37, 6, 37),
(38, 6, 38),
(39, 6, 39),
(40, 6, 40),
(41, 6, 41),
(42, 7, 42),
(43, 6, 43),
(44, 7, 44),
(45, 6, 45),
(46, 7, 46),
(47, 6, 47),
(48, 7, 48),
(49, 6, 49),
(50, 7, 50),
(51, 6, 51),
(52, 7, 52),
(53, 6, 53),
(54, 7, 54),
(55, 6, 55),
(56, 7, 56),
(57, 6, 57),
(58, 7, 58),
(59, 6, 59),
(60, 7, 60),
(61, 6, 61),
(62, 7, 62),
(63, 6, 63),
(64, 7, 64),
(65, 6, 65),
(66, 7, 66),
(67, 6, 67),
(68, 7, 68),
(69, 6, 69),
(70, 7, 70),
(71, 6, 71),
(72, 7, 72),
(73, 6, 73),
(74, 7, 74),
(75, 6, 75),
(76, 7, 76),
(77, 6, 77),
(78, 7, 78),
(79, 6, 79),
(80, 7, 80),
(81, 6, 81),
(82, 7, 82),
(83, 6, 83),
(84, 7, 84),
(85, 6, 85),
(86, 7, 86),
(87, 6, 87),
(88, 7, 88),
(89, 6, 89),
(90, 7, 90),
(91, 6, 91),
(92, 7, 92),
(93, 6, 93),
(94, 7, 94),
(95, 6, 95),
(96, 7, 96),
(97, 6, 97),
(98, 7, 98),
(99, 6, 99),
(100, 7, 100),
(101, 6, 101),
(102, 7, 102),
(103, 6, 103),
(104, 7, 104),
(105, 6, 105),
(106, 7, 106),
(107, 6, 107),
(108, 7, 108),
(109, 6, 109),
(110, 7, 110),
(111, 6, 111),
(112, 7, 112),
(113, 6, 113),
(114, 7, 114),
(115, 6, 115),
(116, 7, 116),
(117, 6, 117),
(118, 7, 118),
(119, 6, 119),
(120, 7, 120),
(121, 6, 121),
(122, 7, 122),
(123, 6, 123),
(124, 7, 124),
(125, 6, 125),
(126, 7, 126),
(127, 6, 127),
(128, 7, 128),
(129, 6, 129),
(130, 7, 130),
(131, 6, 131),
(132, 7, 132),
(133, 6, 133),
(134, 7, 134),
(135, 6, 135),
(136, 7, 136),
(137, 6, 137),
(138, 7, 138),
(139, 6, 139),
(140, 7, 140),
(141, 6, 141),
(142, 7, 142),
(143, 6, 143),
(144, 7, 144),
(145, 6, 145),
(146, 7, 146),
(147, 6, 147),
(148, 7, 148),
(149, 6, 149),
(150, 7, 150),
(151, 6, 151),
(152, 7, 152),
(153, 6, 153),
(154, 7, 154),
(155, 6, 155),
(156, 7, 156),
(157, 6, 157),
(158, 7, 158),
(159, 6, 159),
(160, 7, 160),
(161, 6, 161),
(162, 7, 162),
(163, 6, 163),
(164, 7, 164),
(165, 6, 165),
(166, 7, 166),
(167, 6, 167),
(168, 7, 168),
(169, 6, 169),
(170, 7, 170),
(171, 6, 171),
(172, 7, 172),
(173, 6, 173),
(174, 7, 174),
(175, 6, 175),
(176, 7, 176),
(177, 6, 177),
(178, 7, 178),
(179, 6, 179),
(180, 7, 180),
(181, 6, 181),
(182, 7, 182),
(183, 6, 183),
(184, 7, 184),
(185, 6, 185),
(186, 7, 186),
(187, 6, 187),
(188, 7, 188),
(189, 6, 189),
(190, 7, 190),
(191, 6, 191),
(192, 7, 192),
(193, 6, 193),
(194, 7, 194),
(195, 6, 195),
(196, 7, 196),
(197, 6, 197),
(198, 7, 198),
(199, 6, 199),
(200, 7, 200),
(201, 6, 201),
(202, 7, 202),
(203, 6, 203),
(204, 7, 204),
(205, 6, 205),
(206, 7, 206),
(207, 6, 207),
(208, 7, 208),
(209, 6, 209),
(210, 7, 210),
(211, 6, 211),
(212, 7, 212),
(213, 6, 213),
(214, 7, 214),
(215, 6, 215),
(216, 7, 216),
(217, 6, 217),
(218, 7, 218),
(219, 6, 219),
(220, 7, 220),
(221, 6, 221),
(222, 7, 222),
(223, 6, 223),
(224, 7, 224),
(225, 6, 225),
(226, 7, 226),
(227, 6, 227),
(228, 7, 228),
(229, 6, 229),
(230, 7, 230),
(231, 6, 231),
(232, 7, 232),
(233, 6, 233),
(234, 7, 234),
(235, 6, 235),
(236, 7, 236),
(237, 6, 237),
(238, 7, 238),
(239, 6, 239),
(240, 7, 240),
(241, 6, 241),
(242, 7, 242),
(243, 6, 243),
(244, 7, 244),
(245, 6, 245),
(246, 7, 246),
(247, 6, 247),
(248, 7, 248),
(249, 6, 249),
(250, 7, 250),
(251, 6, 0),
(252, 6, 0),
(253, 6, 0),
(254, 6, 366),
(255, 6, 367),
(256, 6, 368),
(257, 6, 369),
(258, 6, 370),
(259, 6, 371),
(260, 6, 251),
(261, 6, 252),
(262, 6, 253),
(263, 6, 254);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(60) NOT NULL,
  `address` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `follers` int(10) NOT NULL DEFAULT 0,
  `rate` float DEFAULT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT 0,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `facebook_id` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `address`, `phone`, `follers`, `rate`, `is_activated`, `valid`, `facebook_id`, `google_id`, `thumbnail`, `created_at`, `is_admin`) VALUES
(1, 'test21', '827ccb0eea8a706c4c34a16891f84e7b', 'test21@test.com', '桃園市八德區不知道路', '0909451521', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-08 09:42:12', 1),
(2, 'Baby', '827ccb0eea8a706c4c34a16891f84e7b', 'a123452@ispan5.com', '桃園市桃園區春日路2號', '0912345672', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-08 09:42:52', 1),
(3, 'Jack', '827ccb0eea8a706c4c34a16891f84e7b', 'a123453@ispan5.com', '桃園市桃園區春日路3號', '0912345673', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-08 09:44:17', 1),
(4, 'Mary', '827ccb0eea8a706c4c34a16891f84e7b', 'a123454@ispan5.com', '桃園市桃園區春日路4號', '0912345674', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-08 09:45:03', 1),
(5, 'Oreo', '827ccb0eea8a706c4c34a16891f84e7b', 'a123455@ispan5.com', '桃園市桃園區春日路5號', '0912345675', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-08 09:46:07', 1),
(6, 'allen', '827ccb0eea8a706c4c34a16891f84e7b', 'allen@ispan.com', '桃園市桃園區春日路6號', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-11 13:16:06', 1),
(7, 'kobe', '827ccb0eea8a706c4c34a16891f84e7b', 'kobe@ispan.com', '桃園市桃園區春日路7號', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-11 13:24:40', 1),
(8, 'betty', '827ccb0eea8a706c4c34a16891f84e7b', 'a12345@ispan.com', '桃園市八德區東勇街', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-16 11:14:21', 1),
(9, 'mandy', '827ccb0eea8a706c4c34a16891f84e7b', 'mandy@ispan.com', '桃園市八德區東勇街83號', '0945156784', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2022-11-16 11:17:47', 1),
(10, '小美', '$2b$10$MR5uuum2w9FoijpaEeF6ZuLAJbHWY36q/5dV.XPC30Y.lewscB.2a', 'test1@test.com', '桃園市桃園區不知道路', '09123456789', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(11, '小馬', '$2b$10$O6uwr70cx7KB9HoC3oBXwODB7LUV8N1RBSK5Xg0KDEEopjQ6ekvTS', 'test2@test.com', '桃園市桃園區不知道路', '09123456789', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(12, '小王', '$2b$10$43wrmo1a/qj1CYjQkc5lGuYd6kRVubXISxREKmH8WEZRgUJ5ViW.i', 'test3@test.com', '桃園市桃園區不知道路', '09123456789', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(13, '小芳', '$2b$10$lemmWY5Hx8y/8XlsdcPKCOpMcAYAQEsO15WkIAtqhsGGwguKfAXZu', 'test5@test.com', '桃園市桃園區不知道路', '09123456789', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(14, '小松', '$2b$10$l40Tqb00.NellUmtmocjqOaCFvZUC9NRIIkN/ADySgbgj2bLOcj0i', 'test6@test.com', '桃園市桃園區不知道路', '0909451567', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(15, '小賴', '$2b$10$n0.kehMv.X9iCuf9DQhkNOquGNNyICQjaFasqijCJ84I4JeqH1uhy', 'test7@test.com', '桃園市桃園區不知道路', '0909451566', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(16, '天天', '$2b$10$eUWDGH54pDWhJReoIywIUeqoN4V0KhFoWjKMI.7TPDwgHL10cWnkO', 'test8@test.com', '桃園市桃園區不知道路', '0913456789', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(17, '小七', '$2b$10$2wMtPy7FpTF865vahYpHPu6IDvYd5GirCNIIVxCD7uxBr9qYrkNV2', 'test9@test.com', '桃園市桃園區不知道路', '0909451544', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(18, '小可愛', '$2b$10$Vk61QIxa.VzlKwJCKp63buWqbtlzwfzS7SPoFjn7t3ZUFSawb7VKG', 'test11@test.com', '桃園市桃園區不知道路', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(19, '小孤獨', '$2b$10$izlViUFujNFj2BOl1iOCD.0YDz5EpW3Y7/y9Nz6BdVFfmD.ByMwyG', 'test12@test.com', '桃園市桃園區不知道路', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(20, 'test21', '$2b$10$DVXk3YSojR7sTlT0J17JaOu2LNkXBYwVnIzN1eCdyfujXLijqIPgu', 'test21@test.com', '桃園市八德區不知道路', '0909451521', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 13:54:13', 1),
(21, 'test23', '$2b$10$OkFolM/zubj1AEkKRRjYTO4OzF2GgoyjrW.xw1v87w4WJdZd4rO5u', 'test23@test.com', '桃園市桃園區不知道路', '0909451566', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-13 22:57:01', 1),
(22, 'test24', '$2b$10$PjOvQYJ3FJCcgKiNQw6eVeGg8VL.PkFIDea2845Uzq42VjcHXCequ', 'test24@test.com', '桃園市桃園區不知道路', '0909451566', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-14 11:12:36', 1),
(23, 'test25', '$2b$10$Nh.tIpQiw.cjonw8X8nEVuC7ZcvKeldApG.4beEhVq0TkcHAGIki2', 'test25@test.com', '桃園市桃園區', '0909121212', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-15 20:52:01', 0),
(24, 'test26', '$2b$10$Y8gDISy3Y6nSvDit6BmrzuDGDKY1wEJEwZViin3Q/g4uIY3BfrEGm', 'test26@test.com', '金山26街60號', '0989527116', 0, NULL, 0, 1, '', '', '', '2023-02-15 20:58:36', 0),
(25, 'test27', '$2b$10$FkunFRGbHNryg7cZ/UDE9OM/4BtTSNrIOz9kd/JlzUQtvSkmeMFOS', 'test27@test.com', '桃園市中壢區', '0912123456', 0, NULL, 0, 1, '', '', '', '2023-02-15 20:59:58', 0),
(26, 'test28', '$2b$10$cTcmVQnSRKpz/7etJCrcAuWwGmypDC4Co8T1sgR1aVDVuanXaJ8g.', 'test28@test.com', '桃園市桃園區', '0912345678', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-15 21:01:04', 0),
(27, 'test9', '$2b$10$J6c4laEGdcgkowvPWx/MtOaa6FTWR/r/PwE0r/KGRpQOEDLHunr5e', 'twse9@test.com', '桃園市桃園區', '0909456671', 0, NULL, 0, 1, '', '', '', '2023-02-15 21:43:16', 0),
(28, 'test31', '$2b$10$1ERBra8cys9Y4fBNa3Q/dOYK1p9fSavHt71w25w8OHwMeLrUMDPTe', 'test31@test.com', '桃園市桃園區', '0909345430', 0, NULL, 0, 1, '', '', '/uploads/profileImage.jpg', '2023-02-15 21:46:13', 0),
(29, 'test32', '$2b$10$G2Bj4hr.087Cvtrr59MOt.GW92V3WMUA19QDgRqXVAZCbwA9cqReW', 'test32@test.com', '桃園市桃園區', '0909121221', 0, NULL, 0, 1, '', '', '', '2023-02-15 21:49:22', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `user_coupon`
--

CREATE TABLE `user_coupon` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `coupon_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_coupon`
--

INSERT INTO `user_coupon` (`id`, `user_id`, `coupon_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 3, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `user_like`
--

CREATE TABLE `user_like` (
  `id` int(250) UNSIGNED NOT NULL,
  `user_id` int(5) NOT NULL,
  `product_id` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_like`
--

INSERT INTO `user_like` (`id`, `user_id`, `product_id`) VALUES
(2, 17, 2),
(20, 2, 20),
(21, 3, 21),
(22, 1, 22),
(23, 2, 23),
(24, 3, 24),
(25, 1, 25),
(26, 2, 26),
(27, 3, 27),
(28, 1, 28),
(29, 2, 29),
(30, 3, 30),
(31, 1, 31),
(32, 2, 32),
(33, 3, 33),
(34, 1, 34),
(35, 2, 35),
(36, 3, 36),
(37, 1, 37),
(38, 2, 38),
(39, 3, 39),
(40, 1, 40),
(41, 2, 41),
(42, 3, 42),
(43, 1, 43),
(44, 2, 44),
(45, 3, 45),
(46, 1, 46),
(47, 2, 47),
(48, 3, 48),
(49, 1, 49),
(50, 2, 50),
(51, 3, 51),
(52, 1, 52),
(53, 2, 53),
(54, 3, 54),
(55, 1, 55),
(56, 2, 56),
(57, 3, 57),
(58, 1, 58),
(59, 2, 59),
(60, 3, 60),
(61, 1, 61),
(62, 2, 62),
(63, 3, 63),
(64, 1, 64),
(65, 2, 65),
(66, 3, 66),
(67, 1, 67),
(68, 2, 68),
(69, 3, 69),
(70, 1, 70),
(71, 2, 71),
(72, 3, 72),
(73, 1, 73),
(74, 2, 74),
(75, 3, 75),
(76, 1, 76),
(77, 2, 77),
(78, 3, 78),
(79, 1, 79),
(80, 2, 80),
(81, 3, 81),
(82, 1, 82),
(83, 2, 83),
(84, 3, 84),
(85, 1, 85),
(86, 2, 86),
(87, 3, 87),
(88, 1, 88),
(89, 2, 89),
(90, 3, 90),
(91, 1, 91),
(92, 2, 92),
(93, 3, 93),
(94, 1, 94),
(95, 2, 95),
(96, 3, 96),
(97, 1, 97),
(98, 2, 98),
(99, 3, 99),
(100, 1, 100),
(101, 2, 101),
(102, 3, 102),
(103, 1, 103),
(104, 2, 104),
(105, 3, 105),
(106, 1, 106),
(107, 2, 107),
(108, 3, 108),
(109, 1, 109),
(110, 2, 110),
(111, 3, 111),
(112, 1, 112),
(113, 2, 113),
(114, 3, 114),
(115, 1, 115),
(116, 2, 116),
(117, 3, 117),
(118, 1, 118),
(119, 2, 119),
(120, 3, 120),
(121, 1, 121),
(122, 2, 122),
(123, 3, 123),
(124, 1, 124),
(125, 2, 125),
(126, 3, 126),
(127, 1, 127),
(128, 2, 128),
(129, 3, 129),
(130, 1, 130),
(131, 2, 131),
(132, 3, 132),
(133, 1, 133),
(134, 2, 134),
(135, 3, 135),
(136, 1, 136),
(137, 2, 137),
(138, 3, 138),
(139, 1, 139),
(140, 2, 140),
(141, 3, 141),
(142, 1, 142),
(143, 2, 143),
(144, 3, 144),
(145, 1, 145),
(146, 2, 146),
(147, 3, 147),
(148, 1, 148),
(149, 2, 149),
(150, 3, 150),
(151, 1, 151),
(152, 2, 152),
(153, 3, 153),
(154, 1, 154),
(155, 2, 155),
(156, 3, 156),
(157, 1, 157),
(158, 2, 158),
(159, 3, 159),
(160, 1, 160),
(161, 2, 161),
(162, 3, 162),
(163, 1, 163),
(164, 2, 164),
(165, 3, 165),
(166, 1, 166),
(167, 2, 167),
(168, 3, 168),
(169, 1, 169),
(170, 2, 170),
(171, 3, 171),
(172, 1, 172),
(173, 2, 173),
(174, 3, 174),
(175, 1, 175),
(176, 2, 176),
(177, 3, 177),
(178, 1, 178),
(179, 2, 179),
(180, 3, 180),
(181, 1, 181),
(182, 2, 182),
(183, 3, 183),
(184, 1, 184),
(185, 2, 185),
(186, 3, 186),
(187, 1, 187),
(188, 2, 188),
(189, 3, 189),
(190, 1, 190),
(191, 2, 191),
(192, 3, 192),
(193, 1, 193),
(194, 2, 194),
(195, 3, 195),
(196, 1, 196),
(197, 2, 197),
(198, 3, 198),
(199, 1, 199),
(200, 2, 200),
(201, 3, 201),
(202, 1, 202),
(203, 2, 203),
(204, 3, 204),
(205, 1, 205),
(206, 2, 206),
(207, 3, 207),
(208, 1, 208),
(209, 2, 209),
(210, 3, 210),
(211, 1, 211),
(212, 2, 212),
(213, 3, 213),
(214, 1, 214),
(215, 2, 215),
(216, 3, 216),
(217, 1, 217),
(218, 2, 218),
(219, 3, 219),
(220, 1, 220),
(221, 2, 221),
(222, 3, 222),
(223, 1, 223),
(224, 2, 224),
(225, 3, 225),
(226, 1, 226),
(227, 2, 227),
(228, 3, 228),
(229, 1, 229),
(230, 2, 230),
(231, 3, 231),
(232, 1, 232),
(233, 2, 233),
(234, 3, 234),
(235, 1, 235),
(236, 2, 236),
(237, 3, 237),
(238, 1, 238),
(239, 2, 239),
(240, 3, 240),
(241, 1, 241),
(242, 2, 242),
(243, 3, 243),
(244, 1, 244),
(245, 2, 245),
(246, 3, 246),
(247, 1, 247),
(248, 2, 248),
(249, 3, 249),
(250, 1, 250),
(251, 12, 1),
(252, 12, 2),
(253, 12, 3),
(254, 12, 4),
(255, 4, 1),
(256, 4, 2);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `delivery_status`
--
ALTER TABLE `delivery_status`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `delivery_way`
--
ALTER TABLE `delivery_way`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `follow_list`
--
ALTER TABLE `follow_list`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `order_list_detail`
--
ALTER TABLE `order_list_detail`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `order_list_status`
--
ALTER TABLE `order_list_status`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `payment_type`
--
ALTER TABLE `payment_type`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product_status`
--
ALTER TABLE `product_status`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `selling_product`
--
ALTER TABLE `selling_product`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_coupon`
--
ALTER TABLE `user_coupon`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_like`
--
ALTER TABLE `user_like`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `category`
--
ALTER TABLE `category`
  MODIFY `id` int(30) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `delivery_status`
--
ALTER TABLE `delivery_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `delivery_way`
--
ALTER TABLE `delivery_way`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `follow_list`
--
ALTER TABLE `follow_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int(200) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list_detail`
--
ALTER TABLE `order_list_detail`
  MODIFY `id` int(200) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list_status`
--
ALTER TABLE `order_list_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `payment_type`
--
ALTER TABLE `payment_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_list`
--
ALTER TABLE `product_list`
  MODIFY `id` int(250) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_status`
--
ALTER TABLE `product_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `receipt`
--
ALTER TABLE `receipt`
  MODIFY `id` int(250) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `selling_product`
--
ALTER TABLE `selling_product`
  MODIFY `id` int(250) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_coupon`
--
ALTER TABLE `user_coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_like`
--
ALTER TABLE `user_like`
  MODIFY `id` int(250) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
