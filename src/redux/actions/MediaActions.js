import {AWAIT_MARKER} from 'redux-await';
import MediaApi from '../../api/MediaApi';

export const GET_FOLDERS = 'MEDIA/get-folders';
export const GET_FOLDER_PHOTOS = 'MEDIA/get-folder-information';
export const ADD_FOLDER = 'MEDIA/add-folder';
export const REMOVE_FOLDER = 'MEDIA/remove-folder';
export const UPDATE_FOLDER = 'MEDIA/update-folder';
export const ADD_MEDIA = 'MEDIA/add-media';
export const UPDATE_MEDIA = 'MEDIA/update-media';
export const REMOVE_MEDIA = 'MEDIA/remove-media';

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
    return {
        type: REMOVE_FOLDER,
        id
    }
}

export function addFolder(name) {
    return {
        type: ADD_FOLDER,
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
    return {
        type: REMOVE_MEDIA,
        id
    }
}