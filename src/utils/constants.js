import abi from './Transactions.json';
import abi_meme_factory from './MemeFactory.json';
import abi_PoolFactory from './UniswapV2Factory';
import abi_PoolInteract from './UniswapV2Router02';
import abi_PoolPair from './UniswapV2Pair';
import abi_meme from './MemeCoin.json';
import abi_staking from './GoldenStaking.json';
import abi_staking_rewards from './GoldenStakingRewards.json'
import abi_golden_exp from './GoldenExp.json';
import GoldengNFT from './GoldengNFT';

export const contractABI_MEME_FACTORY = abi_meme_factory.abi;
export const contractABI_POOLFACTORY = abi_PoolFactory.abi;
export const contractABI_POOLINTERACT = abi_PoolInteract.abi;
export const contractABI_POOLPAIR = abi_PoolPair.abi;
export const contractABI_MEME = abi_meme.abi;
export const contractABI_STAKING = abi_staking.abi;
export const contractABI_STAKING_REWARDS = abi_staking_rewards.abi;
export const contractABI_GOLDEN_EXP = abi_golden_exp.abi;
export const contractABI_GOLDENGNFT = GoldengNFT.abi;

//export const contractAddress = '0xF86D8C06d6B33ef54e09902302eD8e863B46A97A' ;
export const contractAddress_meme_factory = '0xB5a6cb9a5e046FF284D58a526f5E443c48125cdD' ;
export const contractAddress_staking = '0x0910404A59c2afb780B5843BA5Eb0805F217b3E4' ;
export const contractAddress_staking_rewards = '0xD3Dd1854b25CD38477dEbBbA5097Ed3B49eEe133';
export const contractAddress_golden_exp = '0xBE724ba8AB6a5D8AEF835049dE12307d9c930935';
export const contractAddress_goldengnft = '0xb01f262Dd3239AfAEA5b52cb015A4d658a20B703';
