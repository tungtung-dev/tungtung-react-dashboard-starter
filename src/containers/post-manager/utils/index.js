import swal from 'sweetalert2';
import {convertData} from 'common-helper';
import {POST_STATE} from '../../../constants/postType';

/**
 * Alert reverted post
 * @param onCallback
 */
export function swalRevert(onCallback = () => {}) {
    swal('Reverted', 'Your post moved to draft', 'success').then(onCallback);
}

export function swalPublish(onCallback = () => {}){
    swal('Published', 'Your post published', 'success').then(onCallback);
};

export function swalDraft(onCallback = () => {}){
    swal('Trashed', 'Your post moved to draft','success').then(onCallback);
}

/**
 * After trash, show confirm deleted if user wanted it
 * @param onDelete
 * @param onDeleteSuccess
 */
export function swalConfirmTrash(onDelete, onDeleteSuccess = () => {}, onCancel = () => {}){
    swal({
        title: 'Trashed',
        text: 'Your post move to trash, do you want delete forever?',
        type: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then(function () {
        onDelete();
        onDeleteSuccess();
        swal({title: 'Deleted', text: 'Your post deleted', type: 'success'});
    }, () => {
        onCancel();
    })
}

/**
 * Confirm delete
 * @param onDelete
 * @param onDeleteSuccess
 */
export function swalConfirmDelete(onDelete, onDeleteSuccess = () => {}){
    swal({
        title: 'Are you sure?',
        text: 'Your post deleted forever',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then(function () {
        onDelete();
        swal({title: 'Deleted', text: 'Your post deleted', type: 'success', confirmButtonText: 'OK'}).then(() => {
            onDeleteSuccess();
        }, (dismiss) => {
            onDeleteSuccess();
        })
    });
}

/**
 * Get Option button for "Save your post" with other state (POST_STATE)
 * @param state
 * @param onRevert
 * @param onDelete
 * @param onTrash
 * @returns {Array}
 */
export function getOptionsButtonFromState(state, {onRevert, onPublish, onDraft, onDelete, onTrash}){
    let options = [];
    switch (state) {
        case POST_STATE.TRASH:
            options = [
                {text: 'Revert', onClick: onRevert},
                {text: 'Delete', onClick: onDelete},
            ];
            break;
        case POST_STATE.DRAFT:
            options = [
                {text: 'Publish', onClick: onPublish},
                {text: 'Trash', onClick: onTrash}
            ]
            break;
        case POST_STATE.PUBLIC:
            options = [
                {text: 'Trash', onClick: onTrash},
                {text: 'Draft', onClick: onDraft},
            ]
            break;
        default:
    }
    return options;
}

export function getOptionsCheckedListsFromState(state, totalSelected, {onRevert, onPublish, onDraft, onDelete, onTrash}){
    let options = [];
    const getTextAction = (action) => {
        return `${action} ${totalSelected} ${totalSelected > 1 ? 'posts' : 'post'}`;
    }
    console.log(state);
    switch (state) {
        case POST_STATE.TRASH:
            options = [
                {text: getTextAction('Revert'), onClick: onRevert},
                {text: getTextAction('Delete'), onClick: onDelete},
            ];
            break;
        case POST_STATE.DRAFT:
            options = [
                {text: getTextAction('Publish'), onClick: onPublish},
                {text: getTextAction('Trash'), onClick: onTrash}
            ];
            break;
        case POST_STATE.PUBLIC:
            options = [
                {text: getTextAction('Trash'), onClick: onTrash},
                {text: getTextAction('Draft'), onClick: onDraft}
            ]
            break;
        default:
    }
    return options;
}

/**
 * Get custom data post
 * @param postFormValues
 * @param currentPost
 * @returns {{title: *, description: *, contentType: *, content: *, featuredImage: *, secondaryFeaturedImage: *, tags: *, state: string}}
 */
export function getDataPost(postFormValues, currentPost : PostType){
    // get data from postFormValues
    const dataPost = convertData(postFormValues, {
        title: {$get: true},
        description: {$get: true},
        contentType: {$get: true},
        content: {$get: true},
        featuredImage: {$get: true, $default: {}},
        secondaryFeaturedImage: {$get: true, $default: {}},
        tags: {$get: true, $default: []},
        state: {
            $update: () => {
                if(currentPost.state  === POST_STATE.TRASH) return POST_STATE.TRASH;
                return postFormValues.isPublic ? POST_STATE.PUBLIC : POST_STATE.DRAFT;
            }
        },
        customField: {$get: true}
    });
    return dataPost;
}