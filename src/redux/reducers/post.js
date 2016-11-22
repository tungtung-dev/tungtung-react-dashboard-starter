import {
    GET_POSTS, GET_POST, CLEAR_POST, GET_POSTS_FILTER
} from '../actions/postAction';
import update from 'react-addons-update';

const initialState : PostReducerState = {
    lists: {
        data: [],
        pagination: {},
        filter: ''
    },
    currentPost: {}
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
    const {data, pagination} = action.payload.getPosts;
    return updatePosts(state, data, pagination)
}

function getPostsByFilter(state: PostReducerState, action){
    const {data, pagination} = action.payload.getPostsByFilter;
    return updatePosts(state,data,pagination)
}

function getPost(state: PostReducerState, action){
    return update(state, {
        currentPost: {
            $set: action.payload.getPost
        }
    })
}

function clearPost(state: PostReducerState){
    return update(state, {
        currentPost: {
            $set: {}
        }
    })
}