import {GET_TAGS} from '../actions/tagAction';
import update from 'react-addons-update';

const initialState : TagReducerState = {
    lists: {
        data: [],
        pagination: {}
    }
}

export default function createReducer(state : TagReducerState = initialState, action){
   switch (action.type){
       case GET_TAGS:
           return getTags(state, action);
       default:
           return state;
   }
}

export function getTags(state : TagReducerState, action){
    const {data, pagination} = action.payload.getTags;
    return update(state, {
        lists: {
            data: {$set: data},
            pagination: {$set: pagination}
        }
    })
}