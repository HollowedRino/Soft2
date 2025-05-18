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