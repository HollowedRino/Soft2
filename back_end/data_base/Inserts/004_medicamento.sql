-- Medicamentos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (1, 'Panadol Antigripal NF Tableta', 'SOBRE X2 TABS 1 UN', 'Medicamentos', 'GSK', 2.88, 0, 1, 'https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'Medicamentos','Bayer', 5.00, 0, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Medicamentos','Pfizer', 8.75, 1, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (4, 'Loratadina', 'Antihistamínico para alergias', 'Medicamentos', 'Sanofi', 4.20, 0, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (5, 'Losartán', 'Antihipertensivo', 'Medicamentos', 'Sanofi', 10.00, 1, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (6, 'Omeprazol', 'Inhibidor de la bomba de protones', 'Medicamentos', 'AstraZeneca', 3.90, 0, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (7, 'Diazepam', 'Ansiolítico y relajante muscular', 'Medicamentos', 'Roche', 9.00, 1, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (8, 'Metformina', 'Control de la glucosa en diabetes tipo 2', 'Medicamentos', 'Merck', 6.30, 1, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (9, 'Simvastatina', 'Reduce el colesterol en sangre', 'Medicamentos', 'Novartis', 7.45, 1, 1,'');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (10, 'Aspirina', 'Analgésico y anticoagulante', 'Medicamentos', 'Bayer', 2.50, 0, 1,'');
-- Medicamentos Naturales
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (11, 'Valeriana', 'Sedante natural para la ansiedad y el insomnio', 'Medicamentos naturales', 'Nature’s Way', 5.80, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (12, 'Echinacea', 'Refuerza el sistema inmunológico', 'Medicamentos naturales', 'Natural Vitality', 6.50, 0, 1, '');

-- Adulto mayor
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (13, 'Calcio + Vitamina D3', 'Fortalecimiento óseo para adultos mayores', 'Adulto mayor', 'Centrum', 9.20, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (14, 'Memorax', 'Mejora la memoria y concentración en personas mayores', 'Adulto mayor', 'LabFarma', 11.50, 0, 1, '');

-- Infantil
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (15, 'Paracetamol Infantil', 'Jarabe para la fiebre y el dolor en niños', 'Infantil', 'Pfizer', 3.80, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (16, 'Multivitamínico Infantil', 'Suplemento con vitaminas esenciales para niños', 'Infantil', 'Pediavit', 4.60, 0, 1, '');

-- Belleza
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (17, 'Colágeno Hidrolizado', 'Mejora la elasticidad de la piel y uñas', 'Belleza', 'HydroSkin', 12.00, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (18, 'Biotina 10,000 mcg', 'Estimula el crecimiento del cabello y uñas', 'Belleza', 'Natrol', 8.75, 0, 1, '');

-- Vitaminas y Suplementos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (19, 'Vitamina C 1000 mg', 'Antioxidante y fortalecimiento inmunológico', 'Vitaminas y suplementos', 'Sundown', 6.20, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (20, 'Omega 3 EPA/DHA', 'Apoyo cardiovascular y cerebral', 'Vitaminas y suplementos', 'Nordic Naturals', 10.90, 0, 1, '');

