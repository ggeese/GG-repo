import React, { useState, useEffect } from "react";
import { Collapse } from 'react-collapse';
import golden_coin from "../../../../images/gg_coin.png";
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

const Data_Pools = ({ handleStakeClick, toggleFormulario, formularioVisible }) => {

    const [PoolsMemes, setPoolsMemes] = useState([]);
    const [search, setSearch] = useState("");



    useEffect(() => {
        Axios.get("http://localhost:3001/db_pools_memes").then((response) => {
            setPoolsMemes(response.data);
        }).catch(error => {
            console.error('Error fetching pools_memes:', error);
        });
    }, []);


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

    return (
        <div className= "flex flex-col p-15 bg-gray-200 bg-opacity-70 rounded-3xl">

            <div className="flex flex-col">
                <div className = "flex justify-around rounded-3xl">


                    <div className = "flex flex-fil t- w-1/2 p-10 ">
                        <input 
                            value={search} 
                            onChange={searcher}
                            type="text" 
                            placeholder="Type here to Search memes all memes!!" 
                            className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-full"
                        />
                        <div className="px-5">
                            <button 
                            //={handleSearch}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                            Search
                            </button>
                        </div>
 
                    </div>
                    <div>
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
                                        <h3 className="text-sm font-bold mt-1">Earn Goose</h3>
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
                            
                            <div className="flex justify-center items-center">
                                <button className="bg-red-800 text-white font-semibold px-10 w-80 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                    onClick={() => handleStakeClick(item.stake_contract)}>
                                    + Stake
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
                                            <p className="px-2">Goose Earned</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                            n/a
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
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Data_Pools;
