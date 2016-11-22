import React, {PureComponent, PropTypes} from 'react';
import {getIcon, isImage} from '../../media-manager/utils';

export default class Thumbnail extends PureComponent {
    render() {
        const {type, thumbnailUrl} = this.props;
        return <div className="thumbnail">
            {isImage(type) && <img src={thumbnailUrl} alt="" use="presentation"/>}
            {!isImage(type) && getIcon(type)}
        </div>
    }
}
Thumbnail.propTypes = {
    type: PropTypes.string,
    thumbnailUrl: PropTypes.string
}
