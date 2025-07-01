import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as ChatService from '../services/chatService.js';
import * as MsgService from '../services/mensajeService.js';

const socket = io("http://localhost:3000");


export const ChatRoom = ({ pedidoId, currentUserId, repartidorNombre }) => {
  const [chat, setChat] = useState(null);
  const [receptorInfo, setReceptorInfo] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!pedidoId) return;

    const obtenerChat = async () => {
      const response = await ChatService.findByPedido(pedidoId);
      if (response.ok && response.res) {
        const chatArray = response.res;
        if (chatArray.length === 0) {
          console.error("No se encontró chat para este pedido");
          return;
        }

        const chatData = chatArray[0];
        setChat(chatData);

        const cliente = chatData.pedido.cliente;
        const repartidor = chatData.pedido.repartidor;

        if (currentUserId === cliente.id) {
          setReceptorInfo({ id: repartidor.id, nombre: repartidor.nombre });
        } else {
          setReceptorInfo({ id: cliente.id, nombre: cliente.nombre });
        }

        const mensajesResponse = await MsgService.findByChat(chatData.id);
        if (mensajesResponse.ok) {
          setMensajes(mensajesResponse.res);
        } else {
          console.error("Error al obtener mensajes:", mensajesResponse.errorMessage);
        }

        socket.emit("join_room", chatData.id);

      } else {
        console.error("Error al obtener chat por pedido:", response.errorMessage);
      }
    };

    obtenerChat();

    socket.on("receive_message", (mensaje) => {
      setMensajes((prev) => [...prev, mensaje]);
    });

    return () => {
      if (chat?.id) {
        socket.emit("leavechat", chat.id);
      }
      socket.off("receive_message");
    };
  }, [pedidoId]);

  const enviarMensaje = async () => {
    if (!messageContent.trim()) return;

    const nuevoMensaje = {
      contenido: messageContent,
      emisor_id: currentUserId,
      receptor_id: receptorInfo.id,
      chat_id: chat.id,
      fecha_hora: new Date().toISOString(),
    };

    const response = await MsgService.saveMessage(nuevoMensaje);
    if (response.ok) {
      socket.emit("send_message", { ...nuevoMensaje, emisor_nombre: "Tú" });
      setMensajes((prev) => [...prev, { ...nuevoMensaje, emisor_nombre: "Tú" }]);
      setMessageContent("");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "480px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",  // <-- altura al 100% para ajustar al padre
      }}
    >
      <div
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
          padding: "12px",
          fontWeight: "bold",
          fontSize: "1.25rem",
        }}
      >
        Chat con {repartidorNombre || receptorInfo?.nombre || "Repartidor"}
      </div>

      <div
        className="mensajes"
        style={{
          flexGrow: 1,
          padding: "12px",
          backgroundColor: "#a5d6a7",
          overflowY: "auto",
          borderRadius: "0 0 8px 8px",
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "0.9rem",
          color: "#004d40",
        }}
      >
        {mensajes.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.emisor_id === currentUserId ? "flex-end" : "flex-start",
              backgroundColor: msg.emisor_id === currentUserId ? "#388e3c" : "#4caf50",
              color: "white",
              padding: "8px 12px",
              borderRadius: "16px",
              maxWidth: "75%",
              wordWrap: "break-word",
            }}
          >
            <strong>{msg.emisor_id === currentUserId ? "Tú" : receptorInfo?.nombre}:</strong> {msg.contenido}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        className="entrada"
        style={{
          display: "flex",
          marginTop: "12px",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{
            flexGrow: 1,
            padding: "10px 14px",
            borderRadius: "20px",
            border: "1px solid #388e3c",
            outline: "none",
            fontSize: "1rem",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") enviarMensaje();
          }}
        />
        <button
          onClick={enviarMensaje}
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1b5e20")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2e7d32")}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
