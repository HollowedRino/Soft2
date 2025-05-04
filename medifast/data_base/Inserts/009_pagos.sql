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
