import { createContext, useEffect, useState } from 'react';
import { sendChatbotMessage } from '../medifast/services/chatbotService';

export const ChatbotContext = createContext();

const STORAGE_KEY = 'chatbot_messages';

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : [{ from: 'bot', text: 'Hola, soy tu asistente Medifast. ¿Quieres consultar un medicamento o encontrar una botica?' }];
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza cada cambio de mensajes al sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const clearChat = () => {
    setMessages([{ from: 'bot', text: 'Hola, soy tu asistente Medifast. ¿Quieres consultar un medicamento o encontrar una botica?' }]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const talkToChatbot = async (inputText) => {
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: inputText },
      { from: 'bot', text: '...' }
    ]);
    setIsLoading(true);

    const resp = await sendChatbotMessage({ message: inputText });

    if (!resp.ok) {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== '...'),
        { from: 'bot', text: resp.errorMessage }
      ]);
      setIsLoading(false);
      return;
    }

    const fullMessage = resp.response.resultado.mensaje || 'No se pudo obtener respuesta.';
    let i = 0;

    setMessages((prev) => [
      ...prev.filter((msg) => msg.text !== '...'),
      { from: 'bot', text: '' }
    ]);

    const typeChar = () => {
      if (i <= fullMessage.length) {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, text: fullMessage.substring(0, i) }
              : msg
          )
        );
        i++;
        setTimeout(typeChar, 20);
      } else {
        setIsLoading(false);
      }
    };

    typeChar();
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isLoading,
        addMessage,
        talkToChatbot,
        clearChat, 
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
