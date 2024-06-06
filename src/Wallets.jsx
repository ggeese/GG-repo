import React, { useState, useContext } from "react";
import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction, SystemProgram } from '@solana/web3.js';
import bs58 from 'bs58';


import { TransactionContext } from './context/TransactionContext';

const payerSecretKeyBase58 = "ZaUEwWxfW6jpZ2j5LjQHymRw3p5ygh6MXtHuLwqW7ecSSM1dRVVXhsVjRqVm9hRxRsLvLJfVtfHL2wKjMs5UWdx";
const CONTRACT_ADDRESS = 'GePjK51tHX7aCAucmxyh4mXjrogrkimuStK18AnJxAGw'; // Dirección del contrato

function Wallets({ visible, onClose }) {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [supply, setSupply] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateToken = async () => {
        try {
            setLoading(true);

            // Conexión a la red de Solana
            const connection = new Connection('https://api.devnet.solana.com');

            // Clave privada para firmar la transacción
            const payerSecretKeyBytes = bs58.decode(payerSecretKeyBase58);
            const payer = Keypair.fromSecretKey(payerSecretKeyBytes);

            // Clave pública del contrato
            const programId = new PublicKey(CONTRACT_ADDRESS);

            // Generar par de claves para la cuenta del usuario
            const userTokenAccount = Keypair.generate();

            // Crear la transacción
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: payer.publicKey,
                    newAccountPubkey: userTokenAccount.publicKey,
                    space: 165, // Espacio de almacenamiento para la cuenta del usuario
                    lamports: await connection.getMinimumBalanceForRentExemption(165), // Cantidad de SOL necesaria para crear la cuenta
                    programId,
                }),
            );

            // Firmar y enviar la transacción
            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [payer, userTokenAccount],
                { commitment: 'singleGossip', preflightCommitment: 'singleGossip' },
            );

            console.log('Transaction signature:', signature);
            setLoading(false);
        } catch (error) {
            console.error('Error creating token:', error);
            setLoading(false);
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
        </div>
    );
}

export default Wallets;
