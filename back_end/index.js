import express from 'express';
import boticaRoutes from './routes/boticaRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import detallePedidoRoutes from './routes/detallePedidoRoutes.js';
import medicamentoRoutes from './routes/medicamentoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas de botica
app.use('/boticas', boticaRoutes);
// Usar las rutas de carrito
app.use('/carrito', carritoRoutes);
// Usar las rutas de carrito
app.use('/medicamento', medicamentoRoutes);
// Usar las rutas de detallePedido
app.use('/pedido', pedidoRoutes);
// Usar las rutas de detallePedido
app.use('/detallepedido', detallePedidoRoutes);


// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
