import React from 'react';

/**
 * Clean file from props, because props have multiple field not need
 * @param file
 * @returns {{id: *, name: *, thumbnail_url: *, original_url: *, type: *}}
 */
export function cleanFile(file){
    const {id, name, thumbnail_url, original_url, type} = file;
    return {id, name, thumbnail_url, original_url, type}
}

/**
 * Get icon from mimeType file
 * @param type
 * @returns {React.Component}
 */
export function getIcon(type){
    var icon = '';
    switch (type) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            icon = 'fa fa-file-image-o';
            break;
        case 'application/pdf':
            icon = 'fa fa-file-pdf-o';
            break;
        case 'video/mp4':
            icon = 'fa fa-file-video-o'
            break;
        default:
            icon = 'fa fa-file-o';
    }
    return <i className={`icon ${icon}`}/>
}

/**
 * Get color from mimeType file
 * @param type
 * @returns {*}
 */
export function getColor (type) {
    switch (type) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            return '#3498db';
        case 'application/pdf':
            return '#e67e22';
        case 'video/mp4':
            return '#8e44ad';
        default:
            return '#2ecc71'
    }
}

/**
 * Check mimeType is image
 * @param type
 * @returns {bool}
 */
export function isImage(type = ''){
    return type.match('image/*') ? true : false;
}

export default {cleanFile, getIcon, getColor, isImage}