import express from 'express';
import boticaRoutes from './routes/boticaRoutes.js';

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas de botica
app.use('/api', boticaRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
