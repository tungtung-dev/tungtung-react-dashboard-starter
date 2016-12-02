import {DefaultApi} from 'api';
import {AWAIT_MARKER} from 'redux-await';

export const GET_CATEGORIES = 'CATEGORY/get-categories';

export function getCategories(...args){
    return {
        type: GET_CATEGORIES,
        AWAIT_MARKER,
        payload: {
            getCategories: DefaultApi.getCategories(...args)
        }
    }
}

export function createCategory(dataCategory){
    return DefaultApi.createCategory(dataCategory);
}

export function updateCategory(categoryKey, dataCategory){
    return DefaultApi.updateCategory(categoryKey, dataCategory);
}

export function deleteCategory(categoryKey){
    return DefaultApi.deleteCategory(categoryKey);
}

export default {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}