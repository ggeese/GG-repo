import React, { useEffect, useContext, useState } from "react";
import { Connection, PublicKey, clusterApiUrl, Transaction, LAMPORTS_PER_SOL, SystemProgram as SystemProgramXD } from '@solana/web3.js';
import { AnchorProvider, setProvider, Program, BN, web3, utils } from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, ASSOCIATED_TOKEN_PROGRAM_ID, createInitializeTransferFeeConfigInstruction, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { saveImageToServer, Add_Meme, handleCreateJson } from "../ServerInteract/ServerInteract";
import { TransactionContext } from '../TransactionContext';
import IDL from '../../utils/MemeFactorySol.json'

//const token_22_address = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const token_22_address = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_PROGRAM_ID = new PublicKey(token_22_address);
//const treasury_address = "HqZ5oLpg13EftbJQXT37fFbMrS7B4v39KxEq3cTTjfsX";
const treasury_address = new PublicKey("6Esfh8TgNV4gMSWvca1x6kPqJt4iPzc4JQHXuPip1vyn");

export const TransactionContextSOL = React.createContext();


export const TransactionProviderSOL = ({ children }) => {

  const { FormData_2, setCurrentMemeImage, currentMemeImage, setCurrentAccount, setSOLAddress, setcurrentMemeData, currentAccount, setTxHash, Network } = useContext(TransactionContext); 
  const [connectionSol, setConnectionSol] = useState('');
  const [program, setProgram] = useState(null);

  const initialize = async (provider) => {
    try {
      if (provider) {

        const anchorProvider = new AnchorProvider(connectionSol, provider, {
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

  const connectPhantom = async () => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  //const connection = new Connection('https://nd-280-172-363.p2pify.com/f80a5ed8875fd5271977a6ca784278ab', 'confirmed');
    setConnectionSol(connection);
    const provider = await getProvider();
    if (provider) {
      try {
        initialize(provider);
        
        const publicKey = provider.publicKey;
        const solaccount = publicKey.toString();
        console.log('Conectado a la wallet:', solaccount);
  
        //const balance = await connection.getBalance(publicKey);
        setSOLAddress(solaccount);
        setCurrentAccount(solaccount);
        console.log("Disconnected");
        const walletacc = "Phantom";
        setWalletext (walletacc);
      } catch (err) {
        console.error('Error conectando la wallet:', err);
        return null;
      }
    } else {
      console.log('Phantom Wallet no está instalada');
      return null;
    }
  };

  const SolTokenFactory = async (tokenName, amount) => {
    if (!program) {
        console.error('Program is not initialized');
        return;
      }

  //asignamos el nonce para el token decimales la cantidad a mintear para la wallet y el treasury ademas de un fee

    const nonce = new BN(Date.now()); // Usa BN de anchor
    const decimals = 6;
    const amountInMinUnit = new BN(amount).mul(new BN(10).pow(new BN(decimals)));
    const amountInMinUnit_Treasure = new BN(amount*0.01).mul(new BN(10).pow(new BN(decimals)));
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
        const { blockhash } = await connectionSol.getRecentBlockhash();


        //all transaction sequence

        const tx = new Transaction({
            recentBlockhash: blockhash,
            feePayer: window.solana.publicKey,
        }).add(createTokenInstruction, createTokenAccountInstruction, AssociatedTokenAccounInstructions ,
            createMintTokenInstruction , createMintTokenInstruction_2, ComissionFeeSol);

            const signature = await window.solana.signAndSendTransaction(tx);
            await connectionSol.confirmTransaction(signature);
  
            console.log('Token account:', mintPDA.toBase58());
            console.log('Token account created:', tokenAccountPDA.toBase58());
        
            return mintPDA;
    } catch (error) {
        console.error('Failed to create token or token account:', error);
        throw error;
    }
  }


  const SetMetadataRenounceOwner = async (mintPDA, tokenName, Symbol, file) => { 

    let image_meme_url;

    if (file) {
        image_meme_url = await saveImageToServer(file); 
        setCurrentMemeImage(image_meme_url);// guarda el URL del meme contract_meme

    }else{
        image_meme_url = "https://ik.imagekit.io/PAMBIL/egg.gif?updatedAt=1718300067903"; 
        setCurrentMemeImage(image_meme_url);// guarda el URL del meme contract_meme

    }

    //getting metadata PDA

    const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintPDA.toBuffer(),
        ],
        PROGRAM_ID
    );

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

      const renounceAuthorityInstruction  = createSetAuthorityInstruction(
          mintPDA,
          window.solana.publicKey,
          AuthorityType.MintTokens,
          null,
      );

      const { blockhash } = await connectionSol.getRecentBlockhash();

      const tx_1 = new Transaction({
          recentBlockhash: blockhash,
          feePayer: window.solana.publicKey,
      }).add( metadataAccountInstruction, renounceAuthorityInstruction );
          
      // Envía la transacción
      const signature_1 = await window.solana.signAndSendTransaction(tx_1);
      const txhash = await connectionSol.confirmTransaction(signature_1);
      console.log('txhash', txhash);
      console.log('Metadata created');
      return txhash
    }

    async function updateTransactionFee() {

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
              const signature = await web3.sendAndConfirmTransaction(connectionSol, transaction, [payer]);
              console.log(`Tarifa de transacción configurada. Transacción: ${signature}`);
          } catch (error) {
              console.error(`Error al configurar la tarifa de transacción: ${error}`);
          }
      };
  
  const sendTransactionSOL = async (file) => {
    const { MemeName, Symbol, Supply, Website, Twitter, Discord, Telegram, Fee, description } = FormData_2;
        //asignacion de fees
        //updateTransactionFee();
        try{
            //const contract_meme = await SolCreateToken(MemeName, Symbol, Supply, file);
            const contract_meme = await SolTokenFactory(MemeName, Supply);
            if (contract_meme) {
                console.log("contract meme ",contract_meme);
                const tx_hash = await SetMetadataRenounceOwner(contract_meme, MemeName, Symbol, file)
                setTxHash(tx_hash);
                try{
                  await Add_Meme(MemeName, Symbol, Supply, contract_meme, currentMemeImage, currentAccount, Website, Twitter, Discord, Telegram, Fee, description, Network)
                } catch(error){
                  console.log("server database is down")
                }
                setcurrentMemeData(contract_meme.toBase58());
            }
        //console.log("token created");  
        }   catch (error) {
            console.log(error);

            throw new Error("No Solana object.")
        };
    }


  return (
    <TransactionContextSOL.Provider value={{ 

        sendTransactionSOL,
        connectPhantom,

    }}>
        {children}
    </TransactionContextSOL.Provider>
    );
};