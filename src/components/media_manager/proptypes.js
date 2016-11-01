import {PropTypes} from 'react';

export const folderItemPropType = {
    id: PropTypes.string,
    name: PropTypes.string
}

export const mediaItemPropType = {
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    thumbnail_url: PropTypes.string,
    original_url: PropTypes.string,
}