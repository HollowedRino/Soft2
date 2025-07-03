// src/components/ChatPanel.jsx
import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TypingMessage } from './TypingMessage';
import { ChatMessage } from './ChatMessage';
import { ChatbotContext } from '../../contexts/ChatbotProvider';


export const ChatPanel = ({ onClose }) => {
  const { messages, isLoading, talkToChatbot } = useContext(ChatbotContext);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await talkToChatbot(input.trim());
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-[215px] right-8 w-80 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#41b541] text-white px-4 py-3 font-semibold text-sm flex justify-between items-center">
        SebasBot
        <button onClick={onClose}>
          <XMarkIcon className="w-5 h-5 text-white hover:text-gray-200" />
        </button>
      </div>

      {/* Cuerpo del chat */}
      <div
        className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2"
        ref={chatRef}
      >
        {messages.map((msg, i) =>
          msg.text === '...' ? (
            <TypingMessage key={i} />
          ) : (
            <ChatMessage key={i} {...msg} />
          )
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-[#41b541]/30"
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
};
