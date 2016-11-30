import {AWAIT_MARKER} from 'redux-await';
import {DefaultApi} from 'api';
export const GET_TAGS = 'TAGS/get-tags';
export const UPDATE_TAG = 'TAGS/update-tag';
export const CREATE_TAG = 'TAGS/create-tag';

export function getTags(...args){
    return {
        type: GET_TAGS,
        AWAIT_MARKER,
        payload: {
            getTags: DefaultApi.getTags(...args)
        }
    }
}

export function createTag(tagName){
    return DefaultApi.createTag(tagName);
}

export function updateTag(tagId, tagName){
    return DefaultApi.updateTag(tagId, tagName);
}

export function deleteTag(tagId){
    return DefaultApi.deleteTag(tagId);
}

export default {
    getTags, deleteTag, createTag, updateTag
}