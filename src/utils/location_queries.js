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

export function combineQueryAndValue(queryKey, query_value) {
    return `${queryKey}=${encodeURIComponent(query_value)}`;
}

/**
 * Combine queries from url
 * @param queryKey
 * @param query_value
 * @param queries_need_combine
 * @returns {string}
 */
export function combineQueries(queryKey: string = '', query_value: string = '', queries_need_combine: Array<string> = []) {
    return queries_need_combine.map(queryKey => {
        let query_value = getParameterByName(queryKey);
        if (query_value) {
            return combineQueryAndValue(queryKey, query_value);
        }
        return '';
    })
        .concat([query_value ? combineQueryAndValue(queryKey, query_value) : ''])
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
     * @param queryLevel
     */
    constructor(queryLevel = {}) {
        this.queryLevel = queryLevel;
    }

    updateQuery(queryKey = '', query_value = '') {
        return combineQueries(queryKey, query_value, this.queryLevel[queryKey]);
    }

    getQuery(queryKey = '', defaultValue = '') {
        return getParameterByName(queryKey) ? getParameterByName(queryKey) : defaultValue
    }

    getQueryObject(defaultValues = {}){
        const query = {};
        Object.keys(this.queryLevel).map(queryKey => {
            let query_value = this.getQuery(queryKey, defaultValues[queryKey]);
            if(query_value){
                query[queryKey] = query_value;
            }
            return {
                key: queryKey,
                value: query_value
            }
        });
        return {
            ...defaultValues,
            ...query,
        }
    }

    exportQueriesToString() {
        return combineQueries('', '', Object.keys(this.queryLevel));
    }
}

