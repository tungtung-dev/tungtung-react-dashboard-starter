import {GET_MENUS, GET_MENU} from '../actions/menuAction';
import update from 'react/lib/update';

const initialState = {
    lists: {
        data: [],
        pagination: {}
    },
    currentMenu: {

    }
}

export default function createReducer(state = initialState, action){
    switch (action.type){
        case GET_MENUS:
            return getMenus(state, action);
        case GET_MENU:
            return getMenu(state, action)
        default:
            return state;
    }
}

export function getMenus(state, action){
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

export function getMenu(state, action){
    const menu = state.lists.data.find(m => m.id === action.menuId);
    if(!menu) return state;
    return update(state, {
        currentMenu: {
            $set: menu
        }
    })
}