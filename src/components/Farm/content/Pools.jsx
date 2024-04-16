import React, { useState, useContext } from "react";
import Stake from './Stake'
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';

// Componente que muestra una lista de servicios en una grilla

// Componente principal que incluye el componente GridContainer
const Pools = () => {

    const [showMyStake, setShowMyStake] = useState(false);
    const [selected_stake_contract, setSelected_stake_contract] = useState(null);

    const handleOnClose = () =>{ 
        setShowMyStake(false);
        setSelected_stake_contract(null);  // Resetea el token contract seleccionado al cerrar
    };

    

    const [formularioVisible, setFormularioVisible] = useState({});

    const toggleFormulario = (id) => {
        setFormularioVisible(prevState => ({
          ...prevState,
          [id]: !prevState[id]
        }));
      };
      


    const handleStakeClick = (stake_contract) => {
        setShowMyStake(true);
        setSelected_stake_contract(stake_contract);  // Guarda el token contract del item seleccionado
    };


    const GridContainer = () => {
        const items = [
            { title: 'Stake Manta', description: 'Descripción breve 1', imageUrl: 'https://placekitten.com/200/300', token:"xd",stake_contract:"0x6E33C6ad555CBBee4b539cB63Ef362dDEF7fe2f4" },
            { title: 'Título 2', description: 'Descripción breve 2', imageUrl: 'https://placekitten.com/200/301', token:"xd",stake_contract:"0x6E33C6ad555CBBee4b539ercB63Ef36s2dDEF7fe2f4" },
            { title: 'Título 3', description: 'Descripción breve 3', imageUrl: 'https://placekitten.com/200/302', token:"xd",stake_contract:"0x6E33C6ad555CBBeefx4b539scB63Ef362dDEF7fe2f4" },
            { title: 'Título 4', description: 'Descripción breve 4', imageUrl: 'https://placekitten.com/200/303', token:"xd",stake_contract:"0x6E33C6ader555CBBeae4b53s9cB63Ef362dDEF7fe2f4" },
            { title: 'Título 5', description: 'Descripción breve 5', imageUrl: 'https://placekitten.com/200/304', token:"xd",stake_contract:"0x6E33C6ad55ded5CBBee4b5a39cB63Ef362dDEF7fe2f4" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd",stake_contract:"0x6E33C6adkj555CBBee4b539scB63Ef362dDEF7fe2f4" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd",stake_contract:"0x6E33C6adfg555CB4Bee4b539cB63Ef362dDEF7fe2f4" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd",stake_contract:"0x6E33C6ad5gh55CB23Bee4b539cB63Ef362dDEF7fe2f4" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd",stake_contract:"0x6E33C6ad5nm552CBBee4b539cB63Ef362dDEF7fe2f4" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd",stake_contract:"0x6E33C6ad555tgrtCBBee44b539cB63Ef362dDEF7fe2f4" },
    
            // La repetición de títulos parece un error, asumiendo que debe ser único.
            // Asegúrate de ajustar los títulos y descripciones según sea necesario.
        ];
        return (
            
            <div className="flex flex-wrap gap-5 justify-center items-start">
                {items.map((item) => (
                    
                    <div key={item.stake_contract} className="p-3 border border-gray-300 rounded-3xl shadow bg-yellow-500">
                        <h4>{item.title}</h4>
                        <div className="mt-4 flex gap-3 justify-between">
                            <div className= "flex gap-1.5">
                                <div className="flex flex-shrink-0">
                                    <img src={item.imageUrl}/>
                                    <img src={item.imageUrl}/>
                                </div>
                            </div>
                                <div className="font-semibold">
                                    <h3 className="text-sm font-bold mt-1">Earn Goose</h3>
                                    <h3 className="text-sm font-bold mt-1">{item.title}</h3>
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
                                    <h3 className="font-medium text-md">1500000</h3>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-right"> APY</h3>
                                        <h3 className="font-semibold text-lg text-[#00BFB3]">~3%</h3>
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
                            <p>{item.description}</p>
                            <p>{item.token}</p>
                        
                        <div className="flex justify-center items-center">
                            <button className="bg-blue-500 text-white font-semibold px-10 w-80 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
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
                                    3x
                                </div>
                                <div>
                                    Multiplier
                                </div>
                                <div className="text-right">
                                    3X
                                </div>
                                <div className="flex gap-1 items-center">
                                    <div>
                                        imagen es Gull Earned
                                    </div>
                                </div>
                                <div className="text-right">
                                        n/a
                                </div>
                                
                                <div className="flex gap-1 items-center">
                                    <div>
                                        imagen
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
                            <e className="flex items-center gap-0.5" href="https://pacific-explorer.manta.network/address/0xEc901DA9c68E90798BbBb74c11406A32A70652C3" target="_blank">
                            View Token Contract
                            </e>
                        </div>
                        <div className="mt-4 flex flex-col items-end font-medium text-[#3DB3A9] leading-none gap-0.5">
                            <e className="flex items-center gap-0.5" href="https://pacific-explorer.manta.network/address/0xEc901DA9c68E90798BbBb74c11406A32A70652C3" target="_blank">
                            View Token Contract
                            </e>
                        </div>
                        </>
                        </Collapse>
                    </div>                    
                ))}
                
            </div>
        );
    };
    


    return (
        
        <div className="flex flex-col items-center bg-gray-200 text-black p-10 ">
            <div className="text-xl mb-7">
                Stake MEME tokens to Earn $GULL
            </div>
            <GridContainer />
            <Stake onClose = {handleOnClose} visible = {showMyStake} stake_contract={selected_stake_contract} />
        </div>
    );
};

export default Pools;
