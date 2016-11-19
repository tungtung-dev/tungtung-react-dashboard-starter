import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import Fuse from 'fuse.js';
import {connect} from '../../../utils/reduxAwait';
import {Flex} from '../../layouts/index';
import {Spinner} from '@blueprintjs/core';
import MediaActions from '../../../redux/actions/MediaActions';
import {mediaItemPropType} from '../proptypes';
import MediaItem from './media_item';
import MediaToolbar from './media_toolbar';
import MediaDropzone from './media_dropdzone';
import "./style.scss";

const filterData = (data, filter) => {
    if(!filter) return data;
    var fuse = new Fuse(data, {
        keys: [{name: 'name', weight: '0.7'},{name: 'type', weight: '0.3'}],
    })
    return fuse.search(filter);
}

const mapStateToProps = (state) => {
    const {medias: {data, filter}, current_folder} = state.media;
    return {
        medias: filterData(data, filter),
        media_filter: filter,
        medias_checked: data.filter(m => m.checked),
        current_folder_id: current_folder.id,
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
        media_filter: PropTypes.string,
        current_folder_id: PropTypes.string,
        onChooseMedia: PropTypes.func,
        customToolbar: PropTypes.func,
        mediaFilter: PropTypes.func,
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
            filter={this.props.media_filter}
            onFilter={this.props.mediaFilter}
            customToolbar={this.props.customToolbar}
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
                {getFolderPhotos === 'pending' && <Flex width="100%" height="100%" alignItems="center" justifyContent="center" marginTop={20} marginBottom={20}>
                    <Spinner/>
                </Flex>}
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