import qwest from 'qwest';

const getHeaders = () => {
    var headers = {
        'Accept': 'application/json',
    }
    if (localStorage.getItem('auth_token')) {
        headers = {
            ...headers,
            'Authorization': 'JWT ' + localStorage.getItem('auth_token')
        }
    }
    return headers;
}

export function postFetch(url, data, props) {
    let attributes = Object.assign({
        cache: true,
        headers: getHeaders()
    }, props);

    console.log(data);

    return qwest.post(url, data, attributes).then((xhr, res) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(res);
            }
            catch (e) {
                reject(e.getMessage());
            }
        });
    });
}

export function putFetch(url, data, props) {
    let attributes = Object.assign({
        cache: true,
        headers: getHeaders()
    }, props);

    return qwest.put(url, data, attributes).then((xhr, res) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(res);
            }
            catch (e) {
                reject(e.getMessage());
            }
        });
    });
}

export function getFetch(url, data, props) {
    let attributes = Object.assign({
        headers: getHeaders()
    }, props);

    return qwest.get(url, data, attributes).then((xhr, res) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(res);
            }
            catch (e) {
                reject(e.getMessage());
            }
        });
    });
}

export function deleteFetch(url, data, props) {
    let attributes = Object.assign({
        headers: getHeaders()
    }, props);

    return qwest.delete(url, data, attributes).then((xhr, res) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(res);
            }
            catch (e) {
                reject(e.getMessage());
            }
        });
    });
}