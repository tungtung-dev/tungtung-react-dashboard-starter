import {getFetch, postFetch, putFetch, deleteFetch} from '../utils/fetch';
import {getMediaApi} from './utils';

export function getFolders() {
    return getFetch(getMediaApi('folders'));
}

export function getFolderPhotos(id) {
    return getFetch(getMediaApi(`folders/${id}`));
}

export function updateFolder(id, name) {
    return putFetch(getMediaApi(`folders/${id}`), {name});
}

export function addFolder(name) {
    return postFetch(getMediaApi(`folders`), {name});
}

export function removeFolder(id) {
    return deleteFetch(getMediaApi(`folders/${id}`))
}

export function uploadMedia(data, callback){
    return postFetch(getMediaApi(`upload`),data, {
        dataType: 'formdata',
    }, callback);
}

export function removeMedia(id) {
    return deleteFetch(getMediaApi(`files/${id}`));
}

export default {
    getFolders,
    getFolderPhotos,
    addFolder,
    updateFolder,
    removeFolder,
    uploadMedia,
    removeMedia
}