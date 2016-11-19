/**
 * Get paramater query from url
 * @param name
 * @param url
 * @returns {*}
 */
export function getParameterByName(name: string = '', url: string = '') {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function combineQueryAndValue(query_key, query_value) {
    return `${query_key}=${encodeURIComponent(query_value)}`;
}

/**
 * Combine queries from url
 * @param query_key
 * @param query_value
 * @param queries_need_combine
 * @returns {string}
 */
export function combineQueries(query_key: string = '', query_value: string = '', queries_need_combine: Array<string> = []) {
    return queries_need_combine.map(query_key => {
        let query_value = getParameterByName(query_key);
        if (query_value) {
            return combineQueryAndValue(query_key, query_value);
        }
        return '';
    })
        .concat([query_value ? combineQueryAndValue(query_key, query_value) : ''])
        .filter(query => query !== '')
        .join('&');
}

/**
 *
 */
export default class QueryManager {
    /**
     * {[key] : Array<string>, ...}
     * Example: {page: ['filter', 'search'], filter: ['search']}
     * @param query_level
     */
    constructor(query_level = {}) {
        this.query_level = query_level;
    }

    updateQuery(query_key = '', query_value = '') {
        return combineQueries(query_key, query_value, this.query_level[query_key]);
    }

    getQuery(query_key = '', default_value = '') {
        return getParameterByName(query_key) ? getParameterByName(query_key) : default_value
    }

    getQueryObject(default_values = {}){
        const query = {};
        Object.keys(this.query_level).map(query_key => {
            let query_value = this.getQuery(query_key, default_values[query_key]);
            if(query_value){
                query[query_key] = query_value;
            }
            return {
                key: query_key,
                value: query_value
            }
        });
        return query;
    }

    exportQueriesToString() {
        return combineQueries('', '', Object.keys(this.query_level));
    }
}

