const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'  }); 

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeployedCampaingns().call();
    campaignAddress = addresses[0];

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () =>{

    it('has deployed factory and campaign', () => {

        assert.ok(campaign.options.address);
        assert.ok(factory.options.address);
    });

    it('called by manager', async() => {

        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);

    });

    it('allows peoples to contribute money and marks as approvers', async() => {

        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        const isContributer = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributer);

    });

    it('requires minimmum contribution ', async() => {

        try{

            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });

            assert(false);

        }
        catch(err)
        {
            assert(err);
        }
    });

    it('allows a manager to create a request', async()=>{

        await campaign.methods.createRequest('Buy Betteries', '200', accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy Betteries', request.description);
    });

    it('process the request', async()=> {

        await campaign.methods.contribute().send({
            from: accounts[1],
            value: web3.utils.toWei('10','ether')
        });

        await campaign.methods.createRequest('A', web3.utils.toWei('5','ether'),accounts[2]).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance> 104);

    });

});