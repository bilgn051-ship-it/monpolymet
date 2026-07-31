-- ========================================================
-- Monpolymet Group Website Complete MySQL Database Dump
-- Compatible with MySQL 5.7 / 8.0 & MariaDB (cPanel / phpMyAdmin)
-- ========================================================

SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS `monpolymet_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `monpolymet_db`;

-- --------------------------------------------------------
-- Table structure for `news`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title_mn` VARCHAR(500) NOT NULL,
  `title_en` VARCHAR(500) NOT NULL,
  `category_mn` VARCHAR(255) NOT NULL,
  `category_en` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `image_url` VARCHAR(1000) NOT NULL,
  `content_mn` TEXT NOT NULL,
  `content_en` TEXT NOT NULL,
  `views` INT DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample news data into `news`
INSERT INTO `news` (`id`, `title_mn`, `title_en`, `category_mn`, `category_en`, `date`, `image_url`, `content_mn`, `content_en`, `views`, `is_published`) VALUES
(1, 'Монполимет групп “Монцемент Билдинг Материалс” ххк ТОП 100 аж ахуйн нэгжээр шалгарлаа.', 'Monpolymet Group, \'Moncement Building Materials\' LLC was selected as a TOP 100 enterprise.', 'Амжилт', 'Awards', '2024-11-21', 'https://monpolymet.mn/wp-content/uploads/2024/11/467316563_1117016913764982_6953976156202560817_n-640x360.jpg', 'Монполимет Группийн хэмжээнд үйлдвэр бүтээн байгуулалтын салбарт үйл ажиллагаа явуулж эхэлсэн цагаас хойш 20 гаруй удаа Монгол Улсын “ТОП-100” аж ахуйн нэгж, шилдэг хариуцлагатай татвар төлөгчөөр шалгарсан билээ.', 'Monpolymet Group has been selected as one of the TOP 100 enterprises and best responsible taxpayers in Mongolia more than 20 times since it started operating in the industrial construction sector.', 154, 1),
(2, 'Гэр бүлд ээлтэй шилдэг ажил олгогч Монцемент Билдинг Материалс ХХК', 'MONCEMENT BUILDING MATERIALS LLC, THE BEST FAMILY-FRIENDLY EMPLOYER', 'Амжилт', 'Awards', '2023-05-29', 'https://monpolymet.mn/wp-content/uploads/2023/05/GWA-640x438.jpg', 'Үндэсний үйлдвэрлэгч #Монцемент_Билдинг_Материалс_ХХК “New Work Summit: Good Workplace Awards 2023” үйл ажиллагааны “Good workplace for Family support” буюу Гэр бүлд ээлтэй шилдэг ажил олгогчоор шалгарлаа.', 'Moncement Building Materials LLC, a major manufacturer was named the most family-friendly employer at the New York Summit: Good Workplace Awards 2023 activities.', 98, 1),
(3, '“Нэг мод – Нэг амь- 2023” аян', 'Campaign “One Tree – One Life 2023”', 'Тогтвортой хөгжил', 'CSR', '2023-05-29', 'https://monpolymet.mn/wp-content/uploads/2023/05/MicrosoftTeams-image-16-640x608.png', 'Монполимет Группээс жил бүр зохион байгуулдаг “Нэг мод – Нэг амь” уламжлалт аян эхэлж байна.', 'Monpolymet Group’s traditional campaign “One tree – One life” has begun.', 210, 1),
(4, 'Монгол Улсын 2022 оны “Топ-100” аж ахуйн нэгжийн нэг боллоо', 'MONPOLYMET GROUP HAS BECOME THE ONE OF THE TOP 100 BUSINESSES IN MONGOLIA.', 'Амжилт', 'Awards', '2023-05-29', 'https://monpolymet.mn/wp-content/uploads/2023/05/MicrosoftTeams-image-25-640x368.jpg', 'Үндэсний үйлдвэрлэгч Монполимет Групп Монгол Улсын 2022 оны “Топ-100” аж ахуйн нэгжийн нэг боллоо.', 'A national manufacturer Monpolymet Group has been named one of the Mongolia’s “TOP 100” companies for 2022.', 145, 1),
(5, 'Ойн цэвэрлэгээ хийв', 'FOREST CLEANING', 'Тогтвортой хөгжил', 'CSR', '2023-04-18', 'https://monpolymet.mn/wp-content/uploads/2023/04/339772062_23853979202440031_9152250015155330780_n.jpg', 'Тарьж, ургуулсан ойн төгөлүүддээ ойн цэвэрлэгээ хийлээ.', 'We have just carried out over all cleaning in our small forest areas.', 87, 1);

