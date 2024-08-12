import React, { useState, useContext } from 'react';
import { contractAdrress_goldengnft } from "../../../utils/constants";
import { TransactionContext } from "../../../context/TransactionContext";
import meme from "../../../../images/meme.jpeg";
import factory from "../../../../images/factory_2.jpeg";

const Body = () => {
    const { currentAccount, MintNft } = useContext(TransactionContext);
    const [receivePhysical, setReceivePhysical] = useState(false);
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

    const handleSubmit = () => {
        MintNft(address.firstname, address.lastname, address.country, address.city, address.province, address.company, address.address, address.postalCode,  address.email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const stateField = fieldMapping[name];
        setAddress({ ...address, [stateField]: value });
    };

    const mintedAmount = 1;
    const totalAmount = 1000;
    const progress = (mintedAmount / totalAmount) * 100;
    const shortenedAddress = `${contractAdrress_goldengnft.slice(0, 6)}...${contractAdrress_goldengnft.slice(-4)}`;

    return (
        <div className="min-h-screen relative flex flex-col font-goldeng items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6">
            <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${factory})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }}></div>
            
            <div className="flex text-8xl text-white font-extrabold mb-6 z-2 relative">
                <span className="bg-black bg-opacity-50 px-4 py-2 rounded-3xl text-center">Hall of Fame</span>
            </div>
            
            <div className="relative z-1 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 w-full p-8 text-center text-gray-900">
                        <h1 className="text-5xl font-extrabold mb-6">Goldeng BOX</h1>
                        <img
                            src={meme}
                            alt="NFT Preview"
                            className="w-full h-auto mb-4 rounded-lg border-4 border-purple-700"
                        />
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-2 text-purple-700">Details</h3>
                            <p className="mb-2 text-lg">Price: 0.07 ETH</p>
                            <p className="mb-2 text-lg">Network: MANTA</p>
                            <p className="mb-2 text-lg">Currency: ETH</p>
                            <div className="mb-2 text-lg">
                                <span>Minted Amount: {mintedAmount}</span>
                                <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                                    <div className="bg-purple-700 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                            <p className="mb-2 text-lg">Contract Address: {shortenedAddress}</p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full p-8 bg-gray-900 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-semibold mb-4 text-center">GoldenG NFT Box</h2>
                            <p className="mb-5 text-xl leading-relaxed">
                                🎉 Mint the GoldenG NFT Box, a magical box indeed! Inside each box lies Goldeng's most iconic meme created here in Goldeng! ✨ Imagine having your favorite memecoin in real life, taking it for a walk, caring for it, even sleeping with it. Isn't that amazing? 🌟 And that's not all — inside each box, you'll find a multisign wallet overflowing with rare memecoins. 💰 If you're lucky, owning one could make you rich.
                            </p>
                        </div>
                        <div className="w-full mt-6 text-left">
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={receivePhysical}
                                    onChange={(e) => setReceivePhysical(e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-lg">I want to receive the meme in physical format too</span>
                            </label>
                            {receivePhysical && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2 text-purple-300">Physical Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['First name', 'Last name', 'Country', 'City', 'Province', 'Company', 'Address', 'Postal Code', 'Email'].map((field, idx) => (
                                            <input
                                                key={idx}
                                                type="text"
                                                name={field}
                                                placeholder={field}
                                                value={address[fieldMapping[field]]}
                                                onChange={handleInputChange}
                                                className="w-full mb-2 p-3 rounded bg-gray-700 border-2 border-gray-600 text-lg text-white"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-2xl mb-4"
                            >
                                Mint NFT
                            </button>
                        </div>
                        *only on MANTA
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
