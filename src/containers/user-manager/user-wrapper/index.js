import React, {Component} from 'react';
import {Breadcrumb} from '../../../components/layouts/index';

export default class UserWrapper extends Component {
    render() {
        return <div>
            <Breadcrumb id="users-manager" href="/users" name="Users manager"/>
            {this.props.children}
        </div>
    }
}
UserWrapper.propTypes = {}

