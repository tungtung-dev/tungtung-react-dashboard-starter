import {api} from '../config';
import path from 'path';

export function getAuthApi(urlQuery){
    return api.auth + path.join('/auth', urlQuery);
}

export function getUserApi(urlQuery){
    return api.default + path.join('/users', urlQuery);
}

export function getPostApi(urlQuery = ''){
    return api.default + path.join('/admin/posts', urlQuery);
}

export function getMediaApi(urlQuery){
    return api.media + path.join('/media', urlQuery);
}

export function getDefaultApi(urlQuery){
    return api.media + path.join(urlQuery);
}

export function convertObjectToQueryString(queryObject){
    let queryArrayString = [];
    Object.keys(queryObject).map(key => {
        if(queryObject[key]){
            queryArrayString.push(`${key}=${queryObject[key]}`);
        }
        return {};
    });
    return queryArrayString.join('&');
}

export default {
    getAuthApi,
    getUserApi,
    getPostApi,
    getMediaApi,
    getDefaultApi
}