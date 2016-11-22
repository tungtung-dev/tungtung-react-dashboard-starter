export const ADD_BREADCRUMB = 'DEFAULT-LOAD/add-breadcrumb';
export const UPDATE_BREADCRUMB = 'DEFAULT-LOAD/update-breadcrumb';
export const REMOVE_BREADCRUMB = 'DEFAULT-LOAD/remove-breadcrumb';
export const RESET_BREADCRUMB = 'DEFAULT-LOAD/reset-breadcrumb';

export function addBreadcrumb(breadcrumb : BreadcrumbType){
    return {
        type: ADD_BREADCRUMB,
        breadcrumb
    }
}


export function updateBreadcrumb(breadcrumb : BreadcrumbType){
    return {
        type: UPDATE_BREADCRUMB,
        breadcrumb
    }
}


export function removeBreadcrumb(key : string){
    return {
        type: REMOVE_BREADCRUMB,
        key
    }
}

export function resetBreadcrumb(){
    return {
        type: RESET_BREADCRUMB
    }
}

export default {
    addBreadcrumb, updateBreadcrumb, removeBreadcrumb, resetBreadcrumb
}