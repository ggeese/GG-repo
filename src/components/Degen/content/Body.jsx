import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import TradingViewChart from "./tvwidget2";
import { useLocation } from "react-router-dom";
import no_image from "../../../../images/goldeng.png";
import { TransactionContextETH } from "../../../context/ContextETH/ContextETH";

const Input = ({ placeholder, name_6, type, value, handleChange_6 }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e6) => handleChange_6(e6, name_6)}
      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

  />
);  


const Body = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [percentage, setPercentage] = useState(0);
  const [customPercentages, setCustomPercentages] = useState([1, 2, 3, 5]);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const [memedata, setMemeData] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const currentmemedata = location.state?.meme || {};
  const { BuyMeme, SellMeme, handleChange_6 } = useContext(TransactionContextETH); 


  useEffect(() => {
    if (currentmemedata && Object.keys(currentmemedata).length > 0 && currentmemedata !== memedata) {
      setMemeData(currentmemedata);
      console.log("memedata", currentmemedata)
    }
  }, [currentmemedata, memedata]);

  const handleSearch = async () => {
    try {
      //const response = await Axios.get("https://app-memes-golden-g-goose.onrender.com/db_memes", {
      const response = await Axios.get("http://localhost:3001/db_memes", {
        params: {
          name: search,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  const handleSelectResult = (result) => {
    setMemeData(result);
    setSearchResults([]);
    setSearch("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditing(false);
    }
  };


  const handleBuy = (contract) => {
    //const { contract  } = FormData_5;
    //e5.preventDefault();
    console.log("pasas [por aqui buy memecoin ")
    //if( !contract ) return;

    BuyMeme(contract); 
  }
  const handleSell = (contract) => {
    //const { contract  } = FormData_5;
    //e5.preventDefault();
    console.log("pasas [por aqui sell memecoin ")
    //if( !contract ) return;

    SellMeme(contract); 
  }
  const handleEditPercentage = (index, newValue) => {
    const newPercentages = [...customPercentages];
    newPercentages[index] = newValue;
    setCustomPercentages(newPercentages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r rounded-3xl from-gray-800 via-black to-gray-900 p-4 text-gray-200 max-w-7xl mx-auto">
      {/* Barra de búsqueda y título */}
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
      </div>
      <div className="flex justify-center items-center h-full space-x-2 relative">
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
          <div className="absolute top-full mt-2 w-full max-w-lg bg-gray-800 rounded-md shadow-lg z-10">
            {searchResults.map((result) => (
              <div
                key={result.id} // Agrega una key única aquí
                onClick={() => handleSelectResult(result)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
              >
                {result.name}   {result.contract}

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de descripción */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-4 mb-4">
      <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-2 lg:space-y-0 lg:space-x-2">
        <img
          className="rounded-3xl p-1 w-auto h-8 lg:w-auto lg:h-8 object-cover border-2 border-gray-700 shadow-lg"
          src={memedata.image || no_image}
          alt={memedata.name}
        />
        <div className="flex flex-col justify-center items-center lg:items-start space-y-2">
          <h3 className="text-xl font-semibold text-center lg:text-left">{memedata.name}</h3>
          <h3 className="text-md font-medium text-gray-400 text-center lg:text-left">{memedata.contract}</h3>
          <h3 className="text-md font-medium text-gray-400 text-center lg:text-left">Network: {memedata.network}</h3>
        </div>
      </div>
      <p className="text-gray-300 mt-4 text-center lg:text-left">
        {memedata.description}
      </p>


      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {/* Sección del gráfico */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 lg:col-span-3">
          <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
            <TradingViewChart tableName={currentmemedata.contract} />
          </div>
        </div>

        {/* Sección de compra y venta */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 lg:col-span-1">
          <div className="flex justify-around mb-4">
            <button
              className={`px-10 py-4 rounded-t-lg focus:outline-none ${activeTab === "buy" ? "bg-blue-600" : "bg-gray-700"}`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button
              className={`px-10 py-4 rounded-t-lg focus:outline-none ${activeTab === "sell" ? "bg-red-600" : "bg-gray-700"}`}
              onClick={() => setActiveTab("sell")}
            >
              Sell
            </button>
          </div>

          <div className="bg-gray-700 p-4 rounded-b-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <Input 
                  placeholder="1" 
                  name_6="amountswap" 
                  type="number" 
                  handleChange_6={handleChange_6}
                />

              </div>

              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full h-8"
                />
                <div className="flex space-x-1 mb-2">
                  {customPercentages.map((value, index) => (
                    <button
                      key={index} // Agrega una key única aquí
                      className="flex-1 px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                      onClick={() => setPercentage(value)}
                    >
                      {value}%
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    ✏️
                  </button>
                </div>
                <p className="text-gray-300">{percentage}%</p>
              </div>
              <button
                onClick={() => (activeTab === "buy" ? handleBuy(memedata.contract) : handleSell(memedata.contract))}
                className={`w-full py-2 rounded-md shadow-md ${activeTab === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                {activeTab === "buy" ? "Buy" : "Sell"}
              </button>


            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar los porcentajes */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={handleOutsideClick}>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">Edit Percentages</h3>
            <div className="space-y-2">
              {customPercentages.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleEditPercentage(index, parseFloat(e.target.value))}
                    className="flex-1 rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de comentarios */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add a comment"
              />
              <button className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add
              </button>
            </div>
            <button className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Burn
            </button>
          </div>
          {/* Aquí puedes añadir la lógica y el componente para los comentarios */}
        </div>

        {/* Sección de holders */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
          <h3 className="text-xl font-semibold mb-2">🏆 Holders</h3>
          {/* Aquí puedes añadir la lógica y el componente para los holders */}
        </div>
      </div>
    </div>
  );
};

export default Body;
