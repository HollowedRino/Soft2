import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("aaaa")
    const value = query.trim();
    if (value === "") {
      navigate("/medicamentos/todos");
    } else {
      navigate(`/medicamentos/${encodeURIComponent(value)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        navigate(`/medicamentos/${encodeURIComponent(value.trim())}`);
      }
    }, 1000);
  };

  return (
    <div className="flex w-full lg:w-auto flex-grow items-center space-x-2 mx-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar por nombre de medicamento"
        className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <button
        className="bg-[#41b541] text-white p-2 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="h-5 w-5 " />
      </button>
    </div>
  );
};
