const express = require('express');
const app = express();
const port = 3000;
/*const db = require("./configs/connect_database");
const router = express.Router();*/

const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./data_base/bd_01.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa con la base de datos SQLite');
  }
});

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener todos los registros de la tabla botica
app.get('/botica', (req, res) => {
  db.all('SELECT * FROM botica', [], (err, rows) => {
    if (err) {
      console.error('Error al consultar la tabla botica:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Ruta para obtener un registro específico de la tabla botica por ID
app.get('/botica/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM botica WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error al consultar la tabla botica por ID:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }

    res.json(row);
  });
});


// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Ruta para obtener una botica por ID
/*app.get('/boticas/:id', (req, res) => {
  const id = req.params.id;
  
  // Consultar la base de datos SQLite directamente
  db.get('SELECT * FROM botica WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Botica no encontrada' });
    }
    
    res.json(row);
  });
});*/


// Ruta para obtener una botica por ID
/*router.get("/botica/:id", async (req, res) => {
  // renderizar vista
  const id = req.body.id;
  const query = 'SELECT * FROM botica WHERE id = :id';
  const replacements = {id: id};
  try {
    const producto = await db.query(query, {
      replacements,
      type: db.QueryTypes.SELECT,
    });
    
    if (producto.length === 0) {
      return res.status(404).json({ error: 'Botica no encontrada' });
    }
    
    res.json(producto);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});*/

//app.use('/', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
