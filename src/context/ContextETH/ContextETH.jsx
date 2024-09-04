import React, { useContext, useState, useEffect } from "react";
import { saveImageToServer, Add_Meme, ProfileCheck } from "../ServerInteract/ServerInteract";
import { contractABI_POOLINTERACT, contractABI_POOLFACTORY, contractABI_MEME_FACTORY, contractAdrress_golden_exp, contractABI_STAKING_REWARDS, contractABI_MEME } from "../../utils/constants";
import { TransactionContext } from '../TransactionContext';
import { ethers } from "ethers";

export const TransactionContextETH = React.createContext();


export const TransactionProviderETH = ({ children }) => {

  const { FormData_2, setCurrentMemeImage, currentMemeImage, changeNetwork, setMemeDegenBalance, MemeDegenBalance, factoryContract, poolFactoryContract, interactFactoryContract, setCurrentAccount, setEVMAddress, EVMAddress, Network, setIsLoading, setcurrentMemeData, setWalletext, currentAccount, setBalance, setTxHash, WETH } = useContext(TransactionContext); 
  const [providereth, setProviderState] = useState(null);

  const [FormData_3, setFormData_3] = useState({ stake: '', unstake: ''});
  const handleChange_3 = (e3, name_3) => {
      setFormData_3((prevState) => ({ ...prevState, [name_3]: e3.target.value }));
  }
  const [FormData_5, setFormData_5] = useState({ contract: '', ewithdraw: '', notify: '', ureward: '', uboost: '', poolcontract: '', poolstate:'', tokenPoolReciever: ''});
  const handleChange_5 = (e5, name_5) => {
      setFormData_5((prevState) => ({ ...prevState, [name_5]: e5.target.value }));
  }

  const [FormData_6, setFormData_6] = useState({ amountswap: '', lpmeme: '', lpeth: '', tokenaddress: ''});
  const handleChange_6 = (e6, name_6) => {
      setFormData_6((prevState) => ({ ...prevState, [name_6]: e6.target.value }));
  }

  const timeout = setTimeout(() => {
    setIsLoading(false);
  }, 80000); // 1 minuto de tiempo máximo
  

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
      await ProfileCheck(accounts[0])
      //dedsconectando de las otras wallets
      const walletacc = "Metamask";
      setWalletext(walletacc);
      //await tonConnectUI.disconnect();
      //disconnectWagmi();

      // Cambia a la red actual
      await changeNetwork(Network);

    } catch (error) {
      console.error("No ethereum object or user denied request:", error);
    }
  };
  

  const sendTransactionETH = async (file) => {
    const { MemeName, Symbol, Supply, Website, Twitter, Discord, Twitch, Fee, description, ProtectHorus } = FormData_2;
    setIsLoading(true);
    console.log(Network, "network")

        try{
            if (!ethereum) return alert("Please install metamask");
            //fee tx fixed contract
            let Fee_tx = Fee !== undefined ? Fee : 0;
            let protection_days = ProtectHorus !== undefined ? ProtectHorus * 24 : 1 * 24;
            const Fee_tx_fixed = parseInt(parseFloat(Fee_tx) * 100);
            const account = await ethereum.request({ method: 'eth_accounts' });
            const recipient = account[0];
            const Suply_total = ethers.parseEther(Supply); //covertimos amount a wei
            const transactionsContract_2 = await getEthereumContract(factoryContract, contractABI_MEME_FACTORY)
            //const transactionsContract_2 = new ethers.Contract(contractAddress_meme_factory_2, contractABI_MEME_FACTORY, signer);
            console.log ("previo a la interaccion con el contrato")
                const transactionHash = await transactionsContract_2.createMeme(MemeName, Symbol, Suply_total, recipient, Fee_tx_fixed, protection_days,                 
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
                setIsLoading(false);
                setcurrentMemeData(contract_meme)
            //console.log(`Success - ${transactionHash.hash}`);

        }   catch (error) {
            clearTimeout(timeout);
            setIsLoading(false);
            console.log(error);

            throw new Error("No ethereum object.")
        }
    //}   
}

const sendTransactionStake = async (stake_contract, token_stake_contract, decimals) => {
    if (Network != "Base Sepolia") {
        await changeNetwork("Base Sepolia");
    }
    console.log ("previo a stake transaction ")
    const { stake } = FormData_3;
    console.log ("stake contract XDDDD ", stake_contract)
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)
    console.log ("previo a la interaccion con el contrato stake");
    //ponemos los datos del token que queremos que controle el contrato de staking
    const erc20Contract = await getEthereumContract(token_stake_contract, contractABI_MEME)
    const stake_amount = ethers.parseUnits(stake, parseInt(decimals, 10));

    //const stake_amount = ethers.parseEther(stake)
    console.log ("llamada al contrato del token");
    console.log(stake_amount)
    //permiso para que el contrato X pida a la wallet el uso de cierto token

    const transaction = await erc20Contract.approve(stake_contract, stake_amount);
    await transaction.wait(); // Esperar a que se complete la transacción
    console.log (`Se aprobaron ${stake} tokens para el contrato ${stake_contract}`);

    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.stake(stake_amount)
    
}

