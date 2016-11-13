import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ChooseImageWrap} from '../../media_manager/index';
import {addAlertToast} from '../../../redux/actions/AlertAction';
import ValidateWrapControl from '../validate_wrap_control';

@connect(() => ({}), (dispatch) => bindActionCreators({addAlertToast}, dispatch))
export default class SelectImage extends Component {
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
    deleteMedia(){
        this.props.onChange({});
    }

    render() {
        const media = this.getMedia();
        return <ValidateWrapControl {...this.props}>
            <div>
            {media.thumbnail_url && <img src={media.original_url} style={{width: '100%'}} alt=""/>}
            <div className="flex">
                <ChooseImageWrap onChoose={this.chooseMedia}>
                    <button className="btn fullwidth btn-purple" onClick={this.toggleModal}>Select image</button>
                </ChooseImageWrap>
                {media.thumbnail_url && <button className="btn fullwidth btn-red" onClick={this.deleteMedia}>Xóa</button>}
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
