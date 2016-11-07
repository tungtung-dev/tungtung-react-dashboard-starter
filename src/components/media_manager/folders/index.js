import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import {getFolders, getFolderPhotos, updateFolder, removeFolder} from '../../../redux/actions/MediaActions';
import FolderItem from './folder_item';
import {folderItemPropType} from '../proptypes';

import "./style.scss";

const mapStateToProps = (state) => {
    const {folders, current_folder} = state.media
    return {
        folders, current_folder
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getFolders, getFolderPhotos, updateFolder, removeFolder}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    render() {
        const {folders, current_folder} = this.props;
        return (
            <div className="folders-sidebar">
                <ul className="nav-lists">
                    {folders.map(folder =>
                        <FolderItem
                            key={folder.id}
                            onActive={this.props.getFolderPhotos}
                            onUpdate={this.props.updateFolder}
                            active={current_folder.id === folder.id}
                            editable={current_folder.id !== 'all'}
                            {...folder}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

Folders.propTypes = {
    folders: PropTypes.arrayOf(folderItemPropType),
    currentFolder: PropTypes.shape(folderItemPropType)
}

