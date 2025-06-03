// src/components/FloatingChat.jsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingButton } from './FloatingButton';
import { ChatPanel } from './ChatPanel';

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      <FloatingButton onClick={toggleChat} />

      <AnimatePresence>
        {isOpen && <ChatPanel onClose={toggleChat} />}
      </AnimatePresence>
    </>
  );
};
