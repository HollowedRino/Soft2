CREATE TABLE medicamento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  fabricante VARCHAR(50) NOT NULL,
  precio REAL NOT NULL,
  requiere_receta BOOLEAN NOT NULL,
  estado_medicamento BOOLEAN NOT NULL,
  imagen_url TEXT
);