import React, { useState, useContext, useEffect } from 'react';
import { contractAddress_goldengnft } from "../../../utils/constants";
import { TransactionContext } from "../../../context/TransactionContext";
import { AppDataPoint } from '../../../utils/axiossonfig'
import meme from "../../../../models/goldenbox.glb";
import factory from "../../../../images/factory_2.jpeg";
import background from "../../../../images/bgcube.jpg";
import copy_logo from "../../../../images/copy.svg";
import { Loader } from './'
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './'; // Adjust the path if necessary
import LoginButton from '../../LoginButton';
import { useAccount } from 'wagmi';
import * as THREE from 'three';


const Body = () => {
    const { MintNft, isLoading, Network, currentAccount, NFTcontract } = useContext(TransactionContext);
    const [receivePhysical, setReceivePhysical] = useState(false);
    const [showMyModalWallets, setShowMyModalWallets] = useState(false);
    const [counterNFT, setcounterNFT] = useState("");
    const [clicked, setClicked] = useState(false);
    const [isdisable, setisdisable] = useState(false);
    const { address: account } = useAccount();

    // Luz blanca cálida
    const lightColor = new THREE.Color(1, 1, 1); // Luz blanca cálida (un poco más amarilla)
    const environmentColor = new THREE.Color(1, 0.7, 0.9); // Luz ambiental suave en tonos rosados
    const yellowLightColor = new THREE.Color(1, 0.7, 0.9); // Amarillo cálido/anaranjado

    const backgroundTexture = useLoader(THREE.TextureLoader, background);


    useEffect(() => {
        const fetchCounter = async () => {
            try {
                const dataNFT = await AppDataPoint.get('/NFT-minted', {
                    params: {
                      contract_NFT: NFTcontract,
                      network: Network,
                    }
                });
                setcounterNFT(dataNFT.data.MintedNFT);
            } catch (error) {
                console.error("Error fetching token balance:", error);
                    setcounterNFT(0);
            }
        
        };
    
        if ( currentAccount ) {
            fetchCounter();
        }

    }, [ currentAccount, isLoading ]);
    
    const copyContractAddress = (Address) => {
        navigator.clipboard.writeText(Address);
        setClicked(true);
        setTimeout(() => setClicked(false), 200); // Duración del efecto de clic
      };

    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        country: '',
        city: '',
        province: '',
        company: '',
        address: '',
        postalCode: '',
        email: ''
    });

    const fieldMapping = {
        'First name': 'firstname',
        'Last name': 'lastname',
        'Country': 'country',
        'City': 'city',
        'Province': 'province',
        'Company': 'company',
        'Address': 'address',
        'Postal Code': 'postalCode',
        'Email': 'email'
    };

    const handleOnCloseWallets = () => setShowMyModalWallets(false);


    const handleMinNft = async() => {
            MintNft();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const stateField = fieldMapping[name];
        setAddress({ ...address, [stateField]: value });
    };

    const totalAmount = 2000;
    const progress = (counterNFT / totalAmount) * 100;
    const shortenedAddress = `${contractAddress_goldengnft.slice(0, 6)}...${contractAddress_goldengnft.slice(-4)}`;

    return (
        <div className="min-h-screen relative flex flex-col font-goldeng items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-6">
            <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${factory})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }}></div>
            
            <div className="flex text-4xl sm:text-6xl md:text-8xl text-white font-extrabold mb-4 sm:mb-6 z-2 relative">
                <span className="bg-black bg-opacity-50 px-4 py-2 rounded-2xl sm:rounded-3xl text-center">Hall of Fame</span>
            </div>
            
            <div className="relative z-1 bg-white shadow-lg rounded-lg overflow-hidden max-w-lg sm:max-w-2xl md:max-w-4xl w-full">
                <div className="flex flex-col md:flex-row ">
                    <div className="md:w-1/2 w-full p-4 sm:p-8 text-center text-gray-900 ">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">Golden BOX</h1>
                        <div className="flex justify-center items-center w-auto h-80 mb-4 rounded-lg border-4 border-purple-700">
                            <Canvas 
                                camera={{ position: [0, -73, -431], fov: 37 }} 
                                style={{ height: '100%', width: '100%' }} 
                                gl={{ toneMappingExposure: 1 }} 
                            >
                                <primitive attach="background" object={backgroundTexture} />

                                <ambientLight color={environmentColor} intensity={0} />
                                <directionalLight color={yellowLightColor} intensity={1.73} position={[0, 0, 1]} /> 
                                <directionalLight color={yellowLightColor} intensity={1.73} position={[0, 0, -1]} /> 
                                <directionalLight color={yellowLightColor} intensity={1.73} position={[-1, 0, 0]} />
                                <directionalLight color={yellowLightColor} intensity={1.73} position={[1, 0, 0]} /> 
                                <directionalLight color={yellowLightColor} intensity={3.73} position={[-1, 1, 0]} />
                                <directionalLight color={yellowLightColor} intensity={2.73} position={[1, -1, 0]} /> 
                                <OrbitControls enableZoom={true} />
                                <Model path={meme} scale={1} />
                            </Canvas>
                        </div>


                        <div className="mt-4 sm:mt-6">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">Details</h3>
                            <p className="mb-2 text-base sm:text-lg">Price: 0.07 ETH</p>
                            <p className="mb-2 text-base sm:text-lg">Network: {Network}</p>
                            <p className="mb-2 text-base sm:text-lg">Currency: ETH</p>
                            <div className="mb-2 text-base sm:text-lg">
                                <span>Minted: {counterNFT ? counterNFT : null}</span>
                                <div className="w-full bg-gray-300 rounded-full h-3 sm:h-4 mt-1 sm:mt-2">
                                    <div className="bg-purple-700 h-3 sm:h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className='flex justify-end'>{totalAmount}</span>
                            </div>
                            <div className="flex items-center space-x-3"> 
                                <p className="text-base sm:text-lg mb-2">
                                    Contract Address: <span className="font-medium">{shortenedAddress}</span>
                                </p>
                                
                                <button
                                    className={`relative transform transition-all duration-200 ${clicked ? 'scale-120' : 'hover:scale-110'}`}
                                    onClick={() => copyContractAddress(contractAddress_goldengnft)}
                                >
                                    <img
                                    src={copy_logo}
                                    alt="Copy"
                                    className="w-3 h-3 sm:w-2 sm:h-3 md:w-6 md:h-6"
                                    />
                                </button>
                            </div>


                        </div>
                    </div>
                    <div className="md:w-1/2 w-full p-4 sm:p-8 bg-gray-900 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">Golden NFT Box</h2>
                            <p className="mb-4 sm:mb-5 text-base sm:text-xl leading-relaxed">
                                🎉 Mint the Golden NFT Box, a truly magical experience! Inside each box lies Golden's most iconic meme created right here in GG! ✨ Imagine having your favorite memecoin as a digital collectible — a piece of internet culture you can cherish and share. 🌟 And that's not all — the first 2000 NFTs come with a bag of memecoins included. 💰 If you're lucky, owning one could bring you unexpected memes. Don't miss out!
                            </p>
                        </div>
                        <div className="flex flex-col items-center w-auto mt-4 sm:mt-6 text-left">
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={receivePhysical}
                                    onChange={(e) => setReceivePhysical(e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-base sm:text-lg">I want to receive the meme in physical format too</span>
                            </label>
                            {/*receivePhysical === true && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-purple-300">Physical Address</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {['First name', 'Last name', 'Country', 'City', 'Province', 'Company', 'Address', 'Postal Code', 'Email'].map((field, idx) => (
                                            <input
                                                key={idx}
                                                type="text"
                                                name={field}
                                                placeholder={field}
                                                value={address[fieldMapping[field]]}
                                                onChange={handleInputChange}
                                                className="w-full mb-2 p-2 sm:p-3 rounded bg-gray-700 border-2 border-gray-600 text-base sm:text-lg text-white"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )*/}
                            {!currentAccount ? (
                            <div className="bg-black text-2xl rounded-3xl px-3">
                                {!account && <LoginButton />}
                            </div>
                            ) : (
                                <div>
                                    {isLoading ? (
                                        <div>
                                            <Loader />
                                        </div>
                                    ) : (
                                <button
                                    onClick={() => handleMinNft()}
                                    className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 text-lg sm:text-2xl mb-4 ${isdisable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isdisable}
                                >
                                    Mint NFT
                                </button>

                                    )}
                                </div>
                            )}


                        </div>
                        <p className="text-xs sm:text-sm">*only in Base</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Body;
