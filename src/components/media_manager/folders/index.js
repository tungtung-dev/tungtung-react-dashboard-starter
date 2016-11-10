import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Equal from 'deep-equal';
import {addFolder, getFolders, getFolderPhotos, updateFolder, removeFolder} from '../../../redux/actions/MediaActions';
import FolderItem from './folder_item';
import CreateFolderItem from './create_folder_item';
import {folderItemPropType} from '../proptypes';

import "./style.scss";

const mapStateToProps = (state) => {
    const {folders, current_folder} = state.media
    return {
        folders, current_folder
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addFolder, getFolders, getFolderPhotos, updateFolder, removeFolder}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    shouldComponentUpdate(prevProps, prevState){
        return !Equal(this.props, prevProps);
    }

    render() {
        const {folders, current_folder, addFolder} = this.props;
        return (
            <div className="folders-sidebar">
                <ul className="nav-lists">
                    {folders.map(folder =>
                        <FolderItem
                            key={folder.id}
                            onActive={this.props.getFolderPhotos}
                            onUpdate={this.props.updateFolder}
                            onRemove={this.props.removeFolder}
                            active={current_folder.id === folder.id}
                            editable={current_folder.id !== 'all'}
                            {...folder}
                        />
                    )}
                    <CreateFolderItem onSubmit={addFolder}/>
                </ul>
            </div>
        )
    }
}

Folders.propTypes = {
    folders: PropTypes.arrayOf(folderItemPropType),
    currentFolder: PropTypes.shape(folderItemPropType)
}

