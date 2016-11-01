import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import classnames from 'classnames';
import {addMedia, updateMedia, removeMedia} from '../../../redux/actions/MediaActions';
import {mediaItemPropType} from '../proptypes';
import MediaItem from './media_item';
import UploadFile from './upload_file';
import MediaToolbar from './media_toolbar';
import MediaDropzone from './media_dropdzone';
import "./style.scss";

const mapStateToProps = (state) => {
    const {data} = state.media.medias
    return {
        medias: data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addMedia, updateMedia, removeMedia}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    render() {
        const {medias} = this.props;
        return (
            <div className="media-lists-manager">
                <MediaToolbar onUpload={() => this.refs.dropzone.openDropzone()}/>
                <MediaDropzone ref="dropzone" onAddMedia={this.props.addMedia} onUpdateMedia={this.props.updateMedia}>
                    <div className="media-lists">
                        {medias.map(media => <MediaItem key={media.id} {...media}/>)}
                    </div>
                </MediaDropzone>
            </div>
        )
    }
}

Folders.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
}

