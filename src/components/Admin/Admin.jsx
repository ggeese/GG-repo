import React, { useContext, useState } from "react";
//import { TransactionContext } from '../../context/TransactionContext';
import { TransactionContextETH } from '../../context/ContextETH/ContextETH';
import info from "../../../images/info.svg";

const Input = ({ placeholder, name_5, type, value, handleChange_5 }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e5) => handleChange_5(e5, name_5)}
  />
);


const Tooltip = ({ message, space }) => (
  <div className="relative flex justify-center items-center group z-20">
    <img src={info} alt="info icon" className="w-auto h-3  cursor-pointer" />
    <div
      className={`absolute flex flex-col items-center hidden group-hover:flex`}
      style={{ bottom: `${space || 3}rem` }} 
    >
      <div className="w-56 p-2 text-xs text-white bg-black rounded-md shadow-lg">
        {message}
      </div>
      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
    </div>
  </div>
);

const Admin = () => {
  //const { handleChange_5, FormData_5, EmergWithdraw, notifyRewards, updateRewDur, UpdateBoostContract, PauseContract, UnpauseContract, setExpMinter, StatusContract } = useContext(TransactionContext); 
  const { handleChange_5, FormData_5, GetlistmintersNFT, EmergWithdraw, notifyRewards, updateRewDur, UpdateBoostContract, UpdateBoostTime, PauseContract, UnpauseContract, setExpMinter, StatusContract, ChangePoolTreasury } = useContext(TransactionContextETH); 

  const [rewardRate, setRewardRate] = useState ('');
  const [lastReward, setLastReward] = useState ('');
  const [supply, setSupply] = useState('');
  const [decimals, setDecimals] = useState('');
  const [endboost, setEndboost] = useState('');
  const [durationValue, setDurationValue] = useState(''); // Valor en segundos por defecto
  const [durationUnit, setDurationUnit] = useState('seconds'); // Unidad por defecto
  const [boostValue, setBoostValue] = useState(''); // Valor en segundos por defecto
  const [boostUnit, setBoostUnit] = useState('seconds'); // Unidad por defecto
  const [firstminters, setFirstminters] = useState([]);
  const [firstpkeys, setFirstpkeys] = useState([]);


  // Función para manejar el cambio en el valor del input
  const handleValueChange = (e) => {
    setDurationValue(e.target.value);
  };

  const handleBoostValueChange = (e) => {
    setBoostValue(e.target.value);
  };

  // Función para manejar el cambio en la unidad seleccionada
  const handleUnitChange = (e) => {
    setDurationUnit(e.target.value);
    // Convertir el valor en segundos basado en la unidad seleccionada
    switch (e.target.value) {
      case 'sec':
        setDurationValue(prevValue => prevValue * 1); // 60 segundos en un minuto
        break;
      case 'min':
        setDurationValue(prevValue => prevValue * 60); // 60 segundos en un minuto
        break;
      case 'days':
        setDurationValue(prevValue => prevValue * 86400); // 86400 segundos en un día
        break;
      case 'months':
        setDurationValue(prevValue => prevValue * 2592000); // 2592000 segundos en un mes
        break;
      case 'years':
        setDurationValue(prevValue => prevValue * 31536000); // 31536000 segundos en un año
        break;
      default:
        setDurationValue(prevValue);
    }
  };

  const handleBoostUnitChange = (e) => {
    setBoostUnit(e.target.value);
    // Convertir el valor en segundos basado en la unidad seleccionada
    switch (e.target.value) {
      case 'sec':
        setBoostValue(prevValue => prevValue * 1); // 60 segundos en un minuto
        break;
      case 'min':
        setBoostValue(prevValue => prevValue * 60); // 60 segundos en un minuto
        break;
      case 'days':
        setBoostValue(prevValue => prevValue * 86400); // 86400 segundos en un día
        break;
      case 'months':
        setBoostValue(prevValue => prevValue * 2592000); // 2592000 segundos en un mes
        break;
      case 'years':
        setBoostValue(prevValue => prevValue * 31536000); // 31536000 segundos en un año
        break;
      default:
        setBoostValue(prevValue);
    }
  };

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
  
  const update_Reward_Duration = (period_time) => {
    const { contract } = FormData_5;

    if( !contract | !period_time) return;

    updateRewDur(period_time); 
  }
  
  const Update_Boost = (e5) => {
    const { contract, uboost } = FormData_5;
    e5.preventDefault();

    if( !contract | !uboost ) return;

    UpdateBoostContract(); 
  }

  const Update_Boost_Period = (booster) => {
    const { contract } = FormData_5;

    if( !contract ) return;

    UpdateBoostTime(booster); 
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
    const { expcontract, poolcontract, poolstate } = FormData_5;
    e5.preventDefault();

    if( !expcontract | !poolcontract ) return;

    setExpMinter(); 
  }

  const check_Minter = async(e5) => {
    const { NFTcontract } = FormData_5;
    e5.preventDefault();

    if( !NFTcontract ) return;

    const { wallets: listmint, publicKeys: pkeys } = await GetlistmintersNFT();

    setFirstminters(listmint) 
    setFirstpkeys(pkeys) 

  }

  const setTokenFactorySettings = (e5) => {
    const {mefactcontract, tokenPoolReciever } = FormData_5;
    e5.preventDefault();

    if( !mefactcontract| !tokenPoolReciever ) return;

    ChangePoolTreasury(tokenPoolReciever); 
  }

  const Status_Contract = async (e5) => {
    const { contract } = FormData_5;
    e5.preventDefault();
    if(!contract) return;
    
    try {
      const [timereward, rate, supply, tdecimals, endboost ] = await StatusContract();  // Desestructuración del array retornado
      setLastReward(timereward); 
      setRewardRate(rate); 
      setSupply(supply); 
      setDecimals(tdecimals);
      setEndboost(endboost);
    } catch (error) {
      console.error("Error fetching contract status:", error);
    }
  }


  return (
    <div className="p-4 space-y-4 flex flex-col items-center bg-gray-300 rounded-lg shadow-md">
      <div className="flex flex-fil">
        <div className="text-2xl mr-3">Staking Pools parameters </div>
        <Tooltip 
          message="Esto es el contrato de Staking de memes."
          space={2}
          />
      </div>

      {/* Contract Pool Address */}
      <div className="flex flex-col items-center">
        <div className="mr-2 flex-fli">Contract Pool:
        <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="contract" type="text" handleChange_5={handleChange_5} />
        </div>
      </div>
      <div className="flex flex-col items-center">
      <div className="flex flex-fil">
        <div className="mr-3">Status Pool </div>
        <Tooltip 
          message="Aquí puedes establecer los parámetros de las pools de staking."
          space={2}
        />
        </div>

        <div className="flex flex-fil items-center">

          <button className="p-3 bg-black text-white rounded-lg" onClick={(e5) => Status_Contract(e5)}>Check</button>

          <div className="flex flex-col text-white bg-black p-1 m-3 rounded-lg shadow-md">
            <div className="p-3 rounded-lg">
              
                <p className="">
                  {lastReward ?  
                    <span className="font-semibold italic mr-2 text-sm">
                      End Reward: {new Date(lastReward*1000).toLocaleString()} {/* Convierte UNIX a formato legible */}
                    </span> 
                    : 
                    ''}
                </p>

                <p className="">
                  {rewardRate  ?                     
                    <span className="font-semibold italic mr-2 text-sm">Rewards Rate: {rewardRate.toFixed(5)}  eggs/sec</span> 
                    : 
                    ''}
                </p>

                <p>
                  {supply  ?                     
                    <span className="font-semibold italic mr-2 text-sm">Supply Staked: {supply.toFixed(2)}</span>
                    : 
                    ''}
                </p>

                <p>
                  {decimals  ?                     
                    <span className="font-semibold italic mr-2 text-sm">Decimals: {String(decimals).length-1} </span> 
    : 
                    ''}
                </p>

                <p className="">
                  {endboost ?  
                    <span className="font-semibold italic mr-2 text-sm">
                      End Boost: {new Date(endboost*1000).toLocaleString()} {/* Convierte UNIX a formato legible */}
                    </span> 
                    : 
                    ''}
                </p>
                
            </div>
        </div>


        </div>
      </div>


      {/* Notification and Update Sections */}
      <div className="flex flex-col md:flex-row justify-center w-full space-y-4 md:space-y-0 md:space-x-4 p-8 ">
        <div className="flex flex-col items-left space-y-2">
          {/* Notify Rewards Amount */}
          <div className="flex flex-col items-left">
          <div className="flex items-center">
          <div className="mr-2 font-semibold">Update Boost</div>
          <Tooltip
            message={(
              <>
                <p>
                  The Boost temporarily increases the rewards distributed to users for a specific period until (End Boost) and only acts within the boost period.
                </p>
                <p className="mt-2">
                  A boost of 0 does not receive additional rewards,
                </p>
                <p className="mt-2">
                  A boost of 2 receives double the rewards.
                </p>
                <p className="mt-2 italic text-xs">
                  *This parameter acts immediately on the current period.
                </p>
              </>
            )}
            space={2}
            className="bg-gray-800 text-white text-sm p-4 rounded-lg"
          />
        </div>


            <div className="flex items-center">
              <Input placeholder="2" name_5="uboost" type="number" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5) => Update_Boost(e5)}>UPDATE</button>
            </div>
          </div>

                    {/* Update Rewards Duration */}
          <div className="flex flex-col items-left">
            <div className="flex flex-fil">
            <div className="mr-2 font-semibold">Rewards Duration</div>
              <Tooltip 
                message={(
                  <>
                    <p>
                      Duration of the staking period, it cannot have a value of 0.
                    </p>
                    <p className="mt-2 italic text-xs">
                      **For it to take effect in the contract, it is necessary to start a new staking period, that is, call the Notify Reward function.
                    </p>
                  </>
                )}
                space={2}
              />
            </div>

            <div className="flex items-center">
              <input className="w-28" placeholder="3" name_5="ureward" type="number" onChange={handleValueChange} />
              <select
                className="ml-3 text-2xs w-20 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={durationUnit}
                onChange={handleUnitChange}
              >
                <option value="sec">Sec</option>
                <option value="min">min</option>
                <option value="days">Days</option>
                <option value="months">Moths</option>
                <option value="years">Years</option>
              </select>
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={() => {update_Reward_Duration(durationValue)}}>UPDATE</button>
            </div>
          </div>

          <div className="flex flex-col items-left">
            <div className="flex flex-fil">
              <div className="mr-2 font-semibold">Boost Period</div>
              <Tooltip 
                message={(
                  <>
                    <p>
                    How long the rewards boost will be active.
                    </p>
                    <p className="mt-2">
                    This will only be active at the end of the normal rewards time,
                    </p>
                    <p className="mt-2">
                    if you want the boost to start from the beginning, set the minimum possible in Rewards Duration
                    </p>
                    <p className="mt-2 italic text-xs">
                    *It is necessary to activate the notify reward amount.
                    </p>
                  </>
                )}
                space={2}
              />
            </div>
            <div className="flex items-center">
              <input className="w-28" placeholder="4" name_5="uboosttime" type="number" onChange={handleBoostValueChange} />
              <select
                className="ml-3 text-2xs w-20 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={boostUnit}
                onChange={handleBoostUnitChange}
              >
                <option value="sec">Sec</option>
                <option value="min">min</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={() => Update_Boost_Period(boostValue)}>UPDATE</button>
            </div>
          </div>



        </div>

        <div className="flex flex-col space-y-2">
          {/* Update Boost */}
          <div className="flex flex-col items-left">
            <div className="flex flex-fil">
              <div className="mr-2 font-semibold">Notify Rewards Amount</div>
              <Tooltip 
                message="the amount of EGGs that will be distributed in the reward period, calling this function is necessary to start a staking reward period."
                space={2}
              />
            </div>

            <div className="text-sm italic">(EGGs)</div>
            <div className="flex items-center">
              <Input placeholder="200" name_5="notify" type="number" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5) => {notify_Rewards(e5)}}>NOTIFY</button>
            </div>
          </div>
          {/* Emergency Withdraw */}
          <div className="flex flex-col items-left">
            <div className="flex flex-fil">
              <div className="mr-2 font-semibold">Emergency Withdraw </div>
              <Tooltip 
                message={(
                    <p className="mt-2 italic text-xs">
                    *This function is disabled from the contract"
                    </p>)}
                space={2}
              />
            </div>
            <div className="flex items-center">
              <Input placeholder="0x900692c6Af6AE2fb7Bc9c748C5beb4Ef94567fE5" name_5="ewithdraw" type="text" handleChange_5={handleChange_5} />
              <button className="ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5) => {handleSubmit_EmergWithdraw(e5)}}>WITHDRAW</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pause and Unpause Buttons */}
      <div className="flex flex-fil">
        <div className="mr-2">Pause or Unpause Pool </div>
        <Tooltip 
          message="This function pauses and unpauses a staking contract, prevents further staking and rewards from being claimed but does not affect unstaking."
          space={2}
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button className="px-7 py-2 bg-red-500 text-white rounded" onClick={Pause_Contract}>Pause</button>
        <button className="px-5 py-2 bg-green-500 text-white rounded" onClick={(e5)=>{UnPause_Contract(e5)}}>Unpause</button>
      </div>
      <div className="border-t-8 border-dashed border-[#9c9c9c] w-full"></div>
      {/* Set Exp Minter */}
      <div className="flex flex-col items-center">



      <div className="flex flex-col items-center">
        <div className="flex flex-fil">
          <div className="text-2xl p-3">EXP Setting</div>
          <Tooltip 
            message="Aquí puedes establecer los parámetros de las pools de staking."
            space={3}
          />
        </div>
        <div className="flex flex-fil">

            <div className="flex flex-fil mb-3 items-center">

              <div className=" p-3">EXP contract:</div>
              <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="expcontract" type="text" handleChange_5={handleChange_5} />
              </div>

              <div className="flex flex-col items-center ">
                <div className="flex flex-fil items-center">
                  <div className="mr-2">Set Minter </div>
                  <Tooltip 
                    message="Aquí puedes establecer los parámetros de las pools de staking."
                    space={1}
                  />
                </div>
                <div className="text-sm italic">(Pool Address) </div>
                <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="poolcontract" type="text" handleChange_5={handleChange_5} />
                <div className="flex flex-fil mr-2 ">State:</div>
                <div className="flex flex-fil px-8 py-2 border border-gray-300 rounded">
                <select
                  name="poolstate"
                  value={FormData_5.poolstate}
                  onChange={(e5) => handleChange_5(e5, "poolstate")}
                  className="flex flex-fil px-8 py-2 border border-gray-300 rounded"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                <button className="flex flex-fil ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5)=>{set_Exp_Minter(e5)}}>
                  Update
                </button>
                </div>
              </div>
          {/*<div className="flex flex-col items-center">
            <div className="text-xl p-4">Create Staking Pool</div>
              <div className="flex flex-col space-y-2 items-center ">
                <div className="mr-2">Create Pool:</div>
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
                  <button className="flex flex-fil ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5)=>{set_Exp_Minter(e5)}}>
                    Update
                  </button>
                  </div>
              </div>
          </div>*/}
        </div>
        </div>
      </div>


      <div className="border-t-8 border-dashed border-[#9c9c9c] w-full"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-fil">
          <div className="text-2xl p-3 ">Meme Factory Settings</div>
          <Tooltip 
              message="Aquí puedes establecer los parámetros de las pools de staking."
              space={2}
            />
        </div>
      <div className="flex flex-fil gap-7">
        <div className="flex flex-fil mb-3 items-center">
          <div className=" p-3">MemeFactory contract:</div>
          <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="mefactcontract" type="text" handleChange_5={handleChange_5} />
        </div>

        <div className="flex flex-col space-y-2 items-center ">
          <div className="flex flex-fil">
            <div className="mr-2">token pool reciever</div>
            <Tooltip 
              message="Aquí puedes establecer los parámetros de las pools de staking."
              space={2}
            />
          </div>

          <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="tokenPoolReciever" type="text" handleChange_5={handleChange_5} />
            <div className="flex flex-fil px-8 py-2 border border-gray-300 rounded">
          <button className="flex flex-fil ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5)=>{setTokenFactorySettings(e5)}}>
            Update
          </button>
          </div>
        </div>
      </div>
      </div>
      <div className="border-t-8 border-dashed border-[#9c9c9c] w-full"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-fil">
          <div className="text-2xl p-3 ">NFT Collections Data</div>
          <Tooltip 
              message="Aquí puedes establecer los parámetros de las pools de staking."
              space={2}
            />
        </div>
      <div className="flex flex-fil gap-7">
        <div className="flex flex-fil mb-3 items-center">
          <div className=" p-3">NFT contract:</div>
          <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="NFTcontract" type="text" handleChange_5={handleChange_5} />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center">
            <span className="mr-1 text-sm">First Minters</span>
            <Tooltip 
              message="Aquí puedes ver los minters."
              space={1}
            />
          </div>
          
          <button 
            className="px-3 py-1 bg-black text-white text-sm rounded" 
            onClick={(e5) => { check_Minter(e5) }}
          >
            Check
          </button>

          <div className="grid grid-cols-2 bg-black text-xs text-white p-2 mt-2 rounded w-full max-w-lg max-h-60 overflow-y-auto">
            <div className="font-bold">Minters</div>
            <div className="font-bold">Public Keys</div>
            
            {firstminters.map((minter, index) => (
              <React.Fragment key={index}>
                <div className="break-all">{minter.slice(0, 20)}...</div>
                <div className="break-all">{firstpkeys[index].slice(0, 30)}...</div>
              </React.Fragment>
            ))}
          </div>
        </div>


      </div>
      </div>
    </div>
  );
  
};

export default Admin;