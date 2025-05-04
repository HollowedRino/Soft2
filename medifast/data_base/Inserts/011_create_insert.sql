CREATE TABLE distrito (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre_distrito VARCHAR(20) NOT NULL
);

CREATE TABLE metodo_pago (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre_metodo_pago VARCHAR(40) NOT NULL
);

CREATE TABLE medicamento (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  fabricante VARCHAR(50) NOT NULL,
  precio REAL NOT NULL,
  requiere_receta BOOLEAN NOT NULL,
  estado_medicamento BOOLEAN NOT NULL
);

CREATE TABLE usuario (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  direccion VARCHAR(40) NOT NULL,
  telefono_usuario INTEGER,
  estado VARCHAR(20) NOT NULL,
  distrito_id INTEGER,
  FOREIGN KEY (distrito_id) REFERENCES distrito(id) ON DELETE CASCADE
);

CREATE TABLE botica (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(20) NOT NULL,
  direccion VARCHAR(40) NOT NULL,
  telefono_botica INTEGER,
  horario_apertura VARCHAR(10) NOT NULL,
  horario_cierre VARCHAR(10) NOT NULL,
  distrito_id INTEGER,
  FOREIGN KEY (distrito_id) REFERENCES distrito(id) ON DELETE CASCADE
);

CREATE TABLE inventario_botica (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  cantidad_disponible INTEGER,
  fecha_actualizacion DATE NOT NULL,
  botica_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (botica_id) REFERENCES botica(id) ON DELETE CASCADE,
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id) ON DELETE CASCADE
);

CREATE TABLE pedido(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  fecha_pedido DATE NOT NULL,
  estado_pedido VARCHAR(100) NOT NULL,
  direccion_entrega VARCHAR(40) NOT NULL,
  distrito_entrega VARCHAR (30) NOT NULL,
  usuario_id INTEGER,
  botica_id INTEGER,
  metodo_pago_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (botica_id) REFERENCES botica(id) ON DELETE CASCADE,
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id) ON DELETE CASCADE
);


CREATE TABLE detalle_pedido(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  cantidad INTEGER,
  precio_unitario REAL NOT NULL,
  subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,  
  pedido_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id) ON DELETE CASCADE
);


CREATE TABLE pagos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  monto_total REAL,
  fecha_pago DATE NOT NULL,
  estado_pago VARCHAR(100) NOT NULL,
  usuario_id INTEGER,
  detalle_pedido_id INTEGER,
  metodo_pago_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (detalle_pedido_id) REFERENCES detalle_pedido(id) ON DELETE CASCADE,
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id) ON DELETE CASCADE
);


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


