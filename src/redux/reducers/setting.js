import {
    GET_SETTING, UPDATE_SETTING
} from '../actions/settingAction';

const convertArrayToObject = (array) => {
    var object = {};
    array.map(item => {
        object[item.key] = item.value;
        return {};
    });
    return object;
}

export default function createReducer(state = {}, action){
    switch (action.type){
        case GET_SETTING:
            return convertArrayToObject(action.payload.getSettings);
        case UPDATE_SETTING:
            return convertArrayToObject(action.payload.updateSettings);
        default: return state;
    }
}