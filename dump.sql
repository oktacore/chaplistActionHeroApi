-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: testActionHero
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Apps`
--

DROP TABLE IF EXISTS `Apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Apps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `appSecret` varchar(255) NOT NULL,
  `packageName` varchar(255) NOT NULL,
  `hashKey` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Apps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Apps`
--

LOCK TABLES `Apps` WRITE;
/*!40000 ALTER TABLE `Apps` DISABLE KEYS */;
INSERT INTO `Apps` VALUES (1,2,'MyApp2','43e4686acfcb8ce8cff1b9e1761b40b859a1d2fb4a8e88a6348e673f7d44928b','com.ionic.framework','alkskksk123421','2016-01-19 02:24:48','2016-01-19 02:24:48'),(5,1,'ChaplistAndroid_v4','c145ebee745b95eaaaa13fbc2c700b0b9615dfe59e825c75abe84aaa41a4979b','com.ionic.framework.com','aEJLAk123klasl=','2016-01-21 03:49:18','2016-01-22 00:26:16'),(12,1,'myapp2','591d64a22490194dd3a5a6f4e46eb2204ecae079d9f02682a49d63d0052175f5','com.com2','kasjkljl2222','2016-01-21 23:04:44','2016-01-22 00:20:48'),(13,1,'myapp3','1d494603ca8faeadb4f504d2439a96abe2a49ac7f0864b742111fd5c4b6535b3','com.android.app','aksjdlaksj12313','2016-01-22 01:08:25','2016-01-22 01:08:25'),(14,1,'myapp4','0689f993652af3f0e315d53f41d9a5f0c4dceea25ed28da79b3f34fb020d440a','com.android.2','lkajs1314','2016-01-22 01:09:05','2016-01-22 01:09:05'),(15,1,'myapp5','e648471668132a71917c7677b56c5a8f0e8a436b65a0c77e788a5a536bc5afd3','com.5','lkjak123','2016-01-22 01:25:37','2016-01-22 01:25:37'),(16,1,'myapp5','e648471668132a71917c7677b56c5a8f0e8a436b65a0c77e788a5a536bc5afd3','com.aklj','akdjlkj','2016-01-22 01:27:10','2016-01-22 01:27:10'),(17,1,'myapp7','1c227260e3e4bff0c4897f0c84ac1cda49c3c43849b34664de84e37f13395af5','com.7','alksdj1234','2016-01-22 01:30:10','2016-01-22 01:30:10'),(20,1,'myapp10','982f1e2776dc46ac843fe82797f49299d5e6f7245de4aef578b693e1e6774fae','com 10','lkajk1j3kj','2016-01-22 01:33:40','2016-01-22 01:33:40'),(21,1,'myappR','89a6b1b42d209f68904bfb1270f9be5774cc783951a61319168d4b467d9711a4','myappR','kajslj1234','2016-01-22 01:34:19','2016-01-22 01:34:19');
/*!40000 ALTER TABLE `Apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Offers`
--

DROP TABLE IF EXISTS `Offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supermarketId` int(11) NOT NULL,
  `dateInit` date NOT NULL,
  `dateEnd` date NOT NULL,
  `current` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supermarketId` (`supermarketId`),
  CONSTRAINT `Offers_ibfk_1` FOREIGN KEY (`supermarketId`) REFERENCES `Supermarkets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Offers`
--

LOCK TABLES `Offers` WRITE;
/*!40000 ALTER TABLE `Offers` DISABLE KEYS */;
INSERT INTO `Offers` VALUES (1,1,'2016-01-17','2016-02-01',1,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upc` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upc` (`upc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'7401029700613','BOLSAMIGA BOLSA NEGRA 10 UND. EXTRA GDE. P/BASURA','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'7441008159544','HUGGIES PAÑAL ACTIVE SEC 38 UND. T-XXG DISNEY','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'7441008159537','HUGGIES PAÑAL ACTIVE SEC 42 UND. T-XG DISNEY','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'7441008159520','HUGGIES PAÑAL ACTIVE SEC 46 UND. T-G DISNEY','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20160115120041-create-my-user.js'),('20160115120710-create-app.js'),('20160118123730-create-user.js'),('20160118182411-create-app.js'),('20160127170200-create-supermarket.js'),('20160127170405-create-product.js'),('20160127170904-create-offer.js'),('20160127171537-create-store.js'),('20160127194024-create-product-store.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stores`
--

DROP TABLE IF EXISTS `Stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supermarketId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supermarketId` (`supermarketId`),
  CONSTRAINT `Stores_ibfk_1` FOREIGN KEY (`supermarketId`) REFERENCES `Supermarkets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO `Stores` VALUES (1,1,'Econo Arriola','8 vanida 5-37, zona 1','2231','99.121212','-122.121212','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,'Econo Nimajuyu','16 avenida 0-30,Zona 21','2247','99.121212','-122.121212','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Supermarkets`
--

DROP TABLE IF EXISTS `Supermarkets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Supermarkets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supermarkets`
--

LOCK TABLES `Supermarkets` WRITE;
/*!40000 ALTER TABLE `Supermarkets` DISABLE KEYS */;
INSERT INTO `Supermarkets` VALUES (1,'ECONOSUPER','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'LA TORRE','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'PAIZ','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'MAXI DESPENSA','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Supermarkets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'118316860309856710705','TAmy','Vivas','tamy.vivas@gmail.com','https://lh5.googleusercontent.com/-SnGuBQR3Dt0/AAAAAAAAAAI/AAAAAAAAAJU/AvN_fwx96hw/photo.jpg?sz=50','2016-01-18 23:21:43','2016-01-18 23:21:43'),(2,'116587645230689950229','','','201212589@ingenieria.usac.edu.gt','https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50','2016-01-18 23:29:07','2016-01-18 23:29:07');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productStores`
--

DROP TABLE IF EXISTS `productStores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productStores` (
  `productId` int(11) NOT NULL,
  `offerId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `normalPrice` float NOT NULL,
  `offerPrice` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`offerId`,`storeId`),
  KEY `offerId` (`offerId`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `productStores_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`),
  CONSTRAINT `productStores_ibfk_2` FOREIGN KEY (`offerId`) REFERENCES `Offers` (`id`),
  CONSTRAINT `productStores_ibfk_3` FOREIGN KEY (`storeId`) REFERENCES `Stores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productStores`
--

LOCK TABLES `productStores` WRITE;
/*!40000 ALTER TABLE `productStores` DISABLE KEYS */;
INSERT INTO `productStores` VALUES (1,1,1,12.4,23.2,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,1,12.4,23.2,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,1,12.4,23.2,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,1,12.4,23.2,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `productStores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-28 10:45:50
