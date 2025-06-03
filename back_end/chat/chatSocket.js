export default function configChatSocket(io) {
    io.on('connection',(socket) => {
        console.log('Uusario conectado:',socket.id);

        socket.on('joinRoom',(roomId) => {
            socket.join(roomId);
            console.log(`Usuario ${socket.id} se unió a la sala ${roomId}`);
        });

        socket.on('message', ({roomId, message, autor}) => {
            io.to(roomId).emit('message', {message, senderId: socket.id, autor});
        });

        socket.on('disconnect',() => {
            console.log('Usuario desconectado:',socket.id);
        });
    });
}