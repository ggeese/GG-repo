import React, { useContext, useState } from "react";
import { TransactionContext } from '../../context/TransactionContext';

const Input = ({ placeholder, name_5, type, value, handleChange_5 }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e5) => handleChange_5(e5, name_5)}
  />
);

const Admin = () => {
  const { handleChange_5, FormData_5, EmergWithdraw, notifyRewards, updateRewDur, UpdateBoostContract, PauseContract, UnpauseContract, setExpMinter, StatusContract } = useContext(TransactionContext); 

  const [ContractData, setContractData] = useState ('');

  
  const handleSubmit_EmergWithdraw = (e5) => {
    const { contract, ewithdraw } = FormData_5;
    e5.preventDefault();

    if( !contract | !ewithdraw ) return;

    EmergWithdraw(); 
  }

  const notify_Rewards = (e5) => {
    const { contract, notify } = FormData_5;
    e5.preventDefault();

    if( !contract | !notify ) return;

    notifyRewards(); 
  }
  
  const update_Reward_Duration = (e5) => {
    const { contract, ureward } = FormData_5;
    e5.preventDefault();

    if( !contract | !ureward ) return;

    updateRewDur(); 
  }
  
  const Update_Boost = (e5) => {
    const { contract, uboost } = FormData_5;
    e5.preventDefault();

    if( !contract | !uboost ) return;

    UpdateBoostContract(); 
  }

  const Pause_Contract = (e5) => {
    const { contract  } = FormData_5;
    e5.preventDefault();

    if( !contract ) return;

    PauseContract(); 
  }

  const UnPause_Contract = (e5) => {
    const { contract } = FormData_5;
    e5.preventDefault();

    if( !contract ) return;

    UnpauseContract(); 
  }
  
  const set_Exp_Minter = (e5) => {
    const { poolcontract, poolstate } = FormData_5;
    e5.preventDefault();

    if( !poolcontract | !poolstate ) return;

    setExpMinter(); 
  }

  const Status_Contract = (e5) => {
    const { contract } = FormData_5;
    e5.preventDefault();
    const status_contract=StatusContract()
    console.log(status_contract)
    if( !contract  ) return;
    setContractData (status_contract); 
  }


  return (
    <div className="p-4 space-y-4 flex flex-col items-center bg-gray-300 rounded-lg shadow-md ">
      <div className="mr-2 text-2xl">Pools Set Parameters:</div>
      {/* Contract Pool Address */}
      <div className="flex flex-col items-center">
        <div className="mr-2 flex-fli">Address Pool:
        <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="contract" type="text" handleChange_5={handleChange_5} />
        </div>
      </div>
      <div className="flex flex-fil">
        <div className="flex flex-col">
          <p>time reward applicable </p>
          <p>reward per token</p>
        </div>

         <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={Status_Contract}>Check</button>

      </div>


      {/* Notification and Update Sections */}
      <div className="flex flex-col md:flex-row justify-center w-full space-y-4 md:space-y-0 md:space-x-4 p-8 ">
        <div className="flex flex-col items-left space-y-2">
          {/* Notify Rewards Amount */}
          <div className="flex flex-col items-left">
            <div>Update Boost:</div>
            <div className="text-sm italic  ">time in seconds: </div>
            <div className="flex items-center">
              <Input placeholder="3600" name_5="uboost" type="number" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={Update_Boost}>UPDATE</button>
            </div>
          </div>


          {/* Update Rewards Duration */}
          <div className="flex flex-col items-left">
            <div>Update Rewards Duration:</div>
            <div className="text-sm italic">time in seconds:</div>
            <div className="flex items-center">
              <Input placeholder="3600" name_5="ureward" type="number" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={update_Reward_Duration}>UPDATE</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Update Boost */}
          <div className="flex flex-col items-left">
            <div>Notify Rewards Amount:</div>
            <div className="text-sm italic">points:</div>
            <div className="flex items-center">
              <Input placeholder="200" name_5="notify" type="number" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={notify_Rewards}>NOTIFY</button>
            </div>
          </div>
          {/* Emergency Withdraw */}
          <div className="flex flex-col items-left">
            <div>Emergency Withdraw: </div>
            <div className="text-sm italic  ">Token Address to withdraw: </div>
            <div className="flex items-center">
              <Input placeholder="0x900692c6Af6AE2fb7Bc9c748C5beb4Ef94567fE5" name_5="ewithdraw" type="text" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={handleSubmit_EmergWithdraw}>WITHDRAW</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pause and Unpause Buttons */}
      <div className="">Pause or Unpause Pool: </div>
      <div className="flex justify-center space-x-4">
        <button className="px-7 py-2 bg-red-500 text-white rounded" onClick={Pause_Contract}>Pause</button>
        <button className="px-5 py-2 bg-green-500 text-white rounded" onClick={UnPause_Contract}>Unpause</button>
      </div>
      <div className="border-t-8 border-dashed border-[#9c9c9c] w-full"></div>
      {/* Set Exp Minter */}
      <div className="flex flex-col items-center">
        <div className="text-2xl p-4">EXP contract permission:</div>
        <div className="flex flex-col space-y-2 items-center ">
          <div className="mr-2">Pool Address:</div>
          <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="poolcontract" type="text" handleChange_5={handleChange_5} />
          <div className="flex flex-fil mr-2 ">State:</div>
          <div className="flex flex-fil px-8 py-2 border border-gray-300 rounded">
          <select
            name="poolstate"
            value={FormData_5.poolstate}
            onChange={(e) => handleChange_5(e, "poolstate")}
            className="flex flex-fil px-8 py-2 border border-gray-300 rounded"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button className="flex flex-fil ml-2 px-4 py-2 bg-black text-white rounded" onClick={set_Exp_Minter}>
            Update
          </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Admin;