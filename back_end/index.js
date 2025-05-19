import express from 'express';
import BoticaRoutes from './routes/BoticaRoutes.js';
import CarritoRoutes from './routes/CarritoRoutes.js';
import DetallePedidoRoutes from './routes/DetallePedidoRoutes.js';
import MedicamentoRoutes from './routes/MedicamentoRoutes.js';
import PedidoRoutes from './routes/PedidoRoutes.js';
import DireccionUsuarioRoutes from './routes/DireccionUsuarioRoutes.js';
import DistritoRoutes from './routes/DistritoRoutes.js';
import MetodoPagoRoutes from './routes/MetodoPagoRoutes.js';
import CuponRoutes from './routes/CuponRoutes.js';
import RepartidorRoutes from './routes/RepartidorRoutes.js';
import InventarioBoticaRoutes from './routes/InventarioBoticaRoutes.js';
import PagoRoutes from './routes/PagoRoutes.js';

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas de botica
app.use('/boticas', BoticaRoutes);
// Usar las rutas de carrito
app.use('/carrito', CarritoRoutes);
// Usar las rutas de medicamento
app.use('/medicamento', MedicamentoRoutes);
// Usar las rutas de medicamento
app.use('/direccionusuario', DireccionUsuarioRoutes);
// Usar las rutas de Pedido
app.use('/pedido', PedidoRoutes);
// Usar las rutas de detallePedido
app.use('/detallepedido', DetallePedidoRoutes);
// Usar las rutas de distrito
app.use('/distrito', DistritoRoutes);
// Usar las rutas de metodo de pago
app.use('/metodoPago', MetodoPagoRoutes);
// Usar las rutas de cupon
app.use('/cupon', CuponRoutes);
// Usar las rutas de repartidor
app.use('/repartidor', RepartidorRoutes);
// Usar las rutas de inventario botica
app.use('/inventarioBotica', InventarioBoticaRoutes);
// Usar las rutas de pago
app.use('/pago', PagoRoutes);


// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
