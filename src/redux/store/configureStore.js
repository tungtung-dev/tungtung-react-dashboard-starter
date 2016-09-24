import {createStore, applyMiddleware, compose} from 'redux';
import {middleware as awaitMiddleware} from 'redux-await';
import rootReducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, awaitMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}