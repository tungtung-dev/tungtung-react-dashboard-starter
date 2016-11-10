import {MEDIA_API} from '../config/index';
import {getFetch, postFetch, putFetch, deleteFetch} from '../utils/fetch';

const url = MEDIA_API;

export function getUrl(path) {
    return url + '/media/' + path;
}

export function getFolders() {
    return getFetch(getUrl('folders'));
}

export function getFolderPhotos(id) {
    return getFetch(getUrl(`folders/${id}`));
}

export function updateFolder(id, name) {
    return putFetch(getUrl(`folders/${id}`), {name});
}

export function addFolder(name) {
    return postFetch(getUrl(`folders`), {name});
}

export function removeFolder(id) {
    return deleteFetch(getUrl(`folders/${id}`))
}

export function uploadMedia(data, callback){
    return postFetch(getUrl(`upload`),data, {
        dataType: 'formdata',
    }, callback);
}

export function removeMedia(id) {
    return deleteFetch(getUrl(`files/${id}`));
}

export default {getFolders, getFolderPhotos, addFolder, updateFolder, removeFolder, uploadMedia, removeMedia}