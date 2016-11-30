import {getFetch, putFetch, postFetch, deleteFetch} from '../utils/fetch';
import {getDefaultApi, convertObjectToQueryString} from './utils';

export function getTagsWithoutPagination(){
    return getFetch(
        getDefaultApi('/admin/tags/without-pagination')
    )
}

export function getTags({page = 1, itemPerPage = 20}){
    const query = convertObjectToQueryString({
        page, itemPerPage
    });
    return getFetch(
        getDefaultApi(`/admin/tags?${query}`)
    );
}

export function deleteTag(tagId) {
    return deleteFetch(
        getDefaultApi(`/admin/tags/${tagId}`)
    )
}

export function updateTag(tagId, tagName){
    return putFetch(
        getDefaultApi(`/admin/tags/${tagId}`),
        {name: tagName}
    )
}

export function createTag(tagName){
    return postFetch(
        getDefaultApi(`/admin/tags`),
        {name: tagName}
    )
}

export default {
    getTagsWithoutPagination,
    getTags,
    updateTag,
    createTag,
    deleteTag
}

