import React, { useState, useEffect } from 'react';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Builder, Address, toNano } from "ton";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Buffer } from 'buffer';

const Test = () => {
    const wallet = useTonWallet();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const initializeClient = async () => {
            try {
                const endpoint = await getHttpEndpoint({ network: "testnet" });
                const tonClient = new TonClient({ endpoint });
                setClient(tonClient);
            } catch (error) {
                console.error('Error inicializando el cliente TON:', error);
            }
        };

        initializeClient();
    }, []);

    useEffect(() => {
        if (wallet) {
            console.log('Billetera conectada:', wallet);
        } else {
            console.log('No hay billetera conectada');
        }
    }, [wallet]);

    const stringToBytes = (str) => {
        return new TextEncoder().encode(str);
    };

    const createJetton = async () => {
        if (!wallet || !client) {
            console.error('No hay billetera conectada o cliente no inicializado');
            return;
        }

        const masterJettonAddress = Address.parse('EQD-uWevT8lGaT2C7jX8PFFp6dbKTGcvMxKFvo2xyWxYhwnn');
        const name = 'MiJetton';
        const symbol = 'MJT';
        const decimals = 9;

        try {
            console.log('Iniciando creación de Jetton');
            console.log(`Master Jetton Address: ${masterJettonAddress.toString()}`);
            console.log(`Nombre: ${name}, Símbolo: ${symbol}, Decimales: ${decimals}`);

            // Convertir cadenas a bytes y escribirlas en el payload
            const payloadCellBuilder = new Builder();
            const nameBytes = Buffer.from(stringToBytes(name));
            const symbolBytes = Buffer.from(stringToBytes(symbol));
            payloadCellBuilder.storeUint(nameBytes.length, 8);
            payloadCellBuilder.storeBuffer(nameBytes);
            payloadCellBuilder.storeUint(symbolBytes.length, 8);
            payloadCellBuilder.storeBuffer(symbolBytes);
            payloadCellBuilder.storeUint(decimals, 8);

            const payloadCell = payloadCellBuilder.endCell();

            // Dirección del remitente (billetera conectada)
            const fromAddress = Address.parse(wallet.account.address);

            // Construir el mensaje
            const messageBodyBuilder = new Builder();
            messageBodyBuilder.storeUint(0x18, 32); // Mint operation code
            messageBodyBuilder.storeAddress(fromAddress); // Dirección de la billetera
            messageBodyBuilder.storeCoins(toNano(1000)); // Monto de Jettons a crear
            messageBodyBuilder.storeRef(payloadCell); // Información del Jetton

            const messageBody = messageBodyBuilder.endCell();

            const messageCellBuilder = new Builder();
            messageCellBuilder.storeUint(0x10, 6); // Internal message
            messageCellBuilder.storeAddress(masterJettonAddress);
            messageCellBuilder.storeCoins(toNano(0.01)); // Pago por la transacción
            messageCellBuilder.storeUint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);
            messageCellBuilder.storeUint(0, 32);
            messageCellBuilder.storeUint(0, 64);
            messageCellBuilder.storeRef(messageBody);

            const messageCell = messageCellBuilder.endCell();

            // Enviar la transacción
            await client.sendExternalMessage(fromAddress, messageCell);
            console.log('Jetton creado exitosamente');
        } catch (error) {
            console.error('Error al crear el Jetton:', error);
        }
    };

    return (
        <div>
            <TonConnectButton className="bg-gray-200 p-4" style={{ float: "right" }}/>
            <button onClick={createJetton} disabled={!wallet}>Create Jetton</button>
        </div>
    );
};

export default Test;
