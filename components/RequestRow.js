import React, {Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import {Router} from '../routes';


class RequestRow extends Component{
    state = {
        loading: false
    };
    onApprove = async() => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({loading: true});

        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
        this.setState({loading: false});
        Router.pushRoute(`/Campaigns/${this.props.address}/requests`);
    };

    onFinalize = async() => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({loading: true});

        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
        this.setState({loading: false});
        Router.pushRoute(`/Campaigns/${this.props.address}/requests`);
    };
    render(){

        const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2; 

        return (
            <Table.Row disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete}>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.request.value,'ether')}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.approvalCount}/{this.props.approversCount }</Table.Cell>
                <Table.Cell>
                    { this.props.request.complete ? null : (
                        <Button color={"green"} basic onClick={this.onApprove} loading={this.state.loading}>Approve</Button>
                    )
                    }
                </Table.Cell>
                <Table.Cell>
                    { this.props.request.complete ? null : (
                        <Button color={"teal"} basic onClick={this.onFinalize} loading={this.state.loading}>Approve</Button>
                        )
                    }
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;