import React, { useState, useEffect, useContext } from "react";
import { Collapse } from 'react-collapse';
import golden_coin from "../../../../images/gg_coin.png";
import { TransactionContext } from '../../../context/TransactionContext';
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';

import Axios from "axios";

const LoadingBox = () => (
    <div className="border border-gray-300 rounded-3xl shadow-sm overflow-hidden bg-gray-300" style={{ width: '350px', height:'300px' }}>
        <div className="flex flex-col items-center animate-pulse p-5 ">
            {/* Inserta aquí el contenido de tu caja de carga */}
            <p className="text-lg font-semibold text-center mt-auto mb-auto p-4">There is no POOL with this name...</p>
            <p className="text-lg font-semibold text-center mt-auto mb-auto p-4">Cuak Cuak Cuak!!!...</p>
                <p className="text-md font-semibold text-center mt-auto mb-auto ">Cuak Cuak Cuak...</p>
                <p className="text-md font-semibold text-center mt-auto mb-auto ">Cuak!!! Cuak Cuak...</p>
                <p className="text-md font-semibold text-center mt-auto mb-auto ">Cuak!!! Cuak Cuak Cuak...</p>
                <p className="text-md font-semibold text-center mt-auto mb-auto ">Cuak!!! Cuak Cuak Cuak Cuak...</p>
        </div>

    </div>
);

const PopUp_Unstake = ({item_1, handleStakeClick_1, handleUnStakeClick_1, handleClaimClick_1}) => (
    
    <div>
        <div className="rounded-lg px-4 py-2 border-2 border-black mt-2 bg-[#C2EAFF]" style={{ width: '320px'}}>
                <div className="text-center text-lg font-semibold">
                    Staked Position
                </div>
                <div className="mt-4">
                    <div className="flex gap-1.5">
                        <div className="flex flex-shrink-0 w-[42px] h-[42px]">
                            image
                        </div>
                    <div className="font-semibold leading-none">
                        <div className="leading-none uppercase font-normal text-sm">
                            {item_1.token_name} Staked  :
                        </div>
                        <div className="mt-1.5 text-base">
                            100
                        </div>
                        <div className="mt-0.5 text-xs text-[#2A6B9B]">
                            $ 0.0002
                        </div>

                    </div>
                    </div>

                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black shadow hover:bg-blue-600 border-2 border-black h-9 px-4 py-2 rounded-xl font-semibold normal-case bg-gradient-to-r from-yellow-200 to-yellow-400"
                        onClick={() => handleStakeClick_1(item_1.stake_contract, item_1.token, item_1.token_name)}>
                        Stake
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white shadow hover:bg-blue-600 border-2 border-black h-9 px-4 py-2 rounded-xl font-semibold normal-case bg-gradient-to-r from-gray-500 to-gray-700"
                        onClick={() => handleUnStakeClick_1(item_1.stake_contract, item_1.token, item_1.token_name)}>
                        Unstake
                    </button>

                </div>
                <div className="mt-6 mb-5 space-y-5">
                    <div className="border-t-2 border-dashed border-[#9c9c9c] w-full">
                    </div>
                    <div className="flex flex-wrap items-center">
                        <div className="w-max flex-shrink-0 flex gap-1 items-center">
                            imagen
                            esToken earned
                        </div>
                        <div className="ml-auto font-semibold">
                            0.0001
                        </div>

                    </div>
                    <div className="border-t-2 border-dashed border-[#9c9c9c] w-full"></div>
                    <div className="flex flex-wrap items-center">
                        <div className="w-max flex-shrink-0 flex gap-1 items-center">
                            imagen Points earned
                        </div>
                        <div className="ml-auto font-semibold">
                            {item_1.Points}
                        </div>
                    </div>
                    <div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black shadow hover:bg-blue-600 border-2 border-black h-9 px-4 py-1 rounded-xl font-semibold normal-case bg-gradient-to-r from-orange-300 to-orange-500"
                        onClick={() => handleClaimClick_1(item_1.stake_contract)}>
                        Claim
                    </button>
                    </div>
                </div>

        </div>
                    <div className="mt-4 flex flex-col items-end font-medium text-[#3DB3A9] leading-none gap-0.5">
                    <a className="flex items-center gap-0.5" href={"https://pacific-explorer.manta.network/address/"+item_1.token} target="_blank">
                        View Token Contract                            
                    </a>
                </div>
                <div className="mt-4 flex flex-col items-end font-medium text-[#3DB3A9] leading-none gap-0.5">
                    <a className="flex items-center gap-0.5" href={"https://pacific-explorer.manta.network/address/"+item_1.stake_contract} target="_blank">
                        View Staking Contract                            
                    </a>
                </div>
    </div>
);


