export const SET_AUTH_SOCIAL = 'AUTH-SOCIAL/set-auth-social';
export const RESET_AUTH_SOCIAL = 'AUTH-SOCIAL/reset-auth-social';

export function setAuthSocialFacebook(token, user){
    return dispatch => {
        dispatch({
            type: SET_AUTH_SOCIAL,
            social: 'facebook',
            token,
            user
        })
    }
}

export function setAuthSocialGoogle(token, user){
    return dispatch => {
        dispatch({
            type: SET_AUTH_SOCIAL,
            social: 'google',
            token,
            user
        })
    }
}

export function resetAuthSocial(){
    return dispatch => {
        dispatch({
            type: RESET_AUTH_SOCIAL
        })
    }
}