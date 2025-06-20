import { useContext, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatbotInput } from '../components/ChatbotInput';
import { TypingMessage } from '../components/TypingMessage';
import { ChatbotContext } from '../../contexts/ChatbotProvider';

export const AttendancePage = () => {
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
    <div className="flex flex-col h-screen bg-[#f0fff4]">
      <h1 className="text-2xl font-bold px-6 pt-5 text-left text-[#2e7d32]">SebasBot</h1>

      <div
        className="flex-1 w-full bg-green-100 rounded-3xl mx-5 mt-3 p-6 overflow-y-auto space-y-4"
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
