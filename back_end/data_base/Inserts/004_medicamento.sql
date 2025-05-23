-- Medicamentos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (1, 'Panadol Antigripal NF Tableta', 'SOBRE X2 TABS 1 UN', 'medications', 'GSK', 2.88, 0, 1, 'https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'medications','Bayer', 5.00, 0, 1,'https://ortopedicosfuturoco.vtexassets.com/arquivos/ids/159985-800-auto?v=638153043617170000&width=800&height=auto&aspect=true');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (3, 'Amoxicilina', 'Antibiótico de amplio espectro', 'medications','Pfizer', 8.75, 1, 1,'https://bysprodstorage.blob.core.windows.net/images/61583.png');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (4, 'Loratadina', 'Antihistamínico para alergias', 'medications', 'Sanofi', 4.20, 0, 1,'https://laboratoriosbest.com/wp-content/uploads/2021/12/Loratadina10mg250tab@05x.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (5, 'Losartán', 'Antihipertensivo', 'medications', 'Sanofi', 10.00, 1, 1,'https://www.lasanteca.com/userfiles/2018/12/LOSART%C2%B5N-POT%C2%B5SICO-50MG-CAJA-POR-30-TABLETAS-CON-BLISTER.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (6, 'Omeprazol', 'Inhibidor de la bomba de protones', 'medications', 'AstraZeneca', 3.90, 0, 1,'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158088/01984_1.jpg?v=638428792795700000');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (7, 'Diazepam', 'Ansiolítico y relajante muscular', 'medications', 'Roche', 9.00, 1, 1,'https://acdn-us.mitiendanube.com/stores/003/511/797/products/diazepam-901-5c5068c16545e49ec916909340901832-480-0.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (8, 'Metformina', 'Control de la glucosa en diabetes tipo 2', 'medications', 'Merck', 6.30, 1, 1,'https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/00201903-600x600.jpg');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (9, 'Simvastatina', 'Reduce el colesterol en sangre', 'medications', 'Novartis', 7.45, 1, 1,'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/157368/00842_1.jpg?v=638417283440230000');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (10, 'Aspirina', 'Analgésico y anticoagulante', 'medications', 'Bayer', 2.50, 0, 1,'https://s1.elespanol.com/2018/06/08/ciencia/salud/farmacologia-farmacologia_clinica-salud_313481328_81018057_1706x1280.jpg');
-- Medicamentos Naturales
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (11, 'Valeriana', 'Sedante natural para la ansiedad y el insomnio', 'natural-medicines', 'Nature’s Way', 5.80, 0, 1, 'https://saludvida.com.pe/cdn/shop/products/suplmgrandescopia_9e9973c2-2238-4c64-a658-b7efed0008c0.jpg?v=1663607588');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (12, 'Echinacea', 'Refuerza el sistema inmunológico', 'natural-medicines', 'Natural Vitality', 6.50, 0, 1, '');

-- Adulto mayor
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (13, 'Calcio + Vitamina D3', 'Fortalecimiento óseo para adultos mayores', 'older-adult', 'Centrum', 9.20, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (14, 'Memorax', 'Mejora la memoria y concentración en personas mayores', 'older-adult', 'LabFarma', 11.50, 0, 1, '');

-- Infantil
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (15, 'Paracetamol Infantil', 'Jarabe para la fiebre y el dolor en niños', 'childish', 'Pfizer', 3.80, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (16, 'Multivitamínico Infantil', 'Suplemento con vitaminas esenciales para niños', 'childish', 'Pediavit', 4.60, 0, 1, '');

-- Belleza
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (17, 'Colágeno Hidrolizado', 'Mejora la elasticidad de la piel y uñas', 'beauty', 'HydroSkin', 12.00, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (18, 'Biotina 10,000 mcg', 'Estimula el crecimiento del cabello y uñas', 'beauty', 'Natrol', 8.75, 0, 1, '');

-- Vitaminas y Suplementos
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (19, 'Vitamina C 1000 mg', 'Antioxidante y fortalecimiento inmunológico', 'vitamins', 'Sundown', 6.20, 0, 1, '');
INSERT INTO medicamento(id, nombre, descripcion, categoria, fabricante, precio, requiere_receta, estado_medicamento, imagen_url) 
VALUES (20, 'Omega 3 EPA/DHA', 'Apoyo cardiovascular y cerebral', 'vitamins', 'Nordic Naturals', 10.90, 0, 1, '');

