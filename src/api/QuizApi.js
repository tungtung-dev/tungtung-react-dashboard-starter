import {postFetch, getFetch, putFetch, deleteFetch} from '../utils/fetch';
import orderType from '../constants/orderType';
import {QUIZ_API} from '../config/index';

//const url = 'http://192.168.1.9:6022';
//107.191.98.127
const url = QUIZ_API;

export function getUrl(path) {
    return url + '/' + path;
}

export function createQuizList(quizListForm) {
    return postFetch(getUrl('quiz-lists'), quizListForm);
}

export function updateQuizList(id, quizListForm) {
    return putFetch(getUrl(`quiz-lists/${id}`), quizListForm);
}

export function uploadQuizPdf(data) {
    return postFetch(getUrl('file-upload'), data, {
        dataType: 'formdata'
    });
}

export function getQuizList(id, type = '') {
    return getFetch(getUrl('quiz-lists/' + id + '/' + type));
}

export function deleteQuizList(id) {
    return deleteFetch(getUrl('quiz-lists/' + id));
};

export function activeQuiList(id){
    return putFetch(getUrl('quiz-lists/'+id+'/active'));
}

export function unActiveQuizList(id){
    return putFetch(getUrl('quiz-lists/'+id+'/un-active'));
}

export function getTagsQuizList() {
    return getFetch(getUrl('tags'));
}

export function getCategoriesQuizList() {
    return getFetch(getUrl('categories'));
}

export function getQuizLists(page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/?page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsMe(page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/me?page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsByFollowed(page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/followed/?page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsByTag(tag_name = '', page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/?tag_slug=${tag_name}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsByUser(user_id = '', page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/user/${user_id}?page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function getQuizListsByUserHistory(user_id = '', page = 1, item_per_page = 5) {
    return getFetch(getUrl(`quiz-lists/user/${user_id}?page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}&getByHistory=true`));
}

export function getQuizListsBySearch(search = '', tags_id = '', page = 1, item_per_page = 5) {
    var stringQuery = `search/?search_string=${search}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`;
    if (tags_id) stringQuery += `&tags_name=${tags_id}`;
    return getFetch(getUrl(stringQuery));
}

export function quizListPlayCountRound(quiz_list_id) {
    return getFetch(getUrl(`quiz-lists/${quiz_list_id}/count_round`));
}

export function getQuizListHistories(quiz_list_id, page = 1, item_per_page = 5) {
    return getFetch(getUrl(`histories/?quiz_list_id=${quiz_list_id}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.score.SCORE_DESC}`));
}

export function getQuizListReviews(quiz_list_id, page = 1, item_per_page = 5) {
    return getFetch(getUrl(`ratings/?quiz_list_id=${quiz_list_id}&page=${page}&item_per_page=${item_per_page}&order_by_type=${orderType.common.CREATED_AT_DESC}`));
}

export function createQuizListReview(quiz_list_id, rating, content) {
    return postFetch(getUrl(`ratings`), {quiz_list_id, rating, content});
}

export function saveHistory(quiz_list_id, data) {
    data = {
        ...data,
        quiz_list_id
    };
    return postFetch(getUrl(`histories`), data);
}

export function getHistory(history_id) {
    return getFetch(getUrl(`histories/${history_id}`));
}

export function getFirstHistory(quiz_list_id) {
    return getFetch(getUrl(`histories/first-history/?quiz_list_id=${quiz_list_id}`))
}

export function followTag(tag_id){
    return getFetch(getUrl(`tags/${tag_id}/follow`));
}

export function unfollowTag(tag_id){
    return getFetch(getUrl(`tags/${tag_id}/unfollow`));
}

export function checkFollowTag(tag_id){
    return getFetch(getUrl(`tags/${tag_id}/check-followed`));
}

export default {
    createQuizList,
    updateQuizList,
    uploadQuizPdf,
    getQuizList,
    getUrl,
    getTagsQuizList,
    getCategoriesQuizList,
    getQuizLists,
    getQuizListsByTag,
    getQuizListsBySearch,
    getQuizListsByUser,
    getQuizListsByFollowed,
    getQuizListsMe
}