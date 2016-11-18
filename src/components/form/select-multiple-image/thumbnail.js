import React, {PureComponent, PropTypes} from 'react';
import {getIcon, isImage} from '../../media-manager/utils';

export default class Thumbnail extends PureComponent {
    render() {
        const {type, thumbnail_url} = this.props;
        return <div className="thumbnail">
            {isImage(type) && <img src={thumbnail_url} alt="" use="presentation"/>}
            {!isImage(type) && getIcon(type)}
        </div>
    }
}
Thumbnail.propTypes = {
    type: PropTypes.string,
    thumbnail_url: PropTypes.string
}
