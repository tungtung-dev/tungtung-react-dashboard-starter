import React, {Component} from 'react';
import {AuthApi} from '../api/index';

export default class ProtectedPageContainer extends Component {
    componentDidMount(){
        AuthApi.updateProfile({displayName: "Phan Thanh Tung"});
    }
    render() {
        return (
            <div>
                <h1>Protected page</h1>
            </div>
        )
    }
}
