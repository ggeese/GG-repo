
import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { createV1, updateV1 ,Collection, Creator, Uses, CreateV1InstructionAccounts, CreateV1InstructionData, TokenStandard, CollectionDetails, PrintSupply, UpdateV1InstructionAccounts, Data} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey, createSignerFromKeypair, none, percentAmount, publicKey, signerIdentity, some } from "@metaplex-foundation/umi";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { fromWeb3JsKeypair, fromWeb3JsPublicKey} from '@metaplex-foundation/umi-web3js-adapters';
import {AnchorProvider, Wallet, setProvider, Program, BN, web3, utils } from "@project-serum/anchor";
import { Connection, PublicKey as PublicKeyweb3, Keypair } from "@solana/web3.js";
import { encode } from "bs58";
import IDL  from "../utils/MemeFactorySol.json";
import fs from "fs";

const HelloWorld = () => {

  console.log("hello");
}

export default HelloWorld;
// @ts-ignore
// @ts-nocheck
// @ts-check
const idl = JSON.parse(IDL);

const token_22_address="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

const TOKEN_PROGRAM_ID= new PublicKeyweb3(token_22_address)
const TOKEN_PROGRAM_ID_META: PublicKey = publicKey(token_22_address); //TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
const rpc_url= "https://api.devnet.solana.com";
const connection = new Connection(rpc_url, "confirmed");
const walletKeyPair = Keypair.fromSecretKey(
new Uint8Array(JSON.parse(fs.readFileSync('./id.json', 'utf8')))
);
const wallet = new Wallet(walletKeyPair);
const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" });

setProvider(provider);

const Content = () => {

  const wallet = useAnchorWallet();
  const connection = useConnection();
//  const [program, setProgram] = useState = Program 
}

// Cargar el IDL y crear una instancia del programa
// program id es el contrato del memefactory 
const programId = new PublicKeyweb3("GePjK51tHX7aCAucmxyh4mXjrogrkimuStK18AnJxAGw");
const program = new Program(idl, programId);

