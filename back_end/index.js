import express from 'express';
import boticaRoutes from './routes/boticaRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import detallePedidoRoutes from './routes/detallePedidoRoutes.js';
import medicamentoRoutes from './routes/medicamentoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import direccionUsuarioRoutes from './routes/direccionUsuarioRoutes.js';
import DistritoRoutes from './routes/DistritoRoutes.js';
import MetodoPagoRoutes from './routes/MetodoPagoRoutes.js';
import CuponRoutes from './routes/CuponRoutes.js';
import RepartidorRoutes from './routes/RepartidorRoutes.js';

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas de botica
app.use('/boticas', boticaRoutes);
// Usar las rutas de carrito
app.use('/carrito', carritoRoutes);
// Usar las rutas de medicamento
app.use('/medicamento', medicamentoRoutes);
// Usar las rutas de medicamento
app.use('/direccionusuario', direccionUsuarioRoutes);
// Usar las rutas de Pedido
app.use('/pedido', pedidoRoutes);
// Usar las rutas de detallePedido
app.use('/detallepedido', detallePedidoRoutes);
// Usar las rutas de distrito
app.use('/distrito', DistritoRoutes);
// Usar las rutas de metodo de pago
app.use('/metodoPago', MetodoPagoRoutes);
// Usar las rutas de cupon
app.use('/cupon', CuponRoutes);
// Usar las rutas de repartidor
app.use('/repartidor', RepartidorRoutes);


// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
