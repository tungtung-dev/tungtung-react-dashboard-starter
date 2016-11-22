import {
    ADD_ALERT, REMOVE_ALERT, RESET_ALERT
} from '../actions/alertAction';
import update from 'react-addons-update';

const getInitialState = () => {
    return [];
};

export default function createReducer(state : AlertReducerState = getInitialState(), action) {
    switch (action.type) {
        case ADD_ALERT:
            return addAlert(state, action);
        case REMOVE_ALERT:
            return removeAlert(state, action);
        case RESET_ALERT:
            return resetAlert();
        default:
            return state;
    }
}

export function addAlert(state : AlertReducerState, action) {
    const {id, title, content, status, alertType} = action;
    const alertInfo = {id, title, content, status, alertType}
    return update(state, {
        $push: [alertInfo]
    })
}

export function removeAlert(state : AlertReducerState, action) {
    const alertIndex = state.findIndex((alert) => alert.id === action.id);
    return update(state, {
        $slice: [[alertIndex, 1]]
    })
}

export function resetAlert() {
    return [];
}