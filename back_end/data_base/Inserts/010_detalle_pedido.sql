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
