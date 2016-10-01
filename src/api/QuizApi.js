import {getFetch, putFetch, deleteFetch} from '../utils/fetch';
import orderType from '../constants/orderType';
import {QUIZ_API} from '../config/index';

//const url = 'http://192.168.1.9:6022';
//107.191.98.127
const url = QUIZ_API;

export function getUrl(path) {
    return url + '/' + path;
}

export function deleteQuizList(id) {
    return deleteFetch(getUrl('quiz-list-manager/' + id));
};

export function activeQuiList(id) {
    return putFetch(getUrl('quiz-lists/' + id + '/active'));
}

export function unActiveQuizList(id) {
    return putFetch(getUrl('quiz-lists/' + id + '/un-active'));
}

export function getTagsQuizList() {
    return getFetch(getUrl('tags'));
}

export function getCategoriesQuizList() {
    return getFetch(getUrl('categories'));
}

export function getQuizLists(status_type = '', page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-list-manager/?page=${page}&item_per_page=${item_per_page}&status_type=${status_type}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsByTag(tag_name = '', page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/?tag_slug=${tag_name}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsBySearch(search = '', tags_id = '', page = 1, item_per_page = 5) {
    var stringQuery = `search/?search_string=${search}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`;
    if (tags_id) stringQuery += `&tags_name=${tags_id}`;
    return getFetch(getUrl(stringQuery));
}

export function markQuizAsType(id, type) {
    return getFetch(getUrl(`quiz-list-manager/${id}/${type}`));
}

export function markQuizAsNew(id) {
    return markQuizAsType(id, 'mark-as-new');
}

export function markQuizAsOld(id) {
    return markQuizAsType(id, 'mark-as-old');
}

export function markQuizAsReject(id) {
    return markQuizAsType(id, 'mark-as-reject');
}

export function markQuizAsNeedReview(id) {
    return markQuizAsType(id, 'mark-as-need-review');
}


export default {
    getUrl,
    getTagsQuizList,
    getCategoriesQuizList,
    getQuizLists,
    getQuizListsByTag,
    getQuizListsBySearch,
    markQuizAsNew,
    markQuizAsOld,
    markQuizAsReject,
    markQuizAsNeedReview
}