const sendTransactionUnstake = async (stake_contract, decimals) => {
    try {
        console.log("Previo a stake transaction");

        const { stake } = FormData_3;    
        // Ponemos los datos del contrato de staking
        const transactionsContract_3 = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)

        const unstake_amount = ethers.parseUnits(stake, parseInt(decimals, 10));

        // Interacción con el contrato de staking
        const transactionHash = await transactionsContract_3.unstake(unstake_amount);

        console.log("Transacción exitosa:", transactionHash);
    } catch (error) {
        console.error("Error en la transacción de unstake:", error);
    }
};

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

const GetProtectHours = async (contract_meme) => {
    const tokenContract = await getEthereumContract(contract_meme, contractABI_MEME);
    const [startTrade, protectHours] = await tokenContract.getProtectDetails();
    console.log("started trade and protect hours",startTrade, "and, ", protectHours)
    return [startTrade, protectHours];
}

const GetMemeFee = async (contract_meme) => {
    const tokenContract = await getEthereumContract(contract_meme, contractABI_MEME);
    const CurrentFee = await tokenContract.getCurrentFee();
    return CurrentFee.toString();
}
//obtenemos el balance del usuario para ver la cantidad de tokens stakeados
const Get_Token_Balance = async(contract_meme, AccountAddress, decimals) => {
    const tokenContract = await getEthereumContract(contract_meme, contractABI_MEME);
    const balance = await tokenContract.balanceOf(AccountAddress);
    console.log("balance token", balance)
    return ethers.formatUnits(balance.toString(), parseInt(decimals, 10));
}

//obtenemos el balance del contrato estakeado para ver la cantidad de tokens stakeados
const Get_Balance_Staked = async(contract_staking, decimals) => {
    const tokenContract = await getEthereumContract(contract_staking, contractABI_STAKING_REWARDS)
    const balance = await tokenContract.balanceOf(currentAccount);
    console.log("balance token Staked", balance)
    return ethers.formatUnits(balance.toString(), parseInt(decimals, 10));
}

const Points_Earned = async (stake_contract) => {
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(stake_contract, contractABI_STAKING_REWARDS)
    //interaccion con el contrato de staking
    const PointsEarned = await transactionsContract_3.earned(currentAccount)
    console.log(PointsEarned, "earned!!!!!!!!!!!!!!!!")
    return PointsEarned
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

const updateRewDur = async () => {
    const { contract, ureward } = FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transactionHash = await transactionsContract_3.updateRewardDuration(ureward);
    console.log(transactionHash, "passed")
}

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
    const { poolcontract, poolstate }= FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    console.log("exp setminter contract ", contractAdrress_golden_exp, "pool contract", poolcontract)
    const transactionHash = await transactionsContract_3.setMinter([poolcontract], [poolstate]);
};

