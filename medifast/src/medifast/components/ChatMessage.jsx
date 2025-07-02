export const ChatMessage = ({ from, text }) => {
  const isUser = from === 'user';
  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <img
          src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1750309466/Sebasbot_2_t8vbsq.png"
          alt="bot"
          className="w-11 h-11 rounded-full mr-2"
        />
      )}
      <div
        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? 'bg-[#41b541] text-white rounded-br-none'
            : 'bg-white text-black rounded-bl-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
};
