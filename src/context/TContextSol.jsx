//import { nametokenmeta } from './TContextSol'; // Ajusta la ruta según sea necesario
import { PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram as SystemProgramXD } from '@solana/web3.js';
import { BN, web3 } from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

export const SolCreateTokens = async (tokenName, Symbol, amount, file) => {
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
                const image_meme_url = await saveImageToServer(file); 
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
        
                
            const tx_1 = new Transaction({
                recentBlockhash: blockhash,
                feePayer: window.solana.publicKey,
            }).add( metadataAccountInstruction );
                
        // Envía la transacción
        const signature_1 = await window.solana.signAndSendTransaction(tx_1);
        await connection.confirmTransaction(signature_1);

        console.log('Metadata created');


        return mintPDA;
        

        } catch (error) {
        console.error('Failed to create token or token account:', error);
        throw error;
        }

    };



