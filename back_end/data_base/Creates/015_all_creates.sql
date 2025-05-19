CREATE TABLE distrito (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre_distrito VARCHAR(20) NOT NULL
);

CREATE TABLE metodo_pago (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre_metodo_pago VARCHAR(40) NOT NULL
);

CREATE TABLE cupon (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  codigo VARCHAR(20),
  descripcion VARCHAR(20),
  descuento REAL
);

CREATE TABLE repartidor (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  numero INTEGER NOT NULL
);

CREATE TABLE medicamento (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  fabricante VARCHAR(50) NOT NULL,
  precio REAL NOT NULL,
  requiere_receta BOOLEAN NOT NULL,
  estado_medicamento BOOLEAN NOT NULL,
  imagen_url TEXT
);


CREATE TABLE usuario (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  telefono_usuario INTEGER,
  estado VARCHAR(20) NOT NULL
);

CREATE TABLE direccion_usuario (
  id INTEGER PRIMARY KEY NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  alias VARCHAR(30),
  usuario_id INTEGER,
  distrito_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (distrito_id) REFERENCES distrito(id)
);

CREATE TABLE botica (
  id INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  direccion VARCHAR(40) NOT NULL,
  telefono_botica INTEGER,
  horario_apertura VARCHAR(10) NOT NULL,
  horario_cierre VARCHAR(10) NOT NULL,
  distrito_id INTEGER,
  FOREIGN KEY (distrito_id) REFERENCES distrito(id)
);

CREATE TABLE inventario_botica (
  id INTEGER PRIMARY KEY NOT NULL,
  cantidad_disponible INTEGER,
  fecha_actualizacion DATE NOT NULL,
  botica_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (botica_id) REFERENCES botica(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id),
  UNIQUE(botica_id, medicamento_id)
);

CREATE TABLE pedido (
  id INTEGER PRIMARY KEY NOT NULL,
  fecha_pedido DATE NOT NULL,
  estado_pedido VARCHAR(100) NOT NULL,
  usuario_id INTEGER,
  botica_id INTEGER,
  metodo_pago_id INTEGER,
  direccion_usuario_id INTEGER,
  repartidor_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (botica_id) REFERENCES botica(id),
  FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id),
  FOREIGN KEY (direccion_usuario_id) REFERENCES direccion_usuario(id),
  FOREIGN KEY (repartidor_id) REFERENCES repartidor(id)
);

CREATE TABLE detalle_pedido (
  id INTEGER PRIMARY KEY NOT NULL,
  cantidad INTEGER,
  precio_unitario REAL NOT NULL,
  subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,  
  pedido_id INTEGER,
  medicamento_id INTEGER,
  FOREIGN KEY (pedido_id) REFERENCES pedido(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id)
);

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

CREATE TABLE carrito (
  id INTEGER PRIMARY KEY NOT NULL,
  usuario_id INTEGER,
  fecha_actualizacion TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE item_carrito (
  id INTEGER PRIMARY KEY NOT NULL,
  carrito_id INTEGER,
  medicamento_id INTEGER,
  cantidad INTEGER NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carrito(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamento(id)
);


