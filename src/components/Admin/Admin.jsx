import React, { useContext, useState } from "react";
//import { TransactionContext } from '../../context/TransactionContext';
import { TransactionContextETH } from '../../context/ContextETH/ContextETH';
import info from "../../../images/info.svg";
import { saveAs } from 'file-saver';

const Input = ({ placeholder, name_5, type, value, handleChange_5, className }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e5) => handleChange_5(e5, name_5)}
      className={className}
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
  const { handleChange_5, FormData_5, GetlistmintersNFT, EmergWithdraw, notifyRewards, updateRewDur, UpdateBoostContract, UpdateBoostTime, PauseContract, UnpauseContract, setExpMinter, StatusContract, ChangePoolTreasury, UpdateVaultAdmins, SetVaultTokens, DeleteTokenVault, CheckVaultTokens, CheckRouterWhitelist, AddWhiteList, DeleteWhiteList } = useContext(TransactionContextETH); 

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
  const [ tokensvault ,setTokensVault] =useState([]);
  const [ amountpertokenvault ,setAmountperTokenVault] =useState([]);
  const [ whitelist, setWhitelist ] = useState([])

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

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
  
    // Encabezado del archivo
    csvContent += "Minters,Public Keys\n";
  
    // Iterar sobre los datos y agregarlos al CSV
    firstminters.forEach((minter, index) => {
      const publicKey = firstpkeys[index];
      csvContent += `${minter},${publicKey}\n`;
    });
  
    // Crear un archivo y disparar la descarga
    const encodedUri = encodeURI(csvContent);
    saveAs(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }), 'minters_data.csv');
  };
  
  const formatBigIntExponential = (bigInt) => {
    // Convierte BigInt a cadena para manejar grandes números
    const str = bigInt.toString();
    const length = str.length;
  
    // Exponente es la longitud menos 1
    const exponent = length - 1;
    
    // Mantisa es el primer dígito seguido por el resto
    let mantissa = str[0] + '.' + str.slice(1);
    
    // Eliminar ceros innecesarios en la mantisa
    mantissa = mantissa.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  
    return `${mantissa} × 10^${exponent}`;
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

  const Set_Vault_Tokens = () => {
    const { vaultaddress, decimalsvault, AmountToken, vaulttokencontract } = FormData_5;
    if( !vaultaddress | !decimalsvault | !AmountToken | !vaulttokencontract ) return;

    SetVaultTokens(); 
  }

  const Delete_Vault_Tokens = () => {
    const { vaultaddress, vaulttokencontract } = FormData_5;
    if( !vaultaddress | !vaulttokencontract ) return;

    DeleteTokenVault(); 
  }

  const List_Vault_Tokens = async() => {
    const { vaultaddress } = FormData_5;
    if( !vaultaddress ) return;

    const { tokensvault: vaulttokens, amountpermint: tokenspermint } = await CheckVaultTokens();

    setTokensVault(vaulttokens) 
    setAmountperTokenVault(tokenspermint) 

  }

  const Auth_Vault = (auth) => {
    const { vaultaddress } = FormData_5;

    if( !vaultaddress ) return;

    UpdateVaultAdmins(auth); 
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
    const { expcontract, poolcontract } = FormData_5;
    e5.preventDefault();

    if( !expcontract | !poolcontract ) return;

    setExpMinter(); 
  }

  const update_Reward_Duration = (period_time) => {
    const { contract } = FormData_5;

    if( !contract | !period_time) return;

    updateRewDur(period_time); 
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

  const Check_Whitelist = async() => {
    const { whitelistcontract } = FormData_5;
    if( !whitelistcontract ) return;

    const allwhitelist = await CheckRouterWhitelist();
    console.log(allwhitelist, "all white list")
    setWhitelist(allwhitelist) 

  }

  const Add_Whitelist = async() => {
    const { whitelistcontract, addresswhitelist } = FormData_5;
    if( !whitelistcontract |!addresswhitelist ) return;
    const allwhitelist = await AddWhiteList();

  }

  const Delete_Whitelist = async() => {
    const { whitelistcontract, addresswhitelist } = FormData_5;
    if( !whitelistcontract | !addresswhitelist ) return;
    const allwhitelist = await DeleteWhiteList();

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
        <div className="mr-2 font-semibold">Pause or Unpause Pool </div>
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
            message="Here you can modify the minters of this exp token, which are the staking rewards of the staking pools."
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
                  <div className="mr-2 font-semibold">Set Minter </div>
                  <Tooltip 
                    message="the pool contract that will have permissions to mint the Exp token."
                    space={1}
                  />
                </div>
                <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="poolcontract" type="text" handleChange_5={handleChange_5} />
                <div className="flex flex-fil mr-2 ">State:</div>
                <div className="flex flex-fil px-8 py-2 border border-gray-300 rounded">
                <select
                  name="booladmin"
                  value={FormData_5.booladmin}
                  onChange={(e5) => handleChange_5(e5, "booladmin")}
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
                      name="booladmin"
                      value={FormData_5.booladmin}
                      onChange={(e) => handleChange_5(e, "booladmin")}
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
          <div className="text-2xl p-3 ">NFT Collections Data</div>
          <Tooltip 
              message="Aquí puedes establecer los parámetros de las pools de staking."
              space={2}
            />
        </div>
      <div className="flex flex-fil gap-7">
        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-2">
          <div className="flex flex-fil">
            <div className=" p-3 font-semibold">Vault</div>
            <Tooltip 
              message="Aquí puedes establecer los parámetros de las pools de staking."
              space={2}
            />
          </div>
          <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="vaultaddress" type="text" handleChange_5={handleChange_5} />

          <div className="flex flex-fil gap-3">
          <div className="flex flex-col items-center bg-gray-200 p-1 rounded-xl mt-3">
              <div className="flex flex-fil">
                <div className="p-3 font-semibold">Tokens List</div>
                <Tooltip 
                  message="This is the list of tokens that will be distributed for each mint of the NFT collection. If the address does not have a balance in any of the tokens, the mint will not be executed. (This is not the vault balance)"
                  space={2}
                />
              </div>


              <button className="flex flex-fil w-auto ml-2 px-4 py-2 bg-red-500 text-white rounded" onClick={(e5)=>{List_Vault_Tokens(e5)}}>
                Check
              </button>
              <div className="flex justify-center items-center">
              <div className="grid grid-cols-2 bg-black text-xs text-white p-2 mt-2 rounded w-auto h-min max-w-sm max-h-60 overflow-y-auto">
                <div className="font-bold">Tokens</div>
                <div className="font-bold">Amount</div>

                {tokensvault.map((tokensaddress, index) => (
                  <React.Fragment key={index}>
                    <div className="break-all text-xs">{tokensaddress}</div>
                    <div className="break-all">{formatBigIntExponential(amountpertokenvault[index])}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>



            </div>

            <div className="flex flex-col items-center bg-gray-200 p-1 rounded-xl mt-3">
              <div className="flex flex-fil">
                <div className=" p-3 font-semibold">Add Token to List</div>
                <Tooltip 
                  message="Here you can add a token to the list of tokens that will be distributed for each mint. You must add the token address and its decimals."
                  space={2}
                />
              </div>
              <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="vaulttokencontract" type="text" handleChange_5={handleChange_5} />
              <div className="flex flex-fil gap-3 items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="p-3">Amount</div>
                  <Input className="w-32" placeholder="30000" name_5="AmountToken" type="number" handleChange_5={handleChange_5} />

                </div>

                <div className="flex flex-col items-center">
                  <div className="p-3">Decimals</div>

                  <select
                    className="text-2xs w-20 py-2 text-xs border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="decimalsvault"
                    value={FormData_5.decimalsvault}
                    onChange={(e5) => handleChange_5(e5, "decimalsvault")}
                  >
                    {[...Array(19).keys()].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-fil mt-3">
                <button className="flex flex-fil w-auto ml-2 px-4 py-2 bg-green-700 text-white rounded" onClick={(e5)=>{Set_Vault_Tokens(e5)}}>
                  + Token
                </button>
                <button className="flex flex-fil w-auto ml-2 px-4 py-2 bg-red-500 text-white rounded" onClick={(e5)=>{Delete_Vault_Tokens(e5)}}>
                  - Token
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center bg-gray-200 p-1 rounded-xl mt-3">
              <div className="flex flex-col mb-3 items-center">

              </div>
              <div className="flex flex-col mb-3 items-center">
                <div className="flex flex-fil font-semibold">
                  <div className=" p-3">NFTs Contract</div>
                  <Tooltip 
                    message="Here you can set which addresses will have permissions to transfer ERC20 tokens from the vault."
                    space={2}
                  />
                </div>

                <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="adminvault" type="text" handleChange_5={handleChange_5} />
              </div>
              <div className="flex flex-fil gap-3">
                <select
                  name="booladmin"
                  value={FormData_5.booladmin}
                  onChange={(e5) => handleChange_5(e5, "booladmin")}
                  className="flex flex-fil px-8 py-2 border border-gray-300 rounded"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                <button className="flex flex-fil w-auto ml-2 px-4 py-2 bg-black text-white rounded" onClick={(e5)=>{Auth_Vault(e5)}}>
                  Update
                </button>
              </div>

            </div>



        </div>
        
        </div>

        <div className="flex flex-col items-center bg-gray-100 p-3 rounded-xl">
          <div className="flex flex-fil">
            
            <div className=" p-3 font-semibold">NFT contract:</div>
            <Tooltip 
              message="Here you can see the addresses of the first minted NFTs and their signatures."
              space={2}
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex flex-fil items-center gap-3">


                <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="NFTcontract" type="text" handleChange_5={handleChange_5} />
                

                <div className="flex flex-col gap-3">

                <button 
                  className="px-3 py-1 bg-black text-white text-sm rounded" 
                  onClick={(e5) => { check_Minter(e5) }}
                >
                  Check
                </button>



                </div>

            </div>
            <button 
              className="px-3 py-1 bg-green-600 text-white text-sm rounded" 
              onClick={downloadCSV}
            >
              Download CSV
            </button>
            <div className="grid grid-cols-2 bg-black text-xs text-white p-2 mt-2 rounded w-auto h-min max-w-lg max-h-60 overflow-y-auto">
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
          <div className="flex flex-col gap-7 items-center bg-gray-200 rounded-xl p-3">
            <div className="flex flex-col items-center">
              <div className=" p-3 font-semibold">Whitelist Contract</div>
              <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="whitelistcontract" type="text" handleChange_5={handleChange_5} />

            </div>
            <div className="flex flex-fil items-center gap-7 p-3 bg-gray-100 rounded-lg shadow-lg">
              {/* Router List Section */}
              <div className="flex flex-col items-center">
                <div className="flex flex-fil mb-3">
                  <div className="mr-2 font-semibold">Routers List</div>
                  <Tooltip 
                      message="Aquí puedes establecer los parámetros de las pools de staking."
                      space={2}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <button
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    onClick={(e5) => { Check_Whitelist(e5) }}
                  >
                    Check
                  </button>
                  <div className="text-white bg-black p-2 mt-2 text-xs rounded-lg shadow-lg max-h-32 w-64 overflow-y-auto">
                    <p className="font-bold">Whitelist routers:</p>
                    <ul className="list-disc list-inside">
                      {whitelist.length > 0 ? (
                        whitelist.map((item, index) => (
                          <li key={index} className="text-white truncate">{item}</li>
                        ))
                      ) : (
                        <p>No routers in the whitelist.</p>
                      )}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Add or Delete Router Section */}
              <div className="flex flex-col items-center  w-auto">
                <div className="flex items-center justify-center mb-3">
                  <div className="mr-2 font-semibold">Add or Delete Router</div>
                  <Tooltip 
                    message="Aquí puedes establecer los parámetros de las pools de staking."
                    space={2}
                  />
                </div>
                
                <Input 
                  placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b"
                  name_5="addresswhitelist"
                  type="text"
                  handleChange_5={handleChange_5}
                />
                
                <div className="flex flex-fil mt-3 gap-3">
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                    onClick={(e5) => { Add_Whitelist(e5) }}
                  >
                    Add
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                    onClick={(e5) => { Delete_Whitelist(e5) }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>


          </div>
          {/*<div className="flex flex-col gap-7">
            <div className="flex flex-col mb-3 items-center">
              <div className=" p-3">MemeFactory</div>
              <Input placeholder="0xB3cd56FEF8aa18dB33930F6Eaf94aeE4c2EA3b3b" name_5="mefactcontract" type="text" handleChange_5={handleChange_5} />
            </div>

            <div className="flex flex-col space-y-2 items-center ">
              <div className="flex flex-fil">
                <div className="mr-2 font-semibold">token pool reciever</div>
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
          </div>*/}
        </div>

      
      </div>
    </div>
  );
  
};

export default Admin;