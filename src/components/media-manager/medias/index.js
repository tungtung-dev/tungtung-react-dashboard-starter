import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import Fuse from 'fuse.js';
import {connect} from '../../../utils/reduxAwait';
import {Flex, Title, Icon} from '../../layouts/index';
import {Spinner} from '@blueprintjs/core';
import mediaAction from '../../../redux/actions/mediaAction';
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
    const {medias: {data, filter}, currentFolder} = state.media;
    return {
        medias: filterData(data, filter),
        mediaFilter: filter,
        mediasChecked: data.filter(m => m.checked),
        currentFolderId: currentFolder.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mediaAction, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    static propTypes = {
        medias: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
        mediasChecked: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
        mediaFilter: PropTypes.string,
        currentFolderId: PropTypes.string,
        onChooseMedia: PropTypes.func,
        customToolbar: PropTypes.any,
        changeMediaFilter: PropTypes.func,
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
            filter={this.props.mediaFilter}
            onFilter={this.props.changeMediaFilter}
            customToolbar={this.props.customToolbar}
            onUpload={() => this.refs.dropzone.openDropzone()}
            onCheckedAll={this.props.checkedAllMedia}
            onUnCheckedAll={this.props.unCheckedAllMedia}
            onRemoveChecked={this.props.removeMediaChecked}
            mediasChecked={this.props.mediasChecked}
        />
    }

    renderEmpty(){
        return <div className="empty-media">
            <Flex width="100%" alignItems="center" justifyContent="center" flexDirection="column">
                <Title element="h2" marginTop={10} styleColor="black-white">
                    <Icon name="folder-open" fontSize={20} bluePrintIcon/>
                </Title>
                <Title element="h2" marginTop={15} styleColor="black-white">
                    {this.props.mediaFilter ? `${this.props.mediaFilter} not found` : 'This Folder Is Empty'}
                </Title>
                <p style={{marginTop: 10}}>Drag file to here.</p>
            </Flex>
        </div>
    }

    renderMediasDropzone(){
        const { awaitStatuses:{ getFolderPhotos }, medias} = this.props;
        return <MediaDropzone folderId={this.props.currentFolderId} ref="dropzone" onAddMedia={this.props.addMedia} onUpdateMedia={this.props.updateMedia}>
            <div className="media-lists">
                {getFolderPhotos === 'success' && medias.length === 0 && this.renderEmpty()}
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
