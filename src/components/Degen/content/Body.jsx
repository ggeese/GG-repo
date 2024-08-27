import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import TradingViewChart from "./tvwidget";
import { useLocation, useNavigate } from "react-router-dom";
import no_image from "../../../../images/goldeng.png";
import { TransactionContextETH } from "../../../context/ContextETH/ContextETH";
import { TransactionContext } from "../../../context/TransactionContext";
import { Wallets } from '../../../';
import { Donate } from './';
import { Burn } from './';
import { Comments } from './';

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
  const [buyPercentage, setBuyPercentage] = useState(0); // Nuevo estado para porcentaje de compra
  const [sellPercentage, setSellPercentage] = useState(0); // Nuevo estado para porcentaje de venta
  const [percentage, setPercentage] = useState(0);
  const [customPercentages, setCustomPercentages] = useState([1, 2, 3, 5]);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const [memedata, setMemeData] = useState({});
  const [search, setSearch] = useState("");
  const [MemeBalance, setMemeBalance] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const currentmemedata = location.state?.meme || {};
  const { BuyMeme, SellMeme, FormData_6, handleChange_6, change_input_swap, Get_Token_Balance } = useContext(TransactionContextETH); 
  const { currentAccount, Balance } = useContext(TransactionContext); 
  const [showMyModal, setShowMyModal] = useState(false);
  const [showMyModalDonate, setShowMyModalDonate] = useState(false);
  const [showMyModalBurn, setShowMyModalBurn] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const handleOnCloseDonate = () => setShowMyModalDonate(false);
  const handleOnCloseBurn = () => setShowMyModalBurn(false);
  const [dataComments, setDataComments] = useState([]);
  const [Tablename, setTableName] = useState("");
  const [ChainNet,setChainNet] = useState("");
  const Navigate = useNavigate(); // Crear una instancia de useHistory

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/comments', {
          params: { tableName: Tablename, chainNet: ChainNet },  // Asegúrate de que estos nombres coincidan con los que espera el backend
        });
        // Convertir timestamp Unix a fecha legible
        const fetchedComments = response.data.map(comment => ({
          ...comment,
          date: new Date(comment.date * 1).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
        }));
        setDataComments(fetchedComments);
        console.log('data useefect comments', fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    if (Tablename && ChainNet) {
      console.log(Tablename, ChainNet,"parameter consult data one")
      fetchComments();
    }
  }, [Tablename, ChainNet]); // Actualiza dependencias según sea necesario
  

  useEffect(() => {
    if (currentmemedata && Object.keys(currentmemedata).length > 0) {
      setMemeData(currentmemedata);
      setTableName(currentmemedata.contract.substring(1));
      setChainNet(currentmemedata.network);
      console.log(currentmemedata, "current memedata")
      const fetchBalance = async () => {
        try {
          const meme_balance = await Get_Token_Balance(currentmemedata.contract, 18);
          console.log(meme_balance,"meme balance")
          setMemeBalance(meme_balance);

        } catch (error) {
          setMemeBalance(0);
          console.log("error getting meme balance", error);
        }
      };
      fetchBalance();
    }
  }, [currentmemedata]);
  
    // Función para cambiar entre pestañas
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      // Reiniciar el valor del input cuando se cambia de pestaña
      change_input_swap(0);
    };
  
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
    Navigate(`/Degen/${result.contract}`, { state: { result } });
    setSearchResults([]);
    setSearch("");
    const fetchBalance = async () => {
      try {
        const meme_balance = await Get_Token_Balance(result.contract, 18);
        setMemeBalance(meme_balance);
      } catch (error) {
        setMemeBalance(0);
      }
    };
    fetchBalance();
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
    //if( !contract ) return;

    BuyMeme(contract); 
  }
  const handleSell = (contract) => {
    //const { contract  } = FormData_5;
    //e5.preventDefault();
    //if( !contract ) return;

    SellMeme(contract); 
  }

  const handleClickpPercent = (value) => {
    if (activeTab === "buy") {
      setBuyPercentage(value);
      console.log("ETH value for buy", Balance * value / 100);
      change_input_swap(Balance * value / 100);
    } else if (activeTab === "sell") {
      setSellPercentage(value);
      console.log("ETH value for sell", MemeBalance * value / 100);
      change_input_swap(MemeBalance * value / 100);

    }
  };

  const handleEditPercentage = (index, newValue) => {
    const newPercentages = [...customPercentages];
    newPercentages[index] = newValue;
    setCustomPercentages(newPercentages);
  };

  const isValidData = (data) => {
    return typeof data === 'string' && data.trim() !== '';
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r rounded-3xl from-gray-800 via-black to-gray-900 p-4  max-w-7xl mx-auto">
      {/* Barra de búsqueda y título */}
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
      </div>
      <div className="flex justify-center items-center h-full text-gray-200 space-x-2 relative">
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
                key={`${result.id}-${result.contract}`} // Combina id con otra propiedad como contract
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
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 mb-6 text-white">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
            <img
              className="rounded-3xl w-auto h-24 object-cover border-2 border-gray-700 shadow-lg"
              src={memedata.image || no_image}
              alt={memedata.name}
            />
            <div className="flex flex-col justify-center items-center lg:items-start space-y-2">
              <h3 className="text-2xl font-semibold text-center lg:text-left">{memedata.name} ({memedata.ticker})</h3>
              <p className="text-md font-medium text-gray-400 text-center lg:text-left">{memedata.contract}</p>
              <p className="text-md font-medium text-gray-400 text-center lg:text-left">Network: {memedata.network}</p>
            </div>
          </div>
          <div className="flex justify-center w-full lg:w-auto">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mt-4 lg:mt-0 lg:ml-4 transition-transform transform hover:scale-105"
              onClick={() => setShowMyModalDonate(true)}
            >
              Airdrop
            </button>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center lg:text-left">
          {memedata.description}
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 text-white">
        {/* Sección del gráfico */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 lg:col-span-3">
          <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">

            <TradingViewChart 
              tableName={memedata?.contract ? memedata.contract.substring(1) : ''} 
              chainNet={memedata?.network ? memedata.network : ''} 
            />
          </div>
        </div>

        {/* Sección de compra y venta */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 lg:col-span-1">
        <div className="flex justify-around mb-6">
          <button
            className={`px-10 py-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none ${activeTab === "buy" ? "bg-blue-800 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTabChange('buy')}
          >
            Buy
          </button>
          <button
            className={`px-10 py-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none ${activeTab === "sell" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTabChange("sell")}
          >
            Sell
          </button>
        </div>

          <div className="bg-gray-700 p-4 rounded-b-lg">
            
            {activeTab === "buy" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Balance:</label> 
                    <p className="text-sm font-medium text-white">{parseFloat(Balance).toFixed(5)}</p>
                    </div>

                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="1" 
                      name_6="amountswap" 
                      type="number" 
                      value={FormData_6.amountswap}
                      handleChange_6={handleChange_6}
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="text-white">ETH</div>
                  </div>
                </div>

                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={buyPercentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full h-8"
                  />
                  <div className="flex space-x-1 mb-2">
                    {customPercentages.map((value, index) => (
                      <button
                        key={`percentage-${index}`} // Asegúrate de que esta key sea única
                        className="flex-1 px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                        onClick={() => handleClickpPercent(value)}
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
                  <p className="text-gray-300">{buyPercentage}%</p>
                </div>

                <div className="flex justify-center">
                  {currentAccount ? (
                    <button
                      onClick={() => handleBuy(memedata.contract)}
                      className="w-full py-2 rounded-md shadow-md bg-green-600 hover:bg-green-700"
                    >
                      Buy
                    </button>
                  ) : (
                    <button
                      className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                      onClick={() => setShowMyModal(true)}
                    >
                      <p className="text-black">Connect Wallet</p>
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "sell" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-white">Balance:</label> 
                      <p className="text-sm font-medium text-white">{parseFloat(MemeBalance).toFixed(5)}</p>
                    </div>                  
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="1" 
                      name_6="amountswap" 
                      type="number" 
                      value={FormData_6.amountswap}
                      handleChange_6={handleChange_6}
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="text-white">{memedata.ticker}</div>
                  </div>
                </div>

                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sellPercentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full h-8"
                  />
                  <div className="flex space-x-1 mb-2">
                    {customPercentages.map((value, index) => (
                      <button
                        key={index}
                        className="flex-1 px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
                        onClick={() => handleClickpPercent(value)}
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
                  <p className="text-gray-300">{sellPercentage}%</p>
                </div>

                <div className="flex justify-center">
                  {currentAccount ? (
                    <button
                      onClick={() => handleSell(memedata.contract)}
                      className="w-full py-2 rounded-md shadow-md bg-red-600 hover:bg-red-700"
                    >
                      Sell
                    </button>
                  ) : (
                    <button
                      className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                      onClick={() => setShowMyModal(true)}
                    >
                      <p className="text-black">Connect Wallet</p>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para editar los porcentajes */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white z-10" onClick={handleOutsideClick}>
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
      <div className="mt-4 text-white">
  <div className="flex flex-col lg:flex-row lg:space-x-4">
    {/* Sección de comentarios */}

    {memedata.twitch && (
      <div className="flex-none lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-4 mt-4 lg:mt-0">
        <h3 className="text-xl font-semibold mb-2">🎥 TWITCH (No Oficial)</h3>
        <div className="flex justify-center">
          <iframe
            src={`https://player.twitch.tv/?channel=${memedata.twitch.split('/').pop()}&parent=goldengcoin.github.io`}
            height="300"
            width="100%"
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    )}


    <div className="flex-1 lg:w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Comments (beta)</h3>
        <button 
          onClick={() => setShowMyModalBurn(true)}
          className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Burn
        </button>
      </div>
      <Comments
        contractMeme={memedata?.contract ? memedata.contract.substring(1) : ''} 
        chainNetwork={memedata?.network ? memedata.network : ''} 
        Comments={dataComments || []} 
      />
    </div>

    
    {/* Sección de holders */}
    <div className="flex-none lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-4 mt-4 lg:mt-0">
      <h3 className="text-xl font-semibold mb-2">🏆 Holders</h3>
      {/* Aquí puedes añadir la lógica y el componente para los holders */}
    </div>

    {/* Sección de Twitch */}

  </div>
</div>


      <Wallets onCloseWallets={handleOnClose} visibleWallets={showMyModal} />
      <Donate onCloseWallets={handleOnCloseDonate} visibleWallets={showMyModalDonate} memecontract={memedata.contract}/>
      <Burn onCloseWallets={handleOnCloseBurn} visibleWallets={showMyModalBurn} memecontract={memedata.contract} memeticker={memedata.ticker}/>


    </div>
  );
};

export default Body;