// Funciones para interactuar con el contrato
//let associated_token_account: string; //global var
let wallet_tokens_holding: string;

  
export function loadWalletKey(keypairFile:string): Keypair {
    const fs = require("fs");
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
  }



  async function createToken(tokenName: string): Promise<string> {
    const nonce = new BN(Date.now()); // Usa BN de anchor
    const [mintPDA, bump] = PublicKeyweb3.findProgramAddressSync(
      [Buffer.from("token-2022-token"), provider.wallet.publicKey.toBuffer(), Buffer.from(tokenName), nonce.toArrayLike(Buffer, "le", 8)],
      program.programId
    );
  
    try {
      await program.methods.createToken(tokenName, nonce)
        .accounts({
          signer: provider.wallet.publicKey,
          mint: mintPDA,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
        const contract_token = mintPDA.toBase58();
        console.log("token account ",contract_token) // Devuelve la dirección del token cuando la creación es exitosa
        return (contract_token);
      //return ("GnAisWXiKEAwb3msv4ZvaUnxFptMvDahPU4csJbp4z2v");
      //console.log("token account ",contract_token) // Devuelve la dirección del token cuando la creación es exitosa
    } catch (error) {
      console.error("Failed to create token:", error);
      throw error;
    }
  }
  
  
  async function createTokenAccount(mint: PublicKeyweb3): Promise<string> {
    const [tokenAccountPDA, bump] = PublicKeyweb3.findProgramAddressSync(
      [Buffer.from("token-2022-token-account"), provider.wallet.publicKey.toBuffer(), mint.toBuffer()],
      program.programId
    );
    try {
      await program.methods.createTokenAccount()
        .accounts({
          signer: provider.wallet.publicKey,
          mint: mint,
          tokenAccount: tokenAccountPDA,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      wallet_tokens_holding = tokenAccountPDA.toString()
      console.log(`Token account created: ${wallet_tokens_holding}`);
      return(wallet_tokens_holding)
      } catch (error) {
        console.error("Failed to create token:", error);
        throw error;
      }

    }
  
  async function createAssociatedTokenAccount(token_address : PublicKeyweb3, reciever_address: PublicKeyweb3):Promise<string> {
    const tokenAccount = await utils.token.associatedAddress({
      mint: token_address,
      owner: reciever_address,
    });
    console.log(tokenAccount,"token account");
    try {

      await program.methods.createAssociatedTokenAccount()
        .accounts({
          signer: provider.wallet.publicKey,
          mint: token_address,
          tokenAccount: tokenAccount,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
        })
        .rpc();
        const associated_token_account = tokenAccount.toString();
        console.log(`Associated token account created: ${associated_token_account}`);
        return (associated_token_account);
    } catch (error) {
        console.error("Failed to create token:", error);
        throw error;
    }

  }
  
  async function transferToken(from: PublicKeyweb3, to: PublicKeyweb3, amount: number, mint: PublicKeyweb3) {
    await program.methods.transferToken(new BN(amount))
      .accounts({
        signer: provider.wallet.publicKey,
        from: from,
        to: to,
        mint: mint, // El mint aquí puede ser reemplazado por la cuenta correcta si es necesario
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
      })
      .rpc();
  
    console.log(`Transferred ${amount} tokens from ${from.toString()} to ${to.toString()}`);
  }
  
  async function mintToken(mint: PublicKeyweb3, receiver: PublicKeyweb3, amount: number) {
    await program.methods.mintToken(new BN(amount))
      .accounts({
        signer: provider.wallet.publicKey,
        mint: mint,
        receiver: receiver,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  
    console.log(`Minted ${amount} tokens to ${receiver.toString()}`);

  }
  
  async function nametokenmeta(mint: PublicKeyweb3){
    console.log("let's name some token-22 tokens in 2024!");
    const myKeypair = loadWalletKey("id.json");
    const umi = createUmi("https://api.devnet.solana.com");
    const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(myKeypair))
    umi.use(signerIdentity(signer, true))

    const ourMetadata = { // TODO change those values!
        name: "MOMO", 
        symbol: "MO",
        uri: "https://raw.githubusercontent.com/loopcreativeandy/video-tutorial-resources/main/metadataUpdate/metadata.json",
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    if(true){
        const onChainData = {
            ...ourMetadata,
            // we don't need that
            sellerFeeBasisPoints: percentAmount(0,2),
            creators: none<Creator[]>(),
            collection: none<Collection>(),
            uses: none<Uses>(),
        }
        const accounts: CreateV1InstructionAccounts = {
            mint: fromWeb3JsPublicKey(mint),
            splTokenProgram: TOKEN_PROGRAM_ID_META
        }
        const data: CreateV1InstructionData = {
            ...onChainData,
            isMutable: true,
            discriminator: 0,
            tokenStandard: TokenStandard.Fungible,
            collectionDetails: none<CollectionDetails>(),
            ruleSet: none<PublicKey>(),
            createV1Discriminator: 0,
            primarySaleHappened: true,
            decimals: none<number>(),
            printSupply: none<PrintSupply>(),
        }
        const txid = await createV1(umi, {...accounts, ...data}).sendAndConfirm(umi);
        console.log(encode(txid.signature))
    } else {
        const onChainData = {
            ...ourMetadata,
            sellerFeeBasisPoints: 0,
            creators: none<Creator[]>(),
            collection: none<Collection>(),
            uses: none<Uses>(),
        }
        const accounts: UpdateV1InstructionAccounts = {
            mint: fromWeb3JsPublicKey(mint),
        }
        const data = {
            discriminator: 0,
            data: some<Data>(onChainData),
            updateV1Discriminator: 0,
        }
        const txid = await updateV1(umi, {...accounts, ...data}).sendAndConfirm(umi);
        console.log(encode(txid.signature))
    }
}

  async function tokenfactory(){
    const tokenName = "MOMO";
    const reciever_address = "6Esfh8TgNV4gMSWvca1x6kPqJt4iPzc4JQHXuPip1vyn";

    try {
      const token_account = await createToken(tokenName); // Esperar a que se cree el token y obtener la dirección del token
      const mint = new PublicKeyweb3(token_account); // Crear la instancia del PublicKeyweb3 usando la dirección del token
      console.log("token creado")
      // creando el associated token account del token 
      const associated_token_account = await createTokenAccount(mint);
      const to_associated_acc = new PublicKeyweb3(associated_token_account);
      console.log("cuenta de token creada")

      //minteando los tokens a la cuenta asociada
      await mintToken(mint, to_associated_acc, 500000);

      // creando el associated token account del receptor de tokens 
      const reciever_address_public = new PublicKeyweb3(reciever_address); // Crear la instancia del PublicKeyweb3 usando la dirección del token
      console.log("llegas aqui");
      const to_associated_acc_reciever = await createAssociatedTokenAccount(mint, reciever_address_public);
      console.log("llegas aqui 2");
      const reciever_tokens = new PublicKeyweb3(to_associated_acc_reciever);
      console.log("cuenta de token asociada a la wallet de destino creada")
      //enviando los tokens a la cuenta dedestino
      await transferToken(to_associated_acc, reciever_tokens, 200000, mint);
      //await nametokenmeta(mint);

      // Resto del código
    } catch (error) {
        console.error("Failed to create token:", error);
    }
        //await mintToken(mint, to_associated_acc, 500000);
        //console.log("tokens minteados XD")
        //const to = new PublicKeyweb3(wallet_tokens_holding); // Asegúrate de que esta es la cuenta de token asociada correcta del receptor
        //await transferToken(to_associated_acc, to, 200000, mint);
        //console.log("tokens enviados XD")
}

tokenfactory();
