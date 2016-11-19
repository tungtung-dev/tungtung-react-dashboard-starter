// Import react
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Import custom
import configureStore from './store/configureStore';
import Routes from '../routes';

var browserHistory = useRouterHistory(createBrowserHistory)();
browserHistory.listen(location => {
    setTimeout(() => {
        if (location.action === 'POP') {
            return;
        }
        window.scrollTo(0, 0);
    }, 10);
});

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

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