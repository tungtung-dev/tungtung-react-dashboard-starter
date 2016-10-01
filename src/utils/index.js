/* eslint-disable */
import {DOMAIN_PUBLIC} from '../config/index';
import * as reduxAwait from './reduxAwait';

export function setTitle(title) {
    let afterTitle = 'Checkit vn';
    document.title = title + ' | ' + afterTitle;
}

export function objectToFormData(object) {
    let frm = new FormData();
    Object.keys(object).map((key) => {
        frm.append(key, object[key]);
        return {};
    })
    return frm
}

export function getColorFromText(text, charCodeAt = 1) {
    var colors = [
        '#3498db', '#1abc9c', '#e67e22', '#e74c3c', '#34495e', '#8e44ad',
        '#2ecc71', '#d35400', '#f39c12', '#f1c40f'
    ];
    var number = 0;

    if (text) {
        number = text.charCodeAt(charCodeAt);
    }
    else number = 2;

    if (number > 10)   number = number % 10;
    else if (number > 100) number = number % 100;
    return colors[number];
}

export function checkExistsLoadMore(pagination) {
    const {total_item, item_per_page, page} = pagination;
    let max_page = parseInt(total_item / item_per_page);
    if (total_item % item_per_page > 0) max_page++;
    return page < max_page;
}

export function getDomainPublic(path) {
    return DOMAIN_PUBLIC + '/' + path;
}

export function paginationQueryPage(prevProps, props, callback){
    const {page} = props.location.query;
    const prevPage = prevProps.location.query.page;
    if(page !== prevPage) callback(page ? page : 1);
    else return true;
}

export {
    reduxAwait
}