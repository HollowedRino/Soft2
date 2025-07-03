CREATE TABLE detalle_pedido(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cantidad INTEGER,
  precio_unitario REAL, -- se aceptan valores vacios/nulos
  subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,  
  pedido_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id) ON DELETE CASCADE
);
