import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI_GOLDENGNFT, contractABI_MEME_FACTORY, contractABI_MEME, contractABI_STAKING_REWARDS, contractABI_POOLINTERACT } from "../utils/constants";
import networksData from './Network/networks.json'; // Importa el archivo JSON
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { useConnect, useDisconnect, useSwitchChain, useWriteContract, useTransactionReceipt, useSignMessage } from 'wagmi';
import { saveImageToServer, Add_Meme, Create_Delivery } from "./ServerInteract/ServerInteract";
import { NetworkSelectMini } from "./Network/NetworkSelect";
import { useCallsStatus, useWriteContracts } from "wagmi/experimental";
import { useAccount, useBalance } from 'wagmi';
import { useWagmiConfig } from '../wagmi';
import { AppSocialPoint } from '../utils/axiossonfig'
import useTransactionStatus from './Hooks/WaitForTx'

// Configurar el entorno para usar `buffer` y `process`

export const TransactionContext = React.createContext();

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

const { ethereum } = window;


export const TransactionProvider = ({ children }) => {
    const [currentAccount2, setCurrentAccount] = useState ('');
    const [ TONAddress, setTONAddress] = useState ('');
    const [ SOLAddress, setSOLAddress] = useState ('');
    const [ EVMAddress, setEVMAddress] = useState ('');
    const [ DataUser, setDataUser] = useState ('');
    const [currentMemeImage, setCurrentMemeImage] = useState ('');
    const [ imageFile, setImageFile] = useState ('');
    const [factoryContract, setFactoryContract] = useState ('');
    const [poolFactoryContract, setpoolFactoryContract] = useState('');
    const [interactFactoryContract, setinteractFactoryContract] = useState('');
    const [interactFactoryContract2, setinteractFactoryContract2] = useState('');
    const [currentMemeContract, setcurrentMemeData] = useState (null);
    const [NFTcontract, setNFTcontract] = useState("");
    const [WETH, setWETH] = useState('');
    const [feeIntContract, setfeeIntContract] = useState ("");
    const [walletext, setWalletext] = useState("");
    const [FormData, setFormData] = useState({addressTo: '', amount: '', message: ''});
    const [providereth, setProviderState] = useState(null);
    const [TxHash, setTxHash] = useState ('');
    const [lastTxPool, setlastTxPool] = useState(""); // Nuevo estado para prevLoadingStat
    const [TxHashBase, setTxHashBase] = useState ('');
    const { switchChain } = useSwitchChain();
    const { data: StatusWagmi, writeContract } = useWriteContract();
    const { checkIfCoinbaseSmartWallet, wagmiConfig } = useWagmiConfig();
    const [MemeDegenBalance, setMemeDegenBalance] = useState("");
    const [switchPool, setSwitchPool] = useState("UNI"); // Estado para el interruptor
    const { address: currentAccount } = useAccount();
    const [ChainID, setChainID] =useState("");
    const [lastTxHashMeme, setlastTxHashMeme] = useState(null); // Nuevo estado para prevLoadingState
    const [txHashMeme, setTxHashMeme] = useState(null);
    const [pop_up_1,setpop_up_1] = useState(false);
    const { data: datameme, isError, isLoading, isSuccess } = useTransactionStatus(txHashMeme);


    const currentbalance = useBalance({
        address: currentAccount,
      })
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
    

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const getEthereumContract = async (contractAddress_meme_factory, contractABI) => {
        //const provider = sdk.makeWeb3Provider();
        const signer = await providereth.getSigner();
        const transactionsContract = new ethers.Contract(contractAddress_meme_factory, contractABI, signer);
        
        return transactionsContract;
    }
    
    const meme_adding = async(currentMemeContract) => {
        const { MemeName, Symbol, Supply, Website, Twitter, Discord, Twitch, Fee, description } = FormData_2;
        let image_meme_url
        if (imageFile) {
            image_meme_url = await saveImageToServer(imageFile);
        } else {
            image_meme_url = "https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903";
        }
        setCurrentMemeImage(image_meme_url);
        await Add_Meme(MemeName, Symbol, Supply, currentMemeContract, image_meme_url, currentAccount, Website, Twitter, Discord, Twitch, Fee, description, Network);
        console.log("meme registrado XD")
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
    
    }else{
        if (EVMAddress) {
            setCurrentAccount(EVMAddress)
        }

        try {
            const networkData = networksData.networks.find(net => net.name === network);
            if (!networkData) {
                throw new Error(`No se encontró información para la red ${network}.`);
            }
    
            const { chainId, rpcUrl, symbol, explorerUrl, poolFactory, poolInteract, poolInteract2, factory, fee, WETHaddress, nftaddress } = networkData;

            setFactoryContract(factory);
            setfeeIntContract(fee);
            setpoolFactoryContract(poolFactory);
            setinteractFactoryContract(poolInteract);
            setinteractFactoryContract2(poolInteract2);
            setWETH(WETHaddress);
            setNFTcontract(nftaddress);
            setChainID(chainId);
            //base switch network
            try{
                switchChain(
                    { chainId: chainId },
                    {
                      onSuccess: () => {
                        console.log("Network switched successfully: chaian id", chainId);
                        setNetwork(network); 
                        // Add any additional actions you want to perform on success here
                      },
                      onError: async (error) => {
                        console.error("Error switching network:", error);
                        disconnectWagmi();
                        setEVMAddress(null);
                        // Handle any additional error handling here
                      },
                    }
                  );
                  
                }
            catch(error) 
                {console.log("error switch chain",error)}
            console.log("Network", Network)

        } catch (error) {
            console.error('Error al cambiar de red:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }};
    
    const disconnectWallet = async () => {
        disconnectWagmi();
        setCurrentAccount(null);
        console.log("Disconnected");
        setDataUser('')
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
       
    const sendTransaction = async (file) => {
        const { MemeName, Symbol, Supply, Fee, ProtectInput, Timeframe } = FormData_2;
        let protection_minutes = ProtectInput ? ProtectInput*Timeframe : 60;
        let Fee_tx = Fee !== undefined ? Fee : 0;
        const recipient = currentAccount;
        setImageFile(file);
        const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
        const Fee_tx_fixed = parseInt(parseFloat(Fee_tx) * 100);
        //const contractAddress_meme_factory = findContract(Network);
        const isSmartWallet = await checkIfCoinbaseSmartWallet(currentAccount);
        if (isSmartWallet.isCoinbaseSmartWallet === true) {            
            try {
                // Llamar a la función del contrato de forma asíncrona
                await writeContractsAsync({
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
                }
        } else {          // Llamar a la función del contrato de forma asíncrona
            writeContract({
                abi: contractABI_MEME_FACTORY,
                address: factoryContract,
                functionName: 'createMeme',
                args: [MemeName, Symbol, Suply_total, recipient, Fee_tx_fixed, protection_minutes],
            }, {   
                onSuccess: async (txhash) => { // Corregido aquí
                    setTxHashMeme(txhash);
                    console.log("setTxHashMeme, xd",txhash)
                },
                onError: (err) => {
                    console.error("Error:", err);
                    // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                },
            });
                 
        } 
    };
    
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
        try {
            // Llamar a la función del contrato de forma asíncrona
            await writeContractsAsync({
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
            }

    };

    const PoolFactoryInteractBase = async (meme, lpoolmeme, lpooleth) => {
        try {
            const meme_token= meme.value;
            const decimals = 18
            const amountADesired = ethers.parseUnits(lpoolmeme, decimals);
            const amountAMin = ethers.parseUnits('0', decimals);
            const amountBMin = ethers.parseUnits('0', decimals);
            const deadline = Math.floor(Date.now()) + 3600*1000; // 1 hora en el futuro
    
            // Aprobar token1
            const token1_amount_big = ethers.parseUnits(lpoolmeme, decimals);
            const pooleth = ethers.parseEther(lpooleth);
            try {
                // Llamar a la función del contrato de forma asíncrona
                writeContract({
                        abi: contractABI_MEME,
                        address: meme_token,
                        functionName: 'approve',
                        args: [   
                            interactFactoryContract2,
                            token1_amount_big
                        ],
                    },
                    {   
                        onSuccess: (transaction) => {
                            console.log("tx send", transaction)
                            writeContract({
                                abi: contractABI_POOLINTERACT,
                                address: interactFactoryContract2,
                                functionName: 'addLiquidityETH',
                                args: [   
                                    meme_token,
                                    amountADesired,
                                    amountAMin,
                                    amountBMin,
                                    "0x0000000000000000000000000000000000000000", // Dirección de quema
                                    deadline,
                                ],
                                value: (pooleth) // El valor de ETH a añadir a la liquidez
                            },
                            {   
                                onSuccess: (transaction2) => {
                                console.log("tx send pool", transaction2);
                            },
                            
                            onError: (err) => {
                                console.error("Error:", err);
                                // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                            },
                        });

                    },
                    
                    onError: (err) => {
                        console.error("Error:", err);
                        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                    },
                });
        
                console.log("Transacción enviada con éxito");
            } catch (err) {
                console.error("Error en la transacción:", err);
                // Puedes mostrar un mensaje al usuario en caso de error
            }
            
            // Añadir liquidez
            const transactionPool2 = await transactionsContract_4.addLiquidityETH(
                meme_token,
                amountADesired,
                amountAMin,
                amountBMin,
                "0x0000000000000000000000000000000000000000", // Dirección de quema
                deadline,
                {   
                    gasLimit: 9999999, 
                    value: (pooleth) // El valor de ETH a añadir a la liquidez
                }
            );
    
            const hash_tx_2 = await transactionPool2.wait();
            setcurrentMemeData(meme_token)
            console.log(hash_tx_2, "Datos del pool creado");
        } catch (error) {
            console.error("Error interactuando con el contrato:", error);
        }
    }

    const BuyMemeBase = async (tokenAddress, amountswap) => {
        console.log(tokenAddress, amountswap, interactFactoryContract2, currentbalance, " balance values for buy base memes");
    
        if (!tokenAddress || !amountswap || !currentAccount) {
            console.error("Parámetros inválidos para la función de compra");
            return;
        }
    
        const ETHAmount = ethers.parseEther(amountswap); // Convertir el monto a ETH
        const path = [WETH, tokenAddress];
        const to = currentAccount;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos desde ahora en segundos
    
        try {
            // Llamar a la función del contrato de forma asíncrona
            writeContract({
                    abi: contractABI_POOLINTERACT,
                    address: interactFactoryContract2,
                    functionName: 'swapExactETHForTokens',
                    args: [0, path, to, deadline],
                    value: ETHAmount,
                    overrides: {
                        gasLimit: 200000, // Ajusta este valor según sea necesario
                    },
                },
                
                {   
                    onSuccess: (transaction) => {
                    console.log("Transacción enviada con éxito:");
                    const txHash = transaction.hash;
                    console.log("Hash de la transacción:", txHash);
                    // Llama a Create_Delivery después de obtener el hash de la transacción
                },
                
                onError: (err) => {
                    console.error("Error:", err);
                    // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                },
            });
    
            console.log("Transacción enviada con éxito");
        } catch (err) {
            console.error("Error en la transacción:", err);
            // Puedes mostrar un mensaje al usuario en caso de error
        }
    };
    
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

    const MintNft = async () => {
        console.log("currentAccount")
        writeContract({
            abi: contractABI_GOLDENGNFT,
            address: NFTcontract,
            functionName: 'mintTo',
            args: [currentAccount, currentAccount],
            value: ethers.parseEther(0.001.toString()),
        },
        {    onSuccess: (transaction) => {
                console.log("Transacción enviada con éxito:");
                const txHash = transaction.hash;
                console.log("Hash de la transacción:", txHash);
                // Llama a Create_Delivery después de obtener el hash de la transacción
                //Create_Delivery(firstname, lastname, country, city, province, company, address, postalCode, email, currentAccount, item, amount);
            },
            
            onError: (err) => {
                console.error("Error al mintear:", err);
                // Manejar el error, por ejemplo, mostrar un mensaje al usuario

            },
        });
    }

    /////////////CHAINS/////////////
      
    useEffect(() => {
        const authenticateUser = async () => {
        if (!currentAccount) {
            console.log("currentAccount no tiene un valor");
            return;
        }
    
        try {
            // Cambiar de red si es necesario
            //await changeNetwork(Network);
            console.log("Network initial changed");
            // Obtener nonce
            const nonceResponse = await AppSocialPoint.get(`/generateNonce/${currentAccount}`);    
            const { nonce } = nonceResponse.data;    
            // Firmar el mensaje
            const signature = await signMessageAsync({ message: nonce });    
            // Autenticar al usuario
            const response = await AppSocialPoint.post('/authenticate', {
            walletAddress: currentAccount,
            signature: signature,
            type: "evm",
            });
    
            // Establecer los datos del usuario
            setDataUser(response.data);
        } catch (error) {
            console.error("Error during authentication:", error);
        }
        };
    
        // Llamar a la función de autenticación si currentAccount tiene un valor
        authenticateUser();
    }, [currentAccount]);

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
    console.log(hash)
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
        console.log(callsStatus,"callsStatusssssssssss")
      }, [callsStatus]);
    
      useEffect(() => {
        if (txHashMeme && txHashMeme !== lastTxHashMeme) {
            // Verificar si hay logs y extraer la dirección del contrato meme
            if (datameme && datameme.logs && datameme.logs.length > 1) {
                const contract_meme = datameme.logs[1].address;
                
                // Actualizar el estado y ejecutar la función solo si el hash es diferente
                setcurrentMemeData(contract_meme);
                setpop_up_1(true)
                meme_adding(contract_meme);
    
                // Actualizar lastTxHashMeme para evitar ejecuciones repetidas
                setlastTxHashMeme(txHashMeme);
            }
        }
    }, [datameme, txHashMeme, lastTxHashMeme]);

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
            pop_up_1,
            BuyMemeBase,
            ChainID,
            PoolFactoryInteractBase,
            currentbalance,
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
            setWalletext,
            currentMemeContract,
            setcurrentMemeData,
            switchPool,
            setSwitchPool,
            connectSmartWallet,
            SmartSignatureSession,
            currentAccount, 
            TxHash,
            Network,
            factoryContract,
            poolFactoryContract,
            interactFactoryContract,
            interactFactoryContract2,
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
            isLoading,
            changeNetwork,
            disconnectWallet,
            sendTransactionBase,
            sendTransaction,
            txHashMeme,
            MintNft,
            Claim_Rewards, 
            add_metamask,
            currentMemeImage, 
            change_input_staking,
            Points_Earned,
            NetworkSelectMini
            }}>
            {children}
        </TransactionContext.Provider>
    );
}

