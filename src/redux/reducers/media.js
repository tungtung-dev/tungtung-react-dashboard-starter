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
    currentFolder: folderAll,
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
            var currentFolder = state.folders.find((f) => f.id === action.id);
            return {
                ...state,
                currentFolder,
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
            var currentFolder = state.currentFolder;
            if (currentFolder.id === action.id) {
                currentFolder = {
                    ...currentFolder,
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
                currentFolder: {
                    $set: currentFolder
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
