import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import '../../assets/scss/App.css';

export default class HomeContainer extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2><i className="fa fa-home"></i> Welcome to react starter</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}
