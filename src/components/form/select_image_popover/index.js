import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ChooseImagePopoverWrap} from '../../media_manager/index';
import {addAlertToast} from '../../../redux/actions/AlertAction';
import ValidateWrapControl from '../validate_wrap_control';

@connect(() => ({}), (dispatch) => bindActionCreators({addAlertToast}, dispatch))
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
            {media.thumbnail_url && <img src={media.original_url} style={{width: '100%', marginBottom: 10}} alt=""/>}
            <div className="flex justify-space-between">
                <ChooseImagePopoverWrap onChoose={this.chooseMedia}>
                    <a className="tt-link-gray" href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-file-image-o"/> Select image</a>
                </ChooseImagePopoverWrap>
                {media.thumbnail_url && <a className="tt-link-red" href="#" onClick={this.deleteMedia}>Remove</a>}
            </div>
            </div>
        </ValidateWrapControl>
    }
}

SelectImage.propTypes = {
    media: PropTypes.shape({
        thumbnail_url: PropTypes.string,
        original_url: PropTypes.string
    }),
    onChange: PropTypes.func
}
