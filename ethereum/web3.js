import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // we are on the browser and metamsk is running
    web3 = new Web3(window.web3.currentProvider);

}else{
    //we are on the server *OR* metamask is not available 
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/4f7c68aa34634717962e74e2e49b6c2f'
    );

    web3 = new Web3(provider);

}

export default web3;