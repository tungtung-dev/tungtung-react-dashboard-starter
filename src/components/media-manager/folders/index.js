import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import mediaAction from '../../../redux/actions/mediaAction';
import {folderItemPropType} from '../proptypes';
import FolderItem from './folder_item';
import CreateFolderItem from './create_folder_item';

import "./style.scss";

const mapStateToProps = (state) => {
    const {folders, currentFolder} = state.media
    return { folders, currentFolder }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mediaAction, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    static propTypes = {
        folders: PropTypes.arrayOf(PropTypes.shape(folderItemPropType)),
        currentFolder: PropTypes.shape(folderItemPropType),
        addFolder: PropTypes.func.isRequired,
        updateFolder: PropTypes.func.isRequired,
        removeFolder: PropTypes.func.isRequired,
        getFolderPhotos: PropTypes.func.isRequired,
        resetMediaFilter: PropTypes.func.isRequired
    }

    @autobind
    handleActiveFolder(id){
        this.props.getFolderPhotos(id);
        this.props.resetMediaFilter();
    }


    render() {
        const {folders, currentFolder} = this.props;
        return (
            <div className="folders-sidebar">
                <ul className="nav-lists">
                    {folders.map(folder =>
                        <FolderItem
                            key={folder.id}
                            onActive={this.handleActiveFolder}
                            onUpdate={this.props.updateFolder}
                            onRemove={this.props.removeFolder}
                            active={currentFolder.id === folder.id}
                            editable={currentFolder.id !== 'all'}
                            {...folder}
                        />
                    )}
                    <CreateFolderItem onSubmit={this.props.addFolder}/>
                </ul>
            </div>
        )
    }
}

