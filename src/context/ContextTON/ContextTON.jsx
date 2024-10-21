import React, { useEffect, useContext } from "react";

import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { deployContract, DetailsToken } from "./TONDeployer"; // Asegúrate de que la ruta es correcta
import { TransactionContext } from '../TransactionContext';
import { saveImageToServer, Add_Meme } from "../ServerInteract/ServerInteract";

export const TransactionContextTON = React.createContext();


export const TransactionProviderTON = ({ children }) => {

  const { FormData_2, setCurrentMemeImage, currentMemeImage, setCurrentAccount, setTONAddress, setcurrentMemeData, currentAccount, Network } = useContext(TransactionContext); 

    
      //capturamos la direccion de la wallet
      const TONuserFriendlyAddress = useTonAddress();

      //discoonect wallet TON
      const [tonConnectUI] = useTonConnectUI();


  const sendTransactionTON = async (file) => {
    const { MemeName, Symbol, Supply, Website, Twitter, Discord, Telegram, Fee, description } = FormData_2;

    const dataTON = {
        name: String(MemeName),
        symbol: String(Symbol),
        decimals: String(9),
        mintAmount: (Supply*1.01),
        description: String(description),
        tokenImage: String("https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903")
      };
    //desplegamos el token 
    const result = await deployContract(TONuserFriendlyAddress, tonConnectUI, dataTON);
    console.log("friendly address contract", result.contractAddr.toFriendly())

    const contractmeme= result.contractAddr.toFriendly();

    setcurrentMemeData(contractmeme)
    //subimos la imagen al server
    const image_meme_url = await saveImageToServer(file); 
    
    const dataTON_2 = {
        name: String(MemeName),
        symbol: String(Symbol),
        decimals: String(9),
        description: String(description),
        image: String(image_meme_url)
      };

    const ton_tx_hash = await DetailsToken(TONuserFriendlyAddress,
         tonConnectUI, 
         result.contractAddr, 
         dataTON_2, 
         TONuserFriendlyAddress, 
         (Supply*0.01),
         result.ownerJWalletAddr 
        );

    setCurrentMemeImage(image_meme_url);
    await Add_Meme(MemeName, Symbol, Supply, contractmeme, currentMemeImage, currentAccount, Website, Twitter, Discord, Telegram, Fee, description, Network);

}

useEffect(() => {

      if (TONuserFriendlyAddress) {
          console.log("TON address:", TONuserFriendlyAddress);
          setCurrentAccount(TONuserFriendlyAddress);
          setTONAddress(TONuserFriendlyAddress);
          
      }
  }, [TONuserFriendlyAddress]);


  return (
    <TransactionContextTON.Provider value={{ 

        sendTransactionTON,

    }}>
        {children}
    </TransactionContextTON.Provider>
    );
};