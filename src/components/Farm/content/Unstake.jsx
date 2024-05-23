import React, { useContext, useEffect } from "react";
import { TransactionContext } from '../../../context/TransactionContext';

const Input3 = ({ placeholder, name_3, type, value, handleChange_3 }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e3) => handleChange_3(e3, name_3)  }
      />
  );

  

function Unstake({visible, onClose, stake_contract, token_stake_contract, token_name, balance_Staked_wallet }) {
        
    const { FormData_3, handleChange_3, change_input_staking, sendTransaction_3_Unstake } = useContext(TransactionContext); 

    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose()
    };

    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
              onClose();
          }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [onClose]);

    const handleSubmit_3 = (e3) => {
      const { stake } = FormData_3;
      e3.preventDefault();
  
      if(!stake ) return;
  
      sendTransaction_3_Unstake(stake_contract); 
    }

    if (!visible) return null;

    return (
      <div>
          <div 
            id= 'container_meme'
            onClick={handleOnClose} 
            className="fixed rounded inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
              <div className="fixed bg-gray-300 left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-black bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-[95vw] md:max-w-lg">

            
                <div className="flex flex-col space-y-1.5 text-center sm:text-left text-lg font-semibold">Unstake {token_name}</div>
                <div className="px-2 max-h-[calc(90vh_-_100px)] overflow-auto">
                  <div className="flex items-center font-medium justify-between gap-2">
                    <div className="">
                      {token_name} To Unstake 
                        <p className="text-sm"> contract: {stake_contract.slice(0, 6)}...{stake_contract.slice(-4)}</p>

                    </div>
                    <div className="flex flex-col justify-end items-center gap-1">
                      {token_name}
                      <p className=" text-sm">{token_stake_contract.slice(0, 6)}...{token_stake_contract.slice(-4)}</p>
                    </div>
                    
                    </div>
                  <div className= "mt-2 rounded-md w-full bg-gray-200 py-4 px-2 text-right">
                    <div className="text-lg font-semibold w-full truncate outline-none bg-transparent text-right">
                      <Input3 placeholder="0" name_3= "stake" type= "number" value={FormData_3.stake} handleChange_3={handleChange_3} />
                    </div>
                    <div>
                       0 USD
                    </div>
                  </div>
                  <div className="mt-1.5 flex justify-end">
                    Staked: {balance_Staked_wallet}
                    
                  </div>
                </div>
                <button className="absolute -right-4 -top-4 p-2 rounded-full h-10 w-10 flex justify-center items-center bg-white border border-zinc-500 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  onClick={onClose}>X</button>

         

                  <div className ="mt-4">
                    <div className="flex gap-1 items-center">
                      Image
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <button 
                        onClick={() => change_input_staking(balance_Staked_wallet*0.25)} // Usa una función de flecha para llamar a change_input con el valor 25
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 border-2 border-black uppercase h-9 px-4 py-2">
                        25%
                      </button>
                      <button
                        onClick={() => change_input_staking(balance_Staked_wallet*0.50)} // Usa una función de flecha para llamar a change_input con el valor 25
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 border-2 border-black uppercase h-9 px-4 py-2">
                        50%
                      </button>
                      <button
                        onClick={() => change_input_staking(balance_Staked_wallet*0.75)} // Usa una función de flecha para llamar a change_input con el valor 25
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 border-2 border-black uppercase h-9 px-4 py-2">
                        75%
                      </button>
                      <button
                        onClick={() => change_input_staking(balance_Staked_wallet)} // Usa una función de flecha para llamar a change_input con el valor 25
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 border-2 border-black uppercase h-9 px-4 py-2">
                        100%
                      </button>
                    </div>
                  </div>
                  <div className="w-60 m-auto pt-4">
                    <button
                     className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 border-2 border-black h-9 px-4 py-2 self-center place-self-center rounded-lg w-full normal-case"
                     type="button"
                        onClick={handleSubmit_3}>
                        -Unstake
                    </button>
                  </div>
              </div>
        </div>
      </div>
   
    )
}
export default Unstake;
