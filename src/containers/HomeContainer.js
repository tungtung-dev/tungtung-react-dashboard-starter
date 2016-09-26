import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from '../assets/images/logo.svg';
import '../assets/scss/App.css';
import {getPosts} from '../api/TestApi';

export default class HomeContainer extends Component {
    componentDidMount() {
        getPosts().then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2><i className="fa fa-home"></i> Welcome to react starter</h2>

                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    <center>
                        <Link to="protected-page" className="btn btn-block btn-success">
                            Go to protected page
                        </Link>
                    </center>
                </p>
            </div>
        );
    }
}
