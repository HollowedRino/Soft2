CREATE TABLE inventario_botica (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  cantidad_disponible INTEGER,
  fecha_actualizacion DATE NOT NULL,
  botica_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (botica_id) REFERENCES botica(id) ON DELETE CASCADE,
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id) ON DELETE CASCADE
);