import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {i18nReducer} from 'react-redux-i18n';
import {routerReducer} from 'react-router-redux';
import awaitReducer from './await';
import auth from './auth';
import users from './users';
import authSocial from './authSocial';
import alert from './alert';
import defaultLoad from './defaultLoad';
import quizLists from './quizLists';
import media from './media';
import post from './post';

export default combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    routing: routerReducer,
    await: awaitReducer,
    media,
    defaultLoad,
    auth,
    users,
    authSocial,
    quizLists,
    alert,
    post
})