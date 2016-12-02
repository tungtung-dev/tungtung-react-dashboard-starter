import {AWAIT_MARKER} from 'redux-await';
import {DefaultApi} from '../../api'

export const ADD_BREADCRUMB = 'DEFAULT-LOAD/add-breadcrumb';
export const UPDATE_BREADCRUMB = 'DEFAULT-LOAD/update-breadcrumb';
export const REMOVE_BREADCRUMB = 'DEFAULT-LOAD/remove-breadcrumb';
export const RESET_BREADCRUMB = 'DEFAULT-LOAD/reset-breadcrumb';

export const GET_TAGS = 'DEFAULT-LOAD/get-tags';
export const GET_CATEGORIES = 'DEFAULT-LOAD/get-categories';

export function addBreadcrumb(breadcrumb : BreadcrumbType){
    return {
        type: ADD_BREADCRUMB,
        breadcrumb
    }
}


export function updateBreadcrumb(breadcrumb : BreadcrumbType){
    return {
        type: UPDATE_BREADCRUMB,
        breadcrumb
    }
}


export function removeBreadcrumb(id : string){
    return {
        type: REMOVE_BREADCRUMB,
        id
    }
}

export function resetBreadcrumb(){
    return {
        type: RESET_BREADCRUMB
    }
}

export function getTags(){
    return {
        type: GET_TAGS,
        AWAIT_MARKER,
        payload: {
            getTagsDefault: DefaultApi.getTagsWithoutPagination()
        }
    }
}

export function getCategories(){
    return {
        type: GET_CATEGORIES,
        AWAIT_MARKER,
        payload: {
            getCategoriesDefault: DefaultApi.getCategoriesWithoutPagination()
        }
    }
}

export function autoLoadData(){
    return dispatch => {
        dispatch(getTags());
        dispatch(getCategories());
    }
}

export default {
    addBreadcrumb, updateBreadcrumb, removeBreadcrumb, resetBreadcrumb, getTags, getCategories,
    autoLoadData
}
