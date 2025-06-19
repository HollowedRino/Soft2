import SendIcon from '@mui/icons-material/Send';

export const ChatbotInput = ({ input, onChange, onKeyPress, onSend, disabled }) => (
  <div className="sticky bottom-0 bg-white px-5 py-3 shadow-inner">
    <div className="flex items-center bg-[#41b541] rounded-full px-3 py-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-full bg-white border-none outline-none focus:ring-0 text-sm"
        placeholder="Escribe tu mensaje..."
        value={input}
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
      <button
        onClick={onSend}
        className="text-white p-2 hover:text-gray-100 transition"
        disabled={disabled}
      >
        <SendIcon />
      </button>
    </div>
  </div>
);
