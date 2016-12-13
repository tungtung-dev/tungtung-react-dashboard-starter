import React, {Component} from 'react';
import {Breadcrumb} from 'components/layouts';

export default class MenuWrapper extends Component {
    render() {
        return <div>
            <Breadcrumb id="menu-manager" name="Menu Manager"/>
            {this.props.children}
        </div>
    }
}
MenuWrapper.propTypes = {}

