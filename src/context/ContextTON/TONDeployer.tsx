import React from 'react';
import { Address } from "ton";
import { jettonDeployController, JettonDeployParams } from "./lib/deploy-controller";
import WalletConnection from "./services/wallet-connection";
import { createDeployParams } from "./lib/utils";
import { ContractDeployer } from "./lib/contract-deployer";
import { toDecimalsBN } from "./utils";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

const DEFAULT_DECIMALS = 9;

function TONDeployer() {
  //const { showNotification } = useNotification();
  const walletAddress = useTonAddress();
  const [tonconnect] = useTonConnectUI();

  const deployContract = async () => {
    const data = {
      name: "MemeToken",
      symbol: "MEM",
      tokenImage: "https://example.com/token-image.png",
      description: "A token for memes",
      offchainUri: "ipfs://example-offchain-uri",
      mintAmount: 1000
    };

    let decimals = "9";

    const params: JettonDeployParams = {
      owner: Address.parse(walletAddress),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: parseInt(decimals).toFixed(0),
      },
      offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.mintAmount, decimals ?? DEFAULT_DECIMALS),
    };
    const deployParams = createDeployParams(params, data.offchainUri);
    const contractAddress = new ContractDeployer().addressForContract(deployParams);
    console.log(contractAddress.toFriendly(),"contrac address del deploy")

    const isDeployed = await WalletConnection.isContractDeployed(contractAddress);

    if (isDeployed) { console.log("contract already deployed")
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, tonconnect, walletAddress);

    } catch (err) {
      if (err instanceof Error) {
console.log("ERROR!!!!!!!!!!!!!!!")
      }
    } finally {
    }
  }
  
  return { deployContract }; // Export the deployContract function


}

export { TONDeployer };


