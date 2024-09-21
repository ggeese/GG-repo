// NetworkSelect.jsx
import React, { useState, useContext } from 'react';
import Select, { components } from 'react-select';
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
import moonbeam from "../../../images/moonbeam.svg";
import blast from "../../../images/blast.svg";
import linea from "../../../images/linea_name.svg";
import klaytn from "../../../images/klaytn.svg";
import merlin from "../../../images/merlin.svg";
import solana from "../../../images/solana.svg";
import TON from "../../../images/TON.svg";
import zetachain from "../../../images/zetachain.svg";

const networkIcons = {
  'Base': { icon: base, nick: 'Base' },
  'Berachain bArtio': { icon: berachain, nick: 'Berachain Testnet' },
  'Moonbase Alpha': { icon: moonbeam, nick: 'Moonbase' },
  //'Manta Pacific Mainnet': { icon: manta, nick: 'Manta' },
  'Base Sepolia': { icon: base, nick: 'Base Testnet' },
  //'Sepolia ETH': { icon: eth, nick: 'ETH Sepolia' },
  'TON': { icon: TON, nick: 'TON (telegram)' },
  //'X Layer Mainnet': { icon: okb, nick: 'X Layer' },
  //'BNB Smart Chain Mainnet': { icon: bnb, nick: 'BNB Chain' },
  //'Blast': { icon: blast, nick: 'Blast' },
  //'Linea': { icon: linea, nick: 'Linea' },
  //'Polygon Mainnet': { icon: polygon, nick: 'Polygon' },
  //'ZetaChain Mainnet': { icon: zetachain, nick: 'Zeta Chain' },
  'Solana': { icon: solana, nick: 'Solana Devnet' },
  //'Manta Pacific Testnet': { icon: manta, nick: 'Manta Testnet' },
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

const NetworkSelect = ({ isMini = false, className = '', changeNetwork, Network }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const defaultNetwork = networks.find(network => network.value === Network);

  const handleNetworkChange = async (selectedOption) => {
    const previousNetwork = selectedNetwork; // Guarda la red seleccionada antes de intentar cambiarla
    setSelectedNetwork(selectedOption.value);
  
    try {
      await changeNetwork(selectedOption.value); // Intenta cambiar la red
      console.log("network name", selectedOption.value);
    } catch (error) {
      console.error("Error changing network", error);
      setSelectedNetwork(previousNetwork); // Restaura la red anterior si falla
    }
  };
  

  const handleClick = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
  };

  const sizeClass = isMini ? 'w-40 mini-menu-select' : 'w-48 text-xl custom-react-select';

  return (
    <div 
    onClick={handleClick} 
    className={className}> {/* Agrega el className aquí */}
      <Select
        options={networks}
        components={{ Option: customOption, SingleValue: customSingleValue }}
        placeholder="Select Network"
        value={selectedNetwork ? networks.find(network => network.value === selectedNetwork) : defaultNetwork}
        onChange={handleNetworkChange}
        isSearchable={false}
        className={`${sizeClass}`}
        classNamePrefix="react-select"
        styles={{
          container: (provided) => ({
            ...provided,
            backgroundColor: 'transparent' // Asegura que el contenedor sea transparente
          }),
          control: (provided) => ({
            ...provided,
            backgroundColor: isMini ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.5)', // Ajusta el fondo del control
            borderRadius: '0.375rem', // Bordes redondeados
            color: isMini ? 'black' : 'white' // Ajusta el color del texto
          }),
          menuList: (provided) => ({
            ...provided,
            backgroundColor: isMini ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.5)' // Ajusta el fondo de la lista del menú
          })
        }}
      />
    </div>

  );
};

export const NetworkSelectMini = (props) => <NetworkSelect {...props} />;
