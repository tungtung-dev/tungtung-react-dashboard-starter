import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ChooseImageModalWrap} from '../../media_manager/index';
import {addAlertToast} from '../../../redux/actions/AlertAction';
import ValidateWrapControl from '../validate_wrap_control';
import {mediaItemPropType} from '../../media_manager/proptypes'

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
            {media.thumbnail_url && <img src={media.original_url} style={{width: '100%', marginBottom: 5}} alt=""/>}
            <div className="flex justify-space-between">
                <ChooseImageModalWrap onChoose={this.chooseMedia}>
                    <a className="tt-link-gray" href="#" onClick={this.toggleModal}><i className="fa fa-file-image-o"/> Select image</a>
                </ChooseImageModalWrap>
                &nbsp;
                {media.thumbnail_url && <a className="tt-link-red" href="#" onClick={this.deleteMedia}>Remove</a>}
            </div>
            </div>
        </ValidateWrapControl>
    }
}

SelectImage.propTypes = {
    media: PropTypes.shape(mediaItemPropType),
    onChange: PropTypes.func
}
