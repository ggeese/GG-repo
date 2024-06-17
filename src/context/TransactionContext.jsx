import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
//import SolCreateTokens from './TContextSol'; // Ajusta la ruta según sea necesario
import { contractAddress_meme_factory, contractAdrress_golden_exp } from "../utils/constants";
import { contractABI_MEME, contractABI_MEME_FACTORY, contractABI_STAKING_REWARDS, contractABI_GOLDEN_EXP } from "../utils/constants";
import networksData from './networks.json'; // Importa el archivo JSON
import { Connection, PublicKey, clusterApiUrl, Transaction, LAMPORTS_PER_SOL, SystemProgram as SystemProgramXD } from '@solana/web3.js';
import { AnchorProvider, setProvider, Program, BN, web3, utils } from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, ASSOCIATED_TOKEN_PROGRAM_ID, createInitializeTransferFeeConfigInstruction, setAuthority, AuthorityType } from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import IDL from '../utils/MemeFactorySol.json'
import Axios from "axios";



//const token_22_address = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const token_22_address = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_PROGRAM_ID = new PublicKey(token_22_address);
//const treasury_address = "HqZ5oLpg13EftbJQXT37fFbMrS7B4v39KxEq3cTTjfsX";
const treasury_address = new PublicKey("6Esfh8TgNV4gMSWvca1x6kPqJt4iPzc4JQHXuPip1vyn");
const rpc_url = "https://api.devnet.solana.com";
const connection = new Connection(rpc_url, "confirmed");


// Configurar el entorno para usar `buffer` y `process`

export const TransactionContext = React.createContext();

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

const { ethereum } = window;

const getEthereumContract = async (contractAddress_meme_factory) => {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress_meme_factory, contractABI_MEME_FACTORY, signer);

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
        image: image_meme_url,
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
};

const handleCreateJson = async (name, symbol, imageurl) => {
    const jsonData = {
        name: name,
        symbol: symbol,
        description: "Just a test for how to name your token, again and again ;)",
        image: imageurl
    }
    try {
        const response = await Axios.post('http://localhost:3001/create-json', jsonData);
        console.log("json URI uploaded")

        if (response.data.success) {
            return response.data.url;
        } else {
            console.error('Error uploading JSON:', response.data.message);
            return 'Error uploading JSON';
        }
    } catch (error) {
        console.error('Error creando JSON:', error);
        return 'Error creating JSON';
    }
  };



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
        if (response && response.data && response.data.imageUrl) {
            const imageUrl = response.data.imageUrl;
            console.log('Image uploaded successfully. Image name:', imageUrl);
            // Aquí puedes hacer lo que necesites con el nombre de la imagen, como mostrarlo en el frontend o usarlo para otras operaciones
            return imageUrl; // Devolver el nombre de la imagen
        } else {
            console.error('Error: Image name not received from the server.');
            return null; // Devolver null si no se recibió el nombre de la imagen
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Devolver null en caso de error

    }
};

const findContract = (networkName) => {
    // Busca el contrato correspondiente en el archivo JSON
    const contract = networksData.networks.find(contract => contract.name === networkName);
    // Si se encuentra el contrato, devuelve la fábrica asociada, de lo contrario, devuelve null o un valor predeterminado
    return contract ? contract.factory : null;
};

