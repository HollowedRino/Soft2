CREATE TABLE direccion_usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  direccion VARCHAR(100) NOT NULL,
  alias VARCHAR(30),
  usuario_id INTEGER,
  distrito_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (distrito_id) REFERENCES distrito(id)
);