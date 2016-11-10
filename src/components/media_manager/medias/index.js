import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import {connect} from '../../../utils/reduxAwait';
import {Loader} from '../../form/index';
import {
    addMedia, updateMedia, removeMedia, checkedMedia,
    unCheckedMedia, checkedAllMedia, unCheckedAllMedia, removeMediaChecked
} from '../../../redux/actions/MediaActions';
import {mediaItemPropType} from '../proptypes';
import MediaItem from './media_item';
import MediaToolbar from './media_toolbar';
import MediaDropzone from './media_dropdzone';
import "./style.scss";

const mapStateToProps = (state) => {
    const {medias: {data}, current_folder} = state.media;
    return {
        medias: data,
        medias_checked: data.filter(m => m.checked),
        current_folder,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addMedia, updateMedia, removeMedia, checkedMedia,
        unCheckedMedia, checkedAllMedia, unCheckedAllMedia, removeMediaChecked
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    render() {
        const {medias, medias_checked, current_folder, awaitStatuses:{getFolderPhotos}} = this.props;
        return (
            <div className="media-lists-manager">
                <MediaToolbar
                    onUpload={() => this.refs.dropzone.openDropzone()}
                    onCheckedAll={this.props.checkedAllMedia}
                    onUnCheckedAll={this.props.unCheckedAllMedia}
                    onRemoveChecked={this.props.removeMediaChecked}
                    medias_checked={medias_checked}
                />
                <MediaDropzone folder_id={current_folder.id} ref="dropzone" onAddMedia={this.props.addMedia} onUpdateMedia={this.props.updateMedia}>
                    <div className="media-lists">
                        {getFolderPhotos === 'success' && medias.map(media =>
                            <MediaItem key={media.id}
                                       onChoose={this.props.onChooseMedia}
                                       onChecked={this.props.checkedMedia}
                                       onUnChecked={this.props.unCheckedMedia}
                                       onRemove={this.props.removeMedia}
                                       {...media}
                            />
                        )}
                        {getFolderPhotos === 'pending' && <div className="flex margin-top-20 fullwidth justify-center"><Loader/></div>}
                    </div>
                </MediaDropzone>
            </div>
        )
    }
}

Folders.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
    onChooseMedia: PropTypes.func
}