-- Medicamentos
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (1, 'Paracetamol', 'Alivia dolor y fiebre', 'Genfar', 3.50, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (2, 'Ibuprofeno', 'Antiinflamatorio y analgésico', 'Bayer', 5.90, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Abbott', 12.00, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (4, 'Omeprazol', 'Reduce la acidez estomacal', 'Siegfried', 6.50, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (5, 'Losartán', 'Antihipertensivo', 'Sanofi', 10.00, 1, 1);


-- Usuarios
INSERT INTO usuario(id, nombre, apellido, email, contrasena, direccion, telefono_usuario, estado, distrito_id) 
VALUES (1, 'Luis', 'Ramírez', 'luis.ramirez@gmail.com', '1234segura', 'Av. Perú 123', 987654321, 'activo', 1);
INSERT INTO usuario(id, nombre, apellido, email, contrasena, direccion, telefono_usuario, estado, distrito_id) 
VALUES (2, 'María', 'Gonzales', 'maria.gonzales@hotmail.com', 'claveFuerte1', 'Jr. Libertad 456', 956789123, 'activo', 2);
INSERT INTO usuario(id, nombre, apellido, email, contrasena, direccion, telefono_usuario, estado, distrito_id) 
VALUES (3, 'Carlos', 'Pérez', 'carlos.perez@yahoo.com', 'miClave123', 'Calle Falsa 789', 912345678, 'inactivo', 3);
INSERT INTO usuario(id, nombre, apellido, email, contrasena, direccion, telefono_usuario, estado, distrito_id) 
VALUES (4, 'Ana', 'Torres', 'ana.torres@gmail.com', 'ana2024clave', 'Av. El Sol 222', 999888777, 'activo', 1);
INSERT INTO usuario(id, nombre, apellido, email, contrasena, direccion, telefono_usuario, estado, distrito_id) 
VALUES (5, 'Jorge', 'Mendoza', 'jorge.mendoza@outlook.com', 'jorgeSecure45', 'Psj. Lima 101', 988776655, 'activo', 2);


-- Botica
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (1, 'Mifarma', 'Av. Grau 123', 987654321, '08:00', '21:00', 1);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (2, 'Inkafarma', 'Jr. San Martín 456', 986532147, '09:00', '22:00', 2);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (3, 'Botica Peru', 'Calle Comercio 789', 984321789, '07:30', '20:30', 3);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (4, 'Boticas y Salud', 'Av. Lima 321', 981123456, '07:30', '21:30', 1);
INSERT INTO botica(id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id)
VALUES (5, 'Boticas Arcangel', 'Psj. Bolívar 654', 982345678, '08:00', '21:00', 2);

-- Inventario de botica
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (1, 100, '2025-05-01', 1, 1); -- Paracetamol en Botica Central
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (2, 80, '2025-05-01', 1, 2); -- Ibuprofeno en Botica Central
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (3, 50, '2025-05-01', 2, 3); -- Amoxicilina en Botica Salud
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (4, 75, '2025-05-01', 3, 4); -- Omeprazol en Botica Vida
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (5, 60, '2025-05-01', 4, 5); -- Losartán en Botica Norte
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (6, 40, '2025-05-01', 5, 1); -- Paracetamol en Botica Familiar


-- Pedido
INSERT INTO pedido(id, fecha_pedido, estado_pedido, direccion_entrega, distrito_entrega, usuario_id, botica_id, metodo_pago_id)
VALUES (1, '2025-05-01', 'Pendiente', 'Av. Perú 123', 'Ancón', 1, 1, 1);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, direccion_entrega, distrito_entrega, usuario_id, botica_id, metodo_pago_id)
VALUES (2, '2025-05-02', 'Entregado', 'Jr. Libertad 456', 'Puente Piedra', 2, 2, 2);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, direccion_entrega, distrito_entrega, usuario_id, botica_id, metodo_pago_id)
VALUES (3, '2025-05-02', 'En camino', 'Calle Falsa 789', 'Santa Rosa', 3, 3, 3);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, direccion_entrega, distrito_entrega, usuario_id, botica_id, metodo_pago_id)
VALUES (4, '2025-05-03', 'Pendiente', 'Av. El Sol 222', 'Ancón', 4, 4, 5);
INSERT INTO pedido(id, fecha_pedido, estado_pedido, direccion_entrega, distrito_entrega, usuario_id, botica_id, metodo_pago_id)
VALUES (5, '2025-05-03', 'Entregado', 'Psj. Lima 101', 'Puente Piedra', 5, 5, 4);


-- detalle del pedido 
INSERT INTO detalle_pedido(id, cantidad, precio_unitario, pedido_id, medicamento_id)
VALUES (1, 2, 3.50, 1, 1); -- 2 Paracetamol
INSERT INTO detalle_pedido(id, cantidad, precio_unitario, pedido_id, medicamento_id)
VALUES (2, 1, 5.90, 1, 2); -- 1 Ibuprofeno
INSERT INTO detalle_pedido(id, cantidad, precio_unitario, pedido_id, medicamento_id)
VALUES (3, 1, 12.00, 2, 3); -- 1 Amoxicilina
INSERT INTO detalle_pedido(id, cantidad, precio_unitario, pedido_id, medicamento_id)
VALUES (4, 3, 6.50, 3, 4); -- 3 Omeprazol
INSERT INTO detalle_pedido(id, cantidad, precio_unitario, pedido_id, medicamento_id)
VALUES (5, 2, 10.00, 4, 5); -- 2 Losartán


-- Inserciones en la tabla pagos usando subconsultas para obtener el subtotal desde detalle_pedido

INSERT INTO pagos (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, '2025-05-01', 'Pagado', 1, id, 1 FROM detalle_pedido WHERE id = 1;
INSERT INTO pagos (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, '2025-05-01', 'Pagado', 1, id, 1 FROM detalle_pedido WHERE id = 2;
INSERT INTO pagos (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, '2025-05-02', 'Pagado', 2, id, 2 FROM detalle_pedido WHERE id = 3;
INSERT INTO pagos (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, '2025-05-02', 'Pendiente', 3, id, 3 FROM detalle_pedido WHERE id = 4;
INSERT INTO pagos (monto_total, fecha_pago, estado_pago, usuario_id, detalle_pedido_id, metodo_pago_id)
SELECT subtotal, '2025-05-03', 'Pagado', 4, id, 5 FROM detalle_pedido WHERE id = 5;
