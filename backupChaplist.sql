-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: testActionHero
-- ------------------------------------------------------
-- Server version	5.5.46-0+deb8u1

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Apps`
--

LOCK TABLES `Apps` WRITE;
/*!40000 ALTER TABLE `Apps` DISABLE KEYS */;
INSERT INTO `Apps` VALUES (1,2,'MyApp2','43e4686acfcb8ce8cff1b9e1761b40b859a1d2fb4a8e88a6348e673f7d44928b','com.ionic.framework','alkskksk123421','2016-01-19 02:24:48','2016-01-19 02:24:48'),(13,1,'myapp3','1d494603ca8faeadb4f504d2439a96abe2a49ac7f0864b742111fd5c4b6535b3','com.android.app','aksjdlaksj12313','2016-01-22 01:08:25','2016-01-22 01:08:25'),(22,1,'ChaplistApp','b3445460e0b140be4e1105eb8836b16fdcf88f0daa03ac231d14635515a49bbd','com.ionicframework.betasocial427641','askldjflkh1331234','2016-02-04 17:48:20','2016-02-04 17:48:20');
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
INSERT INTO `SequelizeMeta` VALUES ('20160115120041-create-my-user.js'),('20160115120710-create-app.js'),('20160118123730-create-user.js'),('20160118182411-create-app.js'),('20160127170200-create-supermarket.js'),('20160127170405-create-product.js'),('20160127170904-create-offer.js'),('20160127171537-create-store.js'),('20160127194024-create-product-store.js'),('20160204103909-imagenSupermarket.js'),('20160204104324-imagenSupermarket.js');
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO `Stores` VALUES (1,1,'Econo Arriola','8 vanida 5-37, zona 1','2232-4051 / 2232-4052 / 2232-4053','14.64311919','-90.51148673','2016-02-04 04:26:29','2016-02-04 04:26:29'),(2,1,'Econo Lo de Fuentes','Calle principal Lo de Fuentes 11-50, hacia colinia 1o. De Mayo, Zona 11 Mixco','2483-9210 / 2483-9191','14.67208708','-90.54430999','2016-02-04 04:26:29','2016-02-04 04:26:29'),(3,1,'Econo Nimajuyu','16 avenida 0-30,Zona 21','2485-0275 / 2485-0276','14.55560785','-90.54779677','2016-02-04 04:26:29','2016-02-04 04:26:29'),(4,1,'Econo San Juan','Calzada San Juan 9-86, Zona 7','2277-3162 / 2471-7095','14.62103526','-90.54501768','2016-02-04 04:26:29','2016-02-04 04:26:29'),(5,1,'Econo Zona 2','6 avenida 2-31, Zona 2','2279-1121 / 2285-0086','14.64989455','-90.51297045','2016-02-04 04:26:29','2016-02-04 04:26:29'),(6,1,'Econo Brigada','Av. La Brigada 10-30, zona 7 Mixco','2384-0258','14.65180585','-90.59022541','2016-02-04 04:26:29','2016-02-04 04:26:29'),(7,1,'Econo Boulevard Sur','6 ave Boulevard Sur 22-55 Sector C1 zona 8 de Mixco Residenciales San Cristóbal','2443-7079 / 2443-7077','14.59383291','-90.57934894','2016-02-04 04:26:29','2016-02-04 04:26:29'),(8,1,'Econo zona 6','Blvd Marista 4 calle Lt8-19, El Sausalito III, Zona 6 Chinautla','2277-6051 / 2286-5045','14.68218501','-90.48403615','2016-02-04 04:26:29','2016-02-04 04:26:29'),(9,1,'Econo Zona 11','Calzada Aguilar Batres 28-48, zona 11','2470-3312 / 2476-0723','14.59651551','-90.55573348','2016-02-04 04:26:29','2016-02-04 04:26:29'),(10,2,'Torre Boca ','1 avenida 2-51, Zona 1 Villa Canales','6679-9037 / 2448-9491/2267-4243','14.5512774','-90.52561969','2016-02-04 04:26:29','2016-02-04 04:26:29'),(11,2,'Torre Express','Km. 13.5 Carretera al Salvador Santa Catarina Pinula','6679-3245 / 6685-2013','14.56416472','-90.46665523','2016-02-04 04:26:29','2016-02-04 04:26:29'),(12,2,'Torre Mariscal','Diagonal 17 24-40, zona 11 Mariscal','2384-0342','14.60223358','-90.5583135','2016-02-04 04:26:29','2016-02-04 04:26:29'),(13,2,'Torre Palmeras','1 avenida y 1 calle, Zona 2 Escuintla','7879-3246 / 7879-3247','14.30820808','-90.78846055','2016-02-04 04:26:29','2016-02-04 04:26:29'),(14,2,'Torre Retalhuleu','5 avenida y 5 calle A Zona 1 Edificio Moran Retalhuleu','7779-9042 / 7771-4258','14.53698149','-91.67895423','2016-02-04 04:26:29','2016-02-04 04:26:29'),(15,2,'Torre San José Pinula','1 avenida 1-01 zona 4, San José Pinula','6634-8795','14.54631357','-90.41601263','2016-02-04 04:26:29','2016-02-04 04:26:29'),(16,2,'Torre San Lucas','Kilometro 29.8 lote 5 y lote 6 Lotificacion Planes de San Lucas, San Lucas Sacatepequez','7830-1208 / 7830-1564','14.60889166','-90.66503239','2016-02-04 04:26:29','2016-02-04 04:26:29'),(17,2,'Torre Tiquisate','Calzada Principal 1-01 zona 4 municipio de Tiquisate departamento de Escuintla ','7884-5125','14.28983602','-91.36723466','2016-02-04 04:26:29','2016-02-04 04:26:29'),(18,2,'Torre Trinidad','1 calle y 5 avenida A C. Comercila La Trinidad Retalhuleu','7779-9043 / 7771-7110','14.53318177','-91.68203022','2016-02-04 04:26:29','2016-02-04 04:26:29'),(19,2,'Torre Villa Nueva','Calzaca Concepcion 5 calle, Zona 6 Villa Nueva','6685-6341 / 6685-6340','14.53230933','-90.58463433','2016-02-04 04:26:29','2016-02-04 04:26:29'),(20,2,'Torre Zona 10','Calle Real de Villa 14-14, zona 10','2385-5294 / 2333-5339\n23798616 / 23798615','14.59495455','-90.5055926','2016-02-04 04:26:29','2016-02-04 04:26:29'),(21,2,'Torre Zona 11','Calzada Aguilar Batres 34-48, Zona 11','2485-2091 / 2470-3328','14.59078911','-90.5606068','2016-02-04 04:26:29','2016-02-04 04:26:29'),(22,2,'Torre Zona 12','45 calle 19-40, Zona 12 Centro Comercial Gran Portal Petapa','2460-3217 / 2470-3330','14.57005844','-90.54890883','2016-02-04 04:26:29','2016-02-04 04:26:29'),(23,2,'Torre Zona 14','Avenida Las Americas 6-69, zona 14','2379-8622 / 2379-8623','14.58913143','-90.51916203','2016-02-04 04:26:29','2016-02-04 04:26:29'),(24,2,'Torre Zona 15','2 calle 18-30, Vista Hermosa II, Zona 15',' 2385-7146','14.59350171','-90.49449878','2016-02-04 04:26:29','2016-02-04 04:26:29'),(25,2,'Torre Zona 19','Calzada San Juan 1-83 Centro Comercial Plaza Florida','2485-3020 / 2485-3023','14.6501114','-90.58331415','2016-02-04 04:26:29','2016-02-04 04:26:29'),(26,2,'Torre Zona 2','Avenida Simeon Cañas 3-59, zona 2','2279-1162 / 2285-0118','14.65107398','-90.51330372','2016-02-04 04:26:29','2016-02-04 04:26:29'),(27,2,'Torre Xela','9 calle Av. Xela Las Americas 0-20, zona 9 ','7766-9288','14.84759167','-91.53905278','2016-02-04 04:26:29','2016-02-04 04:26:29'),(28,2,'Torre Villa Hermosa','23 calle 20-24, zona 7 Villa Hermosa I, San Miguel Petapa','22695207/66288440','14.52545','-90.5532','2016-02-04 04:26:29','2016-02-04 04:26:29'),(29,2,'Torre El Encinal','Calle los pinos 18-65, zona 7 Camino al Encinal Mixco','2269-4968/2384-1250/2269-1265','14.64295556','-90.61019167','2016-02-04 04:26:29','2016-02-04 04:26:29'),(30,2,'Torre Chiquimula','6ta. Avenida 5-10 zona 1, Chiquimula, Chiquimula','2269-2856 / 7942-0633','14.79841944','-89.54718333','2016-02-04 04:26:29','2016-02-04 04:26:29'),(31,2,'Torre Amatitlán','7 calle 11-85 Barrio el Hospital, Amatitlán','2269-2881','14.48268889','-90.62658611','2016-02-04 04:26:29','2016-02-04 04:26:29'),(32,2,'Torre San Rafael','14 calle \"A\" y 38 avenida zona 18 C.C. El manantial Local 23 1er. Nivel','2269-2855','14.65776944','-90.45423611','2016-02-04 04:26:29','2016-02-04 04:26:29'),(33,2,'Torre San Miguel Petapa ','Calle Real 8-00 zona 10, Colonia Santa Teresita, San Miguel Petapa','6631-6780','14.50147778','-90.55953056','2016-02-04 04:26:29','2016-02-04 04:26:29'),(34,2,'Torre Puerto San Jose ','km. 105 Barrio La Arenera Centro Comercial Plaza Manantial, Local 6, Puerto San Jose Escuintla','2267-0302/7882-9386','13.92773611','-90.81555278','2016-02-04 04:26:29','2016-02-04 04:26:29'),(35,2,'Torre San Cristobal','Lt 7 Mz A S B-6. Col. San Cristobal Zona 8 Mixco','6679-9036 / 2485-4417','14.59387222','-90.57942222','2016-02-04 04:26:29','2016-02-04 04:26:29'),(36,2,'Torre Metrocentro','0 calle 16-20, Zona 4 Villa Nueva, Local 209','6679-3322 / 6679-3323','14.51365278','-90.57721111','2016-02-04 04:26:29','2016-02-04 04:26:29'),(37,2,'Torre Centro','6 calle 4-27, Zona 1','2230-3918 / 2285-0012','14.64276111','-90.514975','2016-02-04 04:26:29','2016-02-04 04:26:29'),(38,2,'Torre La Quinta','Calzada San Juan 13-90, Zona 7','2485-7646 / 2474-1707','14.62567778','-90.55101111','2016-02-04 04:26:29','2016-02-04 04:26:29'),(39,2,'Torre  Reforma','Av. La Reforma 16-00, Zona 9','2379-8626 / 27','14.5957','-90.51806389','2016-02-04 04:26:29','2016-02-04 04:26:29'),(40,2,'Torre Zona 5','12 calle B 36-24, Zona 5 Novicentro Jardines de la Asuncion','2336-0813 / 2336-0821','14.632275','-90.49508333','2016-02-04 04:26:29','2016-02-04 04:26:29'),(41,2,'Torre Malacatan','5 calle 5-5, Z 2. local 27 canton Morazan, Malacatan San Marcos','2267-2484','14.90848056','-92.06673889','2016-02-04 04:26:29','2016-02-04 04:26:29'),(42,2,'Torre Fraijanes','Km. 19.5 Carretera Fraijanes C.C. Fraijanes','6685-3462 /2269-3288','14.52373889','-90.46689722','2016-02-04 04:26:29','2016-02-04 04:26:29'),(43,2,'Torre Amatitlán II','Km. 29.6 Carretera C.A-9  C.C. Flores del Lago.','2267-2797','14.47193611','-90.63961111','2016-02-04 04:26:29','2016-02-04 04:26:29'),(44,2,'Torre Peten','1 CALLE  6AV. ZONA 1 STA. ELENA FLORES PETEN','2267-2798','16.9230699','-89.89166294','2016-02-04 04:26:29','2016-02-04 04:26:29'),(45,2,'Torre Mazatenango','1ra Avenida 4-00 Colonia Obregon zona 2, Mazatengo, Shuchitepequez','22672966 / 78726738/6277','14.53660556','-91.50745556','2016-02-04 04:26:29','2016-02-04 04:26:29'),(46,2,'Torre Centra Sur','2a. Avenida 51 calle zona 12 colonia Villa Lobos I, Villa Nueva','2477-1443','14.56143889','-90.56278056','2016-02-04 04:26:29','2016-02-04 04:26:29'),(47,2,'Torre Zona 16','24 calle 14-00 zona 16 (Blvd. Hospital Militar) C.C. Paseo Plaza San Fernando.','2278-0062','14.62463333','-90.46887222','2016-02-04 04:26:29','2016-02-04 04:26:29'),(48,2,'Torre San Francisco','Blvd El Caminero 15 calle, zona 6 Mixco','2485-2861 / 2433-4902','14.70181667','-91.85104722','2016-02-04 04:26:29','2016-02-04 04:26:29'),(49,2,'Torre Coatepeque ','6ta. Calle 12-124 zona 1 lote La Felicidad Centro Comercial La Trinidad, Ancla 1 municipio de Coatepeque',' 77443424/26 ','14.66806389','-90.58593056','2016-02-04 04:26:29','2016-02-04 04:26:29'),(50,2,'Torre Centra Norte ','Carretera CA-9 Norte (Ruta al Atlántico), 40-26, zona 17','2267-5341','14.64756667','-90.45134167','2016-02-04 04:26:29','2016-02-04 04:26:29'),(51,2,'Torre Jalapa','1ra calle 1-03 zona 1 Jalapa, Jalapa','2267-5495','14.63333333','-89.98553611','2016-02-04 04:26:29','2016-02-04 04:26:29'),(52,2,'Torre Muxbal','Km. 13.5 Antigua Carretera a El Salvador, finca Los Tilos lote 20 zona 4 C.C. Minuto Muxbal local La Torre Santa Catarina Pinula','2267-5678 / 66466983 / 66466982','14.559825','-90.47227222','2016-02-04 04:26:29','2016-02-04 04:26:29'),(53,2,'Torre Teculutan','Km. 122 carretera al Atlantico. C.C. Pacific Teculutan ancla 1 Teculutan, Zacapa','2267-5688','14.99072222','-89.72435556','2016-02-04 04:26:29','2016-02-04 04:26:29'),(54,2,'Torre Plaza Arrazola ','2da. Ave. 1-128 zona 1, aldea Don Justo Km. 16.5 Lo de Dieguez C.C. Plaza Arrazola Fraijanes, Guatemala','2267-5689','14.51784722','-90.43701667','2016-02-04 04:26:29','2016-02-04 04:26:29'),(55,2,'Torre Jutiapa','5 calle 1-36 zona 1 Jutiapa Jutiapa','2267-5721','14.28864167','-89.89323611','2016-02-04 04:26:29','2016-02-04 04:26:29'),(56,2,'Torre Metronorte ','KILOMETRO 5 CARRETERA AL ATLANTICO ZONA 17 CENTRO COMERCIAL METRONORTE LOCAL 2-2, GUATEMALA, GUATEMALA','2267-5750','14.64704722','-90.47772222','2016-02-04 04:26:29','2016-02-04 04:26:29'),(57,2,'Torre San Cristobal II','Boulevard San Cristóbal 3 Calle 6-72 Sector A3 Zona 8, Centro Comercial Sankris Local 103, Mixco Guatemala','2267-5159','14.61166389','-90.598375','2016-02-04 04:26:29','2016-02-04 04:26:29'),(58,2,'Torre Cayala ','Boulevard Rafael Landívar 10-05 Centro Comercial Paseo Cayala.  Edificio A-1 zona 16','2267-5195 / 2267-5889','14.60845278','-90.48811944','2016-02-04 04:26:29','2016-02-04 04:26:29'),(59,2,'Torre Villa Canales','Kilómetro 22.5 carretera a San  Jose El Trablón, Centro Comercial Paseo Villa Canales, , Ancla # 1','2459-5503','14.47875','-90.53418611','2016-02-04 04:26:29','2016-02-04 04:26:29'),(60,2,'Torre El Frutal','BOULEVARD EL FRUTAL 14-00 ZONA 5, CENTRO COMERCIAL COMPLEJO COMERCIAL EL FRUTAL, LOCAL 30, VILLA NUEVA, GUATEMALA','2459-3896 / 6640-4635 / 6640-4996','14.52133333','-90.56449444','2016-02-04 04:26:29','2016-02-04 04:26:29'),(61,2,'Torre Xela II','7ma Avenida 0-61 zona 2 Quetzaltenango ','2459-0040          ','14.83473333','-91.512675','2016-02-04 04:26:29','2016-02-04 04:26:29'),(62,2,'Torre Madero','Km 21.7 zona 3 carretera a El Salvador ','2267-2766 / 6627-0580 y 6627-0541','14.5038','-90.48090278','2016-02-04 04:26:29','2016-02-04 04:26:29'),(63,2,'Torre Jalapa II','Centro Comercial San Francisco 1ª calle y 2da avenida “A” zona 2 Jalapa','2267-5398','14.63332534','-89.98555832','2016-02-04 04:26:29','2016-02-04 04:26:29'),(64,2,'Torre San Marcos ','9 Calle 6-01 Zona 1, San Marcos, Guatemala','7760-9751 / 7767-9094/2450-1535','14.90848056','-92.06673889','2016-02-04 04:26:29','2016-02-04 04:26:29'),(65,2,'Torre San José Pinula II','Km 17.4 local # 10 Centro Comercial Plaza Pínula carretera a San José Pínula','6679-3296 / 6679-3297 / 6670-2748','14.54645896','-90.41262768','2016-02-04 04:26:29','2016-02-04 04:26:29'),(66,2,'Torre Naranjo Mall','23 calle 10-00 zona 4 de Mixco, Condado El Naranjo Centro Comercial Naranjo Mall ','2278-1232 / 2278-1233 / 2212-7432 ','14.66176375','-90.5578132','2016-02-04 04:26:29','2016-02-04 04:26:29'),(67,2,'Torre Escuintla II','2da avenida 8-27 zona 1 Escuintla Centro Comercial Minuto Escuintla','7979-3130 / 7744-1314','13.9316206','-90.71735545','2016-02-04 04:26:29','2016-02-04 04:26:29');
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
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supermarkets`
--

