import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatbotInput } from '../components/ChatbotInput';
import { TypingMessage } from '../components/TypingMessage';

export const AttendancePage = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: input.trim() }]);
    setInput('');
    setIsLoading(true);
    setMessages((prev) => [...prev, { from: 'bot', text: '...' }]);

    setTimeout(() => {
      const fullText = 'Gracias por tu mensaje, lo estoy procesando...';
      let i = 0;

      // Remplazar los puntos
      setMessages((prev) => [...prev.filter((msg) => msg.text !== '...'), { from: 'bot', text: '' }]);

      const typeChar = () => {
        if (i <= fullText.length) {
          setMessages((prev) =>
            prev.map((msg, idx) =>
              idx === prev.length - 1
                ? { ...msg, text: fullText.substring(0, i) }
                : msg
            )
          );
          i++;
          setTimeout(typeChar, 10);
        } else {
          setIsLoading(false);
        }
      };

      typeChar();
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0fff4]">
      <h1 className="text-2xl font-bold px-6 pt-5 text-left text-[#2e7d32]">Sebasbot</h1>

      <div
        className="flex-1 w-full bg-green-100 rounded-3xl mx-5 mt-3 p-6 overflow-y-auto space-y-4"
        ref={chatRef}
      >
        {messages.map((msg, i) =>
          msg.text === '...' ? <TypingMessage key={i} /> : <ChatMessage key={i} {...msg} />
        )}
      </div>

      <ChatbotInput
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        onSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
};
