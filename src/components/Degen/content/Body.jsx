import React, { useState, useEffect, useContext, useRef } from "react";
import { dbMemesPoint, AppDataPoint, AppSocialPoint } from '../../../utils/axiossonfig';
import TradingViewChart from "./tvwidget";
import UniTradingViewChart from './unitvwidget'; // Importa tu primer gráfico
import { TransactionContextETH } from "../../../context/ContextETH/ContextETH";
import { TransactionContext } from "../../../context/TransactionContext";
import { Donate, Searcher } from './';
import { Burn } from './';
import { Comments } from './';
import { Description } from "./";
import { useParams } from "react-router-dom";
import TransportMethod from './switch';
import useTokenBalance  from '../../../context/Hooks/GetBalance';
import LoginButton from '../../LoginButton';
import { useAccount } from 'wagmi';

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
  const [memedata, setMemeData] = useState({});
  const { BuyMeme, SellMeme, FormData_6, handleChange_6, change_input_swap } = useContext(TransactionContextETH); 
  const { currentAccount, factoryContract, BuyMemeBase, walletext, switchPool, setSwitchPool, currentbalance} = useContext(TransactionContext); 
  const [showMyModal, setShowMyModal] = useState(false);
  const [showMyModalDonate, setShowMyModalDonate] = useState(false);
  const [showMyModalBurn, setShowMyModalBurn] = useState(false);
  const [ProtectTime, setProtectTime] = useState(null);
  const [Tradestarted, setTradestarted] = useState(null);
        // Extraer el 'id' de la URL que contiene tanto el contract como el network
  const { id } = useParams();
  const prevIdRef = useRef();
  const handleOnClose = () => setShowMyModal(false);
  const handleOnCloseDonate = () => setShowMyModalDonate(false);
  const handleOnCloseBurn = () => setShowMyModalBurn(false);
  const [dataComments, setDataComments] = useState([]);
  const [Tablename, setTableName] = useState("");
  const [ChainNet,setChainNet] = useState("");
  const [MemeFee, setMemeFee] = useState(null);
  const [UniContract, setUniContract] = useState("");
  const { balance: MemeBalance} = useTokenBalance(id.split('-')[1], currentAccount, 18);
  const { balance: MemeTreasury} = useTokenBalance(id.split('-')[1], factoryContract, 18);
  const { address } = useAccount();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await AppSocialPoint.get('/comments', {
        //const response = await Axios.get('https://app-social-gg.onrender.com/comments', {

          params: { tableName: Tablename, chainNet: ChainNet },
        });

        const fetchedComments = response.data.map(comment => ({
          ...comment,
          date: comment.date,  // No se realiza la conversión aquí
        }));

        setDataComments(fetchedComments);
        console.log('data useEffect comments', fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (Tablename && ChainNet) {
      fetchComments();
    }
  }, [Tablename, ChainNet]); // Dependencias específicas para comentarios

  useEffect(() => {
    if (prevIdRef.current !== id) {
      const allMemeData = async () => {
        console.log("Enviando solicitud de búsqueda por contrato...");
        const [searchNetwork, searchContract] = id.split('-');

        try {
          const response = await dbMemesPoint.get('/meme_by_contract', {
            params: {
              contract: searchContract,
              network: searchNetwork,
            }
          });
          setMemeData(response.data);
        } catch (error) {
          console.error('Error fetching meme data:', error);
        }

        try {
          const checkpool = await AppDataPoint.get('/meme_pool', {
            params: {
              contract: searchContract,
              network: searchNetwork,
              AMM: "UNI",
            }
          });
          console.log(checkpool.data.pairAddress, "check pool address");
          setUniContract(checkpool.data.pairAddress);
        } catch (error) {
          console.error('Error fetching pool data:', error);
        }
      };

      allMemeData();
      prevIdRef.current = id; // Actualiza el ref con el nuevo id
    }
  }, [id]); // Dependencia específica para meme data
  

  useEffect(() => {
    const fetchMemeFee = async () => {
      console.log("memdata fee XD")

      if (memedata && memedata.contract) {
        try {
          const [searchNetwork, searchContract] = id.split('-');

          const memefeesdata = await AppDataPoint.get('/meme_data', {
            params: {
              contract_meme: searchContract,
              network: searchNetwork,
            }
          });
          console.log(memefeesdata.data.memefeestring,"memdata fee XD")
          setMemeFee(memefeesdata.data.memefeestring);
          setProtectTime(memefeesdata.data.protectminutes);
          setTradestarted(memefeesdata.data.startTrade);
        } catch (error) {
          console.error("Error Meme Fee:", error);
        }
      }
    };
    fetchMemeFee();
  }, [memedata]);

  // Función para cambiar entre pestañas
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reiniciar el valor del input cuando se cambia de pestaña
    change_input_swap(0);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditing(false);
    }
  };

  const handleBuy = (contract) => {
    if (walletext==="Base Wallet") {
      BuyMemeBase(contract, FormData_6.amountswap); 
    } else{
      BuyMeme(contract); 
    }
  }

  const handleSell = (contract) => {

      SellMeme(contract); 
  }

  const handleClickpPercent = (value) => {
    if (activeTab === "buy") {
      setBuyPercentage(value);
      const ethValueForBuy = (currentbalance.data?.formatted ? parseFloat(currentbalance.data.formatted) : 0) * value / 100;
      change_input_swap(ethValueForBuy);
      
    } else if (activeTab === "sell") {
      setSellPercentage(value);
      const ethValueForSell = (MemeBalance * value) / 100;
      change_input_swap(ethValueForSell);
    }
  };
  

  const handleEditPercentage = (index, newValue) => {
    const newPercentages = [...customPercentages];
    newPercentages[index] = newValue;
    setCustomPercentages(newPercentages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r rounded-3xl from-gray-800 via-black to-gray-900 p-4  max-w-7xl mx-auto">
      {/* Barra de búsqueda y título */}
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
      </div>

      <Searcher
        setMemeData={setMemeData} 
        setTableName={setTableName}
        setChainNet ={setChainNet}
      />
      <Description
        memedata={memedata}
        MemeFee={MemeFee}
        Tradestarted={Tradestarted}
        ProtectTime={ProtectTime}
        setShowMyModalDonate={setShowMyModalDonate}
      />

      {/* Contenedor principal */}

      <div className="flex flex-col lg:flex-row gap-2 text-white">
        {/* Sección del gráfico */}
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4 lg:col-span-3">
          <div className="relative">
            <div className="absolute top-2 right-3 z-20"> {/* Cambié left-1 a right-4 para moverlo a la derecha */}
              <TransportMethod switchPool={switchPool} setSwitchPool={setSwitchPool}/>
            </div>
          </div>
          <div className="w-auto h-96 bg-gray-700 rounded-lg flex items-center justify-center">
            

            {switchPool === "GG" ? (

              <TradingViewChart 
                tableName={memedata?.contract ? memedata.contract.substring(1) : ''} 
                chainNet={memedata?.network ? memedata.network : ''} 
                SetOpenDonate={setShowMyModalDonate}
              />
            ) : (
                <UniTradingViewChart
                poolContract={UniContract? UniContract : ''}
                chainNet={memedata?.network ? memedata.network : ''}
                SetOpenDonate={setShowMyModalDonate}
              />
            )}
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
                    <p className="text-sm font-medium text-white">
                      {currentbalance.data?.formatted ? parseFloat(currentbalance.data.formatted).toFixed(5) : '0.00000'}
                    </p>
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
                      onClick={() => handleBuy(id.split('-')[1])}
                      className="w-full py-2 rounded-md shadow-md bg-green-600 hover:bg-green-700"
                    >
                      Buy
                    </button>
                  ) : (
                    <div className="bg-black rounded-3xl px-3 w-min mt-3">
                    {!address && <LoginButton />}
                  </div>
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
                      onClick={() => handleSell(id.split('-')[1])}
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


      <Donate onCloseWallets={handleOnCloseDonate} visibleWallets={showMyModalDonate} memedata={memedata} TreasuryBalance={MemeTreasury}/>
      <Burn onCloseWallets={handleOnCloseBurn} visibleWallets={showMyModalBurn} memecontract={memedata.contract} memeticker={memedata.ticker}/>


    </div>
  );
};

export default Body;
