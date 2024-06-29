import React, { useState } from "react";
import tradingview from "../../../../images/tradingview.png"; // Importa la imagen

const Body = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [percentage, setPercentage] = useState(0);
  const [customPercentages, setCustomPercentages] = useState([1, 2, 3, 5, 8]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPercentage = (index, newValue) => {
    const newPercentages = [...customPercentages];
    newPercentages[index] = newValue;
    setCustomPercentages(newPercentages);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditing(false); // Cierra el modal al hacer clic fuera de él
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-900 p-4 text-gray-200">
      {/* Barra de búsqueda y título */}
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
      </div>
      <div className="flex justify-center items-center h-full space-x-2">
        <input
          type="text"
          className="w-full max-w-lg rounded-md border-gray-700 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="🔍 Search by token contract address"
        />
        <button className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Search
        </button>
      </div>


      {/* Sección de descripción */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">📜 Token Description</h3>
        <p className="text-gray-300">
          Trump Oringinal Meme made by comunity for the comunitiy =)
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sección del gráfico */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="w-full h-auto bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Aquí puedes incrustar tu gráfico de TradingView */}
            <img className="max-w-full max-h-full" src={tradingview} alt="Gráfico de TradingView" />
          </div>
        </div>

        {/* Sección de compra y venta */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex justify-around mb-4">
            <button
              className={`px-20 py-4 rounded-t-lg focus:outline-none ${activeTab === "buy" ? "bg-blue-600" : "bg-gray-700"}`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button
              className={`px-20 py-4 rounded-t-lg focus:outline-none ${activeTab === "sell" ? "bg-red-600" : "bg-gray-700"}`}
              onClick={() => setActiveTab("sell")}
            >
              Sell
            </button>
          </div>
          <div className="bg-gray-700 p-4 rounded-b-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Quantity"
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
                  <div className="flex space-x-2 mb-4">
                  {customPercentages.map((value, index) => (
                    <button
                      key={index}
                      className="flex-1 px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                      onClick={() => setPercentage(value)}
                    >
                      {value}%
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    ✏️
                  </button>

                </div>
                <p className="text-gray-300">{percentage}%</p>
              </div>
              <button
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOutsideClick}>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">Edit percent</h3>
            <div className="space-y-4">
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
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
              onClick={() => setIsEditing(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Sección de comentarios y holders */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        {/* Sección de comentarios */}
        <div className="lg:col-span-3 bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
          {/* Botón de burn */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-2">💬 Coments</h3>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700">
              Burn Memes
            </button>
          </div>
          
          <div className="space-y-4">
          <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-300">This token is amazing, I love it! 🚀</p>
            </div>
            <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-300">Does anyone else think this is going to the moon? 🌕</p>
            </div>
            <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-300">I bought at the dip, hope it goes up soon! 📈</p>
            </div>
            {/* Añadir más comentarios según sea necesario */}
          </div>
          <div className="flex items-center mt-4">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-700 bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-2 px-4 py-2"
            placeholder="Escribe tu comentario..."
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700">
            Send
          </button>
        </div>

        </div>
        {/* Sección de holders */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
          <h3 className="text-2xl font-semibold mb-2">👥 Holders</h3>
          <ul className="space-y-2">
            <li className="bg-gray-700 p-2 rounded-lg flex justify-between">
              <span>Address 1</span> <span>10,000 MEME</span>
            </li>
            <li className="bg-gray-700 p-2 rounded-lg flex justify-between">
              <span>Address 2</span> <span>8,000 MEME</span>
            </li>
            <li className="bg-gray-700 p-2 rounded-lg flex justify-between">
              <span>Address 3</span> <span>5,000 MEME</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Body;
