import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingButton } from './FloatingButton';
import { ChatPanel } from './ChatPanel';

export const FloatingChat = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mostrar = isVisible && location.pathname !== '/medical-assistance';

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      <AnimatePresence>
        {mostrar && (
          <FloatingButton key="boton-flotante" onClick={toggleChat} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && mostrar && <ChatPanel onClose={toggleChat} />}
      </AnimatePresence>
    </>
  );
};
