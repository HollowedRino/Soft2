CREATE TABLE item_carrito (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  carrito_id INTEGER,
  medicamento_id INTEGER,
  cantidad INTEGER NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carrito(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id)
);