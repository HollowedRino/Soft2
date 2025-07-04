import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

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
import UserRoutes from './routes/UserRoutes.js';
import ItemCarritoRoutes from './routes/ItemCarritoRoutes.js';
import ChatRoutes from './routes/ChatRoutes.js';
import MensajeRoutes from './routes/MensajeRoutes.js';
import StripeRoutes from './routes/StripeRoutes.js';
import ChatbotRoutes from './routes/Chatbot/ChatbotRoutes.js'
import { checkGeminiAPI } from './configs/gemini.js';

const app = express();
app.use(express.json());
// Middleware para procesar datos URL-encoded
//app.use(express.urlencoded({ extended: true })); 

// Middleware para habilitar CORS y permitir peticiones desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173'  // Ajusta esta URL según el puerto donde corre tu frontend
}));

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
// Usar las rutas de usuario
app.use('/user', UserRoutes);
// Usar las rutas de item carrito
app.use('/itemcarrito',ItemCarritoRoutes);
// Usar las rutas de chat
app.use('/chat',ChatRoutes);
// Usar las rutas de mensaje
app.use('/mensaje',MensajeRoutes);
// Usar las rutas de Stripe
app.use('/stripe', StripeRoutes);
// Usar las rutas del Chatbot
app.use('/api', ChatbotRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET','POST'] 
  }
});

io.on("connection", (socket) => {
  console.log(`Se conectó el usuario ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Usuario ${socket.id} se unió a la sala ${data}`);
  })

  socket.on("leavechat", (roomId) => {
    socket.leave(roomId);
    console.log(`Usuario ${socket.id} salió de la sala ${roomId}`);
  });

  socket.on("send_message", (data) => {
    console.log(`Mensaje recibido:`, data);
    socket.to(data.chat_id).emit("receive_message", data);
  });

  socket.on("pedido_status_changed", (data) => {
    console.log(`Pedido status changed:`, data);
    // Broadcast to all users in the same chat room
    socket.to(data.pedidoId).emit("pedido_updated", data.updatedPedido);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Funcion q valida si existe la api key para el chatbot en el archivo .env, si no existe consulten en el grupo xd
checkGeminiAPI();

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
