import React, {Component, PropTypes} from 'react';
import {getIcon, getColor, isImage} from '../../media_manager/utils';

export default class Thumbnail extends Component {
    render() {
        const {type, thumbnail_url} = this.props;
        return <div className="thumbnail">
            {isImage(type) && <img src={thumbnail_url}/>}
            {!isImage(type) && getIcon(type)}
        </div>
    }
}
Thumbnail.propTypes = {
    type: PropTypes.string,
    thumbnail_url: PropTypes.string
}