const findInterFee = (networkName) => {
    // Busca el contrato correspondiente en el archivo JSON
    const internal_fee = networksData.networks.find(internal_fee => internal_fee.name === networkName);
    // Si se encuentra el contrato, devuelve la fábrica asociada, de lo contrario, devuelve null o un valor predeterminado
    return internal_fee ? internal_fee.fee : null;
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState ('');
    const [currentMemeImage, setCurrentMemeImage] = useState ('');
    const [currentMemeContract, setcurrentMemeContract] = useState ('')
    const [program, setProgram] = useState(null);;
    const [isLoading, setIsLoading] = useState(false);
    const [FormData, setFormData] = useState({addressTo: '', amount: '', message: ''});
    const [walletAddress, setWalletAddress] = useState(null);
    const [provider, setProviderState] = useState(null);
    const [TxHash , setTxHash] = useState ('');
    const [Network, setNetwork] = useState(() => {
        return localStorage.getItem('network') || 'X Layer Mainnet';
      });
    
      // Guardar en localStorage cada vez que Network cambie
      useEffect(() => {
        localStorage.setItem('network', Network);
      }, [Network]);
    
    //lo mas dificil de entender!!!!

    const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 60000); // 1 minuto de tiempo máximo
      

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
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
          if (!window.ethereum) {
            if (isMobile()) {
              // Redirige a la aplicación MetaMask en móviles
              window.location.href = 'https://metamask.app.link/dapp/goldengcoin.github.io';
            } else {
              alert("Please install MetaMask");
            }
            return;
          }
    
          // Solicita acceso a las cuentas del usuario
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          setCurrentAccount(accounts[0]);
    
          // Cambia a la red actual
          await changeNetwork(Network);
        } catch (error) {
          console.error("No ethereum object or user denied request:", error);
        }
      };
        const changeNetSol = async () => {
            connectPhantom();
            setNetwork("Solana");
            console.log("network in changenet ",Network)

        };
     
        const getProvider = async () => {
            if ("solana" in window) {
                const provider = window.solana;
                if (provider.isPhantom) {
                    if (!provider.isConnected) {
                        await provider.connect();
                    }
                    return provider;
                } else {
                    // Si la billetera Phantom no está conectada, pero existe en la ventana, no es necesario abrir la ventana de redirección.
                    return null;
                }
            } else {
                // Si la billetera Phantom no está instalada, abre la ventana de redirección.
                window.open('https://phantom.app/', '_blank');
                return null;
            }
        };
        
        const initialize = async (provider) => {
            try {
              if (provider) {
                setWalletAddress(provider.publicKey.toString());
          
                const anchorProvider = new AnchorProvider(connection, provider, {
                  preflightCommitment: 'confirmed',
                });
                setProvider(anchorProvider);
                //setProviderState(anchorProvider);
          
                // Crear una instancia del programa
                const programId = new PublicKey("GePjK51tHX7aCAucmxyh4mXjrogrkimuStK18AnJxAGw");
                const anchorProgram = new Program(IDL, programId);
                setProgram(anchorProgram);
              }
            } catch (error) {
              console.error('Error initializing program:', error);
            }
          };

          const connectPhantom = async () => {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            
            const provider = await getProvider();
            if (provider) {
              try {
                initialize(provider);
                
                const publicKey = provider.publicKey;
                const solaccount = publicKey.toString();
                console.log('Conectado a la wallet:', solaccount);
          
                const balance = await connection.getBalance(publicKey);
                console.log('Saldo de la cuenta:', balance);
                setCurrentAccount(solaccount);
                
                return { connection, publicKey };
              } catch (err) {
                console.error('Error conectando la wallet:', err);
                return null;
              }
            } else {
              console.log('Phantom Wallet no está instalada');
              return null;
            }
          };

    // funcion para el contrato de solana tokenfactory

    const SolCreateToken = async (tokenName, Symbol, amount, file) => {
        if (!program) {
            console.error('Program is not initialized');
            return;
          }

    //asignamos el nonce para el token decimales la cantidad a mintear para la wallet y el treasury ademas de un fee

        const nonce = new BN(Date.now()); // Usa BN de anchor
        const decimals = 6;
        const amountInMinUnit = new BN(amount).mul(new BN(10).pow(new BN(decimals)));
        const amountInMinUnit_Treasure = new BN(amount*0.01).mul(new BN(10).pow(new BN(decimals)));
        //const tokenUri = "https://raw.githubusercontent.com/goldengcoin/metadata/main/data.json";
        const Feelamports = (0.01 * LAMPORTS_PER_SOL);

        //PDA from token 
        const [mintPDA, mintBump] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('token-2022-token'),
            (window.solana.publicKey).toBuffer(),
            Buffer.from(tokenName),
            nonce.toArrayLike(Buffer, 'le', 8),
          ],
          program.programId
        );

    // PDA de la cuenta del token

        const [tokenAccountPDA, tokenAccountBump] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('token-2022-token-account'),
            window.solana.publicKey.toBuffer(),
            mintPDA.toBuffer(),
          ],
          program.programId
        );
    
        try {
            // Create token instruction 
            const createTokenInstruction = await program.methods.createToken(tokenName, nonce)
                .accounts({
                signer: window.solana.publicKey,
                mint: mintPDA,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                })
                .instruction();
            // create token account instruction
            const createTokenAccountInstruction = await program.methods.createTokenAccount()
            .accounts({
                signer: window.solana.publicKey,
                mint: mintPDA,
                tokenAccount: tokenAccountPDA,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction();
            
            //getting metadata PDA
    
            const [metadataPDA] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("metadata"),
                    PROGRAM_ID.toBuffer(),
                    mintPDA.toBuffer(),
                ],
                PROGRAM_ID
            );

            // getting associated token account address from treasury wallet

            const [associatedTokenAddress] = PublicKey.findProgramAddressSync(
            [
                treasury_address.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mintPDA.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID
            );

            // instruction to mint tokens to users wallet
            const createMintTokenInstruction = await program.methods.mintToken(amountInMinUnit)
              .accounts({
                  signer: window.solana.publicKey,
                  mint: mintPDA,
                  receiver: tokenAccountPDA,
                  tokenProgram: TOKEN_PROGRAM_ID,
              })
              .instruction();

            //mint tokens instruction to treasury wallet
            const createMintTokenInstruction_2 = await program.methods.mintToken(amountInMinUnit_Treasure)
            .accounts({
                signer: window.solana.publicKey,
                mint: mintPDA,
                receiver: associatedTokenAddress,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction();


            //associated token account instruction
            const AssociatedTokenAccounInstructions = createAssociatedTokenAccountInstruction(
                window.solana.publicKey, // Payer
                associatedTokenAddress, // Associated token account address
                treasury_address, // Owner
                mintPDA, // Mint
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );

            const ComissionFeeSol = SystemProgramXD.transfer({
                fromPubkey: window.solana.publicKey,
                toPubkey: treasury_address,
                lamports: Feelamports,
              });

            // current blokhash
            const { blockhash } = await connection.getRecentBlockhash();


            //all transaction sequence

            const tx = new Transaction({
                recentBlockhash: blockhash,
                feePayer: window.solana.publicKey,
            }).add(createTokenInstruction, createTokenAccountInstruction, AssociatedTokenAccounInstructions ,
                createMintTokenInstruction , createMintTokenInstruction_2, ComissionFeeSol);

                const signature = await window.solana.signAndSendTransaction(tx);
                await connection.confirmTransaction(signature);
      
                console.log('Token account:', mintPDA.toBase58());
                console.log('Token account created:', tokenAccountPDA.toBase58());
                
                //metadata account instructions
                //guardar metadata en el server
                let image_meme_url;

                if (file) {
                    image_meme_url = await saveImageToServer(file); 
                    setCurrentMemeImage(image_meme_url);// guarda el URL del meme contract_meme

                }else{
                    image_meme_url = "https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903"; 
                    setCurrentMemeImage(image_meme_url);// guarda el URL del meme contract_meme

                }

                const tokenUri = await handleCreateJson(tokenName, Symbol, image_meme_url);
                
                const metadataAccountInstruction = createCreateMetadataAccountV3Instruction(
                    {
                        metadata: metadataPDA,
                        mint: mintPDA,
                        mintAuthority: window.solana.publicKey,
                        payer: window.solana.publicKey,
                        updateAuthority: window.solana.publicKey,
                    },
                    {
                        createMetadataAccountArgsV3: {
                            data: {
                                name: tokenName,
                                symbol: Symbol,
                                uri: tokenUri,
                                creators: null,
                                sellerFeeBasisPoints: 0,
                                collection: null,
                                uses: null,
                            },
                            isMutable: false,
                            collectionDetails: null,

                        },
                    }
                );
            //renunciando al contrato
            
            const renounceAutority = setAuthority(
                connection,              // Conexión a usar
                window.solana.publicKey,                  // Payer de las tarifas de transacción
                mintPDA,          // Dirección de la cuenta
                window.solana.publicKey,          // Autoridad actual de la cuenta
                AuthorityType.AccountOwner, // Tipo de autoridad a renunciar
                null,                    // Nueva autoridad de la cuenta (null para renunciar)
                [],                      // Cuentas firmantes si currentAuthority es un multisig
                { commitment: 'confirmed' }, // Opciones para confirmar la transacción
                TOKEN_PROGRAM_ID         // Cuenta del programa SPL Token
              );
                  
                
            const tx_1 = new Transaction({
                recentBlockhash: blockhash,
                feePayer: window.solana.publicKey,
            }).add( metadataAccountInstruction, renounceAutority );
                
          // Envía la transacción
          const signature_1 = await window.solana.signAndSendTransaction(tx_1);
          const txhash = await connection.confirmTransaction(signature_1);
          console.log('txhash', txhash);

          setTxHash(txhash);

          console.log('Metadata created');


          return mintPDA.toString();
        

        } catch (error) {
          console.error('Failed to create token or token account:', error);
          throw error;
        }

      };

      async function updateTransactionFee() {

        const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
        const payer = web3.Keypair.generate(); // Su wallet
        const mintPublicKey = new web3.PublicKey('J34SovzkfTtXEN8JBoBomMcduED6tM3TMsFZ97VDGnm'); // PublicKey del token
        const feeRecipient = new web3.PublicKey('F2AUZRvqB8G5XwveWpyYycAqL3BkGbw7FkjXAVvJUxkQ'); // PublicKey de la cuenta que recibirá las tarifas
        const TOKEN_PROGRAM_ID = new web3.PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
        const feeRate = 10000; //1%
        const maxFee = BigInt(10000000);  // Tarifa máxima permitida

        // Configurar la nueva tarifa
        const transaction = new Transaction().add(
            createInitializeTransferFeeConfigInstruction(
            mintPublicKey,
            null,
            null,
            feeRate,
            feeRate,
            TOKEN_PROGRAM_ID
            )
        );
     // Firmar y enviar la transacción
            try {
                const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
                console.log(`Tarifa de transacción configurada. Transacción: ${signature}`);
            } catch (error) {
                console.error(`Error al configurar la tarifa de transacción: ${error}`);
            }
        }



    //cambiar red//
    const changeNetwork = async (network) => {
        try {
            const networkData = networksData.networks.find(net => net.name === network);
            if (!networkData) {
                throw new Error(`No se encontró información para la red ${network}.`);
            }
    
            const { chainId, rpcUrl, symbol, explorerUrl } = networkData;
    
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `0x${chainId.toString(16)}` }],
                    });
                    console.log(`Red cambiada a ${network}.`);
                    setNetwork(network); // Solo actualizar la red si el cambio se realizó con éxito
                    const accounts = await ethereum.request({ method: 'eth_accounts' });
                    setCurrentAccount(accounts[0])
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
                            setCurrentAccount(accounts[0])
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
    };
    
    const disconnectWallet = () => {
        setCurrentAccount(null);
        console.log("Disconnected");

    }

    const sendTransaction = async () => {
        try{
            connectWallet()
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

    const [FormData_5, setFormData_5] = useState({ contract: '', ewithdraw: '', notify: '', ureward: '', uboost: '', poolcontract: '', poolstate:''});
    const handleChange_5 = (e5, name_5) => {
        setFormData_5((prevState) => ({ ...prevState, [name_5]: e5.target.value }));
    }

    //funcion para cambiar el input de pools usando los botones de %
    const change_input_staking = (percent) => {
        setFormData_3((prevFormData) => ({
          ...prevFormData,
          stake: percent.toString()
        }));
      };
      
    const sendTransaction_2 = async (file) => {
        const { MemeName, Symbol, Supply, Website, Twitter, Discord, Telegram, Fee, description } = FormData_2;
        setIsLoading(true);
        console.log(Network, "network")
        if (Network==="Solana") {
            //asignacion de fees
            //updateTransactionFee();
            try{
                const contract_meme = await SolCreateToken(MemeName, Symbol, Supply, file);
                if (file) {
                    console.log("contract meme ",contract_meme);
                    await Add_Meme(MemeName, Symbol, Supply, contract_meme, currentMemeImage, currentAccount, Website, Twitter, Discord, Telegram, Fee, description)
                    clearTimeout(timeout);
                    setIsLoading(false);
                    setcurrentMemeContract(contract_meme);
                } else {
                    console.log("contract meme ",contract_meme);
                    await Add_Meme(MemeName, Symbol, Supply, contract_meme, currentMemeImage, currentAccount, Website, Twitter, Discord, Telegram, Fee, description)
                    clearTimeout(timeout);
                    setIsLoading(false);
                    setcurrentMemeContract(contract_meme)
                } 
            //console.log("token created");  
        }   catch (error) {
            clearTimeout(timeout);
            setIsLoading(false);
            console.log(error);

            throw new Error("No ethereum object.")
        }
        } 
        else {
            
            try{
                if (!ethereum) return alert("Please install metamask");
                //fee tx fixed contract
                let Fee_tx = Fee !== undefined ? Fee : 0;
                const Fee_tx_fixed = parseInt(parseFloat(Fee_tx) * 100);
                const account = await ethereum.request({ method: 'eth_accounts' });
                const recipient = account[0];
                const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
                const contractAddress_meme_factory_2 = findContract(Network);
                //para el contrato con comisiones
                //const internal_Fee = parseFloat(findInterFee(Network))
                //const commissionAmount = ethers.parseEther(internal_Fee.toString());
                // Convertir 0.001 ether a wei
                const transactionsContract_2 = await getEthereumContract(contractAddress_meme_factory_2)
                //const transactionsContract_2 = new ethers.Contract(contractAddress_meme_factory_2, contractABI_MEME_FACTORY, signer);
                console.log ("previo a la interaccion con el contrato")
                setIsLoading(true);
                    const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient, "https://raw.githubusercontent.com/main/meme.json", Fee_tx_fixed);
                    //con comision en moneda on chain
                    //const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient, "https://raw.githubusercontent.com/main/meme.json", Fee_tx_fixed, {value: commissionAmount});
                    console.log(`Loading - ${transactionHash.hash}`);
                    //await transactionHash.wait();
                    if (file) {
                        console.log("Uploadingg", file.name);
                        const image_meme_url = await saveImageToServer(file); 
                        console.log("Uploaded", file.name);
                        const txHashChain = await transactionHash.wait();
                        setTxHash(txHashChain);
                        const contract_meme = txHashChain.logs[0].address;
                        console.log("contract meme ",contract_meme);
                        await Add_Meme(MemeName, Symbol, Supply, contract_meme, image_meme_url, recipient, Website, Twitter, Discord, Telegram, Fee, description)
                        clearTimeout(timeout);
                        setIsLoading(false);
                        setCurrentMemeImage(image_meme_url);// guarda el URL del meme contract_meme
                        setcurrentMemeContract(contract_meme);
                        // Guardar la imagen en el servidor
                        //setFile(null); // Limpiar el archivo después de enviar la transacción
                        //setPreviewUrl(null); // Limpiar la vista previa después de enviar la transacción
                    } else {
                        const image_meme_url = null; 
                        const txHashChain = await transactionHash.wait();
                        setTxHash(txHashChain);
                        const contract_meme = txHashChain.logs[0].address;
                        console.log("contract meme ",contract_meme);
                        await Add_Meme(MemeName, Symbol, Supply, contract_meme, image_meme_url, recipient, Website, Twitter, Discord, Telegram, Fee, description)
                        clearTimeout(timeout);
                        setIsLoading(false);
                        setCurrentMemeImage(image_meme_url) // Devuelve contract_meme
                        setcurrentMemeContract(contract_meme)
                    }            
                //console.log(`Success - ${transactionHash.hash}`);

            }   catch (error) {
                clearTimeout(timeout);
                setIsLoading(false);
                console.log(error);

                throw new Error("No ethereum object.")
            }
        }
    }

    const sendTransaction_3 = async (stake_contract, token_stake_contract) => {
        console.log ("previo a stake transaction ")
        const { stake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log ("stake contract XDDDD ", stake_contract)
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(stake_contract, contractABI_STAKING_REWARDS, signer);
        console.log ("previo a la interaccion con el contrato stake");
        //ponemos los datos del token que queremos que controle el contrato de staking
        const erc20Contract = new ethers.Contract(token_stake_contract, contractABI_MEME, signer); //contrato del token GTA
        const stake_amount = ethers.parseEther(stake)
        console.log ("llamada al contrato del token");
        console.log(stake_amount)
        //permiso para que el contrato X pida a la wallet el uso de cierto token

        const transaction = await erc20Contract.approve(stake_contract, stake_amount);
        await transaction.wait(); // Esperar a que se complete la transacción
        console.log (`Se aprobaron ${stake} tokens para el contrato ${stake_contract}`);

        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.stake(stake_amount)
    }


    const sendTransaction_3_Unstake = async (stake_contract) => {
        console.log ("previo a stake transaction ")
        const { stake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(stake_contract, contractABI_STAKING_REWARDS, signer);
        const stake_amount = ethers.parseEther(stake)
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.unstake(stake_amount)
    }

    const Claim_Rewards = async (stake_contract) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(stake_contract, contractABI_STAKING_REWARDS, signer);
        console.log("PREVIO A CLAIM REWARDS")
        const claim_rewards = await tokenContract.claim();
        const rewards = ethers.formatEther(claim_rewards.toString());
        console.log("balance token Staked", rewards)
        return rewards

    }

    const Points_Earned = async (stake_contract) => {
        const { unstake } = FormData_3;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(stake_contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const PointsEarned = await transactionsContract_3.earned(currentAccount)
        console.log(PointsEarned, "earned!!!!!!!!!!!!!!!!")
        return PointsEarned
    }


    const sendTransaction_3_test = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contractAdrress_golden_exp, contractABI_GOLDEN_EXP, signer);
        console.log ("previo a la interaccion con el contrato stake");

        //const unstake_amount = ethers.parseEther(unstake)
        console.log ("llamada al contrato del token");

        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.setMinter(["0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b", "0x7dA9De9c0009a94F817Ca85B7c248f335a718D59"], [true, true]);

        console.log(transactionHash, "earned")
    }


    const sendTransaction_4 = async () => {
        const { parameter } = FormData_4;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract("0x435vb34", contractABI_STAKING_REWARDS, signer);
        console.log ("previo a la interaccion con el contrato stake");

        const transactionHash = await transactionsContract_3.updateRewardDuration(parameter)
    }

    const Get_Token_Balance = async(contract_meme) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(contract_meme, contractABI_MEME, signer);
        const balance = await tokenContract.balanceOf(currentAccount);
        console.log("balance token", balance)
        return ethers.formatEther(balance.toString());
    }
    
    const Get_Balance_Staked = async(contract_staking) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(contract_staking, contractABI_STAKING_REWARDS, signer);
        const balance = await tokenContract.balanceOf(currentAccount);
        console.log("balance token Staked", balance)
        return ethers.formatEther(balance.toString());
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
            console.log("Thanks for your interest!");
        } else {
            console.log("Your loss!");
        }
        } catch (error) {
        console.log(error);
        }
    }

    ///////////ADMIN FUNCTIONS////////////
    
    const EmergWithdraw = async () => {
        const { contract, ewithdraw } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        const transactionHash = await transactionsContract_3.emergencyWithdraw([ewithdraw], true);
        console.log(transactionHash, "passed")
    }

    const notifyRewards = async () => {
        const { contract, notify } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        const reward_amount = ethers.parseEther(notify)
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.notifyRewardAmount(reward_amount);
        console.log(transactionHash, "passed")
    }

    const updateRewDur = async () => {
        const { contract, ureward } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.updateRewardDuration(ureward);
        console.log(transactionHash, "passed")
    }

    const UpdateBoostContract = async () => {
        const { contract, uboost } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.updateBoost(uboost);
        console.log(transactionHash, "passed")
    }
    
    const PauseContract = async () => {
        const { contract } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.pause();
    }

    const UnpauseContract = async () => {
        const { contract } = FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const transactionHash = await transactionsContract_3.unpause();
    }

    const setExpMinter = async () => {
        const { poolcontract, poolstate }= FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contractAdrress_golden_exp, contractABI_GOLDEN_EXP, signer);
        //interaccion con el contrato de staking
        console.log("exp setminter contract ", contractAdrress_golden_exp, "pool contract", poolcontract)
        const transactionHash = await transactionsContract_3.setMinter([poolcontract], [poolstate]);
    }

    const StatusContract = async () => {
        const { contract }= FormData_5;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //ponemos los datos del contrato de staking
        const transactionsContract_3 = new ethers.Contract(contract, contractABI_STAKING_REWARDS, signer);
        //interaccion con el contrato de staking
        const transaction_1 = await transactionsContract_3.lastTimeRewardApplicable();
        const transaction_2 = await transactionsContract_3.rewardPerToken();
        console.log("last time reward aplicable", transaction_1, "rewardpertoken", transaction_2)
        return (transaction_1,transaction_2)
    }

    /////////////CHAINS/////////////

    useEffect(() => {
        
        checkIfWalletIsConnected();
        //connectWallet();

    }, [])

    return (
        <TransactionContext.Provider value={{ 
            connectWallet,
            connectPhantom,
            changeNetSol,
            currentAccount, 
            FormData, 
            isLoading,
            TxHash,
            Network,
            FormData_2, 
            FormData_3, 
            FormData_4, 
            FormData_5, 
            setFormData, 
            handleChange, 
            handleChange_2, 
            handleChange_3, 
            handleChange_4,
            handleChange_5, 
            changeNetwork,
            disconnectWallet,
            sendTransaction,
            SolCreateToken, 
            sendTransaction_2, 
            sendTransaction_3, 
            sendTransaction_3_Unstake,
            Claim_Rewards, 
            sendTransaction_4,
            sendTransaction_3_test,
            add_metamask,
            currentMemeImage, 
            currentMemeContract,
            Get_Token_Balance,
            Get_Balance_Staked,
            change_input_staking,
            Points_Earned,
            EmergWithdraw,
            notifyRewards,
            updateRewDur,
            UpdateBoostContract,
            PauseContract,
            UnpauseContract,
            setExpMinter,
            StatusContract
            }}>

            {children}
        </TransactionContext.Provider>
    );
}

