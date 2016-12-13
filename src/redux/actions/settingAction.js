import {AWAIT_MARKER} from 'redux-await';
import {DefaultApi} from 'api';

export const GET_SETTING = 'SETTING/get-settings';
export const UPDATE_SETTING =' SETTING/update-setting';

export function getSettings(){
    return {
        type: GET_SETTING,
        AWAIT_MARKER,
        payload: {
            getSettings: DefaultApi.getSettings()
        }
    }
}

export function updateSettings(dataValues){
    return {
        type: UPDATE_SETTING,
        AWAIT_MARKER,
        payload: {
            updateSettings: DefaultApi.updateSettings(dataValues)
        }
    }
}

export default {getSettings, updateSettings}