const StatusContract = async () => {
    const { contract }= FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transaction_1 = await transactionsContract_3.lastTimeRewardApplicable();
    const transaction_2 = await transactionsContract_3.rewardPerToken();
    console.log("last time reward aplicable", transaction_1, "rewardpertoken", transaction_2)
    return (transaction_1, transaction_2)
};

const CreatePool = async () => {
    const { contract }= FormData_5;
    //ponemos los datos del contrato de staking
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_STAKING_REWARDS);
    //interaccion con el contrato de staking
    const transaction_1 = await transactionsContract_3.lastTimeRewardApplicable();
    const transaction_2 = await transactionsContract_3.rewardPerToken();
    console.log("last time reward aplicable", transaction_1, "rewardpertoken", transaction_2)
    return (transaction_1,transaction_2)
};

const BuyMeme = async (tokenAddress) => {
    const { amountswap } = FormData_6;
    const ETHAmount = ethers.parseEther(amountswap); // 0.1 ETH

    const transactionsContract_3 = await getEthereumContract(interactFactoryContract, contractABI_POOLINTERACT);
    const path = [WETH, tokenAddress];
    const to = currentAccount;
    const deadline = Math.floor(Date.now()) + 60 * 20000; // 20 minutos desde ahora

    const transaction_1 = await transactionsContract_3.swapExactETHForTokens(
        0,
        path,
        to,
        deadline,
        {
            value: ETHAmount
        }
      );
      console.log(`Swapping ETH for tokens...`);
      const receipt = await transaction_1.wait();
      console.log(`Transaction hash: ${receipt.transactionHash}`);
    

    console.log("address pool reciever changed", transaction_1 )
};

const SellMeme = async(tokenAddress) => {
    const { amountswap } = FormData_6;
    const decimals = 18;
    //const tokenAddress = "0xD479B6592c7bA7c4595932EEC1D6a60A99511561";
    const tokenAmount = ethers.parseUnits(amountswap, parseInt(decimals, 10));

    const erc20Contract = await getEthereumContract(tokenAddress, contractABI_MEME)
    const transaction = await erc20Contract.approve(interactFactoryContract, tokenAmount);
    await transaction.wait(); // Esperar a que se complete la transacción
    console.log (`Se aprobaron ${tokenAmount} tokens para el contrato ${interactFactoryContract}`);

    const gasPrice = ethers.parseUnits('10', 'gwei');
    const gas = {
        gasPrice: gasPrice,
        gasLimit: 900000
    };

    const transactionsContract_3 = await getEthereumContract(interactFactoryContract, contractABI_POOLINTERACT);
    const path = [tokenAddress, WETH];
    const to = currentAccount;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos desde ahora

    const transaction_1 = await transactionsContract_3.swapExactTokensForETH(
        tokenAmount,
        0,
        path,
        to,
        deadline,

    );

    console.log(`Swapping tokens for ETH...`);
    const receipt = await transaction_1.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    console.log("Address pool receiver changed", transaction_1);
};

const burnMemes = async (contract, tokens) => {
    const burnAddress = '0x000000000000000000000000000000000000dEaD';
    const AmountToken = ethers.parseEther(tokens.toString());
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_MEME);
    const transaction_1 = await transactionsContract_3.transfer(burnAddress, AmountToken);
}

const ChangePoolTreasury = async () => {
    const { contract, tokenPoolReciever } = FormData_5;
    const transactionsContract_3 = await getEthereumContract(contract, contractABI_MEME_FACTORY);
    const transaction_1 = await transactionsContract_3.updateRecipientTokensPool(tokenPoolReciever);
    console.log("address pool reciever changed", transaction_1 )
}

