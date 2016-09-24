import {ADD_ALERT, REMOVE_ALERT, RESET_ALERT} from '../actions/AlertAction';

const getInitialState = () => ([

]);

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case ADD_ALERT:
            const {id, title, content, status, alert_type} = action;
            return [
                ...state,
                {id, title, content, status, alert_type, time: new Date()}
            ]
        case REMOVE_ALERT:
            var alertIndex = state.findIndex((a) => a.id === action.id);
            return [
                ...state.slice(0, alertIndex),
                ...state.slice(alertIndex + 1, state.length)
            ];
        case RESET_ALERT:
            return [];
        default:
            return state;
    }
}