-- NUEVOS INSERTSSSSSSSSSSSSSSSSSSSSSSS

-- Insertar distritos
INSERT INTO distrito (id, nombre_distrito) VALUES
(1, 'Miraflores'),
(2, 'San Isidro'),
(3, 'Surco');

-- Insertar métodos de pago
INSERT INTO metodo_pago (id, nombre_metodo_pago) VALUES
(1, 'Tarjeta de crédito'),
(2, 'Transferencia'),
(3, 'Pago contra entrega');

-- Insertar usuarios
INSERT INTO usuario (id, nombre, apellido, email, contrasena, telefono_usuario, estado) VALUES
(1, 'Ana', 'Pérez', 'ana@gmail.com', '123456', 987654321, 'activo'),
(2, 'Luis', 'Gómez', 'luis@gmail.com', 'abcdef', 998877665, 'activo');

-- Insertar direcciones de usuarios
INSERT INTO direccion_usuario (id, direccion, alias, usuario_id, distrito_id) VALUES
(1, 'Av. Larco 123', 'Casa', 1, 1),
(2, 'Calle Los Rosales 456', 'Oficina', 2, 2);

-- Insertar boticas
INSERT INTO botica (id, nombre, direccion, telefono_botica, horario_apertura, horario_cierre, distrito_id) VALUES
(1, 'Botica Central', 'Av. Pardo 999', 123456789, '08:00', '22:00', 1),
(2, 'Farmacia Express', 'Jr. Lima 456', 987654321, '09:00', '21:00', 2);

-- Insertar medicamentos
INSERT INTO medicamento (id, nombre, descripcion, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) VALUES
(1, 'Paracetamol', 'Analgésico y antipirético', 'Genfar', 5.50, 0, 1, 'https://example.com/img/paracetamol.jpg'),
(2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'Bayer', 7.20, 0, 1, 'https://example.com/img/ibuprofeno.jpg'),
(3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Pfizer', 12.00, 1, 1, 'https://example.com/img/amoxicilina.jpg'),
(4, 'Loratadina', 'Antihistamínico para alergias', 'Merck', 6.80, 0, 1, 'https://example.com/img/loratadina.jpg'),
(5, 'Metformina', 'Tratamiento para la diabetes tipo 2', 'Roche', 10.50, 1, 1, 'https://example.com/img/metformina.jpg');


-- Insertar inventario en boticas
INSERT INTO inventario_botica (id, cantidad_disponible, fecha_actualizacion, botica_id, medicamento_id) VALUES
(1, 50, '2025-05-01', 1, 1),
(2, 30, '2025-05-01', 1, 2),
(3, 40, '2025-05-01', 2, 1),
(4, 25, '2025-05-01', 2, 3);

-- Insertar carritos
INSERT INTO carrito (id, usuario_id, fecha_actualizacion) VALUES
(1, 1, '2025-05-03 12:30:00'),
(2, 2, '2025-05-03 14:45:00');

-- Insertar ítems al carrito
INSERT INTO item_carrito (id, carrito_id, medicamento_id, cantidad) VALUES
(1, 1, 1, 2),
(2, 1, 2, 1),
(3, 2, 3, 3);

-- Insertar pedidos
INSERT INTO pedido (id, fecha_pedido, estado_pedido, usuario_id, botica_id, metodo_pago_id, direccion_usuario_id) VALUES
(1, '2025-05-03', 'En proceso', 1, 1, 1, 1),
(2, '2025-05-04', 'Entregado', 2, 2, 3, 2);

-- Insertar detalles de pedido
INSERT INTO detalle_pedido (id, cantidad, precio_unitario, subtotal, pedido_id, medicamento_id) VALUES
(1, 2, 4.50, 9.00, 1, 1),
(2, 1, 12.00, 12.00, 1, 2),
(3, 3, 8.00, 24.00, 2, 3);

-- Insertar pagos
INSERT INTO pagos (id, monto_total, fecha_pago, estado_pago, usuario_id, pedido_id, metodo_pago_id) VALUES
(1, 21.00, '2025-05-03', 'Pagado', 1, 1, 1),
(2, 24.00, '2025-05-04', 'Pagado', 2, 2, 3);