-- --------------------------------------------------------
-- Table structure for `tenders`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tenders`;
CREATE TABLE `tenders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(100) NOT NULL,
  `title_mn` VARCHAR(500) NOT NULL,
  `title_en` VARCHAR(500) NOT NULL,
  `category_mn` VARCHAR(255) NOT NULL,
  `category_en` VARCHAR(255) NOT NULL,
  `location_mn` VARCHAR(255) NOT NULL,
  `location_en` VARCHAR(255) NOT NULL,
  `description_mn` TEXT NOT NULL,
  `description_en` TEXT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `deadline_date` DATETIME NOT NULL,
  `is_closed` TINYINT(1) DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample tenders data
INSERT INTO `tenders` (`id`, `code`, `title_mn`, `title_en`, `category_mn`, `category_en`, `location_mn`, `location_en`, `description_mn`, `description_en`, `start_date`, `deadline_date`, `is_closed`) VALUES
(1, 'ТШ-2026/08', 'Тосон уурхайн хүнд машины шүүр, тос тосолгооны материал нийлүүлэх', 'Supply of heavy machinery filters & lubricants for Toson Mine', 'Уул Уурхай & Сэлбэг', 'Mining & Spare Parts', 'Төв аймаг, Заамар сум', 'Zaamar sum, Tuv province', '2026-2027 оны олборлолтын улирлын хэрэгцээнд зориулсан CAT, Komatsu тоног төхөөрөмжийн шүүр, гидравлик тосны нийлүүлэгчийг сонгон шалгаруулна.', 'Selecting suppliers for CAT & Komatsu machinery filters and hydraulic fluids.', '2026-07-01 09:00:00', '2026-08-25 18:00:00', 0),
(2, 'ТШ-2026/09', 'Монцемент үйлдвэрийн 2026 оны гипсэн чулуу (гөлтгөнө) нийлүүлэлт', 'Supply of gypsum raw materials for Moncement factory 2026', 'Үйлдвэрлэлийн Түүхий Эд', 'Factory Raw Materials', 'Дорноговь аймаг, Өргөн сум', 'Urgun sum, Dornogovi province', 'Жилд 100,000 тонн өндөр чанарын гөлтгөнө нийлүүлэх туршлагатай байгууллагуудыг сонгон шалгаруулалтад урьж байна.', 'Inviting experienced suppliers for annual supply of 100,000 tons high-grade gypsum.', '2026-07-15 09:00:00', '2026-08-30 18:00:00', 0),
(3, 'ТШ-2026/10', 'Вагон болон авто замын тээврийн бөөний логистикийн үйлчилгээ', 'Railway cargo & heavy auto transport logistics service', 'Тээвэр & Логистик', 'Transport & Logistics', 'Улаанбаатар - Дорноговь', 'Ulaanbaatar - Dornogovi', 'Бүтээгдэхүүн ба түүхий эдийн төмөр замын болон авто замын тээвэрлэлтийг гүйцэтгэх найдвартай логистикийн түнш сонгон шалгаруулна.', 'Selecting reliable logistics partners for bulk cargo transport.', '2026-07-20 09:00:00', '2026-09-15 18:00:00', 0),
(4, 'ТШ-2026/01', 'Улаанбаатар дахь оффисын компьютер, серверийн тоног төхөөрөмж нийлүүлэх', 'Supply of office computers & server hardware in Ulaanbaatar', 'Мэдээллийн Технологи', 'IT & Automation', 'Улаанбаатар хот', 'Ulaanbaatar city', 'Монполимет Группийн төв оффисын МТ системийн шинэчлэлтийн хүрээнд сервер болон суурин компьютер нийлүүлэх сонгон шалгаруулалт хаагдсан.', 'Tender for supplying servers and desktop computers has closed.', '2026-02-01 09:00:00', '2026-03-15 18:00:00', 1),
(5, 'ТШ-2026/02', 'Монцемент үйлдвэрийн лабораторийн урвалж болон шалгагч багаж хэрэгсэл', 'Supply of laboratory reagents and testing equipment for Moncement', 'Үйлдвэрлэлийн Түүхий Эд', 'Factory Materials', 'Дорноговь аймаг, Өргөн сум', 'Urgun sum, Dornogovi province', 'Цементийн чанарын хяналтын лабораторийн химийн урвалж нийлүүлэх сонгон шалгаруулалт хаагдсан.', 'Tender for supplying chemical reagents has closed.', '2026-03-01 09:00:00', '2026-04-10 18:00:00', 1),
(6, 'ТШ-2026/03', 'Заамар дахь салбарын ажилчдын ажлын хувцас, ХАБЭА хэрэгсэл нийлүүлэлт', 'Supply of workwear and PPE equipment for Zaamar branch employees', 'Хөдөлмөр Хамгаалал', 'Safety & PPE', 'Төв аймаг, Заамар сум', 'Zaamar sum, Tuv province', 'Уул уурхайн хээрийн нөхцөлд ажиллах 500 гаруй ажилтнуудын ажлын хувцас нийлүүлэх сонгон шалгаруулалт дууссан.', 'Tender for supplying safety workwear has completed.', '2026-03-15 09:00:00', '2026-05-01 18:00:00', 1);

