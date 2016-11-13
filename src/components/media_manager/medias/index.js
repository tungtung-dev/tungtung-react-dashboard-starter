import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../../utils/reduxAwait';
import {Loader} from '../../form/index';
import MediaActions from '../../../redux/actions/MediaActions';
import {mediaItemPropType, folderItemPropType} from '../proptypes';
import MediaItem from './media_item';
import MediaToolbar from './media_toolbar';
import MediaDropzone from './media_dropdzone';
import "./style.scss";

const mapStateToProps = (state) => {
    const {medias: {data}, current_folder} = state.media;
    return {
        medias: data,
        medias_checked: data.filter(m => m.checked),
        current_folder_id: current_folder.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(MediaActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    static propTypes = {
        medias: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
        medias_checked: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
        current_folder_id: PropTypes.string,
        onChooseMedia: PropTypes.func,
        addMedia: PropTypes.func.isRequired,
        updateMedia: PropTypes.func.isRequired,
        removeMedia: PropTypes.func.isRequired,
        checkedMedia: PropTypes.func.isRequired,
        unCheckedMedia: PropTypes.func.isRequired,
        checkedAllMedia: PropTypes.func.isRequired,
        unCheckedAllMedia: PropTypes.func.isRequired,
        removeMediaChecked: PropTypes.func.isRequired,
    }

    renderToolbar(){
        return  <MediaToolbar
            onUpload={() => this.refs.dropzone.openDropzone()}
            onCheckedAll={this.props.checkedAllMedia}
            onUnCheckedAll={this.props.unCheckedAllMedia}
            onRemoveChecked={this.props.removeMediaChecked}
            medias_checked={this.props.medias_checked}
        />
    }

    renderMediasDropzone(){
        const { awaitStatuses:{ getFolderPhotos }, medias} = this.props;
        return <MediaDropzone folder_id={this.props.current_folder_id} ref="dropzone" onAddMedia={this.props.addMedia} onUpdateMedia={this.props.updateMedia}>
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
    }

    render() {
        return (
            <div className="media-lists-manager">
                {this.renderToolbar()}
                {this.renderMediasDropzone()}
            </div>
        )
    }
}
