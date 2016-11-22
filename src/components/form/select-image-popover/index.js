import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {ChooseImagePopoverWrap} from '../../media-manager/index';
import ValidateWrapControl from '../validate-wrap-control';

export default class SelectImage extends PureComponent {
    getMedia(){
        const {media} = this.props;
        if(!media) return {};
        return media;
    }

    @autobind
    chooseMedia(media){
        this.props.onChange(media);
    }

    @autobind
    deleteMedia(e){
        e.preventDefault();
        this.props.onChange({});
    }

    render() {
        const media = this.getMedia();
        return <ValidateWrapControl {...this.props}>
            <div>
            {media.thumbnailUrl && <img src={media.originalUrl} style={{width: '100%', marginBottom: 10}} alt=""/>}
            <div className="flex justify-space-between">
                <ChooseImagePopoverWrap onChoose={this.chooseMedia}>
                    <a className="tt-link-gray" href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-file-image-o"/> Select image</a>
                </ChooseImagePopoverWrap>
                {media.thumbnailUrl && <a className="tt-link-red" href="#" onClick={this.deleteMedia}>Remove</a>}
            </div>
            </div>
        </ValidateWrapControl>
    }
}

SelectImage.propTypes = {
    media: PropTypes.any,
    onChange: PropTypes.func
}
