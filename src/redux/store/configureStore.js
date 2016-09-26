import {createStore, applyMiddleware, compose} from 'redux';
import {middleware as awaitMiddleware} from 'redux-await';
import {routerMiddleware} from 'react-router-redux';
import rootReducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState, routerHistory) {
    return createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, awaitMiddleware, routerMiddleware(routerHistory)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}