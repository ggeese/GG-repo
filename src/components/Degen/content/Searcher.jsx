// Searcher.jsx
import React, { useState, useEffect, useRef } from "react";
import { dbMemesPoint } from '../../../utils/axiossonfig'
import { useNavigate } from "react-router-dom";

const Searcher = ({ setMemeData, setTableName, setChainNet}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const Navigate = useNavigate();
  const searchResultsRef = useRef(null); // Ref para el contenedor de resultados de búsqueda

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  


  const handleSearch = async () => {
    try {
      const response = await dbMemesPoint.get('/db_memes', {
        params: { search: search },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  const handleSelectResult = (result) => {
    setMemeData(result);
    setTableName(result.contract.substring(1));
    setChainNet(result.network);
    Navigate(`/Degen/${result.contract}-${result.network}`, { state: { result } });
    setSearchResults([]);
    setSearch("");

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center h-full text-gray-200 space-x-2 z-30 relative">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        className="w-full max-w-lg rounded-md border-gray-700 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="🔍 Search by token contract address"
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
      {searchResults.length > 0 && (
        <div ref={searchResultsRef} className="absolute top-full mt-2 w-full max-w-lg bg-gray-800 rounded-md shadow-lg z-10">
          {searchResults.map((result) => (
            <div
              key={`${result.id}-${result.contract}`}
              onClick={() => handleSelectResult(result)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {result.name} {result.contract}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searcher;
