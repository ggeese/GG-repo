import React, { useState, useContext } from "react";
import Stake from './Stake'
import { Link } from 'react-router-dom';

// Componente que muestra una lista de servicios en una grilla

// Componente principal que incluye el componente GridContainer
const Pools = () => {

    const [showMyStake, setShowMyStake] = useState(false);

    const handleOnClose = () => setShowMyStake(false);

    const GridContainer = () => {
        const items = [
            { title: 'Stake Manta', description: 'Descripción breve 1', imageUrl: 'https://placekitten.com/200/300', token:"xd" },
            { title: 'Título 2', description: 'Descripción breve 2', imageUrl: 'https://placekitten.com/200/301', token:"xd" },
            { title: 'Título 3', description: 'Descripción breve 3', imageUrl: 'https://placekitten.com/200/302', token:"xd" },
            { title: 'Título 4', description: 'Descripción breve 4', imageUrl: 'https://placekitten.com/200/303', token:"xd" },
            { title: 'Título 5', description: 'Descripción breve 5', imageUrl: 'https://placekitten.com/200/304', token:"xd" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd" },
            { title: 'Título 6', description: 'Descripción breve 6', imageUrl: 'https://placekitten.com/200/305', token:"xd" },
    
            // La repetición de títulos parece un error, asumiendo que debe ser único.
            // Asegúrate de ajustar los títulos y descripciones según sea necesario.
        ];
        return (
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 ">
                {items.map((item, index) => (
                    <div key={index} className="p-3 border border-gray-300 rounded-3xl shadow bg-yellow-500">
    
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
                                onClick={() => setShowMyStake(true)}>
                                + Stake
                            </button>  
                        </div>  
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
            <Stake onClose = {handleOnClose} visible = {showMyStake}/>
        </div>
    );
};

export default Pools;
