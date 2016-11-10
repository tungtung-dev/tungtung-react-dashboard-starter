import React from 'react';

export function cleanFile(file){
    const {id, name, thumbnail_url, original_url, type} = file;
    return {id, name, thumbnail_url, original_url, type}
}

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

export function isImage(type = ''){
    return type.match('image/*');
}

export default {cleanFile, getIcon, getColor, isImage}