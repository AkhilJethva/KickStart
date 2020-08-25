const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'story squirrel blame response cannon rocket access stem course gesture target tuition',
    'https://rinkeby.infura.io/v3/4f7c68aa34634717962e74e2e49b6c2f'
);

const web3 = new Web3(provider);

const deploy = async() =>{

    const accounts = await web3.eth.getAccounts();

    console.log('attenpting to deploy contract from account :: ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode,})
        .send({from: accounts[0], gas: '1000000'});


    
    console.log('contsct deployed to ::', result.options.address);


};
deploy();