import Axios from 'axios';

const useTestnet = false; 

const appMemes = useTestnet 
  ? 'http://localhost:3001' //testnet
  : 'https://app-memes-golden-g-goose.onrender.com'; //production

const dbMemesPoint = Axios.create({
  baseURL: appMemes,
  
});

const appSocial = useTestnet 
  ? 'http://localhost:5000' //testnet
  : 'https://app-social-gg.onrender.com'; //production

const AppSocialPoint = Axios.create({
  baseURL: appSocial,
  
});

const WSconnect = useTestnet 
  ? 'ws://localhost:3003' //testnet
  : 'wss://app-graph-btzm.onrender.com'; //production

export { dbMemesPoint, AppSocialPoint, WSconnect };
