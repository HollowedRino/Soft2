CREATE TABLE pago (
  id INTEGER PRIMARY KEY NOT NULL,
  monto_total REAL,
  fecha_pago DATE NOT NULL,
  estado_pago VARCHAR(100) NOT NULL,
  usuario_id INTEGER,
  detalle_pedido_id INTEGER,
  metodo_pago_id INTEGER,
  id_cupon INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (detalle_pedido_id) REFERENCES detalle_pedido(id),
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id),
  FOREIGN KEY (cupon_id) REFERENCES cupon(id)
);
