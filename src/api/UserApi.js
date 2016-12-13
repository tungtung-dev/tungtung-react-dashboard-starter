import {getFetch, deleteFetch} from '../utils/fetch';
import {getUserApi} from './utils';

export function getUsers({page = 1, itemPerPage = 10}) {
    return getFetch(getUserApi(`?page=${page}&itemPerPage=${itemPerPage}`));
}

export function getUserInfo(user_id) {
    return getFetch(getUserApi(`${user_id}`));
}


export function deleteUser(user_id) {
    return deleteFetch(getUserApi(`${user_id}/delete`));
}

export default {
    getUsers,
    getUserInfo,
    deleteUser
}