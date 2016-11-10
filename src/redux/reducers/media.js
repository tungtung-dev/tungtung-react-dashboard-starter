import update from 'react-addons-update';

import {
    GET_FOLDER_PHOTOS, GET_FOLDERS, UPDATE_FOLDER, REMOVE_FOLDER, ADD_FOLDER,
    ADD_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA, CHECKED_MEDIA, UNCHECKED_MEDIA,
    CHECKED_ALL_MEDIA, UNCHECKED_ALL_MEDIA, REMOVE_MEDIA_CHECKED
} from '../actions/MediaActions';

const folderAll = {
    id: 'all',
    name: 'All'
}

const initialState = {
    folders: [
        folderAll
    ],
    current_folder: folderAll,
    medias: {
        data: [],
        pagination: []
    },
    first_loaded: false
}

const updateMedia = (state, mediaIndex, data) => {
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

const updateMediaData = (state, data) => {
    return update(state, {
        medias: {
            data: {
                $set: data
            }
        }
    });
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLDERS:
            return {
                ...state,
                folders: [
                    folderAll,
                    ...action.payload.getFolders
                ],
                first_loaded: true
            }
        case GET_FOLDER_PHOTOS:
            var current_folder = state.folders.find((f) => f.id === action.id);
            return {
                ...state,
                current_folder,
                medias: {
                    ...state.medias,
                    data: action.payload.getFolderPhotos
                }
            }
        case ADD_FOLDER:
            if(action.payload.addFolder.success === false) return state;
            return update(state, {
                folders: {
                    $push: [action.payload.addFolder]
                }
            })
        case REMOVE_FOLDER:
            var folderIndex = state.folders.findIndex((f) => f.id === action.id);
            return update(state, {
                folders: {
                    $splice: [[folderIndex, 1]]
                }
            });
        case UPDATE_FOLDER:
            var folderIndex = state.folders.findIndex((f) => f.id === action.id);
            var current_folder = state.current_folder;
            if (current_folder.id === action.id) {
                current_folder = {
                    ...current_folder,
                    id: action.name,
                    name: action.name
                }
            }
            return update(state, {
                folders: {
                    [folderIndex]: {
                        name: {
                            $set: action.name
                        },
                        id: {
                            $set: action.name
                        }
                    }
                },
                current_folder: {
                    $set: current_folder
                }
            })
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
            console.log('unchekec + '+mediaIndex);
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
