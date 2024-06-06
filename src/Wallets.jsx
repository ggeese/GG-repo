import React, { useEffect, useState, useContext } from "react";
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, setProvider, Program, BN, web3 } from '@project-serum/anchor';
import IDL from './utils/MemeFactorySol.json'
import { TransactionContext } from './context/TransactionContext';

const token_22_address = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_PROGRAM_ID = new PublicKey(token_22_address);
const rpc_url = "https://api.devnet.solana.com";
const connection = new Connection(rpc_url, "confirmed");

const getProvider = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        await provider.connect();
        return provider;
      }
    }
    window.open('https://phantom.app/', '_blank');
  };
  
function Wallets({ visible, onClose }) {
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [program, setProgram] = useState(null);
    const [provider, setProviderState] = useState(null);

    
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        const provider = await getProvider();
        if (provider) {
          setWalletAddress(provider.publicKey.toString());

          const anchorProvider = new AnchorProvider(connection, provider, {
            preflightCommitment: 'confirmed',
          });
          setProvider(anchorProvider);
          setProviderState(anchorProvider);

          // Crear una instancia del programa
          const programId = new PublicKey("GePjK51tHX7aCAucmxyh4mXjrogrkimuStK18AnJxAGw");
          const anchorProgram = new Program(IDL, programId);
          setProgram(anchorProgram);
        }
      } catch (error) {
        console.error('Error initializing program:', error);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

    const createToken = async (tokenName) => {
        if (!program) {
            console.error('Program is not initialized');
            return;
          }

        const nonce = new BN(Date.now()); // Usa BN de anchor
        const [mintPDA, bump] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('token-2022-token'),
            (window.solana.publicKey).toBuffer(),
            Buffer.from(tokenName),
            nonce.toArrayLike(Buffer, 'le', 8),
          ],
          program.programId
        );
    
        try {
          await program.methods.createToken(tokenName, nonce)
            .accounts({
              signer: window.solana.publicKey,
              mint: mintPDA,
              systemProgram: web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();
          const contractToken = mintPDA.toBase58();
          console.log('Token account:', contractToken);
          return contractToken;
        } catch (error) {
          console.error('Failed to create token:', error);
          throw error;
        }
      };

    const { connectWallet, connectPhantom, SolTransaction } = useContext(TransactionContext);
    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose();
    };

    if (!visible) return null;

    return (
        <div id='container_meme' onClick={handleOnClose} className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
            <div className="flex flex-col justify-center bg-white rounded-2xl p-2 overflow-y-auto">

                <button className="bg-gray-200 p-4" onClick={connectWallet}>
                    Metamask
                </button>
                <button className="bg-gray-200 p-4" onClick={connectPhantom}>
                    Phantom
                </button>

                <button className="bg-blue-500 text-white p-4 mt-4" onClick={SolTransaction} disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Token'}
                </button>
            </div>
            <div>
      <h1>My DApp</h1>
      {walletAddress ? (
        <div>
          <p>Connected: {walletAddress}</p>
          <button onClick={() => createToken('MyToken')}>Create Token</button>
        </div>
      ) : (
        <button onClick={getProvider}>Connect to Phantom Wallet</button>
      )}
    </div>
        </div>
    );
}

export default Wallets;
