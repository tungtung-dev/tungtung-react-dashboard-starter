import update from 'react-addons-update';

import {
    GET_FOLDER_PHOTOS, GET_FOLDERS, UPDATE_FOLDER, REMOVE_FOLDER, ADD_FOLDER,
    ADD_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA
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
    }
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLDERS:
            return {
                ...state,
                folders: [
                    folderAll,
                    ...action.payload.getFolders
                ]
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
            return update(state, {
                folders: {
                    $push: [action.folder]
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
            return update(state, {
                medias: {
                    data: {
                        $set: [
                            action.media,
                            ...state.medias.data
                        ]
                    }
                }
            });
        case UPDATE_MEDIA:
            var mediaIndex = state.medias.data.findIndex(m => m.id === action.id);
            return update(state, {
                medias: {
                    data: {
                        [mediaIndex]: {
                            $set: {
                                ...state.medias.data[mediaIndex],
                                ...action.media
                            }
                        }
                    }
                }
            })
        case REMOVE_MEDIA:
            var mediaIndex = state.medias.data.findIndex((f) => f.id === action.id);
            return update(state, {
                medias: {
                    data: {
                        $slice: [[mediaIndex, 1]]
                    }
                }
            });

        default:
            return state;
    }
}
