import React, { useContext, useState, useEffect } from "react";
import { saveImageToServer, Add_Meme } from "../ServerInteract/ServerInteract";
import { contractABI_POOLINTERACT, contractABI_POOLFACTORY, contractABI_MEME_FACTORY, contractABI_GOLDENGNFT, contractABI_GOLDEN_EXP, contractABI_VAULT, contractAddress_golden_exp, contractABI_STAKING_REWARDS, contractABI_MEME, contractABI_WHITELISTROUTER, contractAddress_goldengnft } from "../../utils/constants";
import { useWagmiConfig } from '../../wagmi'; 
import { TransactionContext } from '../TransactionContext';
import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { ethers } from "ethers";
import { writeContract as writeContract2, waitForTransactionReceipt, readContract } from 'wagmi/actions'
import useTransactionStatus from '../Hooks/WaitForTx'

export const TransactionContextETH = React.createContext();


export const TransactionProviderETH = ({ children }) => {

  const { FormData_2, setCurrentMemeImage, currentMemeImage, changeNetwork, factoryContract, poolFactoryContract, interactFactoryContract, interactFactoryContract2, setCurrentAccount, setEVMAddress, Network, setcurrentMemeData, setWalletext, currentAccount, setTxHash, WETH, NFTcontract } = useContext(TransactionContext); 
  const [providereth, setProviderState] = useState(null);
  const { address: addressreal } = useAccount(); // Obtén la dirección de la billetera conectada
  const { wagmiConfig, checkIfCoinbaseSmartWallet } = useWagmiConfig();
  const { data: hashdata, writeContract } = useWriteContract();
  const [FormData_3, setFormData_3] = useState({ stake: '', unstake: ''});
  const [lasttxHashPool, setlastTxHashPool] = useState(null); // Nuevo estado para prevLoadingStat
  const [TxHashPool, setTxHashPool] = useState (null);
  const [pop_up_2,setpop_up_2] = useState(false);
  const { data: datapool } = useTransactionStatus(TxHashPool);

  const handleChange_3 = (e3, name_3) => {
      setFormData_3((prevState) => ({ ...prevState, [name_3]: e3.target.value }));
  }
  const [FormData_5, setFormData_5] = useState({ contract: '', ewithdraw: '', notify: '', ureward: '', uboost: '', uboosttime: '', poolcontract: '', NFTcontract: '', expcontract: '', mefactcontract: '',  booladmin: true, tokenPoolReciever: '', vaultaddress:'', adminvault: '', AmountToken: '', decimalsvault: 18, vaulttokencontract: '', whitelistcontract: '', addresswhitelist: ''});
  const handleChange_5 = (e5, name_5) => {
    let value = e5.target.value;
    if (name_5 === "booladmin") {
        value = value === "true"; // Convertir la cadena "true"/"false" a booleano
      }
      setFormData_5((prevState) => ({ ...prevState, [name_5]: value }));
  }

  const [FormData_6, setFormData_6] = useState({ amountswap: '', lpmeme: '', lpeth: '', tokenaddress: ''});
  const handleChange_6 = (e6, name_6) => {
      setFormData_6((prevState) => ({ ...prevState, [name_6]: e6.target.value }));
  }

  const timeout = setTimeout(() => {
  }, 80000); // 1 minuto de tiempo máximo

  const getEthSign = async (message) => {
    const signer = await providereth.getSigner();
    const signature = await signer.signMessage(message);
    
    return signature;
}

  const getEthereumContract = async (contractAddress_meme_factory, contractABI) => {
    //const provider = sdk.makeWeb3Provider();
    const signer = await providereth.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress_meme_factory, contractABI, signer);
    
    return transactionsContract;
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
      const provider = new ethers.BrowserProvider(window.ethereum); 
      // Solicita acceso a las cuentas del usuario
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setProviderState(provider);
      setCurrentAccount(accounts[0]);
      setEVMAddress(accounts[0]);
      //dedsconectando de las otras wallets
      const walletacc = "Metamask";
      setWalletext(walletacc);
      //await tonConnectUI.disconnect();
      //disconnectWagmi();

      // Cambia a la red actual
      await changeNetwork(Network);

      return accounts[0];
      
    } catch (error) {
      console.error("No ethereum object or user denied request:", error);
    }
  };

  const sendTransactionETH = async (file) => {
    const { MemeName, Symbol, Supply, Website, Twitter, Discord, Twitch, Fee, description, ProtectInput, Timeframe } = FormData_2;
        try{
            if (!ethereum) return alert("Please install metamask");
            //fee tx fixed contract
            let Fee_tx = Fee !== undefined ? Fee : 0;
            let protection_minutes = ProtectInput ? ProtectInput*Timeframe : 60;
            console.log("ProtectInput", ProtectInput,"timeframe: ", Timeframe, "mult", protection_minutes)
            const Fee_tx_fixed = parseInt(parseFloat(Fee_tx) * 100);
            const account = await ethereum.request({ method: 'eth_accounts' });
            const recipient = account[0];
            const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
            const transactionsContract_2 = await getEthereumContract(factoryContract, contractABI_MEME_FACTORY)
            //const transactionsContract_2 = new ethers.Contract(contractAddress_meme_factory_2, contractABI_MEME_FACTORY, signer);
            console.log ("previo a la interaccion con el contrato")
                const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient, Fee_tx_fixed, protection_minutes,                 
                    {   
                    gasLimit: 9999999, 
                    }
                );
                console.log ("luego a la interaccion con el contrato")

                //con comision en moneda on chain
                //const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient, "https://raw.githubusercontent.com/main/meme.json", Fee_tx_fixed, {value: commissionAmount});
                console.log(`Loading - ${transactionHash.hash}`);
                //await transactionHash.wait();
                if (file) {
                    const image_meme_url = await saveImageToServer(file); 
                    setCurrentMemeImage(image_meme_url)

                } else {
                    const image_meme_url = "https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903"; 
                    setCurrentMemeImage(image_meme_url)
                }

                const txHashChain = await transactionHash.wait();
                setTxHash(txHashChain);
                const contract_meme = txHashChain.logs[0].address;
                console.log("contract meme ",contract_meme);
                await Add_Meme(MemeName, Symbol, Supply, contract_meme, currentMemeImage, recipient, Website, Twitter, Discord, Twitch, Fee, description, Network)
                clearTimeout(timeout);
                setcurrentMemeData(contract_meme)
            //console.log(`Success - ${transactionHash.hash}`);

        }   catch (error) {
            clearTimeout(timeout);
            console.log(error);

            throw new Error("No ethereum object.")
        }
    //}   
}

