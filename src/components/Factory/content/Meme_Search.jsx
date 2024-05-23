import React, { useState, useEffect, useContext } from "react";
import { TransactionContext } from '../../../context/TransactionContext';
import discordImage from "../../../../images/discordia.png";
import telegram from "../../../../images/telegrama.png";
import webpage from "../../../../images/internet.png";
import twitter from "../../../../images/twitter.png";
import metamask from "../../../../images/metamask.svg";
import etherscan from "../../../../images/etherscan_logo.svg";
import copy_logo from "../../../../images/copy.svg";
import Axios from "axios";

const LoadingBox = () => (
    <div className="border border-gray-300 rounded-3xl shadow-sm overflow-hidden bg-white bg-opacity-80" style={{ width: '300px', height:'550px' }}>
        <div className="flex flex-col items-center animate-pulse p-5 ">
            <div className="flex border justify-center border-gray-300 rounded-3xl shadow-sm overflow-hidden bg-white bg-opacity-50" style={{ width: '200px', height:'200px' }}></div>
            <p className="text-lg font-semibold text-center mt-auto mb-auto p-4">loading...</p>
            <p className="text-lg font-semibold text-center mt-auto mb-auto p-4">Cuak Cuak Cuak!!!...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak Cuak Cuak...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak!!! Cuak Cuak...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak Cuak! Cuak...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak!!! Cuak Cuak Cuak...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak!!! Cuak Cuak...</p>
            <p className="text-md font-semibold text-center mt-auto mb-auto">Cuak!!! Cuak Cuak Cuak Cuak...</p>
        </div>
    </div>
);

const Meme_Search = () => {
    const { add_metamask } = useContext(TransactionContext); 

    const [memes, setMemes] = useState([]);
    const [search, setSearch] = useState("");
    const [scalingButtons, setScalingButtons] = useState({});

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleButtonClick = (contract) => {
        setScalingButtons(prevState => ({
            ...prevState,
            [contract]: true
        }));

        navigator.clipboard.writeText(contract)
            .then(() => {
                console.log('Contract copied to clipboard:', contract);
            })
            .catch((error) => {
                console.error('Error copying contract to clipboard:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setScalingButtons(prevState => ({
                        ...prevState,
                        [contract]: false
                    }));
                }, 400); // Duración de la animación en milisegundos
            });
    };
    
    useEffect(() => {
        Axios.get("http://localhost:3001/db_memes", {
            params: {}
        }).then((response) => {
            setMemes(response.data);
            console.log(response.data, "meme data");
        }).catch(error => {
            console.error('Error fetching memes:', error);
        });
    }, []);
    
    const handleSearch = async () => {
        try {
            console.log("Enviando solicitud de búsqueda...");
            const response = await Axios.get("http://localhost:3001/db_memes", {
                params: {
                    name: search, // Usar el estado 'search' en lugar de 'memes'
                }
            });

            // Actualizar el estado 'memes' con los resultados de la búsqueda
            setMemes(response.data);
        } catch (error) {
            console.error('Error fetching memes:', error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    let results = [];
    if (!search) {
        results = memes;
    } else {
        results = memes.filter((meme) =>
            meme.name && meme.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    console.log(results, " results");
    return (
        <div className="flex flex-col p-5 " > {/* Fondo cálido */}
        <div className="rounded-2xl ">

            <div className="flex flex-col">
                <p className="flex text-7xl p-10 justify-center text-center">Golden Hatchlings</p>
                <div className="flex justify-around  rounded-2xl ">
                    <div className="flex flex-fil w-1/2 p-10">
                        <input 
                            value={search} 
                            onChange={searcher}
                            type="text" 
                            onKeyDown={handleKeyPress}
                            placeholder="Type here to Search memes all memes!!" 
                            className="form-control block px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none w-full"
                        />
                        <div className="px-5">
                            <button 
                                onClick={handleSearch}
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="mt-1 min-h-[42px] flex items-center">
                        <button className="flex items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[120px] border-2 border-orange-600 bg-white bg-opacity-80 h-[42px]">
                            Sort
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 rounded-3xl flex flex-wrap gap-5 justify-center items-start p-4 ">
                { results.length === 0 ? (
                    <>
                        <LoadingBox />
                        <LoadingBox />
                        <LoadingBox />
                    </>
                ) :
                results.map((meme) => (
                    <div key={meme.contract} className="border border-black-400 rounded-3xl shadow-sm overflow-hidden bg-white" style={{ width: '300px' }}>
                        <h1 className="text-lg font-semibold mb-2 py-3 text-center text-black-600">{meme.name}</h1>
                        <div className="flex w-full justify-between">
                            <h1 className="flex text-md font-semibold mb-2 px-4 text-gray-700">Ticker: {meme.ticker}</h1>
                            <button 
                                onClick={() => add_metamask(meme.contract, meme.image)}
                                className="flex font-semibold mb-2 px-4">
                                <img src={metamask} alt="metamask" className="w-5" />
                            </button>
                        </div>
                        <div className="flex w-full justify-between">
                            <h1 className="text-md font-semibold mb-2 px-4 text-left text-gray-700">Contract: {meme.contract.slice(0, 6)}...{meme.contract.slice(-4)}</h1>
                            <button 
                                onClick={() => handleButtonClick(meme.contract)}
                                className={`flex font-semibold mb-2 px-4 ${scalingButtons[meme.contract] ? 'animate-scale-down' : ''}`}>
                                <img src={copy_logo} alt="copy_logo" className="w-5"/>
                            </button>
                        </div>

                        <h1 className="text-md font-semibold mb-2 text-center text-gray-700 p-2">{meme.description}</h1>
                        <img className="rounded-3xl p-3" src={meme.image} alt={meme.name} style={{maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', margin: 'auto', objectFit: 'contain'}}/>
                        <div className="flex">
                            <a href={"https://etherscan.io/address/" + meme.contract} target="_blank" rel="noopener noreferrer"
                                className="text-sm font-semibold mb-2 px-4 text-left text-gray-700">Created by: {meme.creator.slice(0, 6)}...{meme.creator.slice(-4)}
                            </a>
                        </div>
                        <div className="flex justify-end">
                            {meme.webpage && (
                                <a href={"https://" + meme.webpage} target="_blank" rel="noopener noreferrer" className="p-2">
                                    <img src={webpage} alt="website" className="w-5" />
                                </a>
                            )}
                            {meme.twitter && (
                                <a href={"https://" + meme.twitter} target="_blank" rel="noopener noreferrer" className="p-2">
                                    <img src={twitter} alt="twitter" className="w-5" />
                                </a>
                            )}
                            {meme.discord && (
                                <a href={"https://" + meme.discord} target="_blank" rel="noopener noreferrer" className="p-2">
                                    <img src={discordImage} alt="Discord" className="w-5" />
                                </a>
                            )}
                            {meme.telegram && (
                                <a href={"https://" + meme.telegram} target="_blank" rel="noopener noreferrer" className="p-2">
                                    <img src={telegram} alt="Telegram" className="w-5" />
                                </a>
                            )}
                            <a href={"https://etherscan.io/token/" + meme.contract} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={etherscan} alt="etherscan" className="w-5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Meme_Search;
