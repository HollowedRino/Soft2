import { useEffect,useState } from "react";
import { io } from 'socket.io-client';

export const ChatTest = () => {
    const [socket, setSocket] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const pedidoId = 1; // ID de la sala (chat asociado a pedido 10)

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);


        socket.on('connect',() => {
            console.log('Conectando al servidor con id:',socket.id);
            socket.emit('joinRoom',pedidoId) //1 seria la id del pedido
        });

        socket.on('message',(data) => {
            console.log('Mensaje recibido:',data);
        });

        return () => {
            socket.disconnect();
            console.log('Desconectado del servidor de chat');
        };
    }, []);

    const enviarMensaje = () => {
        if (socket) {
        socket.emit('message', {
            chatId: pedidoId,
            contenido: mensaje,
            autor: 'usuario123' // puedes cambiarlo a "repartidor456" en otra pestaña
        });
        setMensaje('');
        }
    };
    return (
        <div>
            <h1>Chat</h1>
            <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe un mensaje"
            />
            <button onClick={enviarMensaje}>Enviar</button>
        </div>
    );
};