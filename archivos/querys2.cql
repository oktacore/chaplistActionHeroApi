CREATE MATERIALIZED VIEW excelsior.p1_by_num5 AS
    SELECT numero1, id, nombre
    FROM excelsior.p1_by_num4
    WHERE id IS NOT NULL AND numero1 IS NOT NULL
    PRIMARY KEY (numero1, id, nombre);

508b764d-e9bb-4637-8945-be74212b2049
00000000-0000-0000-0000-000000000000
ffffffff-ffff-ffff-ffff-ffffffffffff

CREATE TABLE Supermercado_por_pais (
  id_super UUID,
  nombre TEXT,
  descricion TEXT,
  id_pais UUID,
  nombre_pais TEXT,
  imagen TEXT,
  PRIMARY KEY (nombre_pais, id_super)
);

INSERT INTO Supermercado_por_pais (id_super, nombre, descripcion, id_pais, nombre_pais, imagen)
VALUES (UUID(), 'super1', 'larga descripcion del super1', UUID(), 'guatemala', '/imagenes/super1');

SELECT * FROM supermercado_por_pais WHERE nombre_pais = 'guatemala' AND id_super > 00000000-0000-0000-0000-000000000000 limit 5;

select count(*) from Ofertas_por_precio
where token(bucket) > 1 and fecha_final <= 20 allow filtering
(fecha_final, precio_oferta) <= ('3015-08-30', 20)
  and (fecha_final, precio_oferta) >= ('2015-08-30', -1)
allow filtering;
select * from Oferta_por_id where bucket=1 and puntuacion >= 0 and fecha_final >= '2016-08-30' and id_oferta=babd4083-1037-4b4b-8f65-94c75dbb635f;


SELECT * FROM numberOfRequests
    WHERE cluster = 'cluster1'
    AND date = '2015-06-05'
    AND datacenter = 'US_WEST_COAST'
    AND (hour, minute) >= (12, 0) AND (hour, minute) <= (14, 0);

ALTER KEYSPACE chaplist WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };


select count(*) from oferta_por_id;
select count(*) from ofertas_por_producto;
select count(*) from ofertas_por_precio;
select count(*) from ofertas_por_descuento;


-----------------------------------------------------------------------------

select * from Ofertas_por_producto where upc='pg5f16.png' and fecha_fin > '2016-09-30';

select * from Ofertas_por_precio2 where precio_oferta <= 20;
select * from Ofertas_por_precio where precio_oferta <= 100 and precio_oferta >= 20 allow filtering


copy sucursales(nombre, telefono, direccion, coordenadas, imagen, id) from '/home/entrada2.csv' with header = true and delimiter='|';

SELECT * FROM supermercado_por_pais WHERE nombre_pais = 'Guatemala' AND id_super > ? limit 10


INSERT INTO supermercado_por_pais(id_super, nombre, nombre_pais, imagen) VALUES(uuid(), 'Econosuper', 'Guatemala', 'portadaEconosuper');
INSERT INTO supermercado_por_pais(id_super, nombre, nombre_pais, imagen) VALUES(uuid(), 'La Torre', 'Guatemala', 'portadaLaTorre');
INSERT INTO supermercado_por_pais(id_super, nombre, nombre_pais, imagen) VALUES(uuid(), 'Paiz', 'Guatemala', 'portadaPaiz');
INSERT INTO supermercado_por_pais(id_super, nombre, nombre_pais, imagen) VALUES(uuid(), 'Maxi Despensa', 'Guatemala', 'portadaDespensa');
INSERT INTO supermercado_por_pais(id_super, nombre, nombre_pais, imagen) VALUES(uuid(), 'La Barata', 'Guatemala', 'portadaLaBarata');
