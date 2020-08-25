import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';
export default () => {

    return(

        <Menu style={{marginTop: '10px'}}>
            <Link route="/">
                <a className="item" style={{backgroundColor:"black", color:"white"}}>CrowdCoin</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/">
                <a className="item">Campaigns</a>
                </Link>

                <Link route="/Campaigns/new">
                    <a className="item" style={{backgroundColor:"lightblue"}}>+</a>
                </Link>   
            </Menu.Menu>
        </Menu>

    );

};