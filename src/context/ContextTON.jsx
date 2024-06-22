// jettonService.js
import TonWeb from 'tonweb';

// Initialize TonWeb with the testnet provider
const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC';
console.log('Initializing TonWeb with provider URL:', providerUrl);
const tonWeb = new TonWeb(new TonWeb.HttpProvider(providerUrl));

console.log('TonWeb initialized:', tonWeb);

// Define the createJetton function
export const createJetton = async (walletAddress) => {
    console.log('createJetton function called with walletAddress:', walletAddress);

    const masterJettonAddress = 'EQD-uWevT8lGaT2C7jX8PFFp6dbKTGcvMxKFvo2xyWxYhwnn';
    const name = 'MiJetton';
    const symbol = 'MJT';
    const decimals = 9;

    if (!walletAddress || !tonWeb) {
        console.error('Wallet not connected or TonWeb not initialized');
        return;
    }

    try {
        // Ensure the addresses are valid
        console.log('Validating walletAddress and masterJettonAddress...');
        const walletAddr = new TonWeb.utils.Address(walletAddress);
        const masterAddr = new TonWeb.utils.Address(masterJettonAddress);
        console.log('walletAddr:', walletAddr);
        console.log('masterAddr:', masterAddr);

        // Create a new payload Cell
        console.log('Creating payload Cell...');
        const payload = new TonWeb.boc.Cell();
        console.log('Payload cell created:', payload);

        payload.bits.writeUint(1, 32); // Operation code for create jetton
        console.log('Wrote operation code to payload cell');
        
        payload.bits.writeBytes(TonWeb.utils.stringToBytes(name));
        console.log('Wrote name to payload cell:', name);
        
        payload.bits.writeBytes(TonWeb.utils.stringToBytes(symbol));
        console.log('Wrote symbol to payload cell:', symbol);
        
        payload.bits.writeUint(decimals, 8);
        console.log('Wrote decimals to payload cell:', decimals);

        // Create an internal message with the payload
        console.log('Creating internal message with payload...');
        const value = TonWeb.utils.toNano('0.1');  // Ensure this is a string
        console.log('Value in nanoTON:', value.toString());

        const internalMessage = {
            value: value,
            body: payload,
            to: masterAddr,
            from: walletAddr
        };
        console.log('Internal message created:', internalMessage);

        // Send the internal message using the wallet contract
        console.log('Sending internal message using wallet contract...');
        const walletContract = tonWeb.wallet.create({address: walletAddr});
        console.log('Wallet contract created:', walletContract);

        // Get the current seqno of the wallet
        console.log('Fetching current seqno...');
        const seqno = await walletContract.methods.seqno().call();
        console.log('Current seqno:', seqno);

        
        // Ensure seqno is valid
        if (typeof seqno !== 'number' || seqno < 0) {
            throw new Error('Invalid seqno received');
        }


        // Transfer method with seqno
        await walletContract.methods.transfer({
            secretKey: '<YOUR_SECRET_KEY>',  // Replace with your actual secret key
            seqno: seqno,
            sendMode: 3,
            order: internalMessage
        }).send();

        console.log('Jetton creado exitosamente');
    } catch (error) {
        console.error('Error al crear el jetton:', error);
    }
};
