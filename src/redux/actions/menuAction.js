import {AWAIT_MARKER} from 'redux-await'
import {DefaultApi} from 'api';

export const GET_MENUS = 'MENU/get-menus';
export const GET_MENU = 'MENU/get-menu';
export const ADD_MENU = 'MENU/add-menu';

export function getMenus(...args){
    return {
        type: GET_MENUS,
        AWAIT_MARKER,
        payload: {
            getMenus: DefaultApi.getMenus(...args)
        }
    }
}

export function getMenu(menuId){
    return {
        type: GET_MENU,
        menuId
    }
}

export function createMenu(menuData){
    return DefaultApi.createMenu(menuData);
}

export function updateMenu(menuId, menuData){
    return DefaultApi.updateMenu(menuId, menuData)
}

export default {
    getMenus,
    getMenu,
    createMenu,
    updateMenu
}