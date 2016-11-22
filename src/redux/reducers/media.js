/* eslint-disable */
// @flow
import update from 'react-addons-update';
import {
    GET_FOLDER_PHOTOS, GET_FOLDERS, UPDATE_FOLDER, REMOVE_FOLDER, ADD_FOLDER,
    MEDIA_FILTER, RESET_MEDIA_FILTER, ADD_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA,
    CHECKED_MEDIA, UNCHECKED_MEDIA, CHECKED_ALL_MEDIA, UNCHECKED_ALL_MEDIA, REMOVE_MEDIA_CHECKED
} from '../actions/mediaAction';

const folderAllDefault: FolderType = {
    id: 'all',
    name: 'All'
}

const initialState: MediaReducerState = {
    folders: [folderAllDefault],
    currentFolder: folderAllDefault,
    medias: {
        data: [],
        pagination: {},
        filter: ''
    },
    firstLoaded: false
}

export default function createReducer(state: MediaReducerState = initialState, action: Object): MediaReducerState {
    switch (action.type) {
        case GET_FOLDERS:
            return getFolders(state, action);

        case GET_FOLDER_PHOTOS:
            return getFolderPhotos(state, action);

        case ADD_FOLDER:
            return addFolder(state, action);

        case REMOVE_FOLDER:
            return removeFoler(state, action);

        case UPDATE_FOLDER:
            return updateFolder(state, action);

        case MEDIA_FILTER:
            return updateMediaFilter(state, action.filter);

        case RESET_MEDIA_FILTER:
            return updateMediaFilter(state, '');

        case ADD_MEDIA:
            return updateMediaData(state, [
                action.media,
                ...state.medias.data
            ]);

        case UPDATE_MEDIA:
            var mediaIndex = state.medias.data.findIndex(m => m.id === action.id);
            return updateMedia(state, mediaIndex, action.media);

        case CHECKED_MEDIA:
            var mediaIndex = state.medias.data.findIndex(m => m.id === action.id);
            return updateMedia(state, mediaIndex, {
                checked: true
            });

        case UNCHECKED_MEDIA:
            var mediaIndex = state.medias.data.findIndex(m => m.id === action.id);
            return updateMedia(state, mediaIndex, {
                checked: false
            });

        case CHECKED_ALL_MEDIA:
            var checkedMedia = state.medias.data.map(media => ({...media, checked: true}));
            return updateMediaData(state, checkedMedia);

        case UNCHECKED_ALL_MEDIA:
            var unCheckedMedia = state.medias.data.map(media => ({...media, checked: false}));
            return updateMediaData(state, unCheckedMedia);

        case REMOVE_MEDIA_CHECKED:
            var removeMediaChecked = state.medias.data.filter(media => !media.checked);
            return updateMediaData(state, removeMediaChecked);

        case REMOVE_MEDIA:
            var removeMedia = state.medias.data.filter((f) => f.id != action.id);
            return updateMediaData(state, removeMedia);
        default:
            return state;
    }
}

export function getFolders(state: MediaReducerState, action): MediaReducerState {
    return update(state, {
        folders: {
            $push: action.payload.getFolders
        }
    })
}

export function getFolderPhotos(state: MediaReducerState, action): MediaReducerState {
    let currentFolder = state.folders.find((f) => f.id === action.id);
    return update(updateMedia(state, action.payload.getFolderPhotos), {
        currentFolder: {$set: currentFolder}
    })
}

export function addFolder(state: MediaReducerState, action): MediaReducerState {
    if (action.payload.addFolder.success === false) return state;
    return update(state, {
        folders: {
            $push: [action.payload.addFolder]
        }
    })
}

export function updateFolder(state: MediaReducerState, action): MediaReducerState {
    var folderIndex = state.folders.findIndex((f) => f.id === action.id);
    var currentFolder = state.currentFolder;
    if (currentFolder.id === action.id) {
        currentFolder = {
            ...currentFolder,
            name: action.name
        }
    }
    return update(state, {
        folders: {
            [folderIndex]: {
                name: {
                    $set: action.name
                }
            }
        },
        currentFolder: {
            $set: currentFolder
        }
    });
}

export function removeFoler(state: MediaReducerState, action): MediaReducerState {
    var folderIndex = state.folders.findIndex((f) => f.id === action.id);
    return update(state, {
        folders: {
            $splice: [[folderIndex, 1]]
        }
    });
}

export function updateMediaFilter(state: MediaReducerState, filter: string = ''): MediaReducerState {
    return update(state, {
        medias: {
            filter: {$set: filter}
        }
    })
}

export function updateMediaData(state: MediaReducerState, data: Array<MediaType>): MediaReducerState {
    return update(state, {
        medias: {
            data: {
                $set: data
            }
        }
    });
}


export function updateMedia(state: MediaReducerState, mediaIndex: number, data: Object): MediaReducerState {
    return update(state, {
        medias: {
            data: {
                [mediaIndex]: {
                    $set: {
                        ...state.medias.data[mediaIndex],
                        ...data
                    }
                }
            }
        }
    });
}