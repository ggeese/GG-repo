import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI_GOLDENGNFT, contractAddress_goldengnft } from "../utils/constants";
import { contractABI_MEME, contractABI_MEME_FACTORY, contractABI_STAKING_REWARDS, contractABI_GOLDEN_EXP } from "../utils/constants";
import networksData from './Network/networks.json'; // Importa el archivo JSON
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { useConnect, useDisconnect, useSwitchChain, useWriteContract, useTransactionReceipt, useSignMessage } from 'wagmi';
import { saveImageToServer, Add_Meme, Create_Delivery } from "./ServerInteract/ServerInteract";
import { NetworkSelectMini } from "./Network/NetworkSelect";
import { useCallsStatus, useWriteContracts } from "wagmi/experimental";

// Configurar el entorno para usar `buffer` y `process`

export const TransactionContext = React.createContext();

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

const { ethereum } = window;


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState ('');
    const [ TONAddress, setTONAddress] = useState ('');
    const [ SOLAddress, setSOLAddress] = useState ('');
    const [ EVMAddress, setEVMAddress] = useState ('');
    const [ DataUser, setDataUser] = useState ('');
    const [currentMemeImage, setCurrentMemeImage] = useState ('');
    const [ imageFile, setImageFile] = useState ('');
    const [factoryContract, setFactoryContract] = useState ('');
    const [poolFactoryContract, setpoolFactoryContract] = useState('');
    const [interactFactoryContract, setinteractFactoryContract] = useState('');
    const [currentMemeContract, setcurrentMemeData] = useState ('');
    const [NFTcontract, setNFTcontract] = useState("");
    const [WETH, setWETH] = useState('');
    const [feeIntContract, setfeeIntContract] = useState ("");
    const [walletext, setWalletext] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [FormData, setFormData] = useState({addressTo: '', amount: '', message: ''});
    const [providereth, setProviderState] = useState(null);
    const [TxHash, setTxHash] = useState ('');
    const [TxHashBase, setTxHashBase] = useState ('');
    const { switchChain } = useSwitchChain();
    const { writeContract } = useWriteContract();
    const [Balance, setBalance] = useState ("");
    const [MemeDegenBalance, setMemeDegenBalance] = useState("");
    const {
        writeContractsAsync,
        error: mintError,
        status: mintStatus,
        data: id,
    } = useWriteContracts();

    const { data: callsStatus } = useCallsStatus({
        id: id,
        query: {
            enabled: !!id,
            // Poll every second until the calls are confirmed
            refetchInterval: (data) =>
                data.state.data?.status === "CONFIRMED" ? false : 1000,
        },
    });

    const { signMessageAsync } = useSignMessage()
    const [Network, setNetwork] = useState(() => {
        return localStorage.getItem('network') || 'Base';
      });

    //disconnect wagmi
    const { disconnect } = useDisconnect();
    const disconnectWagmi = disconnect;

      //capturamos la direccion de la wallet

      //discoonect wallet TON
      const [tonConnectUI] = useTonConnectUI();
    
    const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 80000); // 1 minuto de tiempo máximo
      

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const getEthereumContract = async (contractAddress_meme_factory, contractABI) => {
        //const provider = sdk.makeWeb3Provider();
        const signer = await providereth.getSigner();
        const transactionsContract = new ethers.Contract(contractAddress_meme_factory, contractABI, signer);
        
        return transactionsContract;
    }
    


    const checkIfWalletIsConnected = async () => {
        try{
            if (!ethereum) return console.log("please install metamask");            
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0])

            } else {
                console.log ('No acconts found');
            }
            console.log("acc", accounts[0]);
            console.log("balance de cuenta")
            //esto da el balance
            const balance = await providereth.getBalance(accounts[0]);
        
            console.log("balance de cuenta", balance);

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
        
    };

    const { connectors, connectAsync } = useConnect()

    //obteniendo datos del wagmi a partir del hash para el contrato
    const { data: BaseDataHash } = useTransactionReceipt ({
        hash: TxHashBase,
    })  

    
    const connectSmartWallet = async () => {

        try {
            disconnectWagmi();
            // Initialize Coinbase Wallet SDK
            const coinbaseConnector = connectors.find(
            (connector) => connector.name === 'Coinbase Wallet'
            )
            if (coinbaseConnector) {
                const data = await connectAsync ({ connector: coinbaseConnector });
                const base_account = data.accounts[0];
                setCurrentAccount(base_account);
                setEVMAddress(base_account);
                console.log(base_account,"actual acc")
                const wallet ="Base Wallet" ;
                setWalletext(wallet);
                console.log("wallet ext en connect", wallet)
                return base_account;
            }
            await changeNetwork(Network);
            } catch (error) {
                console.error("Error connecting to Coinbase Wallet:", error);
            }
      };

    //cambiar red//
    const changeNetwork = async (network) => {

    if (network === "TON"){
        setNetwork("TON")
        if (!TONAddress) {
            setCurrentAccount(null)
        }
        else {setCurrentAccount(TONAddress)};
        console.log("network: ",Network)

    }else if(network==="Solana"){
        setNetwork("Solana")
        if (!SOLAddress) {
            setCurrentAccount(null)
        }
        else {setCurrentAccount(SOLAddress)};
        console.log("network: ",Network)
    
    }else{
        if (EVMAddress) {
            setCurrentAccount(EVMAddress)
        }

        try {
            const networkData = networksData.networks.find(net => net.name === network);
            if (!networkData) {
                throw new Error(`No se encontró información para la red ${network}.`);
            }
    
            const { chainId, rpcUrl, symbol, explorerUrl, poolFactory, poolInteract, factory, fee, WETHaddress, nftaddress } = networkData;

            setFactoryContract(factory);
            setfeeIntContract(fee);
            setpoolFactoryContract(poolFactory);
            setinteractFactoryContract(poolInteract);
            setWETH(WETHaddress);
            setNFTcontract(nftaddress);
            //base switch network
                try{
                    switchChain({chainId:  chainId },
                        {onError: async (error) => {
                            disconnectWagmi();
                            setEVMAddress(null);
                        }})
                    }
                catch(error) 
                    {console.log("error switch chain",error)}
                

            if (window.ethereum) {

                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `0x${chainId.toString(16)}` }],
                    });

                    console.log(`Red cambiada a ${network}.`);
                    setNetwork(network); // Solo actualizar la red si el cambio se realizó con éxito
                    const accounts = await ethereum.request({ method: 'eth_accounts' });
                    //setCurrentAccount(accounts[0]);
                    console.log("red actual ",network)
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: `0x${chainId.toString(16)}`,
                                    rpcUrls: [rpcUrl],
                                    chainName: network,
                                    nativeCurrency: {
                                        name: symbol,
                                        symbol,
                                        decimals: 18
                                    },
                                    blockExplorerUrls: [explorerUrl]
                                }]
                            });
                            console.log(`Red ${network} añadida y cambiada.`);
                            setNetwork(network); // Actualizar la red si se agregó correctamente
                            const accounts = await ethereum.request({ method: 'eth_accounts' });
                            setEVMAddress(accounts[0])
                            console.log("red actual ",network)
                        } catch (addError) {
                            console.error('Error al añadir la red:', addError);
                            throw new Error(`Error al agregar la red ${network}: ${addError.message}`);
                        }
                    } else {
                        console.error('Error al cambiar de red:', switchError);
                        throw new Error(`Error al cambiar de red: ${switchError.message}`);
                    }
                }
            } else {
                throw new Error('Metamask no está instalado o no está disponible.');
            }
        } catch (error) {
            console.error('Error al cambiar de red:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }};
    
    const disconnectWallet = async () => {
        disconnectWagmi();
        setCurrentAccount(null);
        console.log("Disconnected");
        try{
            await tonConnectUI.disconnect();
        }catch (error) {
            throw new Error("wallet already disconnected")
        }
    }


    //boton 2 para creacion de meme, a partir de aqui es mi codigo

    const [FormData_2, setFormData_2] = useState({ MemeName: '', Symbol: '', Supply: '', ProtectInput: '', Timeframe: ''});
    const handleChange_2 = (e2, name_2) => {
        setFormData_2((prevState) => ({ ...prevState, [name_2]: e2.target.value }));
    }

    const [FormData_3, setFormData_3] = useState({ stake: '', unstake: ''});
    const handleChange_3 = (e3, name_3) => {
        setFormData_3((prevState) => ({ ...prevState, [name_3]: e3.target.value }));
    }

    //funcion para cambiar el input de pools usando los botones de %
    const change_input_staking = (percent) => {
        try {
            if (percent === null) {
                throw new Error("El valor de percent no puede ser null");
            }
            
            setFormData_3((prevFormData) => ({
                ...prevFormData,
                stake: percent.toString()
            }));
        } catch (error) {
            console.error("Error al cambiar el input de staking:", error);
        }
    };
    

       // Llamando a la función para probarla
        
    const meme_adding = async(currentMemeContract) => {
        const { MemeName, Symbol, Supply, Website, Twitter, Discord, Twitch, Fee, description} = FormData_2;
        let image_meme_url
        if (imageFile) {
            image_meme_url = await saveImageToServer(imageFile);
        } else {
            image_meme_url = "https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903";
        }
        setCurrentMemeImage(image_meme_url);
        await Add_Meme(MemeName, Symbol, Supply, currentMemeContract, image_meme_url, currentAccount, Website, Twitter, Discord, Twitch, Fee, description, Network);
    }
    ``
    const sendTransactionBase = async (file) => {

        const { MemeName, Symbol, Supply, Fee, ProtectInput, Timeframe } = FormData_2;
        let protection_minutes = ProtectInput ? ProtectInput*Timeframe : 60;
        console.log("ProtectInput", ProtectInput,"timeframe: ", Timeframe, "mult", protection_minutes);
        let Fee_tx = Fee !== undefined ? Fee : 0;
        const recipient = currentAccount;
        setImageFile(file);
        const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
        const Fee_tx_fixed = parseInt(parseFloat(Fee_tx) * 100);
        //const contractAddress_meme_factory = findContract(Network);
        setIsLoading(true);
    try {
        // Llamar a la función del contrato de forma asíncrona
        const data = await writeContractsAsync({
            contracts: [{
            abi: contractABI_MEME_FACTORY,
            address: factoryContract,
            functionName: 'createMeme',
            args: [MemeName, Symbol, Suply_total, recipient, Fee_tx_fixed, protection_minutes],
        }],
            capabilities: {
                paymasterService: {
                    // Paymaster Proxy Node url goes here.
                    url: "https://api.developer.coinbase.com/rpc/v1/base/yCYGyekgTfIGKsj-ZM_MQnJmbufDhUMh",
                },
            },
        });
        

    } catch (err) {
        console.error("Error al mintear:", err);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    } finally {
        // Desactivar el estado de carga, ya sea con éxito o error
        setIsLoading(false);
    }

    }
    
    const SmartSignatureSession = async (nonce) => {
        try {    
            const signature = await signMessageAsync({
                message: nonce,
            });
            return signature;
    
        } catch (error) {
            console.error("Error signing message:", error);
            throw error; 
        }
    };
    
    const Claim_Rewards = async (stake_contract) => {
        const tokenContract = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)
        console.log("PREVIO A CLAIM REWARDS")
        const claim_rewards = await tokenContract.claim();
        const rewards = ethers.formatEther(claim_rewards.toString());
        console.log("balance token Staked", rewards)
        return rewards

    }

    const Points_Earned = async (stake_contract) => {
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)
        //interaccion con el contrato de staking
        const PointsEarned = await transactionsContract_3.earned(currentAccount)
        console.log(PointsEarned, "earned!!!!!!!!!!!!!!!!")
        return PointsEarned
    }


    const add_metamask = async(tokenAddress, tokenImage) => {        
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
            console.log("Thanks!");
        } else {
            console.log("Your loss!");
        }
        } catch (error) {
        console.log(error);
        }
    };

    const MintNft = async (firstname, lastname, country, city, province, company, address, postalCode, email) => {

        const amount = 1;
        const item= 1;
        setIsLoading(true)
        if (Network === "Base Sepolia") {
            if (walletext==="Base Wallet") {
            writeContract({
                abi: contractABI_GOLDENGNFT,
                address: NFTcontract,
                functionName: 'mintTo',
                args: [currentAccount,"xd"],
                value: ethers.parseEther('0.0001'),
            },
            {    onSuccess: (transaction) => {
                    console.log("Transacción enviada con éxito:");
                    const txHash = transaction.hash;
                    console.log("Hash de la transacción:", txHash);
                    
                    // Llama a Create_Delivery después de obtener el hash de la transacción
                    Create_Delivery(firstname, lastname, country, city, province, company, address, postalCode, email, currentAccount, item, amount);
                },
                
                onError: (err) => {
                    console.error("Error al mintear:", err);
                    // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                    setIsLoading(false)

                },
            });
        }
        };
    }

    /////////////CHAINS/////////////

    //connectWallet();
    useEffect(() => {
        localStorage.setItem('network', Network);
      }, [Network]);

    useEffect(() => {

    if (!callsStatus?.receipts?.[0]?.logs) {
        console.log("No valid logs found.", callsStatus);
        return;
    }

    const logs = callsStatus.receipts[0].logs;

    if (logs.length < 3) {
        console.log("Logs do not have enough elements.");
        return;
    }

    const contract_meme = logs[2]?.address; // Accede a la dirección del tercer log (índice 2)
    const hash = callsStatus.receipts[0].blockHash
    setTxHash(hash);

    if (contract_meme) {
        console.log("Address from the third log:", contract_meme);
        setcurrentMemeData(contract_meme);
        meme_adding(contract_meme);
    } else {
        console.log("No address found in the third log.");
    }
    }, [callsStatus]);
    
    
    

    useEffect(() => {
        if (EVMAddress) {
            setCurrentAccount(EVMAddress);
        } else if (SOLAddress) {
            setCurrentAccount(SOLAddress);
        } else if (TONAddress) {
            setCurrentAccount(TONAddress);
        }
        else{
            //setCurrentAccount(null)
        }
    }, [EVMAddress, SOLAddress, TONAddress]);
    
    
    return (
        <TransactionContext.Provider value={{ 
            //connectWallet,
            setTxHash,
            Balance,
            setBalance,
            MemeDegenBalance,
            setMemeDegenBalance,
            setCurrentAccount,
            DataUser, 
            setDataUser,
            setTONAddress, 
            setSOLAddress,
            EVMAddress,
            setEVMAddress,
            setCurrentMemeImage,
            setIsLoading, 
            setWalletext,
            setcurrentMemeData,
            connectSmartWallet,
            SmartSignatureSession,
            currentAccount, 
            isLoading,
            TxHash,
            Network,
            factoryContract,
            poolFactoryContract,
            interactFactoryContract,
            WETH,
            NFTcontract,
            walletext,
            FormData, 
            FormData_2, 
            FormData_3, 
            setFormData, 
            handleChange, 
            handleChange_2, 
            handleChange_3, 
            changeNetwork,
            disconnectWallet,
            sendTransactionBase,
            MintNft,
            Claim_Rewards, 
            add_metamask,
            currentMemeImage, 
            currentMemeContract,
            change_input_staking,
            Points_Earned,
            NetworkSelectMini
            }}>
            {children}
        </TransactionContext.Provider>
    );
}

