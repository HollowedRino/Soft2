CREATE TABLE usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100),
  telefono_usuario INTEGER,
  estado VARCHAR(20) NOT NULL
);