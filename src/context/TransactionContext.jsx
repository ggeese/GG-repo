import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAddress, contractAddress_meme, contractAddress_staking_rewards } from "../utils/constants";
import { contractABI, contractABI_MEME_CREATOR, contractABI_MEME, contractABI_STAKING_REWARDS  } from "../utils/constants";


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(' contract pasa por aqui 2 signer:',signer);
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
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
            console.log("balance de cuenta")
            //esto da el balance
            const provider = new ethers.BrowserProvider(window.ethereum);
            const balance = await provider.getBalance(accounts[0]);
        
            console.log("balance de cuenta", balance);

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

    const [FormData_3, setFormData_3] = useState({ stake: '', unstake: ''});
    const handleChange_3 = (e3, name_3) => {
        setFormData_3((prevState) => ({ ...prevState, [name_3]: e3.target.value }));
    }

    const [FormData_4, setFormData_4] = useState({ paramater: ''});
    const handleChange_4 = (e4, name_4) => {
        setFormData_4((prevState) => ({ ...prevState, [name_4]: e4.target.value }));
    }

    const sendTransaction_2 = async () => {
        try{
            if (!ethereum) return alert("Please install metamask");

            const { MemeName, Symbol, Supply } = FormData_2;
            const provider = new ethers.BrowserProvider(window.ethereum);
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

    const sendTransaction_3 = async (stake_contract) => {
        const { stake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log ("stake contract ", stake_contract)
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contractAddress_staking_rewards, contractABI_STAKING_REWARDS, signer);
        console.log ("previo a la interaccion con el contrato stake");
        //ponemos los datos del token que queremos que controle el contrato de staking
        const erc20Contract = new ethers.Contract(stake_contract, contractABI_MEME, signer); //contrato del token GTA
        const stake_amount = ethers.parseEther(stake)
        console.log ("llamada al contrato del token");
        //permiso para que el contrato X pida a la wallet el uso de cierto token

        const transaction = await erc20Contract.approve(contractAddress_staking_rewards, stake_amount);
        await transaction.wait(); // Esperar a que se complete la transacción
        console.log (`Se aprobaron ${stake} tokens para el contrato ${contractAddress_staking_rewards}`);

        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.stake(stake_amount)
    }

    const sendTransaction_3_unstake = async () => {
        const { unstake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contractAddress_staking_rewards, contractABI_STAKING_REWARDS, signer);
        console.log ("previo a la interaccion con el contrato stake");

        const unstake_amount = ethers.parseEther(unstake)
        console.log ("llamada al contrato del token");

        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.unstake(unstake_amount)
    }



    const sendTransaction_4 = async () => {
        const { parameter } = FormData_4;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contractAddress_staking_rewards, contractABI_STAKING_REWARDS, signer);
        console.log ("previo a la interaccion con el contrato stake");

        const transactionHash = await transactionsContract_3.updateRewardDuration(parameter)
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        connectWallet();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, FormData, FormData_2, FormData_3, FormData_4, setFormData, handleChange, handleChange_2, handleChange_3, handleChange_4, sendTransaction, sendTransaction_2, sendTransaction_3, sendTransaction_3_unstake, sendTransaction_4}}>
            {children}
        </TransactionContext.Provider>
    );
}


//A PARTIR DE AQUI MODIFICACIONES MIAS PARA LA CREACION DEL TOKEN'


