CREATE TABLE carrito (
  id INTEGER PRIMARY KEY NOT NULL,
  usuario_id INTEGER,
  fecha_actualizacion TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);