import {
    GET_POSTS, GET_POST, CLEAR_POST, GET_POSTS_FILTER
} from '../actions/PostAction';
import update from 'react-addons-update';

const initialState : PostReducerState = {
    lists: {
        data: [],
        pagination: {},
        filter: ''
    },
    current_post: {}
}

export default function createReducer(state : PostReducerState = initialState, action) {
    switch (action.type){
        case GET_POSTS:
            return getPosts(state, action);
        case GET_POSTS_FILTER:
            return getPostsByFilter(state, action);
        case GET_POST:
            return getPost(state, action);
        case CLEAR_POST:
            return clearPost(state);
        default: return state;
    }
}

function updatePosts(state : PostReducerState, data: Array<PostType>, pagination: PaginationType){
    return update(state, {
        lists:{
            data: {
                $set: data
            },
            pagination: {
                $set: pagination
            }
        }
    })
}

function getPosts(state : PostReducerState, action){
    return updatePosts(state, action.payload.getPosts.data, action.payload.getPosts.pagination)
}

function getPostsByFilter(state: PostReducerState, action){
    return updatePosts(state, action.payload.getPostsByFilter.data, action.payload.getPostsByFilter.pagination)
}

function getPost(state: PostReducerState, action){
    console.log(action.payload);
    return update(state, {
        current_post: {
            $set: action.payload.getPost
        }
    })
}

function clearPost(state: PostReducerState){
    return update(state, {
        current_post: {
            $set: {}
        }
    })
}