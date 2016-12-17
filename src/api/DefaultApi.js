import {getFetch, putFetch, postFetch, deleteFetch} from '../utils/fetch';
import {getDefaultApi, convertObjectToQueryString} from './utils';
import fakeDataMenu from '../containers/menu-manager/menu-sortable-manager/fakeData.js';

export function getCategories({page = 1, itemPerPage = 10}) {
    const query = convertObjectToQueryString({
        page, itemPerPage
    });
    return getFetch(
        getDefaultApi(`/admin/categories?${query}`)
    )
};

export function getCategoriesWithoutPagination() {
    return getFetch(
        getDefaultApi('/admin/categories/without-pagination')
    )
}

export function updateCategory(categoryKey, dataCategory) {
    return putFetch(
        getDefaultApi(`/admin/categories/${categoryKey}`),
        dataCategory
    )
}

export function createCategory(dataCategory) {
    return postFetch(
        getDefaultApi('/admin/categories/'),
        dataCategory
    )
}

export function deleteCategory(categoryKey) {
    return deleteFetch(
        getDefaultApi(`/admin/categories/${categoryKey}`),
    );
}

export function getTagsWithoutPagination() {
    return getFetch(
        getDefaultApi('/admin/tags/without-pagination')
    )
}

export function getTags({page = 1, itemPerPage = 20}) {
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

export function updateTag(tagId, tagName) {
    return putFetch(
        getDefaultApi(`/admin/tags/${tagId}`),
        {name: tagName}
    )
}

export function createTag(tagName) {
    return postFetch(
        getDefaultApi(`/admin/tags`),
        {name: tagName}
    )
}

export function getSettings() {
    return getFetch(
        getDefaultApi(`/admin/settings`)
    )
}

export function updateSettings(dataValues) {
    return postFetch(
        getDefaultApi(`/admin/settings`),
        dataValues
    )
}

export function getMenus({page = 1}) {
    return new Promise((resolve, reject) => {
        resolve({
            data: [
                {
                    _id: '1',
                    id: '1',
                    name: 'Menu header',
                    key: 'headerMenu',
                    description: 'adada',
                    data: fakeDataMenu
                },
                {
                    _id: '2',
                    id: '2',
                    name: 'Menu footer',
                    key: 'menu footer',
                    data: fakeDataMenu
                }
            ],
            pagination: {
                page: page,
                itemPerPage: 1,
                totalItem: 20
            }
        })
    });
}

export function createMenu(menuData){
    return new Promise((resolve, reject) => {
        resolve(menuData);
    })
}

export function updateMenu(menuId, menuData){
    return new Promise((resolve, reject) => {
        resolve(menuData);
    })
}


export default {
    getCategories,
    getCategoriesWithoutPagination,
    updateCategory,
    createCategory,
    deleteCategory,
    getTagsWithoutPagination,
    getTags,
    updateTag,
    createTag,
    deleteTag,
    getSettings,
    updateSettings,
    getMenus,
    createMenu,
    updateMenu
}