const MetaMintNFT = async () => {
    try{
    const commissionAmount = ethers.parseEther(0.001.toString());
    //ponemos los datos del contrato de staking
    const message = "Sign to check accounts";
    const signature = await getEthSign(message);
    const recoveredAddress = ethers.verifyMessage(message, signature);
    // Asegúrate de que la dirección recuperada sea la esperada
    if (recoveredAddress.toLowerCase() !== currentAccount.toLowerCase()) {
        throw new Error("Signature verification failed");
    }   
    console.log(signature, "this is signature")
    const transactionsContract = await getEthereumContract(NFTcontract, contractABI_GOLDENGNFT);
    const mintNFT = await transactionsContract.mintTo(currentAccount, signature, {value: commissionAmount} );
    const txHashChain = await mintNFT.wait();
    }catch{
    }
}

const sendTransactionStake = async (stake_contract, token_stake_contract, decimals) => {

    const { stake } = FormData_3;
    //ponemos los datos del contrato de staking
    const stake_amount = ethers.parseUnits(stake, parseInt(decimals, 10));
    const isSmartWallet = await checkIfCoinbaseSmartWallet(currentAccount);

    if (isSmartWallet.isCoinbaseSmartWallet === true) {

        writeContract({
            abi: contractABI_MEME,
            address: token_stake_contract,
            functionName: 'approve',
            args: [   
                stake_contract,
                stake_amount,
            ],
        },
        {   
            onSuccess: () => {
                writeContract({
                    abi: contractABI_STAKING_REWARDS,
                    address: stake_contract,
                    functionName: 'stake',
                    args: [
                        stake_amount,   
                    ],
                },
                {   
                    onSuccess: (transaction2) => {
                    console.log("tx sent", transaction2);
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
    } else {
        try {
            // Primer paso: Aprobar el token
            const approveTx = await writeContract2(wagmiConfig,{
              address: token_stake_contract,
              abi: contractABI_MEME,
              functionName: 'approve',
              args: [stake_contract, stake_amount],
            });
        
            console.log('Transacción de aprobación enviada:', approveTx);
        
            // Esperar a que la transacción de aprobación sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: approveTx });
            console.log("pas 2")
            // Segundo paso: Realizar el swap
            const stakeTx = await writeContract2(wagmiConfig,{
              address: stake_contract,
              abi: contractABI_STAKING_REWARDS,
              functionName: 'stake',
              args: [stake_amount],
            });
        
            console.log('Transacción de swap enviada:', stakeTx);
        
            // Esperar a que la transacción de swap sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: stakeTx });
        
            // Transacción completada con éxito
          } catch (error) {
            console.error('Error en el proceso de venta:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
          }
    }
    
}

const sendTransactionUnstake = async (stake_contract, decimals) => {
    try {

        const { stake } = FormData_3;    

        const unstake_amount = ethers.parseUnits(stake, parseInt(decimals, 10));

        writeContract({
            abi: contractABI_STAKING_REWARDS,
            address: stake_contract,
            functionName: 'unstake',
            args: [
                unstake_amount,   
            ],
        },
        {   
            onSuccess: (transaction2) => {
            console.log("tx sent", transaction2);
            },
    
            onError: (err) => {
                console.error("Error:", err);
                // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            },
        });         
    
    } catch (error) {
        console.error("Error en la transacción de unstake:", error);
    }
};

const change_input_staking = (percent) => {
    try {
        if (percent === null) {
            throw new Error("El valor de percent no puede ser null");
        }
        
        // Convertir percent a número si no lo es
        const percentNumber = parseFloat(percent);

        // Verificar si el valor es un número válido
        if (isNaN(percentNumber)) {
            throw new Error("El valor de percent debe ser un número válido");
        }

        // Redondear a 3 decimales
        const roundedPercent = percentNumber.toFixed(3);
        
        setFormData_3((prevFormData) => ({
            ...prevFormData,
            stake: roundedPercent
        }));
    } catch (error) {
        console.error("Error al cambiar el input de staking:", error);
    }
};


const change_input_swap = (percent) => {
    try {
        if (percent === null) {
            throw new Error("El valor de percent no puede ser null");
        }
        
        setFormData_6((prevFormData) => ({
            ...prevFormData,
            amountswap: percent.toString()
        }));
    } catch (error) {
        console.error("Error al cambiar el input de staking:", error);
    }
};

const Get_ETH_Balance = async () => {
    const balance = await providereth.getBalance(currentAccount);
    const balanceInEth  = ethers.formatEther(balance);
    const balance_final = parseFloat(balanceInEth).toFixed(5);
    
    return balance_final;
}

const GetProtectMinutes = async (contract_meme) => {
    try {
        const tokenContract = await getEthereumContract(contract_meme, contractABI_MEME);
        const [startTrade, protectminutes] = await tokenContract.getProtectDetails();
        return [startTrade, protectminutes];
    } catch (error) {
        console.error("Error fetching protect hours:", error);
        throw error; // Lanza el error si algo sale mal para que pueda ser manejado en otro lugar
    }
};

const GetMemeFee = async (contract_meme) => {
    const tokenContract = await getEthereumContract(contract_meme, contractABI_MEME);
    const CurrentFee = await tokenContract.getCurrentFee();
    return CurrentFee.toString();
}

//obtenemos el balance del usuario para ver la cantidad de tokens stakeados 
const Get_Token_Balance = async(contract_meme, AccountAddress, decimals) => {
    console.log(addressreal,"addresssssssssssssssss")
    try {
        const balance = await readContract({
            address: contract_meme,
            abi: contractABI_MEME,
            functionName: 'balanceOf',
            args: [AccountAddress],
            watch: true, // Para actualizar automáticamente si hay cambios en el balance

        });
        console.log(balance,"balance xd")
        const formattedBalance = ethers.formatUnits(balance.toString(), decimals);
        return formattedBalance;
    } catch (error) {
        console.error("Error fetching balanceeeeeeeeeeeeeeeee:", error);
        return null; // O manejar el error de otra manera
    }
};

//obtenemos el balance del usuario para ver la cantidad de tokens stakeados
const Get_NFT_Minted = async() => {
    const tokenContract = await getEthereumContract(NFTcontract, contractABI_GOLDENGNFT);
    const balance = await tokenContract.getMintCount();
    return balance.toString();
}
//obtenemos el balance del contrato estakeado para ver la cantidad de tokens stakeados
const Get_Balance_Staked = async(contract_staking, decimals) => {
    try {
        const balance = await readContract(wagmiConfig,{
            address: contract_staking,
            abi: contractABI_STAKING_REWARDS,
            functionName: 'balanceOf',
            args: [currentAccount],

        });
        console.log(balance,"balance xd")
        return ethers.formatUnits(balance.toString(), parseInt(decimals, 10));
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null; // O manejar el error de otra manera
    }

}

const Points_Earned = async (stake_contract) => {
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)
    //interaccion con el contrato de staking
    const PointsEarned = await transactionsContract_3.earned(currentAccount)
    return PointsEarned
}

const ClaimRewardsEggs = async (stake_contract) => {
    console.log("claim rewards f")
    //ponemos los datos del contrato de staking
    //interaccion con el contrato de staking
    writeContract({
        abi: contractABI_STAKING_REWARDS,
        address: stake_contract,
        functionName: 'claim',
    },
    {   
        onSuccess: (transaction2) => {
        console.log("tx send pool", transaction2);
        //setIsLoading(false);
        },

        onError: (err) => {
            console.error("Error:", err);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            //setIsLoading(false)
        },
    });
}
    ///////////ADMIN FUNCTIONS////////////


const EmergWithdraw = async () => {
    const { contract, ewithdraw } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    const transactionHash = await transactionsContract_3.emergencyWithdraw([ewithdraw], true);
    console.log(transactionHash, "passed")
}

const notifyRewards = async () => {
    const { contract, notify } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    const reward_amount = ethers.parseEther(notify)
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.notifyRewardAmount(reward_amount);
    console.log(transactionHash, "passed")
}

const updateRewDur = async (period_time) => {
    console.log(period_time, "period time in secs")
    const { contract } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.updateRewardDuration(period_time);
    console.log(transactionHash, "passed")
}

const UpdateBoostTime = async (booster) => {
    console.log(booster, "booster in secs")
    const { contract } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.updateBoostedTimePeriod(booster);
    console.log(transactionHash, "passed")
};

const UpdateBoostContract = async () => {
    const { contract, uboost } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.updateBoost(uboost);
    console.log(transactionHash, "passed")
};

const PauseContract = async () => {
    const { contract } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.pause();
};

const UnpauseContract = async () => {
    const { contract } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.unpause();
};

const setExpMinter = async () => {
    const { expcontract, poolcontract, booladmin }= FormData_5;
    //ponemos los datos del contrato de staking
    console.log("exp contract",expcontract, "pool contract", poolcontract, "booladmin", booladmin)
    const transactionsContract_3 = await getEthereumContract(contractAddress_golden_exp, contractABI_GOLDEN_EXP);
    //interaccion con el contrato de staking
    console.log("exp setminter contract ", contractAddress_golden_exp, "pool contract", expcontract)
    const transactionHash = await transactionsContract_3.setMinter([poolcontract], [booladmin]);
};

const ChangePoolTreasury = async () => {
    const { mefactcontract, tokenPoolReciever } = FormData_5;
    const transactionsContract_3 = await getEthereumContract(mefactcontract, contractABI_MEME_FACTORY);
    const transaction_1 = await transactionsContract_3.updateRecipientTokensPool(tokenPoolReciever);
    console.log("address pool reciever changed", transaction_1 )
}

const StatusContract = async () => {
    const { contract }= FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    console.log("antes de last time reward")
    const transaction_1 = await transactionsContract_3.getPeriodFinishTime();
    const transaction_2 = await transactionsContract_3.rewardPerToken();
    const transaction_3 = await transactionsContract_3.totalSupply();
    const transaction_4 = await transactionsContract_3.getTokenDecimals();
    const transaction_5 = await transactionsContract_3.getBoostedFinishTime();

    const raterew = transaction_2.toString()/transaction_4.toString()
    const supply =  transaction_3.toString()/transaction_4.toString()
    console.log("last time reward aplicable", transaction_1, "rewardpertoken", transaction_2)
    return [transaction_1.toString(), raterew, supply, transaction_4.toString(), transaction_5.toString() ];  // Retorno como array
};

//obtenemos el balance del usuario para ver la cantidad de tokens stakeados addToken
const UpdateVaultAdmins = async() => {
    const { vaultaddress, adminvault, booladmin } = FormData_5;
    const tokenContract = await getEthereumContract(vaultaddress, contractABI_VAULT);
    const authorize = await tokenContract.setAdminAuthorization(adminvault, booladmin);
}

const SetVaultTokens = async() => {
    const { vaultaddress, AmountToken, decimalsvault, vaulttokencontract } = FormData_5;
    const tokenAmount = ethers.parseUnits(AmountToken, parseInt(decimalsvault, 10));
    const tokenContract = await getEthereumContract(vaultaddress, contractABI_VAULT);
    const authorize = await tokenContract.addToken(vaulttokencontract, tokenAmount);
}

const DeleteTokenVault = async() => {
    const { vaultaddress, vaulttokencontract } = FormData_5;
    const tokenContract = await getEthereumContract(vaultaddress, contractABI_VAULT);
    const delete_token = await tokenContract.removeToken(vaulttokencontract);
}

const CheckVaultTokens = async () => {
    const { vaultaddress } = FormData_5;
    const tokenContract = await getEthereumContract(vaultaddress, contractABI_VAULT);
    
    // Llamada a la función del contrato
    const [tokensvault, amountpermint] = await tokenContract.getTokensDetails();
    console.log( tokensvault,"tokens vault" ,amountpermint, "amount per mint")
    // Retorna ambos valores como un objeto
    return { tokensvault, amountpermint };
}

const signatureSession = async (nonce) => {
    const provider = new ethers.BrowserProvider(window.ethereum); 
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(nonce);
    return signature;
}
 
const GetlistmintersNFT = async() => {
    try{
        const { NFTcontract } = FormData_5;
        const transactionsContract = await getEthereumContract(NFTcontract, contractABI_GOLDENGNFT);
        const list = await transactionsContract.getAllNFTInfos();
        
        // Creamos arrays separados para wallets y publicKeys
        const wallets = [];
        const publicKeys = [];
        
        // Recorremos la respuesta y separamos los campos
        list.forEach(nftInfo => {
            wallets.push(nftInfo.minter);          // Guardar la wallet (dirección del minter)
            publicKeys.push(nftInfo.publicKey);    // Guardar la publicKey
        });

        console.log("Wallets:", wallets);
        console.log("Public Keys:", publicKeys);
        
        return { wallets, publicKeys }; // Retornar ambas listas}
    }catch{
        console.error("Error al obtener la información de los NFTs:", error);
    }
}
/*const CreatePool = async () => {
    const { contract }= FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transaction_1 = await transactionsContract_3.lastTimeRewardApplicable();
    const transaction_2 = await transactionsContract_3.rewardPerToken();
    console.log("last time reward aplicable", transaction_1, "rewardpertoken", transaction_2)
    return (transaction_1,transaction_2)
};*/


const CheckRouterWhitelist = async () => {
    const { whitelistcontract } = FormData_5;
    const tokenContract = await getEthereumContract(whitelistcontract, contractABI_WHITELISTROUTER);
    const whitelist = await tokenContract.getPoolRouters();
    return whitelist;
}

const AddWhiteList = async () => {
    const { whitelistcontract, addresswhitelist } = FormData_5;
    const tokenContract = await getEthereumContract(whitelistcontract, contractABI_WHITELISTROUTER);
    const addtoken = await tokenContract.addPoolRouter(addresswhitelist);
    // Retorna ambos valores como un objeto
}

const DeleteWhiteList = async () => {
    const { whitelistcontract, addresswhitelist } = FormData_5;
    const tokenContract = await getEthereumContract(whitelistcontract, contractABI_WHITELISTROUTER);
    // Llamada a la función del contrato
    const whitelist = await tokenContract.removePoolRouter(addresswhitelist);
    // Retorna ambos valores como un objeto
}


//////////////////USER FUNCTIONS//////////////////////

const BuyMeme2 = async (tokenAddress) => {
    const { amountswap } = FormData_6;
    const ETHAmount = ethers.parseEther(amountswap); // 0.1 ETH

    const transactionsContract_3 = await getEthereumContract(interactFactoryContract, contractABI_POOLINTERACT);
    const path = [WETH, tokenAddress];
    const to = currentAccount;
    const deadline = Math.floor(Date.now()) + 60 * 20000; // 20 minutos desde ahora

    const transaction_1 = await transactionsContract_3.swapExactETHForTokensSupportingFeeOnTransferTokens(
        0,
        path,
        to,
        deadline,
        {
            value: ETHAmount,

        }
      );
      console.log(`Swapping ETH for tokens...`);
      const receipt = await transaction_1.wait();
      console.log(`Transaction hash: ${receipt.transactionHash}`);
    

    console.log("address pool reciever changed", transaction_1 )
};

const BuyMeme = async (tokenAddress) => {
    const { amountswap } = FormData_6;
    const ETHAmount = ethers.parseEther(amountswap); // 0.1 ETH
    const path = [WETH, tokenAddress];
    const to = currentAccount;
    const deadline = Math.floor(Date.now()) + 60 * 20000; // 20 minutos desde ahora
        
    writeContract({
        abi: contractABI_POOLINTERACT,
        address: interactFactoryContract2,
        functionName: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
        args: [   
            0,
            path,
            to,
            deadline,
        ],
        value: (ETHAmount) // El valor de ETH a añadir a la liquidez
    },
    {   
        onSuccess: (transaction2) => {
        console.log("tx send pool", transaction2);
        //setIsLoading(false);
        },

        onError: (err) => {
            console.error("Error:", err);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            //setIsLoading(false)
        },
    });
};

const SellMeme = async(tokenAddress) => {
    const { amountswap } = FormData_6;
    const decimals = 18;
    const tokenAmount = ethers.parseUnits(amountswap, parseInt(decimals, 10));
    const path = [tokenAddress, WETH];
    const to = currentAccount;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos desde ahora

    const isSmartWallet = await checkIfCoinbaseSmartWallet(currentAccount);
    console.log(isSmartWallet,"isSmartWallet")

    if (isSmartWallet.isCoinbaseSmartWallet === true) {

        writeContract({
            abi: contractABI_MEME,
            address: tokenAddress,
            functionName: 'approve',
            args: [   
                interactFactoryContract2,
                tokenAmount,
            ],
        },
        {   
            onSuccess: () => {
                writeContract({
                    abi: contractABI_POOLINTERACT,
                    address: interactFactoryContract2,
                    functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
                    args: [
                        tokenAmount,   
                        0,
                        path,
                        to,
                        deadline,
                    ],
                    value: (amountswap) // El valor de ETH a añadir a la liquidez
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
    } else {
        try {
            // Primer paso: Aprobar el token
            const approveTx = await writeContract2(wagmiConfig,{
              address: tokenAddress,
              abi: contractABI_MEME,
              functionName: 'approve',
              args: [interactFactoryContract2, tokenAmount],
            });
        
            console.log('Transacción de aprobación enviada:', approveTx);
        
            // Esperar a que la transacción de aprobación sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: approveTx });
            console.log("pas 2")
            // Segundo paso: Realizar el swap
            const swapTx = await writeContract2(wagmiConfig,{
              address: interactFactoryContract2,
              abi: contractABI_POOLINTERACT,
              functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
              args: [tokenAmount, 0, path, to, deadline],
            });
        
            console.log('Transacción de swap enviada:', swapTx);
        
            // Esperar a que la transacción de swap sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: swapTx });
        
            // Transacción completada con éxito
          } catch (error) {
            console.error('Error en el proceso de venta:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
          }
    }
};

const burnMemes = async (contract, tokens) => {
    const burnAddress = '0x000000000000000000000000000000000000dEaD';
    const AmountToken = ethers.parseEther(tokens.toString());
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_MEME);
    const transaction_1 = await transactionsContract_3.transfer(burnAddress, AmountToken);
}


const AddFastLiquidity = async (contract, eth) => {
    const ethtopool = ethers.parseEther(eth.toString());
    writeContract({
        abi: contractABI_MEME_FACTORY,
        address: factoryContract,
        functionName: 'fastAddLiquidity',
        args: [contract, 0],
        value: ethtopool 
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
};

const AddFastLiquidity1 = async (contract, eth) => {
    try {
        const ethtopool = ethers.parseEther(eth.toString());
        const transactionsContract_3 = await getEthereumContract(factoryContract, contractABI_MEME_FACTORY);
        const transaction_1 = await transactionsContract_3.fastAddLiquidity(
            contract, 0,
            { value: ethtopool }
        );
        await transaction_1.wait();

    } catch (error) {
        console.error('Error during liquidity addition:', error);
    } finally {
    }
};



////////////////////test//////////////////


const PoolFactoryInteract = async () => {

    const decimals = 1;
    const token1_amount = "2";
    const token1_contract = "0x2f494313FB68dc9D6de9f72B6427125D1ED493E5";
    const token2_amount = "2";
    const token2_contract = "0xa273E30D4053153d79d2c1e122ddB6CC05D3Db3d";
/*
    const erc20Contract = await getEthereumContract(token1_contract, contractABI_MEME)
    const token1_amount_big = ethers.parseUnits(token1_amount, parseInt(decimals, 10));

    //const stake_amount = ethers.parseEther(stake)
    console.log ("llamada al contrato del token");
    console.log(token1_amount_big)
    //permiso para que el contrato X pida a la wallet el uso de cierto token

    const transaction = await erc20Contract.approve(poolFactoryContract, token1_amount_big);
    await transaction.wait(); // Esperar a que se complete la transacción
    console.log (`Se aprobaron ${token1_amount_big} tokens para el contrato ${poolFactoryContract}`);




    const erc20Contract2 = await getEthereumContract(token2_contract, contractABI_MEME)
    const token2_amount_big = ethers.parseUnits(token2_amount, parseInt(decimals, 10));

    //const stake_amount = ethers.parseEther(stake)
    console.log ("llamada al contrato del token");
    console.log(token2_amount_big)
    //permiso para que el contrato X pida a la wallet el uso de cierto token

    const transaction2 = await erc20Contract2.approve(poolFactoryContract, token2_amount_big);
    await transaction2.wait(); // Esperar a que se complete la transacción
    console.log (`Se aprobaron ${token2_amount_big} tokens para el contrato ${poolFactoryContract}`);
*/

    const transactionsContract_3 = await getEthereumContract(poolFactoryContract, contractABI_POOLFACTORY);
    console.log( "pool created data this")
    const transactionPool = await transactionsContract_3.createPair(token1_contract, token2_contract);
    const hash_tx = await transactionPool.wait(); // Esperar a que se complete la transacción
    console.log(hash_tx, "pool created data this")
}

const PoolFactoryInteract2 = async (meme, lpoolmeme, lpooleth) => {
    try {
        const meme_token= meme.value;
        const decimals = 18;
        const amountADesired = ethers.parseUnits(lpoolmeme, decimals);
        const amountAMin = ethers.parseUnits('0', decimals);
        const amountBMin = ethers.parseUnits('0', decimals);
        const deadline = Math.floor(Date.now()) + 3600*1000; // 1 hora en el futuro

        // Aprobar token1
        const token1_amount_big = ethers.parseUnits(lpoolmeme, decimals);
        const pooleth = ethers.parseEther(lpooleth);

        // Interactuar con el contrato
        
        try {
            // Primer paso: Aprobar el token
            const approveTx = await writeContract2(wagmiConfig,{
              address: meme_token,
              abi: contractABI_MEME,
              functionName: 'approve',
              args: [interactFactoryContract2, token1_amount_big],
            });
        
            console.log('Transacción de aprobación enviada:', approveTx);
        
            // Esperar a que la transacción de aprobación sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: approveTx });
            // Segundo paso: Realizar el swap
            const addLpTx = await writeContract2(wagmiConfig,{
              address: interactFactoryContract2,
              abi: contractABI_POOLINTERACT,
              functionName: 'addLiquidityETH',
              args: [meme_token,
                amountADesired,
                amountAMin,
                amountBMin,
                "0x0000000000000000000000000000000000000000", // Dirección de quema
                deadline,],
                value: pooleth // El valor de ETH a añadir a la liquidez

            });
                
            // Esperar a que la transacción de swap sea confirmada
            await waitForTransactionReceipt(wagmiConfig,{ hash: addLpTx });
            setTxHashPool(addLpTx);

            // Transacción completada con éxito
          } catch (error) {
            console.error('Error en el proceso de venta:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
          }
        setcurrentMemeData(meme_token)
    } catch (error) {
        console.error("Error interactuando con el contrato:", error);
    }
}



const PoolFactoryInteract21 = async (meme, lpoolmeme, lpooleth) => {
    try {
        const meme_token= meme.value;
        const decimals = 18
        const amountADesired = ethers.parseUnits(lpoolmeme, decimals);
        const amountAMin = ethers.parseUnits('0', decimals);
        const amountBMin = ethers.parseUnits('0', decimals);
        const deadline = Math.floor(Date.now()) + 3600*1000; // 1 hora en el futuro

        // Aprobar token1
        const erc20Contract1 = await getEthereumContract(meme_token, contractABI_MEME);
        const token1_amount_big = ethers.parseUnits(lpoolmeme, decimals);
        const pooleth = ethers.parseEther(lpooleth)
        let transaction1 = await erc20Contract1.approve(interactFactoryContract2, token1_amount_big);
        await transaction1.wait();
        console.log(`Se aprobaron ${token1_amount_big} tokens para el contrato ${interactFactoryContract2}`);

        // Interactuar con el contrato
        const transactionsContract_4 = await getEthereumContract(interactFactoryContract2, contractABI_POOLINTERACT);
        console.log("Iniciando la creación del pool de liquidez", interactFactoryContract2);
        
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
        setTxHashPool(hash_tx_2);
        setcurrentMemeData(meme_token)
        console.log(hash_tx_2, "Datos del pool creado");
    } catch (error) {
        console.error("Error interactuando con el contrato:", error);
    }
    
}

useEffect(() => {

    if (TxHashPool && TxHashPool !== lasttxHashPool) {
        // Verificar si hay logs y extraer la dirección del contrato meme
        if (datapool && datapool.logs && datapool.logs.length > 1) {
            const contract_meme = datapool.logs[1].address;
            
            // Actualizar el estado y ejecutar la función solo si el hash es diferente
            setcurrentMemeData(contract_meme);
            setpop_up_2(true);

            // Actualizar lastTxHashMeme para evitar ejecuciones repetidas
            setlastTxHashPool(TxHashPool);
        }
    }
}, [datapool, TxHashPool, lasttxHashPool]);

  return (
    <TransactionContextETH.Provider value={{ 
        
        FormData_3,
        FormData_5,
        FormData_6,
        handleChange_3,
        handleChange_5,
        handleChange_6,
        connectWallet,
        sendTransactionETH,
        MetaMintNFT,
        BuyMeme,
        SellMeme,
        burnMemes,
        pop_up_2,
        signatureSession,
        AddFastLiquidity,
        sendTransactionStake,
        sendTransactionUnstake,
        change_input_staking,
        change_input_swap,
        Get_Balance_Staked,
        Get_NFT_Minted,
        Get_ETH_Balance,
        GetMemeFee,
        GetProtectMinutes,
        Points_Earned,
        ClaimRewardsEggs,
        EmergWithdraw,
        notifyRewards,
        updateRewDur,
        UpdateBoostContract,
        UpdateBoostTime,
        PauseContract,
        UnpauseContract,
        setExpMinter,
        StatusContract,
        //CreatePool,
        ChangePoolTreasury,
        PoolFactoryInteract,
        PoolFactoryInteract2,
        UpdateVaultAdmins,
        SetVaultTokens,
        DeleteTokenVault,
        CheckVaultTokens,
        GetlistmintersNFT,
        CheckRouterWhitelist,
        AddWhiteList,
        DeleteWhiteList
    }}>
        {children}
    </TransactionContextETH.Provider>
    );
};