import {GET_CATEGORIES} from '../actions/categoryAction';
import update from 'react-addons-update';

const initialState : CategoryReducerType = {
    lists: {
        data: [],
        pagination: {}
    }
}

export default function createReducer(state : CategoryReducerType = initialState, action){
    switch (action.type){
        case GET_CATEGORIES:
            return getCategories(state, action);
        default:
            return state;
    }
}

export function getCategories(state : CategoryReducerType, action){
    const {data, pagination} = action.payload.getCategories;
    return update(state, {
        lists: {
            data: {$set: data},
            pagination: {$set: pagination}
        }
    })
}