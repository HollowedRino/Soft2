// src/components/FloatingButton.jsx
export const FloatingButton = ({ onClick }) => {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onClick}
          className="rounded-full bg-[#41b541] shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <img
            src="https://res.cloudinary.com/dgo6yjmut/image/upload/v1748984887/97e9cc3be4316d17c887ad825eb7e884d0f838a2_jd0gmi.png"
            alt="Chat"
            className="w-35 h-35"
          />
        </button>
      </div>
    );
  };
  