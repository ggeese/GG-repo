import React, { useState, useContext } from "react";
import Stake from './Stake'
import Untake from './Unstake'
import Data_Pools from './Data_Pools'; // Asegúrate de ajustar la ruta si el archivo está en una subcarpeta
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';


// Componente principal que incluye el componente GridContainer
const Pools = () => {
    const [showMyStake, setShowMyStake] = useState(false);
    const [showMyUnStake, setShowMyUnStake] = useState(false);
    const [selected_stake_contract, setSelected_stake_contract] = useState(null);
    const [selected_token_stake, setSelected_token_stake] = useState(null);
    const [selected_stake_name, setSelected_stake_name] = useState(null);
    const [selected_decimals, setSelected_decimals] = useState(null);
    const [balanceToken, setbalanceToken] = useState(null);
    const [balanceStaked, setbalanceStaked] = useState(null);

    


    const {Get_Token_Balance, Get_Balance_Staked, Claim_Rewards } = useContext(TransactionContextETH); 



    //const balance_token_2 = Get_Token_Balance(stake_contract)
    
    const handleOnClose = () =>{ 
        setShowMyStake(false);
        setShowMyUnStake(false);
        setSelected_stake_contract(null);  // Resetea el token contract seleccionado al cerrar
    };

    const [formularioVisible, setFormularioVisible] = useState({});

    const toggleFormulario = (id) => {
        setFormularioVisible(prevState => ({
          ...prevState,
          [id]: !prevState[id]
        }));
      };

      

    const handleStakeClick = async (stake_contract, token_stake_contract, token_name, decimals) => {
        setShowMyStake(true);
        setSelected_stake_contract(stake_contract);   // Guarda el token contract del item seleccionado
        setSelected_token_stake(token_stake_contract);   // Guarda el token contract del item seleccionado
        setSelected_stake_name(token_name);
        setSelected_decimals(decimals);
        const balance = await Get_Token_Balance(token_stake_contract, decimals);
        setbalanceToken(balance);
    };
    
    const handleUnStakeClick = async (stake_contract, token_stake_contract, token_name, decimals) => {
        setShowMyUnStake(true);
        setSelected_stake_contract(stake_contract);   // Guarda el token contract del item seleccionado
        setSelected_token_stake(token_stake_contract);   // Guarda el token contract del item seleccionado
        setSelected_stake_name(token_name);
        setSelected_decimals(decimals);
        const balance = await Get_Balance_Staked(stake_contract, decimals);
        setbalanceStaked(balance);
    };

    const handleClaimClick = async (stake_contract) => {
        const balanceRewards = await Claim_Rewards(stake_contract);
    };

    


    return (
        
        <div className="flex flex-col items-center text-black">
            <Data_Pools 

                handleStakeClick={handleStakeClick} 
                handleUnStakeClick={handleUnStakeClick} 
                handleClaimClick={handleClaimClick} 
                toggleFormulario={toggleFormulario} 
                formularioVisible={formularioVisible} 
            />  
            <Stake onClose = {handleOnClose} visible = {showMyStake} stake_contract={selected_stake_contract} token_stake_contract={selected_token_stake} decimals={selected_decimals} token_name={selected_stake_name} balance_token_wallet={balanceToken} />
            <Untake onClose = {handleOnClose} visible = {showMyUnStake} stake_contract={selected_stake_contract} token_stake_contract={selected_token_stake} decimals={selected_decimals} token_name={selected_stake_name} balance_Staked_wallet={balanceStaked} />

        </div>
    );
};

export default Pools;
