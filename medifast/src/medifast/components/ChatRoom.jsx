import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as ChatService from '../services/chatService.js';
import * as MsgService from '../services/mensajeService.js';
import * as PedidoService from '../services/pedidoService.js';

const socket = io("http://localhost:3000");


export const ChatRoom = ({ pedidoId, currentUserId, receptorId, receptorNombre, userState, onPedidoUpdate }) => {
  const [chat, setChat] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    if (!pedidoId) return;

    const obtenerOcrearChat = async () => {
      let chatId = null;
      
      // Primero intentar obtener el chat existente
      const response = await ChatService.findByPedido(pedidoId);
      
      if (response.ok && response.res && response.res.length > 0) {
        // Chat existe, usarlo
        const chatData = response.res[0];
        setChat(chatData);
        chatId = chatData.id;
        console.log("Chat encontrado:", chatId);
      } else {
        // Chat no existe, crearlo
        console.log("Chat no encontrado, creando nuevo chat...");
        const createResponse = await ChatService.createChat(pedidoId, "activo");
        
        if (createResponse.ok) {
          setChat(createResponse.res);
          chatId = createResponse.res.id;
          console.log("Chat creado:", chatId);
        } else {
          console.error("Error al crear chat:", createResponse.errorMessage);
          return;
        }
      }

      // Obtener mensajes del chat
      if (chatId) {
        const mensajesResponse = await MsgService.findByChat(chatId);
        if (mensajesResponse.ok) {
                  // Los mensajes ya vienen ordenados por createdAt desde el backend
        const mensajesOrdenados = mensajesResponse.res;
          setMensajes(mensajesOrdenados);
        } else {
          console.error("Error al obtener mensajes:", mensajesResponse.errorMessage);
        }

        // Unirse al room del socket
        socket.emit("join_room", chatId);
      }
    };

    obtenerOcrearChat();

    socket.on("receive_message", (mensaje) => {
      setMensajes((prev) => [...prev, mensaje]);
    });

    // Listen for pedido status updates
    socket.on("pedido_updated", (updatedPedido) => {
      if (onPedidoUpdate) {
        onPedidoUpdate(updatedPedido);
      }
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
      texto: messageContent,
      usuario_id: currentUserId,
      chat_id: chat.id,
    };

    const response = await MsgService.saveMessage(nuevoMensaje);
    if (response.ok) {
      // Send the complete message object (with fecha_hora from database) via socket
      const completeMessage = { ...response.res, emisor_nombre: "Tú" };
      socket.emit("send_message", completeMessage);
      setMensajes((prev) => [...prev, completeMessage]);
      setMessageContent("");
    }
  };

  const actualizarEstadoPedido = async (nuevoEstado) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      // First, get the current pedido data
      const currentPedidoResponse = await PedidoService.getPedidoById(pedidoId);
      
      if (!currentPedidoResponse.ok) {
        alert("Error al obtener datos del pedido");
        return;
      }
      
      // Extract the pedido data from the response
      const pedidoViejo = currentPedidoResponse.resp;
      
      // Create update data with all current fields and new estado_pedido
      const updateData = {
        fecha_pedido: pedidoViejo.fecha_pedido,
        estado_pedido: nuevoEstado,
        usuario_id: pedidoViejo.usuario_id,
        botica_id: pedidoViejo.botica_id,
        metodo_pago_id: pedidoViejo.metodo_pago_id,
        direccion_usuario_id: pedidoViejo.direccion_usuario_id,
        repartidor_id: pedidoViejo.repartidor_id
      };
      
      const response = await PedidoService.updatePedidoById(pedidoId, updateData);
      
      if (response.ok) {
        // Emit the update to all users in the chat room
        socket.emit("pedido_status_changed", {
          pedidoId: pedidoId,
          updatedPedido: response.resp
        });
        
        // Notify parent component about the update
        if (onPedidoUpdate) {
          onPedidoUpdate(response.resp);
        }
      } else {
        alert("Error al actualizar el estado del pedido");
      }
    } catch (error) {
      alert("Error al actualizar el estado del pedido");
    } finally {
      setIsUpdating(false);
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
        Chat con el {userState === 'repartidor' ? 'cliente' : 'repartidor'} {receptorNombre || "Usuario"}: Pedido #{pedidoId}
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
              alignSelf: msg.usuario_id === currentUserId ? "flex-end" : "flex-start",
              backgroundColor: msg.usuario_id === currentUserId ? "#388e3c" : "#4caf50",
              color: "white",
              padding: "8px 12px",
              borderRadius: msg.usuario_id === currentUserId ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              maxWidth: "75%",
              wordWrap: "break-word",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              marginBottom: "4px",
            }}
          >
            <div style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "2px" }}>
              {msg.usuario_id === currentUserId ? "Tú" : receptorNombre}
            </div>
            <div style={{ fontSize: "1rem" }}>
              {msg.texto}
            </div>
            <div style={{ 
              fontSize: "0.7rem", 
              opacity: 0.8, 
              marginTop: "4px",
              textAlign: msg.usuario_id === currentUserId ? "right" : "left"
            }}>
              {new Date(msg.fecha_hora).toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
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

      {/* Botones para repartidor */}
      {userState === 'repartidor' && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => actualizarEstadoPedido("completado")}
            disabled={isUpdating}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: isUpdating ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
              opacity: isUpdating ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !isUpdating && (e.currentTarget.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => !isUpdating && (e.currentTarget.style.backgroundColor = "#4caf50")}
          >
            {isUpdating ? "Actualizando..." : "Marcar como Completado"}
          </button>
          
          <button
            onClick={() => actualizarEstadoPedido("cancelado")}
            disabled={isUpdating}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: isUpdating ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
              opacity: isUpdating ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !isUpdating && (e.currentTarget.style.backgroundColor = "#d32f2f")}
            onMouseLeave={(e) => !isUpdating && (e.currentTarget.style.backgroundColor = "#f44336")}
          >
            {isUpdating ? "Actualizando..." : "Cancelar Pedido"}
          </button>
        </div>
      )}
    </div>
  );
};
