// NetworkSelect.jsx
import React, { useState, useContext } from 'react';
import Select, { components } from 'react-select';
import { TransactionContext } from '../TransactionContext';
import eth from "../../../images/ethereum.svg";
import bnb from "../../../images/bnb.svg";
import berachain from "../../../images/berachain.svg";
import polygon from "../../../images/polygon.svg";
import okb from "../../../images/okb.svg";
import avax from "../../../images/avax.svg";
import arbitrum from "../../../images/arbitrum.svg";
import fantom from "../../../images/fantom.svg";
import optimism from "../../../images/optimism.svg";
import base from "../../../images/base.svg";
import manta from "../../../images/manta.svg";
import blast from "../../../images/blast.svg";
import linea from "../../../images/linea_name.svg";
import klaytn from "../../../images/klaytn.svg";
import merlin from "../../../images/merlin.svg";
import solana from "../../../images/solana.svg";
import TON from "../../../images/TON.svg";
import zetachain from "../../../images/zetachain.svg";

const networkIcons = {
  'Manta Pacific Testnet': { icon: manta, nick: 'Manta Testnet' },
  //'Base': { icon: base, nick: 'Base' },
  //'Manta Pacific Mainnet': { icon: manta, nick: 'Manta' },
  //'Base Sepolia': { icon: base, nick: 'Base Testnet' },
  'Sepolia ETH': { icon: eth, nick: 'ETH Sepolia' },
  'TON': { icon: TON, nick: 'TON (telegram)' },
  'X Layer Mainnet': { icon: okb, nick: 'X Layer' },
  //'BNB Smart Chain Mainnet': { icon: bnb, nick: 'BNB Chain' },
  //'Blast': { icon: blast, nick: 'Blast' },
  //'Linea': { icon: linea, nick: 'Linea' },
  //'Polygon Mainnet': { icon: polygon, nick: 'Polygon' },
  //'ZetaChain Mainnet': { icon: zetachain, nick: 'Zeta Chain' },
  'Solana': { icon: solana, nick: 'Solana Devnet' },
  //'Berachain Artio': { icon: berachain, nick: 'Berachain Testnet' },
};

const networks = Object.keys(networkIcons).map(network => ({
  value: network,
  label: networkIcons[network].nick,
  icon: networkIcons[network].icon
}));

const customOption = (props) => (
  <components.Option {...props}>
    <div className="relative flex py-1 items-center">
      <img src={props.data.icon} alt={props.data.label} className="w-5 h-5 mr-3 bg-white rounded-3xl" />
      {props.data.label}
    </div>
  </components.Option>
);

const customSingleValue = ({ data }) => (
  <div className="relative flex items-center">
    <img src={data.icon} alt={data.label} className="w-5 h-5 mr-3 bg-white rounded-3xl" />
    {data.label}
  </div>
);

const NetworkSelect = ({ isMini = false }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const { changeNetwork, Network } = useContext(TransactionContext);
  const defaultNetwork = networks.find(network => network.value === Network);

  const handleNetworkChange = (selectedOption) => {
    setSelectedNetwork(selectedOption.value);
    changeNetwork(selectedOption.value);
    console.log("network name", selectedOption.value)
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
  };

  const sizeClass = isMini ? 'w-auto text-2sm mini-menu-select' : 'w-48 text-xl custom-react-select';

  return (
    <div onClick={handleClick}>
      <Select
        options={networks}
        components={{ Option: customOption, SingleValue: customSingleValue }}
        placeholder="Select Network"
        value={selectedNetwork ? networks.find(network => network.value === selectedNetwork) : defaultNetwork}
        onChange={handleNetworkChange}
        isSearchable={false}
        className={`${sizeClass}`}
        classNamePrefix="react-select"
      />
    </div>

  );
};

export const NetworkSelectMini = (props) => <NetworkSelect {...props} isMini={true} />;
export default NetworkSelect;
