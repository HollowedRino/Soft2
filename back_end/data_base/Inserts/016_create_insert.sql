-- CREATES
CREATE TABLE distrito (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre_distrito VARCHAR(20) NOT NULL
);

CREATE TABLE metodo_pago (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre_metodo_pago VARCHAR(40) NOT NULL
);

CREATE TABLE cupon (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  codigo VARCHAR(20),
  descripcion VARCHAR(20),
  descuento REAL
);

CREATE TABLE repartidor (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  numero INTEGER NOT NULL
);


CREATE TABLE medicamento (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  fabricante VARCHAR(50) NOT NULL,
  precio REAL NOT NULL,
  requiere_receta BOOLEAN NOT NULL,
  estado_medicamento BOOLEAN NOT NULL,
  imagen_url TEXT
);

CREATE TABLE usuario (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100),
  telefono_usuario INTEGER,
  estado VARCHAR(20) NOT NULL
);

CREATE TABLE direccion_usuario (
  id INTEGER PRIMARY KEY NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  alias VARCHAR(30),
  usuario_id INTEGER,
  distrito_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (distrito_id) REFERENCES distrito(id)
);

CREATE TABLE botica (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  direccion VARCHAR(40) NOT NULL,
  telefono_botica INTEGER,
  horario_apertura VARCHAR(10) NOT NULL,
  horario_cierre VARCHAR(10) NOT NULL,
  distrito_id INTEGER,
  FOREIGN KEY (distrito_id) REFERENCES distrito(id)
);

CREATE TABLE inventario_botica (
  id INTEGER PRIMARY KEY NOT NULL,
  cantidad_disponible INTEGER,
  fecha_actualizacion DATE NOT NULL,
  botica_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (botica_id) REFERENCES botica(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id),
  UNIQUE(botica_id, medicamento_id)
);

CREATE TABLE pedido (
  id INTEGER PRIMARY KEY NOT NULL,
  fecha_pedido DATE NOT NULL,
  estado_pedido VARCHAR(100) NOT NULL,
  usuario_id INTEGER,
  botica_id INTEGER,
  metodo_pago_id INTEGER,
  direccion_usuario_id INTEGER,
  repartidor_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (botica_id) REFERENCES botica(id),
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id),
  FOREIGN KEY (direccion_usuario_id) REFERENCES direccion_usuario(id),
  FOREIGN KEY (repartidor_id) REFERENCES repartidor(id)
);

CREATE TABLE detalle_pedido (
  id INTEGER PRIMARY KEY NOT NULL,
  cantidad INTEGER,
  precio_unitario REAL NOT NULL,
  subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,  
  pedido_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (pedido_id) REFERENCES pedido(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id)
);

CREATE TABLE pago (
  id INTEGER PRIMARY KEY NOT NULL,
  monto_total REAL,
  fecha_pago DATE NOT NULL,
  estado_pago VARCHAR(100) NOT NULL,
  usuario_id INTEGER,
  detalle_pedido_id INTEGER,
  metodo_pago_id INTEGER,
  cupon_id INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (detalle_pedido_id) REFERENCES detalle_pedido(id),
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id),
  FOREIGN KEY (cupon_id) REFERENCES cupon(id)
);


