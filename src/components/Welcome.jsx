import { TransactionContext } from '../context/TransactionContext';
import React, { useContext } from "react";
import { Loader } from './'

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    />
);

const Input2 = ({ placeholder, name_2, type, value, handleChange_2 }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e2) => handleChange_2(e2, name_2)}
    />
);

const Input3 = ({ placeholder, name_3, type, value, handleChange_3 }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e3) => handleChange_3(e3, name_3)}
    />
);

const Welcome = () => {
  const { connectWallet, currentAccount, FormData, FormData_2, FormData_3, sendTransaction, sendTransaction_2,sendTransaction_3, handleChange, handleChange_2, handleChange_3 } = useContext(TransactionContext); 

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = FormData;

    e.preventDefault();

    if(!addressTo || !amount || !message) return;

    sendTransaction();
  }

  const handleSubmit_2 = (e2) => {
    const { MemeName, Symbol, Supply } = FormData_2;

    e2.preventDefault();

    if(!MemeName || !Symbol || !Supply) return;

    sendTransaction_2();    
  }
  

  const handleSubmit_3 = (e3) => {
    const { stake } = FormData_3;

    e3.preventDefault();

    if(!stake ) return;

    sendTransaction_3();    
  }

  return (
    <div>
      {!currentAccount && (
        <button
          type="button"
          onClick={connectWallet}
          className="flex flex-row justify-center intems-center my-5 bg-[#2952e3] p-3 rounded-full cursos-pointer hover:bg-[#2546bd]"
        >
          <p>
            connect wallet
          </p>
        </button>
        
       )}

      {currentAccount && (
                <p className = "text-white text-base font-semibold">
                  wallet connected
                </p>
        )}


        <div>
          <Input2 placeholder="Name your meme" name_2= "MemeName" type= "text" handleChange_2={handleChange_2} />
          <Input2 placeholder="Symbol" name_2= "Symbol" type= "text" handleChange_2={handleChange_2} />
          <Input2 placeholder="Max Supply" name_2= "Supply" type= "number" handleChange_2={handleChange_2} />

          {false ? (
              <Loader/>
            ) : (
              <button
              type="button"
              onClick={handleSubmit_2}
              >
              Create Meme
              </button>
            )}

        </div>

        <div>
          <Input3 placeholder="amount stake" name_3= "stake" type= "number" handleChange_3={handleChange_3} />

          {false ? (
              <Loader/>
            ) : (
              <button
              type="button"
              onClick={handleSubmit_3}
              >
              Stake Meme
              </button>
            )}

        </div>
            
    </div>
  );
};

export default Welcome;
