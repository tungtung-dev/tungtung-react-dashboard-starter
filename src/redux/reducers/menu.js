import {GET_MENUS, GET_MENU} from '../actions/menuAction';
import update from 'react/lib/update';

const initialState = {
    lists: {
        data: [],
        pagination: {}
    },
    currentMenu: {}
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MENUS:
            return getMenus(state, action);
        case GET_MENU:
            return getMenu(state, action)
        default:
            return state;
    }
}

export function getMenus(state, action) {
    return update(state, {
        lists: {
            data: {
                $set: action.payload.getMenus.data
            },
            pagination: {
                $set: action.payload.getMenus.pagination
            }
        }
    })
}

export function updateDeepMenuExpands(menuData) {
    const menuDataString = JSON.stringify(menuData);
    const newMenuDataString = menuDataString
        .replace(/"expanded":"true"/g,`"expanded":true`)
        .replace(/"expanded":"false"/g,`"expanded":false`);
    return JSON.parse(newMenuDataString);
}

export function getMenu(state, action) {
    return update(state, {
        currentMenu: {
            $set: updateDeepMenuExpands(action.payload.getMenu)
        }
    })
}