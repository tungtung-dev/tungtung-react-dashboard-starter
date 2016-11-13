import {AWAIT_MARKER} from 'redux-await';
import MediaApi from '../../api/MediaApi';

export const GET_FOLDERS = 'MEDIA/get-folders';
export const GET_FOLDER_PHOTOS = 'MEDIA/get-folder-information';
export const ADD_FOLDER = 'MEDIA/add-folder';
export const REMOVE_FOLDER = 'MEDIA/remove-folder';
export const UPDATE_FOLDER = 'MEDIA/update-folder';
export const ADD_MEDIA = 'MEDIA/add-media';
export const UPDATE_MEDIA = 'MEDIA/update-media';
export const CHECKED_MEDIA = 'MEDIA/checked-media';
export const UNCHECKED_MEDIA = 'MEDIA/un-checked-media';
export const CHECKED_ALL_MEDIA = 'MEDIA/checked-all-media';
export const UNCHECKED_ALL_MEDIA = 'MEDIA/un-checked-all-media';
export const REMOVE_MEDIA = 'MEDIA/remove-media';
export const REMOVE_MEDIA_CHECKED = 'MEDIA/remove-media-checked';

export function getFolders() {
    return {
        type: GET_FOLDERS,
        AWAIT_MARKER,
        payload: {
            getFolders: MediaApi.getFolders()
        }
    }
}

export function getFolderPhotos(id) {
    return {
        type: GET_FOLDER_PHOTOS,
        AWAIT_MARKER,
        id,
        payload: {
            getFolderPhotos: MediaApi.getFolderPhotos(id)
        }
    }
}

export function updateFolder(id, name) {
    MediaApi.updateFolder(id, name);
    return {
        type: UPDATE_FOLDER,
        id,
        name
    }
}

export function removeFolder(id) {
    MediaApi.removeFolder(id);
    return {
        type: REMOVE_FOLDER,
        id
    }
}

export function addFolder(name) {
    return {
        type: ADD_FOLDER,
        AWAIT_MARKER,
        payload: {
            addFolder: MediaApi.addFolder(name)
        }
    }
}

export function addMedia(media) {
    return {
        type: ADD_MEDIA,
        media
    }
}

export function updateMedia(id, media){
    return {
        type: UPDATE_MEDIA,
        id,
        media
    }
}


export function removeMedia(id) {
    MediaApi.removeMedia(id);
    return {
        type: REMOVE_MEDIA,
        id
    }
}

export function checkedMedia(id){
    return {
        type: CHECKED_MEDIA,
        id
    }
}

export function unCheckedMedia(id){
    return {
        type: UNCHECKED_MEDIA,
        id
    }
}

export function checkedAllMedia(){
    return {
        type: CHECKED_ALL_MEDIA,
    }
}

export function unCheckedAllMedia(){
    return {
        type: UNCHECKED_ALL_MEDIA,
    }
}

export function removeMediaChecked(medias_id){
    medias_id.map(media_id => {
        MediaApi.removeMedia(media_id);
        return {}
    })
    return {
        type: REMOVE_MEDIA_CHECKED
    }
}

export default {
    getFolders, getFolderPhotos, addFolder, updateFolder, removeFolder,
    addMedia, updateMedia, removeMedia, checkedMedia,
    unCheckedMedia, checkedAllMedia, removeMediaChecked
}