import { useEffect,useState } from "react";
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3000");

export const ChatTest = () => {
    const [mensaje, setMensaje] = useState("");
    const [msgRes, setMsgRes] = useState("");
    const enviarMensaje = () => {
        socket.emit("send_message", { mensaje });
    };

    useEffect(() => {
        socket.on("receive_message",(data) => {
            setMsgRes(data.mensaje);
        });
    }, [socket]); 

    return (
        <div>
            <input placeholder="Escribe mensaje..." onChange={(event) => {
                setMensaje(event.target.value);
            }}/>
            <button className="bg-gray-500 hover:bg-green-500 text-white py-2 px-4 rounded" onClick={enviarMensaje}>Enviar mensaje</button>
            <h1>Mensaje Recibido:</h1>
            {msgRes}
        </div>
    )
};