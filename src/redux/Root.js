// Import react
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {hashHistory, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

// Import custom
import configureStore from './store/configureStore';
import Routes from '../routes';

const store = configureStore({}, hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store} >
                <Router history={history}>
                    {Routes()}
                </Router>
            </Provider>
        )
    }
}