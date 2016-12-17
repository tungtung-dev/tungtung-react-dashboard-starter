import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import awaitReducer from './await';
import auth from './auth';
import user from './user';
import menu from './menu';
import alert from './alert';
import defaultLoad from './defaultLoad';
import media from './media';
import post from './post';
import tag from './tag';
import category from './category';
import setting from './setting';

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    await: awaitReducer,
    auth,
    user,
    media,
    defaultLoad,
    alert,
    post,
    tag,
    category,
    setting,
    menu
})