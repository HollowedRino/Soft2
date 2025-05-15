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
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (1, 'Paracetamol', 'Analgésico y antipirético', 'Genfar', 3.50, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'Bayer', 5.00, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Pfizer', 8.75, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (4, 'Loratadina', 'Antihistamínico para alergias', 'Sanofi', 4.20, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (5, 'Losartán', 'Antihipertensivo', 'Sanofi', 10.00, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (6, 'Omeprazol', 'Inhibidor de la bomba de protones', 'AstraZeneca', 3.90, 0, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (7, 'Diazepam', 'Ansiolítico y relajante muscular', 'Roche', 9.00, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (8, 'Metformina', 'Control de la glucosa en diabetes tipo 2', 'Merck', 6.30, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (9, 'Simvastatina', 'Reduce el colesterol en sangre', 'Novartis', 7.45, 1, 1);
INSERT INTO medicamento(id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento) 
VALUES (10, 'Aspirina', 'Analgésico y anticoagulante', 'Bayer', 2.50, 0, 1);

-- Usuarios
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (1, 'Laura', 'Martínez', 'laura.martinez@email.com', 'contrasena123', 987654321, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (2, 'Carlos', 'Ramírez', 'carlos.ramirez@email.com', 'passw0rd456', 912345678, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (3, 'María', 'Gómez', 'maria.gomez@email.com', 'maria_secure!', 934567890, 'inactivo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (4, 'José', 'Fernández', 'jose.fernandez@email.com', 'jf_secure_2024', 956789012, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (5, 'Ana', 'Torres', 'ana.torres@email.com', 'ana_pass789', 923456789, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (6, 'Luis', 'Díaz', 'luis.diaz@email.com', 'ldiaz2024*', 901234567, 'inactivo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (7, 'Sofía', 'López', 'sofia.lopez@email.com', 'sofiaLopez$', 965432189, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (8, 'Javier', 'Morales', 'javier.morales@email.com', 'javi123!', 976543210, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (9, 'Camila', 'Castillo', 'camila.castillo@email.com', 'castilloCami2024', 954321098, 'activo');
INSERT INTO usuario(id, nombre, apellido, email, contrasena, telefono_usuario, estado) 
VALUES (10, 'Diego', 'Rojas', 'diego.rojas@email.com', 'rojDiego#', 943210987, 'inactivo');

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
VALUES (1, 120, '2025-05-01', 1, 1);
INSERT INTO inventario_botica(id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id)
VALUES (2, 85, '2025-05-01', 1, 2);
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

-- PAGOS
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