const AddFastLiquidity = async (contract, eth) => {
    try {
        setIsLoading(true); // Inicia el estado de carga
        const ethtopool = ethers.parseEther(eth.toString());
        const transactionsContract_3 = await getEthereumContract(factoryContract, contractABI_MEME_FACTORY);
        const transaction_1 = await transactionsContract_3.fastAddLiquidity(
            contract,
            { value: ethtopool }
        );
        await transaction_1.wait();

    } catch (error) {
        console.error('Error during liquidity addition:', error);
    } finally {
        setIsLoading(false); // Finaliza el estado de carga
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

    const PoolFactoryInteract2 = async () => {
        const { lpmeme, lpeth, tokenaddress } = FormData_6;
        try {
            const decimals = 18
            const amountADesired = ethers.parseUnits(lpmeme, decimals);
            const amountAMin = ethers.parseUnits('0', decimals);
            const amountBMin = ethers.parseUnits('0', decimals);
            const deadline = Math.floor(Date.now()) + 3600*1000; // 1 hora en el futuro

      
            // Aprobar token1
            const erc20Contract1 = await getEthereumContract(tokenaddress, contractABI_MEME);
            const token1_amount_big = ethers.parseUnits(lpmeme, decimals);
            const pooleth = ethers.parseEther(lpeth)
            let transaction1 = await erc20Contract1.approve(interactFactoryContract, token1_amount_big);
            await transaction1.wait();
            console.log(`Se aprobaron ${token1_amount_big} tokens para el contrato ${interactFactoryContract}`);
/*
            // Aprobar token2
            const erc20Contract2 = await getEthereumContract(token2_contract, contractABI_MEME);
            const token2_amount_big = ethers.parseUnits(token2_amount, decimals);
            let transaction2 = await erc20Contract2.approve(interactFactoryContract, token2_amount_big);
            await transaction2.wait();
            console.log(`Se aprobaron ${token2_amount_big} tokens para el contrato ${interactFactoryContract}`);
            */
            // Interactuar con el contrato
            const transactionsContract_4 = await getEthereumContract(interactFactoryContract, contractABI_POOLINTERACT);
            console.log("Iniciando la creación del pool de liquidez", interactFactoryContract);
            
            // Añadir liquidez
            const transactionPool2 = await transactionsContract_4.addLiquidityETH(
                tokenaddress,
                //token2_contract,
                amountADesired,
                //amountBDesired,
                amountAMin,
                amountBMin,
                currentAccount,
                deadline,
                {   
                    gasLimit: 9999999, 
                    value: (pooleth) // El valor de ETH a añadir a la liquidez
                }
            );

            const hash_tx_2 = await transactionPool2.wait();
            console.log(hash_tx_2, "Datos del pool creado");
        } catch (error) {
            console.error("Error interactuando con el contrato:", error);
        }
    }
    useEffect(() => {
        if (currentAccount) {
          const getETHBalance = async () => {
            try {
              const providerbalance = new ethers.BrowserProvider(window.ethereum); 
              const balance = await providerbalance.getBalance(currentAccount);
              const balanceInEth = ethers.formatEther(balance);
              const balanceFinal = parseFloat(balanceInEth).toFixed(5);
              console.log("balance account", balanceFinal);
              setBalance(balanceFinal);
            } catch (error) {
              console.error("Error No ETH address:", error);
            }
          };
          
          getETHBalance();
        }
      }, [currentAccount, Network]);

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
        BuyMeme,
        SellMeme,
        burnMemes,
        AddFastLiquidity,
        sendTransactionStake,
        sendTransactionUnstake,
        change_input_staking,
        change_input_swap,
        Get_Token_Balance,
        Get_Balance_Staked,
        Get_ETH_Balance,
        GetMemeFee,
        GetProtectHours,
        Points_Earned,
        EmergWithdraw,
        notifyRewards,
        updateRewDur,
        UpdateBoostContract,
        PauseContract,
        UnpauseContract,
        setExpMinter,
        StatusContract,
        CreatePool,
        ChangePoolTreasury,
        PoolFactoryInteract,
        PoolFactoryInteract2
    }}>
        {children}
    </TransactionContextETH.Provider>
    );
};