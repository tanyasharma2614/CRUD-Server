CREATE DATABASE  IF NOT EXISTS `hw5` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hw5`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: hw5
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `People` (
  `CustomerID` int NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZipCode` varchar(10) DEFAULT NULL,
  `RegistrationDate` date DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People`
--

LOCK TABLES `People` WRITE;
/*!40000 ALTER TABLE `People` DISABLE KEYS */;
INSERT INTO `People` VALUES (1,'John','Doe','johndoe@email.com','555-123-4567','123 Main St','New York','NY','10001','2023-01-15'),(2,'Jane','Smith','janesmith@email.com','555-987-6543','456 Elm St','Los Angeles','CA','90001','2023-02-20'),(3,'Robert','Johnson','robertjohnson@email.com','555-555-5555','789 Oak St','Chicago','IL','60601','2023-03-25'),(4,'Mary','Brown','marybrown@email.com','555-111-2222','101 Pine St','Houston','TX','77001','2023-04-10'),(5,'Michael','Wilson','michaelwilson@email.com','555-222-3333','567 Cedar St','Phoenix','AZ','85001','2023-05-05'),(6,'Elizabeth','Anderson','elizabeth@email.com','555-444-7777','222 Birch St','Philadelphia','PA','19019','2023-06-30'),(7,'William','Jones','william@email.com','555-333-6666','333 Maple St','San Antonio','TX','78201','2023-07-15'),(8,'Jennifer','White','jennifer@email.com','555-444-8888','444 Willow St','San Diego','CA','92101','2023-08-20'),(9,'David','Hall','david@email.com','555-999-0000','555 Redwood St','Dallas','TX','75201','2023-09-25'),(10,'Linda','Lee','linda@email.com','555-777-9999','666 Sequoia St','San Francisco','CA','94101','2023-10-10'),(11,'Richard','Martinez','richard@email.com','555-222-4444','777 Sycamore St','Boston','MA','02101','2023-11-05'),(12,'Patricia','Garcia','patricia@email.com','555-555-7777','888 Cedar St','Denver','CO','80201','2023-12-30'),(13,'Thomas','Harris','thomas@email.com','555-333-5555','999 Elm St','Seattle','WA','98101','2024-01-15'),(14,'Susan','Taylor','susan@email.com','555-777-8888','111 Pine St','Miami','FL','33101','2024-02-20'),(15,'Matthew','Clark','matthew@email.com','555-666-3333','222 Oak St','Atlanta','GA','30301','2024-03-25'),(16,'Karen','Walker','karen@email.com','555-888-7777','333 Maple St','New Orleans','LA','70101','2024-04-10'),(17,'Daniel','Moore','daniel@email.com','555-333-2222','444 Birch St','Las Vegas','NV','89101','2024-05-05'),(18,'Nancy','Green','nancy@email.com','555-111-7777','555 Redwood St','Orlando','FL','32801','2024-06-30'),(19,'Mark','Young','mark@email.com','555-555-3333','666 Cedar St','Portland','OR','97201','2024-07-15'),(20,'Karen','Rivera','karenr@email.com','555-222-7777','777 Willow St','San Jose','CA','95101','2024-08-20'),(21,'Charles','Lewis','charles@email.com','555-888-5555','888 Sequoia St','Minneapolis','MN','55401','2024-09-25'),(22,'Carol','Wright','carol@email.com','555-666-9999','999 Sycamore St','Nashville','TN','37201','2024-10-10'),(23,'Joseph','Young','joseph@email.com','555-111-4444','111 Redwood St','Raleigh','NC','27601','2024-11-05'),(24,'Megan','Parker','megan@email.com','555-333-7777','222 Cedar St','Salt Lake City','UT','84101','2024-12-30'),(25,'Kevin','Scott','kevin@email.com','555-555-8888','333 Pine St','Detroit','MI','48201','2025-01-15'),(26,'Tanya','ABC','ABC@example.com','123-456-7890','123 Main Street','Sample City','Sample State','12345','2023-10-12');
/*!40000 ALTER TABLE `People` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 16:22:24
CREATE DATABASE  IF NOT EXISTS `hw5_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hw5_test`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: hw5_test
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `People` (
  `CustomerID` int NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZipCode` varchar(10) DEFAULT NULL,
  `RegistrationDate` date DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People`
--

LOCK TABLES `People` WRITE;
/*!40000 ALTER TABLE `People` DISABLE KEYS */;
/*!40000 ALTER TABLE `People` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `People_Test`
--

DROP TABLE IF EXISTS `People_Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `People_Test` (
  `CustomerID` int NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZipCode` varchar(10) DEFAULT NULL,
  `RegistrationDate` date DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People_Test`
--

LOCK TABLES `People_Test` WRITE;
/*!40000 ALTER TABLE `People_Test` DISABLE KEYS */;
/*!40000 ALTER TABLE `People_Test` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 16:22:24
