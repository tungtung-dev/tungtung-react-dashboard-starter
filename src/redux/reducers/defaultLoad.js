/* eslint-disable */
import {
    ADD_BREADCRUMB, REMOVE_BREADCRUMB, RESET_BREADCRUMB,
    GET_USER_INFO, UPDATE_USER_INFO, UPDATE_BREADCRUMB
} from '../actions/DefaultLoadAction';
import update from 'react-addons-update';

type DefaultLoadType = {
    breadcrumbs: Array<BreadcrumbType>,
    users: Array<Object>
}

function getInitialState() {
    return {
        breadcrumbs: [],
        users: []
    }
}

export default function createReducer(state : DefaultLoadType = getInitialState(), action) {
    switch (action.type) {
        case GET_USER_INFO:
            var userInfo = action.payload.getUserInfo;
            var users = state.users;
            if (userInfo) {
                let user = state.users.find(u => userInfo._id === u.id);
                if (!user) {
                    users = users.concat(userInfo);
                }
            }
            return {
                ...state,
                users
            }
        case UPDATE_USER_INFO:
            var users = state.users;
            var uIndex = users.findIndex((u) => u._id === action.user_id);
            if (uIndex >= 0) {
                users[uIndex] = action.user;
            }
            return {
                ...state,
                users
            }
        case ADD_BREADCRUMB:
            return addBreadcrumb(state, action.breadcrumb);
        case UPDATE_BREADCRUMB:
            return updateBreadcrumb(state, action.breadcrumb);
        case REMOVE_BREADCRUMB:
            return removeBreadcrumb(state, action.key);
        case RESET_BREADCRUMB:
            return update(state, {
                breadcrumbs: []
            })
        default:
            return state;
    }
}

function addBreadcrumb(state, breadcrumb){
    return update(state, {
        breadcrumbs: {
            $push: [breadcrumb]
        }
    });
}

function updateBreadcrumb(state, breadcrumb){
    let index_breadcrumb = state.breadcrumbs.findIndex(b => b.id === breadcrumb.id);
    if(index_breadcrumb > 0){
        return update(state, {
            breadcrumbs: {
                [index_breadcrumb]: {
                    $set: breadcrumb
                }
            }
        });
    }
    return state;
}

function removeBreadcrumb(state, breadcrumb_key){
    var index_breadcrumb = state.breadcrumbs.findIndex(breadcrumb => breadcrumb.key === breadcrumb_key)
    return update(state, {
        breadcrumbs: {
            $splice: [[index_breadcrumb, 1]]
        }
    })
}