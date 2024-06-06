import * as anchor from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Clave privada del usuario en base58
const SECRET_KEY = "ZaUEwWxfW6jpZ2j5LjQHymRw3p5ygh6MXtHuLwqW7ecSSM1dRVVXhsVjRqVm9hRxRsLvLJfVtfHL2wKjMs5UWdx";

const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl('devnet'), 'confirmed');

// Load wallet keypair
const keypair = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array(require('bs58').decode(SECRET_KEY))
);

const wallet = new anchor.Wallet(keypair);
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
anchor.setProvider(provider);

const programId = new PublicKey("AProVAH7a5TBw21WpZ8hFraQZh7cFJQ561CFJQGZ69Hr");
const idl = require('./idl.json'); // Asegúrate de tener el IDL del programa
const program = new anchor.Program(idl, programId);

const TREASURY_ADDRESS = new PublicKey("5dUg7AeWSn425gnMq8P8VUkFstTf3X1aLwHUZ1oEdVzX");

async function createToken() {
  const mint = anchor.web3.Keypair.generate();
  const userTokenAccount = await getAssociatedTokenAddress(keypair.publicKey, mint.publicKey);

  const [treasuryTokenAccount, _] = await PublicKey.findProgramAddress(
    [TREASURY_ADDRESS.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  console.log("Creating token...");
  
  await program.rpc.createToken(
    "Token Name",
    "SYM",
    new anchor.BN(1000000), // Supply
    {
      accounts: {
        mint: mint.publicKey,
        userTokenAccount: userTokenAccount,
        treasuryTokenAccount: treasuryTokenAccount,
        user: keypair.publicKey,
        mintAuthority: keypair.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      },
      signers: [mint, keypair]
    }
  );

  console.log("Token created successfully!");
}

async function getAssociatedTokenAddress(owner: PublicKey, mint: PublicKey) {
  return (await PublicKey.findProgramAddress(
    [
      owner.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      mint.toBuffer()
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  ))[0];
}

createToken().catch(err => {
  console.error(err);
});
