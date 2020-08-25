import React , { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link} from '../../routes';

class Campaignshow extends Component{

    static async getInitialProps(props){

        //props.query.address is used to get the addres of campaign from the url
        const campaign = Campaign(props.query.address);

        const summery = await campaign.methods.getSummery().call();

        return {
            address: props.query.address,
            minimumContribution: summery[0],
            balance: summery[1],
            requestsCount: summery[2],
            approversCount: summery[3],
            manager: summery[4]
        };
       
    }

    renderCards(){
        const items = [
            {
                header:this.props.manager,
                meta:"Address of manager" ,
                description:"The manager Creates this Campaign and can create requests to widhdraw money",
                style: { overflowWrap: 'break-word' }
            },
            {
                header:this.props.minimumContribution,
                meta: "MinimumContribution(Wei)", 
                description: "You ust Contribute this much of wei to become a approver"
            },
            {
                header:this.props.requestsCount,
                meta: "Number of Requests", 
                description: "AA request tries to withdraw money from the conract. Requests must be approved by approvers."
            },
            {
                header:this.props.approversCount,
                meta: "Numbers of Approvers", 
                description: "Number of people who have already donated to this Campaign"
            },
            {
                header: web3.utils.fromWei(this.props.balance, 'ether'),
                meta: "Campaign Balance(ether)", 
                description: "The Balance is  how much money this campaign has left to spend"
            }

        ];

        return <Card.Group items={items} />;
    }

    render(){
        return(
            <Layout>
            <h1>show Campaigns</h1>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                       
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/Campaigns/${this.props.address}/requests`}><a>
                                    <Button primary> View Requests</Button>
                                </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Layout>
        );
    }
}

export default Campaignshow;