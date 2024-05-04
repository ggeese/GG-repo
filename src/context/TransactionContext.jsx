import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAddress_meme_factory, contractAddress_staking_rewards } from "../utils/constants";
import { contractABI, contractABI_MEME, contractABI_MEME_FACTORY, contractABI_STAKING_REWARDS  } from "../utils/constants";
import Axios from "axios";


export const TransactionContext = React.createContext();



const { ethereum } = window;

const getEthereumContract = async () => {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(' contract pasa por aqui 2 signer:',signer);
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
}

const Add_Meme = async (MemeName, Symbol, Supply, contract_meme, image_meme_url, Creator, Website, Twitter, Discord, Telegram, Fee, description) => {
    // Extrayendo la hora y fecha
    const Creation_Date = new Date().toLocaleString();

    Axios.post("http://localhost:3001/create", {
        
        name: MemeName,
        ticker: Symbol,
        fee: Fee,
        contract: contract_meme,
        image:"http://localhost:3001/memes_images/" + image_meme_url,
        creator: Creator,
        creation: Creation_Date,
        supply: Supply,
        webpage: Website,
        twitter: Twitter !== undefined && Twitter.trim() !== "" ? "https://twitter.com/" + Twitter : "",
        description: description,
        discord: Discord !== undefined && Discord.trim() !== "" ? "https://www.discord.com/invite/" + Discord : "",
        telegram: Telegram !== undefined && Telegram.trim() !== "" ? "https://t.me/" + Telegram : "",
    }).then(() => {
        console.log("Meme registrado");
    });
}


const saveImageToServer = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        // Enviar la solicitud POST al servidor
        const response = await Axios.post('http://localhost:3001/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Verificar si la respuesta contiene el nombre de la imagen
        if (response && response.data && response.data.imageName) {
            const imageName = response.data.imageName;
            console.log('Image uploaded successfully. Image name:', imageName);
            // Aquí puedes hacer lo que necesites con el nombre de la imagen, como mostrarlo en el frontend o usarlo para otras operaciones
            return imageName; // Devolver el nombre de la imagen
        } else {
            console.error('Error: Image name not received from the server.');
            return null; // Devolver null si no se recibió el nombre de la imagen
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Devolver null en caso de error

    }
};


const get_db_memes =() =>{
    Axios.get("http://localhost:3001/db_memes").then((response)=>{
        alert("Meme registrado");
    });
}



export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState ('');
    const [currentMeme, setCurrentMeme] = useState ('');
    const [ currentMemeContract, setcurrentMemeContract] = useState ('');
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

    //funcion para cambiar el input de pools usando los botones de %
    const change_input_staking = (percent) => {
        setFormData_3((prevFormData) => ({
          ...prevFormData,
          stake: percent.toString()
        }));
      };
      
    const sendTransaction_2 = async (file) => {
        try{
            if (!ethereum) return alert("Please install metamask");

            const { MemeName, Symbol, Supply, Website, Twitter, Discord, Telegram, Fee, description } = FormData_2;
            let Fee_tx = Fee !== undefined ? Fee : 0;
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const account = await ethereum.request({ method: 'eth_accounts' });
            const recipient = account[0]
            const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
            console.log ("recipient XD", recipient)
            const transactionsContract_2 = new ethers.Contract(contractAddress_meme_factory, contractABI_MEME_FACTORY, signer);
            console.log ("previo a la interaccion con el contrato")
            const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient,"https://raw.githubusercontent.com/SNABUR/Drafts/main/meme.json",Fee_tx);
            
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            //await transactionHash.wait();
            console.log("previo add meme")
            if (file) {
                console.log("Uploading", file.name);
                const image_meme_url = await saveImageToServer(file); 
                const txReceipt = await transactionHash.wait();
                const contract_meme = txReceipt.logs[0].address;
                await Add_Meme(MemeName, Symbol, Supply, contract_meme, image_meme_url, recipient, Website, Twitter, Discord, Telegram, Fee, description)
                console.log("contract meme ",contract_meme)
                setIsLoading(false);
                setCurrentMeme(image_meme_url)// Devuelve contract_meme
                setcurrentMemeContract(contract_meme)
                // Guardar la imagen en el servidor
                //setFile(null); // Limpiar el archivo después de enviar la transacción
                //setPreviewUrl(null); // Limpiar la vista previa después de enviar la transacción
            } else {
                const image_meme_url = "no_image.png"; 
                const txReceipt = await transactionHash.wait();
                const contract_meme = txReceipt.logs[0].address;
                await Add_Meme(MemeName, Symbol, Supply, contract_meme, image_meme_url, recipient, Website, Twitter, Discord, Telegram, Fee, description)
                console.log("contract meme ",contract_meme)
                setIsLoading(false);
                setCurrentMeme(image_meme_url) // Devuelve contract_meme
                setcurrentMemeContract(contract_meme)
            }            
            //console.log(`Success - ${transactionHash.hash}`);

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

    const Get_Token_Balance = async(contract_meme) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(contract_meme, contractABI_MEME, signer);
        const balance = await tokenContract.balanceOf(currentAccount);
        return ethers.formatEther(balance.toString());
    }

    const add_metamask = async(tokenAddress, tokenImage) => {
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("metamask token add")
        try {
        const wasAdded = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
            .request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                // The address of the token.
                address: tokenAddress,
                // A string URL of the token logo.
                image: tokenImage,
                },
            },
            });

        if (wasAdded) {
            console.log("Thanks for your interest!");
        } else {
            console.log("Your loss!");
        }
        } catch (error) {
        console.log(error);
        }
    }

    
    useEffect(() => {
        checkIfWalletIsConnected();
        connectWallet();
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            currentAccount, 
            FormData, 
            isLoading, 
            FormData_2, 
            FormData_3, 
            FormData_4, 
            setFormData, 
            handleChange, 
            handleChange_2, 
            handleChange_3, 
            handleChange_4, 
            sendTransaction, 
            sendTransaction_2, 
            sendTransaction_3, 
            sendTransaction_3_unstake, 
            sendTransaction_4,  
            add_metamask, 
            currentMeme, 
            currentMemeContract,
            Get_Token_Balance,
            change_input_staking
            }}>

            {children}
        </TransactionContext.Provider>
    );
}


//A PARTIR DE AQUI MODIFICACIONES MIAS PARA LA CREACION DEL TOKEN'