const Data_Pools = ({ handleStakeClick, handleUnStakeClick, handleClaimClick, toggleFormulario, formularioVisible }) => {

    const [PoolsMemes, setPoolsMemes] = useState([]);
    const [UserPools, setUserPools] = useState([]);
    const [search, setSearch] = useState("");
    const { currentAccount } = useContext(TransactionContext); 
    const { Points_Earned } = useContext(TransactionContextETH); 


    useEffect(() => {
        //Axios.get("http://localhost:3001/db_pools_memes").then((response) => {
        Axios.get("https://app-memes-golden-g-goose.onrender.com/db_pools_memes").then((response) => {
            setPoolsMemes(response.data);
            console.log("pools memesXD",response.data)
        }).catch(error => {
            console.error('Error fetching pools_memes:', error);
        });
    }, []);
    

    useEffect(() => {
        //Axios.get("http://localhost:3001/db_stakers", {
        Axios.get("https://app-users-5z99.onrender.com/db_stakers", {
          params: {
            address: currentAccount
          }
        })
        .then(response => {
            console.log("server data user pools!!!!")
            console.log(response.data); // Maneja la respuesta del servidor aquí
            setUserPools(response.data); // Actualiza el estado con los datos del servidor
        })
        .catch(error => {
          console.error('Error al enviar la dirección:', error);
          // Aquí puedes manejar el error según sea necesario
        });
      }, []);

      useEffect(() => {
        const fetchPoints = async () => {
            // Mapear los items y obtener los puntos ganados para cada uno
            const pointsPromises = PoolsMemes.map(async (item) => {
                const points = await Points_Earned(item.stake_contract);
                return { ...item, Points: points }; // Agregar la propiedad "Points" al objeto
            });
    
            // Esperar a que se resuelvan todas las promesas
            const resolvedPoints = await Promise.all(pointsPromises);
    
            // Actualizar el estado con los puntos ganados
            setPoolsMemes(resolvedPoints);
            console.log(resolvedPoints, "resolvend points!!!")
        };
    
        fetchPoints();
    }, [Points_Earned]); // Asegúrate de incluir Points_Earned como dependencia
    


    const searcher = (e) => {
        setSearch(e.target.value);
    };

    let items = [];
    if (!search) {
        items = PoolsMemes;
    } else {
        items = PoolsMemes.filter((item) =>
        item.token_name.toLowerCase().includes(search.toLowerCase())
    );
    }
    console.log(" ITEMS ",items)

    return (
        <div className= "flex flex-col p-15 bg-gray-200 bg-opacity-70 rounded-3xl">

            <div className="flex flex-col">
            <div className="flex flex-wrap justify-center md:justify-around rounded-3xl p-5">
                <div className="flex flex-1 items-center w-full md:w-2/3 lg:w-1/2 px-10 md:p-5">
                    <input 
                        value={search} 
                        onChange={searcher}
                        type="text" 
                        placeholder="Type here to Search all memes!!" 
                        className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                    <div className="ml-2">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                            Search
                        </button>
                    </div>
                </div>
            </div>


                <div className="flex flex-wrap gap-5 justify-center p-10 items-start">
                
                { items.length === 0 ? (
                    <>
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />

                    </>
                ) :
                    items.map((item) => (
                        <div key={item.stake_contract} className="p-3 border border-gray-300 rounded-3xl bg-amber-400">
                            <div className=" flex gap-3 justify-between">
                                <div className= "flex gap-1.5">
                                    <div className="flex flex-shrink-0 p-2">
                                        <img className="w-auto h-7" src={golden_coin}/>
                                        <img className="w-auto h-7" src={item.imageUrl}/>
                                    </div>
                                    <div className="font-semibold">
                                        <h3 className="text-sm font-bold mt-1">Earn GG</h3>
                                        <h3 className="text-sm font-bold mt-1">{item.token_name}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-shrink-0 w-max gap-1">
                                    <div>

                                    </div>
                                    <div className="border select-none h-max bg-[#fff0b8] font-light py-1 leading-none px-1.5 text-xs rounded-md">
                                        3x
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="font-medium text-md">Staked TVL:</h3>
                                        <h3 className="font-medium text-md">{item.tvl_stk}</h3>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-right"> APY</h3>
                                            <h3 className="font-semibold text-lg text-[#00BFB3]">{item.apy}%</h3>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-md font-bold mt-1">Stakers:</h3>
                                    </div>
                                    <div className="text-right">
                                        Rewards
                                    </div>
                                </div>    
                            </div>

                            <div className="flex flex-items justify-between p-1">
                                <p className="flex justify-end">{item.stakers}</p>
                                <img src={golden_coin} className="w-auto h-6" alt="Golden coin" />
                            </div>

                        {UserPools.includes(item.stake_contract.toLowerCase()) ? 
                            <PopUp_Unstake key={item.stake_contract} item_1={item} handleStakeClick_1={handleStakeClick} handleUnStakeClick_1={handleUnStakeClick} handleClaimClick_1={handleClaimClick}/>
                        : 
                        <div>
                            <div className="flex flex-fil justify-center gap-1 items-center">
                            <button 
                                className="bg-red-800 text-white font-semibold px-5 w-40 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                onClick={() => {
                                    handleStakeClick(item.stake_contract, item.token, item.token_name, item.decimals);
                                    //changenetwork("Base Sepolia");
                                }}
                            >
                                + Stake
                            </button> 
                                                        <button className="bg-gray-300 text-black font-semibold px-5 w-40 py-2 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                    onClick={() => handleUnStakeClick(item.stake_contract, item.token, item.token_name, item.decimals)}>
                                    - Unstake
                                </button>  
                            </div>

                            <button className="flex justify-center items-center w-full mt-2 text-center py-2 font-semibold"
                                onClick={() => toggleFormulario(item.stake_contract)}>
                                details
                            </button>   
                            
                            
                            <Collapse isOpened={formularioVisible[item.stake_contract]|| false}>
                            
                            <>
                            <div className="border-t-2 border-dashed border-[#9c9c9c] w-full mt-4"></div> 
                            <div className="py-2 pl-3 CollapsibleContent text-sm">
                                <div className="grid grid-cols-2 gap-x-2 gap-y-2 items-center">
                                    <div>
                                        staked liquidity
                                    </div>
                                    <div className="text-right">
                                        $ {item.stk_liq}
                                    </div>
                                    <div>
                                        Multiplier
                                    </div>
                                    <div className="text-right">
                                        3X
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex flex-items">
                                            <img src={golden_coin} className="w-auto h-6" alt="Golden coin" />
                                            <p className="px-2">GG Earned</p>
                                        </div>
                                    </div>
                                    <div className="text-right">

                                    </div>
                                    
                                    <div className="flex gap-1 items-center">
                                        <div>
                                        <img src={golden_coin} className="w-auto h-6" alt="Golden coin" />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        n/a
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex flex-col items-end font-medium text-[#3DB3A9] leading-none gap-0.5">
                                <a className="flex items-center gap-0.5" href={"https://pacific-explorer.manta.network/address/"+item.token} target="_blank">
                                    View Token Contract                            
                                </a>
                            </div>
                            <div className="mt-4 flex flex-col items-end font-medium text-[#3DB3A9] leading-none gap-0.5">
                                <a className="flex items-center gap-0.5" href={"https://pacific-explorer.manta.network/address/"+item.stake_contract} target="_blank">
                                    View Staking Contract                            
                                </a>
                            </div>
                            </>
                            </Collapse>
                        </div>   
                        }
                        </div>   
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Data_Pools;