LOCK TABLES `Supermarkets` WRITE;
/*!40000 ALTER TABLE `Supermarkets` DISABLE KEYS */;
INSERT INTO `Supermarkets` VALUES (1,'ECONOSUPER','0000-00-00 00:00:00','0000-00-00 00:00:00','http://res.cloudinary.com/dtzhkqqms/image/upload/v1454541840/econo_pmeaso.jpg'),(2,'LA TORRE','0000-00-00 00:00:00','0000-00-00 00:00:00','http://res.cloudinary.com/dtzhkqqms/image/upload/v1454540994/torre_md6heb.png'),(3,'PAIZ','0000-00-00 00:00:00','0000-00-00 00:00:00','http://res.cloudinary.com/dtzhkqqms/image/upload/v1454541678/paiz_wyvmld.png'),(4,'MAXI DESPENSA','0000-00-00 00:00:00','0000-00-00 00:00:00','http://res.cloudinary.com/dtzhkqqms/image/upload/v1454542018/maxi_styw3c.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'118316860309856710705','TAmy','Vivas','tamy.vivas@gmail.com','https://lh5.googleusercontent.com/-SnGuBQR3Dt0/AAAAAAAAAAI/AAAAAAAAAJU/AvN_fwx96hw/photo.jpg?sz=50','2016-01-18 23:21:43','2016-01-18 23:21:43'),(2,'116587645230689950229','','','201212589@ingenieria.usac.edu.gt','https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50','2016-01-18 23:29:07','2016-01-18 23:29:07'),(3,'110220430752610809704','keneth','keua','k3n3th@gmail.com','https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50','2016-01-30 02:27:13','2016-01-30 02:27:13'),(4,'103899806757295147224','Juan','Perez','viurus@gmail.com','https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50','2016-01-30 17:55:01','2016-01-30 17:55:01');
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

-- Dump completed on 2016-02-04 14:53:28
