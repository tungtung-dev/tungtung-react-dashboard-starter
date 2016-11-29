/* eslint-disable */
import {DOMAIN_PUBLIC} from '../config/index';
import * as reduxAwait from './reduxAwait';

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

export function getStyleFromProps(prop_style_keys = [], props = {}){
    let style = {};
    prop_style_keys.map((prop_style_key) => {
        const prop_style_value = props[prop_style_key];
        if(prop_style_value !== undefined && prop_style_value !== null && prop_style_value !== false){
            style = {
                ...style,
                [prop_style_key]: prop_style_value
            }
        }
        return prop_style_key;
    });
    if(props.style){
        style = {
            ...style,
            ...props.style
        }
    }
    return style;
}

export function getDeepObject(object, defaultValue, ...keysDeep){
    let cloneObject = object;
    let value = defaultValue;

    for(var i = 0; i < keysDeep.length; i++){
        const keyDeep = keysDeep[i];
        if(i > 0){
            if(cloneObject[keyDeep]){
                value = cloneObject[keyDeep];
                cloneObject = cloneObject[keyDeep];
            }
        }
        else{
            if(object && object[keyDeep]) {
                value = object[keyDeep];
                cloneObject = object[keyDeep];
            } else{
                value = defaultValue;
            }
        }
    }
    return value;
}

export function cleanProps(clean_key_props, props){
    let newProps = {...props};
    clean_key_props.map(key => {
        delete newProps[key];
        return {}
    });
    return newProps;
}

export function cleanPropsReduxForm(props){
    return cleanProps(
        [
            'initialValue', 'autofill', 'onUpdate', 'valid', 'invalid', 'dirty',
            'pristine', 'error', 'active', 'touched', 'visited', 'autofilled',
            'noBottom', 'styleColor'
        ], props);
}

export {
    reduxAwait
}