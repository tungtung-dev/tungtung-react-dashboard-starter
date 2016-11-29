import {getFetch} from '../utils/fetch';
import {getDefaultApi} from './utils';

export function getTags(){
    return getFetch(
        getDefaultApi('/admin/tags/without-pagination')
    )
}

export default {
    getTags
}

