import Axios from 'axios';

const useTestnet = false; 

const appData = useTestnet 
  ? 'http://localhost:3000' //testnet
  : 'https://appdata-production.up.railway.app'; //production

const AppDataPoint = Axios.create({
  baseURL: appData,
  
});

const appMemes = useTestnet 
  ? 'http://localhost:3001' //testnet
  : 'https://appmemes-production.up.railway.app'; //production

const dbMemesPoint = Axios.create({
  baseURL: appMemes,
  
});

const appSocial = useTestnet 
  ? 'http://localhost:5000' //testnet
  : 'https://appsocial-production.up.railway.app'; //production

const AppSocialPoint = Axios.create({
  baseURL: appSocial,
  
});

const WSconnect = useTestnet 
  ? 'ws://localhost:3003' //testnet
  : 'wss://appgraph-production.up.railway.app'; //production
  
export { dbMemesPoint, AppSocialPoint, AppDataPoint, WSconnect };
