import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xCB5502b8f38bE2afc58e77fc6B841d249D72ae2b'
);

export default instance;