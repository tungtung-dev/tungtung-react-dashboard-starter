import {ALERT_NOTIFICATION, ALERT_TEXT, ALERT_TOAST} from '../../constants/alertType';

export const ADD_ALERT = 'ALERT/add-alert';
export const REMOVE_ALERT = 'ALERT/remove-alert';
export const RESET_ALERT = 'ALERT/reset-alert';

export function addAlert(dispatch, alert_type = ALERT_TEXT, id, title, content, status) {
    dispatch({
        type: ADD_ALERT,
        id,
        alert_type,
        title,
        content,
        status
    })
}

export function addAlertText(id, title, content, status = 'success') {
    return dispatch => addAlert(dispatch, ALERT_TEXT, id, title, content, status);
}

export function addAlertToast(id, title, content, status = 'success') {
    return dispatch => addAlert(dispatch, ALERT_TOAST, id, title, content, status);
}

export function addAlertNotification(id, title, content, status = 'success') {
    return dispatch => addAlert(dispatch, ALERT_NOTIFICATION, id, title, content, status);
}

export function removeAlert(id) {
    return dispatch => {
        dispatch({
            type: REMOVE_ALERT,
            id
        })
    }
}

export function resetAlert() {
    return dispatch => {
        dispatch({
            type: RESET_ALERT
        })
    }
}
