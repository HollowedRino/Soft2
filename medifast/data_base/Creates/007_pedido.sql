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