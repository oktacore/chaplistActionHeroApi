CREATE KEYSPACE Chaplist
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };
USE Chaplist;

CREATE TYPE Direccion (
  calle TEXT,
  numero TEXT,
  zona TEXT,
  ciudad TEXT,
  pais TEXT
);

CREATE TYPE Coordenada (
  longitud FLOAT,
  latitud FLOAT
);

CREATE TABLE Sucursales (
  id UUID,
  nombre TEXT,
  imagen TEXT,
  coordenadas FROZEN<Coordenada>,
  direccion FROZEN<Direccion>,
  telefono SET<TEXT>,
  PRIMARY KEY (id)
);

CREATE TABLE Usuario (
  bucket TEXT,
  id INT,
  nombre TEXT,
  fecha_registro TIMESTAMP,
  correo TEXT,
  imagen TEXT,
  PRIMARY KEY (bucket, id, fecha_registro)
);

CREATE TABLE Favoritos_por_usuario (
  id_usuario INT,
  upc TEXT,
  PRIMARY KEY (id_usuario)
);

CREATE TABLE Supermercado_por_pais (
  id_super UUID,
  nombre TEXT,
  descripcion TEXT,
  id_pais UUID,
  nombre_pais TEXT,
  imagen TEXT,
  PRIMARY KEY (nombre_pais, id_super)
);

CREATE TABLE Categoria (
  bucket TEXT,
  nombre TEXT,
  descripcion TEXT,
  PRIMARY KEY (bucket, nombre)
);

CREATE TABLE Oferta_por_id (
  bucket INT,
  id_oferta UUID,
  imagenes LIST<TEXT>,
  puntuacion FLOAT,
  fecha_inicio DATE,
  fecha_final DATE,
  precio_normal FLOAT,
  precio_oferta FLOAT,
  upcs SET<TEXT>,
  nombre TEXT,
  descuento FLOAT,
  categoria TEXT,
  sucursales SET<TEXT>,
  supermercado_id UUID,
  supermercado_nombre TEXT,
  PRIMARY KEY (bucket, id_oferta, puntuacion)
);

CREATE TABLE Comentario_oferta (
  id_oferta UUID,
  id_usuario INT,
  comentario TEXT,
  fecha TIMESTAMP,
  PRIMARY KEY (id_oferta, id_usuario, fecha)
);



CREATE TABLE Oferta_visita_por_usuario (
  id_usuario INT,
  id_oferta UUID,
  visitas COUNTER,
  PRIMARY KEY (id_oferta, id_usuario)
);

CREATE TABLE Oferta_visita_por_usuario_pais (
  id_oferta UUID,
  id_pais UUID,
  visitas COUNTER,
  PRIMARY KEY (id_oferta, id_pais)
);

CREATE TABLE Cantidad_calificaciones_por_oferta (
  bucket INT,
  id_oferta UUID,
  calificaciones COUNTER,
  PRIMARY KEY (bucket, id_oferta)
);



CREATE MATERIALIZED VIEW Ofertas_top
AS SELECT bucket, id_oferta, imagenes, puntuacion, precio_oferta, fecha_inicio, fecha_final, descuento, nombre, supermercado_nombre
FROM Oferta_por_id
WHERE bucket IS NOT NULL AND puntuacion IS NOT NULL AND fecha_final IS NOT NULL AND precio_oferta IS NOT NULL AND id_oferta IS NOT NULL
PRIMARY KEY (puntuacion, precio_oferta, bucket, id_oferta);

CREATE MATERIALIZED VIEW Ofertas_por_precio
AS SELECT bucket, id_oferta, imagenes, puntuacion, precio_oferta, fecha_inicio, fecha_final, nombre
FROM Oferta_por_id
WHERE bucket IS NOT NULL AND fecha_final IS NOT NULL AND precio_oferta IS NOT NULL AND id_oferta IS NOT NULL 
  AND precio_oferta IS NOT NULL AND puntuacion IS NOT NULL
PRIMARY KEY (precio_oferta, bucket, puntuacion, id_oferta)
;

CREATE MATERIALIZED VIEW Ofertas_por_descuento
AS SELECT bucket, id_oferta, imagenes, puntuacion, precio_oferta, fecha_inicio, fecha_final, nombre, descuento
FROM Oferta_por_id
WHERE bucket IS NOT NULL AND fecha_final IS NOT NULL AND id_oferta IS NOT NULL 
  AND descuento IS NOT NULL AND puntuacion IS NOT NULL
PRIMARY KEY (bucket, descuento, puntuacion, id_oferta)
;

CREATE MATERIALIZED VIEW Ofertas_por_supermercado
AS SELECT bucket, supermercado_nombre, id_oferta, imagenes, puntuacion, precio_oferta, fecha_inicio, fecha_final, nombre, descuento
FROM Oferta_por_id
WHERE bucket IS NOT NULL AND fecha_final IS NOT NULL AND supermercado_nombre IS NOT NULL AND id_oferta IS NOT NULL AND puntuacion IS NOT NULL
PRIMARY KEY (supermercado_nombre, id_oferta, bucket, puntuacion)
;

CREATE MATERIALIZED VIEW Ofertas_por_categoria
AS SELECT bucket, categoria, id_oferta, imagenes, puntuacion, precio_oferta, fecha_inicio, fecha_final, nombre, descuento
FROM Oferta_por_id
WHERE bucket IS NOT NULL AND fecha_final IS NOT NULL AND categoria IS NOT NULL AND id_oferta IS NOT NULL AND puntuacion IS NOT NULL
PRIMARY KEY (categoria, bucket, puntuacion, id_oferta)
;


CREATE TABLE Ofertas_por_producto (
  upc TEXT,
  id_oferta UUID,
  nombre TEXT,
  precio_oferta FLOAT,
  fecha_fin DATE,
  imagen TEXT,
  puntuacion FLOAT,
  descuento FLOAT,
  PRIMARY KEY (upc, id_oferta)
);


