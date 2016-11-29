/* eslint-disable */
import {
    ADD_BREADCRUMB, REMOVE_BREADCRUMB, RESET_BREADCRUMB, UPDATE_BREADCRUMB,
    GET_TAGS
} from '../actions/defaultLoadAction';
import update from 'react-addons-update';

type DefaultLoadType = {
    breadcrumbs: Array<BreadcrumbType>,
    tags: Array
}

function getInitialState() {
    return {
        breadcrumbs: [],
        tags: []
    }
}

export default function createReducer(state : DefaultLoadType = getInitialState(), action) {
    switch (action.type) {
        case ADD_BREADCRUMB:
            return addBreadcrumb(state, action.breadcrumb);
        case UPDATE_BREADCRUMB:
            return updateBreadcrumb(state, action.breadcrumb);
        case REMOVE_BREADCRUMB:
            return removeBreadcrumb(state, action.id);
        case RESET_BREADCRUMB:
            return update(state, {
                breadcrumbs: []
            });
        case GET_TAGS:
            return getTags(state, action)
        default:
            return state;
    }
}

function addBreadcrumb(state, breadcrumb){
    return update(state, {
        breadcrumbs: {
            $push: [breadcrumb]
        }
    });
}

function updateBreadcrumb(state, breadcrumb){
    let indexBreadcrumb = state.breadcrumbs.findIndex(b => b.id === breadcrumb.id);
    if(indexBreadcrumb > 0){
        return update(state, {
            breadcrumbs: {
                [indexBreadcrumb]: {
                    $set: breadcrumb
                }
            }
        });
    }
    return state;
}

function removeBreadcrumb(state, breadcrumbId){
    var indexBreadcrumb = state.breadcrumbs.findIndex(breadcrumb => breadcrumb.id === breadcrumbId)
    return update(state, {
        breadcrumbs: {
            $splice: [[indexBreadcrumb, 1]]
        }
    })
}

function getTags(state, action){
    return update(state, {
        tags: {
            $set: action.payload.getTags
        }
    });
}