-- --------------------------------------------------------
-- Table structure for `jobs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title_mn` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `category_mn` VARCHAR(255) NOT NULL,
  `category_en` VARCHAR(255) NOT NULL,
  `location_mn` VARCHAR(255) NOT NULL,
  `location_en` VARCHAR(255) NOT NULL,
  `type_mn` VARCHAR(100) NOT NULL,
  `type_en` VARCHAR(100) NOT NULL,
  `description_mn` TEXT NOT NULL,
  `description_en` TEXT NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample jobs data
INSERT INTO `jobs` (`id`, `title_mn`, `title_en`, `category_mn`, `category_en`, `location_mn`, `location_en`, `type_mn`, `type_en`, `description_mn`, `description_en`) VALUES
(1, 'Ерөнхий Инженер (Монцемент Үйлдвэр)', 'Chief Engineer (Moncement Plant)', 'Инженерчлэл', 'Engineering', 'Дорноговь, Өргөн сум', 'Dornogovi, Urgun', 'Бүтэн цагийн', 'Full-time', 'Цементийн үйлдвэрийн технологийн процессыг удирдах, тоног төхөөрөмжийн ашиглалт, засвар үйлчилгээг хариуцан ажиллах туршлагатай инженер урьж байна.', 'Managing cement plant tech processes and equipment maintenance.'),
(2, 'ХАБЭА-н Ахлах Мэргэжилтэн', 'Senior HSE Officer', 'ХАБЭА', 'HSE', 'Төв аймаг, Заамар сум', 'Tuv, Zaamar', 'Бүтэн цагийн', 'Full-time', 'Уул уурхайн талбай дахь хөдөлмөрийн аюулгүй байдал, эрүүл ахуй, байгаль орчны стандартын хэрэгжилтэд хяналт тавих.', 'Overseeing HSE compliance in mining field operations.'),
(3, 'Мэдээллийн Технологийн Администратор', 'IT System Administrator', 'Мэдээллийн Технологи', 'IT', 'Улаанбаатар хот', 'Ulaanbaatar', 'Бүтэн цагийн', 'Full-time', 'Компанийн сүлжээний дэд бүтэц, сервер, хэрэглэгчийн компьютерүүдийн хэвийн үйл ажиллагааг хангах.', 'Maintaining network infrastructure, servers and user IT support.');

-- --------------------------------------------------------
-- Table structure for `timeline`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `timeline`;
CREATE TABLE `timeline` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `year` VARCHAR(10) NOT NULL,
  `title_mn` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `description_mn` TEXT NOT NULL,
  `description_en` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample timeline data
INSERT INTO `timeline` (`id`, `year`, `title_mn`, `title_en`, `description_mn`, `description_en`, `sort_order`) VALUES
(1, '1992', 'Үүсгэн байгуулагдсан он', 'Established', 'Монполимет Групп уул уурхай, геодези, ашигт малтмалын хайгуулын чиглэлээр үйл ажиллагаагаа эхлүүлэв.', 'Monpolymet Group established operations in mining, geodesy and exploration.', 1),
(2, '2003', 'Нөхөн сэргээлтийн жишиг', 'Reclamation Model', 'Тосон уурхайд биологийн иж бүрэн нөхөн сэргээлт хийж, үндэсний жишиг компани болов.', 'Achieved comprehensive biological reclamation at Toson mine.', 2),
(3, '2015', 'Монцемент Үйлдвэр', 'Moncement Plant Launch', 'Европын Сэргээн Босголт Хөгжлийн Банктай (EBRD) хамтран хуурай аргын Монцемент үйлдвэрийг ашиглалтад орууллаа.', 'Launched Moncement dry-process plant in partnership with EBRD.', 3);

SET FOREIGN_KEY_CHECKS = 1;
