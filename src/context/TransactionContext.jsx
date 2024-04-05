import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAddress, contractAddress_meme, contractAddress_staking } from "../utils/constants";
import { contractABI, contractABI_MEME_CREATOR, contractABI_MEME, contractABI_STAKING  } from "../utils/constants";


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(' contract pasa por aqui 2 signer:',signer);
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
}

const getEthereumContract_2 = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);;
    const signer = await provider.getSigner();
    const transactionsContract_2 = new ethers.Contract(contractAddress_meme, contractABI_MEME_CREATOR, signer);

    return transactionsContract_2;
}




export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState ('');
    const [isLoading, setIsLoading] = useState(false);
    const [FormData, setFormData] = useState({addressTo: '', amount: '', message: ''});
    
    //lo mas dificil de entender!!!!

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }




    const checkIfWalletIsConnected = async () => {
        try{
            if (!ethereum) return alert("please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0])

                //setalltransactions
            } else {
                console.log ('No acconts found');
            }
            console.log("acc", accounts[0]);
            console.log("acc", accounts);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
        
    }


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        }   catch(error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try{
            if (!ethereum) return alert("Please install metamask");
            


            /*const { addressTo, amount, message } = FormData;
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
            const parsedAmount = ethers.parseEther(amount); //covertimos amount a wei
            const keyword = message

            await ethereum.request({
                method: `eth_sendTransaction`,
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 gwei
                    value: ethers.toQuantity(parsedAmount), //convertimos parsed amount a hexadecimal
                }]
            });
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);*/


        }   catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    };

    //boton 2 para creacion de meme, a partir de aqui es mi codigo

    const [FormData_2, setFormData_2] = useState({ MemeName: '', Symbol: '', Supply: '' });
    const handleChange_2 = (e2, name_2) => {
        setFormData_2((prevState) => ({ ...prevState, [name_2]: e2.target.value }));
    }

    const [FormData_3, setFormData_3] = useState({ stake: ''});
    const handleChange_3 = (e3, name_3) => {
        setFormData_3((prevState) => ({ ...prevState, [name_3]: e3.target.value }));
    }


    const sendTransaction_2 = async () => {
        try{
            if (!ethereum) return alert("Please install metamask");

            const { MemeName, Symbol, Supply } = FormData_2;
            const provider = new ethers.BrowserProvider(window.ethereum);;
            const signer = await provider.getSigner();
            const account = await ethereum.request({ method: 'eth_accounts' });
            const recipient = account[0]
            const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
            console.log ("recipient XD", recipient)
            const transactionsContract_2 = new ethers.Contract(contractAddress_meme, contractABI_MEME_CREATOR, signer);
            const tax_rate = "50"
            console.log ("previo a la interaccion con el contrato")
            const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient,"https://raw.githubusercontent.com/SNABUR/Drafts/main/meme.json",tax_rate);
            
            //setIsLoading(true);
            //console.log(`Loading - ${transactionHash.hash}`);
            //await transactionHash.wait();
            //setIsLoading(false);
            //console.log(`Success - ${transactionHash.hash}`);

            //const transactionCount = await transactionsContract.getTransactionCount();

            //setTransactionCount(transactionCount.toNumber())

        }   catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction_3 = async () => {
        const { stake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const transactionsContract_3 = new ethers.Contract(contractAddress_staking, contractABI_STAKING, signer);
        console.log ("previo a la interaccion con el contrato stake");
        const erc20Contract = new ethers.Contract("0x05d7584D02185EcD05c4E6Ee47Ce39F0ec9D781c", contractABI_MEME, signer);
        const stake_amount = ethers.parseEther(stake)
        const transaction = await erc20Contract.approve(contractAddress_staking, stake_amount);
        await transaction.wait(); // Esperar a que se complete la transacción
        console.log(`Se aprobaron ${stake} tokens para el contrato ${contractAddress_staking}`);
        const transactionHash = await transactionsContract_3.deposit(stake_amount)
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        connectWallet();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, FormData, FormData_2, FormData_3, setFormData, handleChange, handleChange_2, handleChange_3, sendTransaction, sendTransaction_2, sendTransaction_3 }}>
            {children}
        </TransactionContext.Provider>
    );
}


//A PARTIR DE AQUI MODIFICACIONES MIAS PARA LA CREACION DEL TOKEN'


