// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import {AppContainer, HomeContainer} from './containers/index';

export default () => {
    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomeContainer}/>
        </Route>
    )
}