CREATE TABLE carrito (
  id INTEGER PRIMARY KEY NOT NULL,
  usuario_id INTEGER,
  fecha_actualizacion TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE item_carrito (
  id INTEGER PRIMARY KEY NOT NULL,
  carrito_id INTEGER,
  medicamento_id INTEGER,
  cantidad INTEGER NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carrito(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id)
);




-- INSERTS
-- Distritos de Lima
INSERT INTO distrito(id, nombre_distrito) VALUES (1, 'Ancón');
INSERT INTO distrito(id, nombre_distrito) VALUES (2, 'Puente Piedra');
INSERT INTO distrito(id, nombre_distrito) VALUES (3, 'Santa Rosa');
INSERT INTO distrito(id, nombre_distrito) VALUES (4, 'Carabayllo');
INSERT INTO distrito(id, nombre_distrito) VALUES (5, 'Comas');
INSERT INTO distrito(id, nombre_distrito) VALUES (6, 'Los Olivos');
INSERT INTO distrito(id, nombre_distrito) VALUES (7, 'Independencia');
INSERT INTO distrito(id, nombre_distrito) VALUES (8, 'San Martín de Porres');
INSERT INTO distrito(id, nombre_distrito) VALUES (9, 'San Juan de Lurigancho');
INSERT INTO distrito(id, nombre_distrito) VALUES (10, 'Santa Anita');
INSERT INTO distrito(id, nombre_distrito) VALUES (11, 'Cieneguilla');
INSERT INTO distrito(id, nombre_distrito) VALUES (12, 'Ate Vitarte');
INSERT INTO distrito(id, nombre_distrito) VALUES (13, 'La Molina');
INSERT INTO distrito(id, nombre_distrito) VALUES (14, 'Chaclacayo');
INSERT INTO distrito(id, nombre_distrito) VALUES (15, 'Lurigancho');
INSERT INTO distrito(id, nombre_distrito) VALUES (16, 'El Agustino');
INSERT INTO distrito(id, nombre_distrito) VALUES (17, 'San Juan de Miraflores');
INSERT INTO distrito(id, nombre_distrito) VALUES (18, 'Villa María del Triunfo');
INSERT INTO distrito(id, nombre_distrito) VALUES (19, 'Villa El Salvador');
INSERT INTO distrito(id, nombre_distrito) VALUES (20, 'Lurín');
INSERT INTO distrito(id, nombre_distrito) VALUES (21, 'Pachacámac');
INSERT INTO distrito(id, nombre_distrito) VALUES (22, 'Punta Hermosa');
INSERT INTO distrito(id, nombre_distrito) VALUES (23, 'Pucusana');
INSERT INTO distrito(id, nombre_distrito) VALUES (24, 'Punta Negra');
INSERT INTO distrito(id, nombre_distrito) VALUES (25, 'San Bartolo');
INSERT INTO distrito(id, nombre_distrito) VALUES (26, 'Santa María');
INSERT INTO distrito(id, nombre_distrito) VALUES (27, 'Provincia');


-- Metodos de pago
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (1, 'Efectivo');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (2, 'Tarjeta de crédito');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (3, 'Tarjeta de débito');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (4, 'Transferencia bancaria');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (5, 'Yape');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (6, 'Plin');
INSERT INTO metodo_pago(id, nombre_metodo_pago) VALUES (7, 'Pago contra entrega');

-- Cupon
INSERT INTO cupon (id, codigo, descripcion, descuento) VALUES (1, null, null, 0.0);
INSERT INTO cupon (id, codigo, descripcion, descuento) VALUES (2,'DESC10', '10% de descuento', 0.1);
INSERT INTO cupon (id, codigo, descripcion, descuento) VALUES (3,'DESC20', '20% de descuento', 0.2);
INSERT INTO cupon (id, codigo, descripcion, descuento) VALUES (4,'DESC5', '5% de descuento', 0.05);
INSERT INTO cupon (id, codigo, descripcion, descuento) VALUES (5,'DESC50', '50% de descuento', 0.5);

-- Repartidor
INSERT INTO repartidor (id, nombre, numero) VALUES (1, 'Carlos Pérez', 987654321);
INSERT INTO repartidor (id, nombre, numero) VALUES (2, 'Lucía Gómez', 912345678);
INSERT INTO repartidor (id, nombre, numero) VALUES (3, 'Juan Torres', 998877665);
INSERT INTO repartidor (id, nombre, numero) VALUES (4, 'Ana Martínez', 934567890);
INSERT INTO repartidor (id, nombre, numero) VALUES (5, 'Pedro Sánchez', 945612378);


-- Medicamentos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (1, 'Panadol Antigripal NF Tableta', 'SOBRE X2 TABS 1 UN', 'medications', 'GSK', 2.88, 0, 1, 'https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'medications','Bayer', 5.00, 0, 1,'https://ortopedicosfuturoco.vtexassets.com/arquivos/ids/159985-800-auto?v=638153043617170000&width=800&height=auto&aspect=true');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'medications','Pfizer', 8.75, 1, 1,'https://bysprodstorage.blob.core.windows.net/images/61583.png');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (4, 'Loratadina', 'Antihistamínico para alergias', 'medications', 'Sanofi', 4.20, 0, 1,'https://laboratoriosbest.com/wp-content/uploads/2021/12/Loratadina10mg250tab@05x.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (5, 'Losartán', 'Antihipertensivo', 'medications', 'Sanofi', 10.00, 1, 1,'https://www.lasanteca.com/userfiles/2018/12/LOSART%C2%B5N-POT%C2%B5SICO-50MG-CAJA-POR-30-TABLETAS-CON-BLISTER.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (6, 'Omeprazol', 'Inhibidor de la bomba de protones', 'medications', 'AstraZeneca', 3.90, 0, 1,'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158088/01984_1.jpg?v=638428792795700000');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (7, 'Diazepam', 'Ansiolítico y relajante muscular', 'medications', 'Roche', 9.00, 1, 1,'https://acdn-us.mitiendanube.com/stores/003/511/797/products/diazepam-901-5c5068c16545e49ec916909340901832-480-0.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (8, 'Metformina', 'Control de la glucosa en diabetes tipo 2', 'medications', 'Merck', 6.30, 1, 1,'https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/00201903-600x600.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (9, 'Simvastatina', 'Reduce el colesterol en sangre', 'medications', 'Novartis', 7.45, 1, 1,'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/157368/00842_1.jpg?v=638417283440230000');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (10, 'Aspirina', 'Analgésico y anticoagulante', 'medications', 'Bayer', 2.50, 0, 1,'https://s1.elespanol.com/2018/06/08/ciencia/salud/farmacologia-farmacologia_clinica-salud_313481328_81018057_1706x1280.jpg');
-- Medicamentos Naturales
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (11, 'Valeriana', 'Sedante natural para la ansiedad y el insomnio', 'natural-medicines', 'Nature’s Way', 5.80, 0, 1, 'https://saludvida.com.pe/cdn/shop/products/suplmgrandescopia_9e9973c2-2238-4c64-a658-b7efed0008c0.jpg?v=1663607588');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (12, 'Echinacea', 'Refuerza el sistema inmunológico', 'natural-medicines', 'Natural Vitality', 6.50, 0, 1, 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nwy/nwy12408/v/61.jpg');
-- Adulto mayor
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (13, 'Calcio + Vitamina D3', 'Fortalecimiento óseo para adultos mayores', 'older-adult', 'Centrum', 9.20, 0, 1, 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mav/mav13021/v/8.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (14, 'Memorax', 'Mejora la memoria y concentración en personas mayores', 'older-adult', 'LabFarma', 11.50, 0, 1, 'https://m.media-amazon.com/images/I/51JLVtybD6L._AC_SX569_.jpg');
-- Infantil
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (15, 'Paracetamol Infantil', 'Jarabe para la fiebre y el dolor en niños', 'childish', 'Pfizer', 3.80, 0, 1, 'https://boticasperu.pe/media/catalog/product/cache/eebfcecb9382e8d5ccf71e8b2c8cbd30/p/a/panadol_nin-_os_jarabe_productdetail_455x455.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (16, 'Multivitamínico Infantil', 'Suplemento con vitaminas esenciales para niños', 'childish', 'Pediavit', 4.60, 0, 1, 'https://realplaza.vtexassets.com/arquivos/ids/35368674-800-auto?v=638496632466970000&width=800&height=auto&aspect=true');
-- Belleza
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (17, 'Colágeno Hidrolizado', 'Mejora la elasticidad de la piel y uñas', 'beauty', 'HydroSkin', 12.00, 0, 1, 'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/160028-800-auto?v=638591218785230000&width=800&height=auto&aspect=true');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (18, 'Biotina 10,000 mcg', 'Estimula el crecimiento del cabello y uñas', 'beauty', 'Natrol', 8.75, 0, 1, 'https://www.farmaexpress.com.pe/cdn/shop/products/Biotin-10000_1024x1024.png?v=1660345077');
-- Vitaminas y Suplementos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (19, 'Vitamina C 1000 mg', 'Antioxidante y fortalecimiento inmunológico', 'vitamins', 'Sundown', 6.20, 0, 1, 'https://boticasperu.pe/media/catalog/product/cache/eebfcecb9382e8d5ccf71e8b2c8cbd30/_/0/_03639.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (20, 'Omega 3 EPA/DHA', 'Apoyo cardiovascular y cerebral', 'vitamins', 'Nordic Naturals', 10.90, 0, 1, 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/sol/sol02058/l/116.jpg');




-- Usuarios
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (1, 'Laura', 'Martínez', 'laura.martinez@email.com', 'contrasena123', 987654321, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (2, 'Carlos', 'Ramírez', 'carlos.ramirez@email.com', 'passw0rd456', 912345678, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (3, 'María', 'Gómez', 'maria.gomez@email.com', 'maria_secure!', 934567890, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (4, 'José', 'Fernández', 'jose.fernandez@email.com', 'jf_secure_2024', 956789012, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (5, 'Ana', 'Torres', 'ana.torres@email.com', 'ana_pass789', 923456789, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (6, 'Luis', 'Díaz', 'luis.diaz@email.com', 'ldiaz2024*', 901234567, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (7, 'Sofía', 'López', 'sofia.lopez@email.com', 'sofiaLopez$', 965432189, 'admin');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (8, 'Javier', 'Morales', 'javier.morales@email.com', 'javi123!', 976543210, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (9, 'Camila', 'Castillo', 'camila.castillo@email.com', 'castilloCami2024', 954321098, 'cliente');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (10, 'Diego', 'Rojas', 'diego.rojas@email.com', 'rojDiego#', 943210987, 'admin');

-- Direccion de los usuarios
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (1, 'Av. Siempre Viva 742', 'Casa', 1, 1);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (2, 'Calle Falsa 123', 'Trabajo', 1, 2);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (3, 'Jr. Las Gardenias 456', 'Casa', 2, 3);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (4, 'Av. Los Álamos 789', 'Oficina', 2, 1);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (5, 'Calle Los Cedros 321', 'Departamento', 3, 4);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (6, 'Pasaje El Sol 654', 'Casa', 3, 2);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (7, 'Av. Los Héroes 100', 'Trabajo', 4, 5);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (8, 'Jr. Los Incas 230', 'Casa', 4, 3);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (9, 'Av. Las Palmeras 888', 'Oficina', 5, 4);
INSERT INTO direccion_usuario(id, direccion, alias, usuario_id, distrito_id)
VALUES (10, 'Calle San Martín 999', 'Casa', 5, 5);

-- Botica
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (1, 'BTL', 'Av. Universitaria 123', 989898989, '08:00', '22:00', 3);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (2, 'Hogar y Salud', 'Av. Arequipa 456', 987654321, '09:00', '21:00', 5);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (3, 'Botica Peru', 'Calle Comercio 789', 984321789, '07:30', '20:30', 3);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (4, 'Boticas y Salud', 'Av. Lima 321', 981123456, '07:30', '21:30', 1);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (5, 'Boticas Arcangel', 'Psj. Bolívar 654', 982345678, '08:00', '21:00', 2);

-- Inventario de botica
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (1, 20, '2025-05-16', 1, 1);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (2, 15, '2025-05-15', 1, 2);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (3, 40, '2025-05-02', 1, 3);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (4, 200, '2025-05-02', 2, 4);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (5, 100, '2025-05-03', 2, 5);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (6, 60, '2025-05-03', 2, 6);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (7, 30, '2025-05-03', 3, 7);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (8, 75, '2025-05-03', 3, 8);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (9, 50, '2025-05-04', 3, 9);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (10, 110, '2025-05-04', 3, 10);


-- Pedido
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (1, '2025-05-01', 'Completado', 1, 1, 1, 1, 1);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (2, '2025-05-01', 'Completado', 1, 1, 1, 2, 2);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (3, '2025-05-02', 'En proceso', 2, 2, 2, 3, 3);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (4, '2025-05-02', 'Pendiente de pago', 3, 1, 3, 4, 4);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (5, '2025-05-03', 'Completado', 4, 2, 1, 5, 5);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (6, '2025-05-03', 'Cancelado', 2, 3, 2, 6, 2);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (7, '2025-05-03', 'En reparto', 5, 3, 1, 7, 3);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (8, '2025-05-04', 'Completado', 4, 2, 3, 8, 5);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (9, '2025-05-04', 'Pendiente de confirmación', 3, 1, 1, 9, 1);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id, repartidor_id)
VALUES (10, '2025-05-04', 'Completado', 5, 3, 2, 10, 4);

-- detalle del pedido 
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 1, 1 from medicamento where id = 1;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 1, 2 from medicamento where id = 2;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 2, 3 from medicamento where id = 3;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 2, 4 from medicamento where id = 4;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 3, 5 from medicamento where id = 5;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 3, 6 from medicamento where id = 6;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 4, 7 from medicamento where id = 7;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 4, 8 from medicamento where id = 8;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 5, 9 from medicamento where id = 9;
INSERT INTO detalle_pedido(cantidad, precio_unitario, pedido_id, medicamento_id)
select null, precio, 5, 10 from medicamento where id = 10;


-- Pago
INSERT INTO pago (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, CURRENT_DATE, 'Pagado', 1, id, 1 FROM detalle_pedido WHERE id = 1;
INSERT INTO pago (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, CURRENT_DATE, 'Pagado', 1, id, 1 FROM detalle_pedido WHERE id = 2;
INSERT INTO pago (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, CURRENT_DATE, 'Pagado', 2, id, 2 FROM detalle_pedido WHERE id = 3;
INSERT INTO pago (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, CURRENT_DATE, 'Pendiente', 3, id, 3 FROM detalle_pedido WHERE id = 4;
INSERT INTO pago (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, CURRENT_DATE, 'Pagado', 4, id, 5 FROM detalle_pedido WHERE id = 5;

-- Carrito
INSERT INTO carrito(id, usuario_id, fecha_actualizacion)
VALUES (1, 1, CURRENT_TIMESTAMP);
INSERT INTO carrito(id, usuario_id, fecha_actualizacion)
VALUES (2, 2, CURRENT_TIMESTAMP);
INSERT INTO carrito(id, usuario_id, fecha_actualizacion)
VALUES (3, 3, CURRENT_TIMESTAMP);
INSERT INTO carrito(id, usuario_id, fecha_actualizacion)
VALUES (4, 4, CURRENT_TIMESTAMP);
INSERT INTO carrito(id, usuario_id, fecha_actualizacion)
VALUES (5, 5, CURRENT_TIMESTAMP);


-- ITEM CARRITO
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (1, 1, 1, 2);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (2, 1, 3, 1);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (3, 2, 4, 1);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (4, 2, 2, 2);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (5, 3, 5, 1);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (6, 3, 6, 1);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (7, 4, 7, 3);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (8, 4, 9, 2);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (9, 5, 10, 1);
INSERT INTO item_carrito(id, carrito_id, medicamento_id, cantidad)
VALUES (10, 5, 8, 2);

