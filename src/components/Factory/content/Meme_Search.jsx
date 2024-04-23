import React, { useState, useEffect, useContext } from "react";
import db_memes from "./db_memes";
import { TransactionContext } from '../../../context/TransactionContext';
import discordImage from "../../../../images/discordia.png";
import telegram from "../../../../images/telegrama.png";
import webpage from "../../../../images/internet.png";
import twitter from "../../../../images/twitter.png";
import metamask from "../../../../images/metamask.svg";
import etherscan from "../../../../images/etherscan_logo.svg";
import copy_logo from "../../../../images/copy.svg";
import Axios from "axios";


const Meme_Search = () => {
    const { add_metamask } = useContext(TransactionContext); 

    const [memes, setMemes] = useState([]);
    const [search, setSearch] = useState("");
    const [scalingButtons, setScalingButtons] = useState({});

    const handleButtonClick = (contract, id) => {
        // Activa la animación de escala para el botón específico
        setScalingButtons(prevState => ({
            ...prevState,
            [id]: true
        }));

        // Copia el contrato al portapapeles
        navigator.clipboard.writeText(contract)
            .then(() => {
                console.log('Contract copied to clipboard:', contract);
                // Aquí puedes agregar lógica adicional si lo deseas, como mostrar un mensaje de éxito.
            })
            .catch((error) => {
                console.error('Error copying contract to clipboard:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario.
            })
            .finally(() => {
                // Desactiva la animación de escala después de un breve retraso
                setTimeout(() => {
                    setScalingButtons(prevState => ({
                        ...prevState,
                        [id]: false
                    }));
                }, 500); // Duración de la animación en milisegundos
            });
    };
    
    useEffect(() => {
        Axios.get("http://localhost:3001/db_memes").then((response) => {
            setMemes(response.data);
        }).catch(error => {
            console.error('Error fetching memes:', error);
        });
    }, []);

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    let results = [];
    if (!search) {
        results = memes;
    } else {
        results = memes.filter((meme) =>
            meme.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <div className="p-5">
            <input 
                value={search} 
                onChange={searcher} 
                type="text" 
                placeholder="Search memes" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            <div className="flex flex-wrap gap-5 justify-center items-start p-4">
                {results.map((meme) => (
                    <div key={meme.id} className="border border-gray-300 rounded-3xl shadow-sm overflow-hidden relative bg-white" style={{ width: '300px' }}>
                        <h1 className="text-lg font-semibold mb-2 py-3 text-center">{meme.name}</h1>
                        <div className="flex w-full justify-between">
                            <h1 className="flex flex-colm text-md font-semibold mb-2 px-4">Ticker: {meme.ticker}</h1>
                            <button 
                                onClick={() => add_metamask(meme.contract, meme.image)}
                                className="flex flex-colm font-semibold mb-2 px-4">
                                <img src={metamask} alt="metamask" className="w-5" />
                            </button>
                        </div>
                        <div className="flex w-full justify-between">
                            <h1 className="text-md font-semibold mb-2 px-4 text-left"> contract: {meme.contract.slice(0, 6)}...{meme.contract.slice(-4)}</h1>
                            <button 
                                onClick={() => handleButtonClick(meme.contract, meme.id)}
                                className={`flex flex-colm font-semibold mb-2 px-4 ${scalingButtons[meme.id] ? 'animate-scale-down' : ''}`}>
                                <img src={copy_logo} alt="copy_logo" className="w-5"/>
                            </button>
                        </div>

                        <h1 className="text-md font-semibold mb-2 text-center p-2">{meme.description}</h1>
                        <img className="rounded-3xl p-3" src={meme.image} alt={meme.name} style={{ width: '100%', height: 'auto' }} />
                        <div className="flex">
                            <a href={"https://etherscan.io/address/" + meme.contract} target="_blank" rel="noopener noreferrer"
                                className="text-sm font-semibold mb-2 px-4 text-left"> created by: {meme.creator.slice(0, 6)}...{meme.creator.slice(-4)}
                            </a>
                        </div>
                        <div className= "flex flex-column justify-end">
                            <a href={"https://"+meme.webpage} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={webpage} alt="website" className="w-5" />
                            </a>
                            <a href={"https://"+meme.twitter} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={twitter} alt="twitter" className="w-5" />
                            </a>
                            <a href={"https://"+meme.discord} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={discordImage} alt="Discord" className="w-5" />
                            </a>
                            <a href={"https://"+meme.telegram} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={telegram} alt="Telegram" className="w-5" />
                            </a>
                            <a href={"https://etherscan.io/token/" + meme.contract} target="_blank" rel="noopener noreferrer" className="p-2">
                                <img src={etherscan} alt="etherscan" className="w-5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Meme_Search;
