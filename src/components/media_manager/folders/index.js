import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MediaActions from '../../../redux/actions/MediaActions';
import {folderItemPropType} from '../proptypes';
import FolderItem from './folder_item';
import CreateFolderItem from './create_folder_item';

import "./style.scss";

const mapStateToProps = (state) => {
    const {folders, current_folder} = state.media
    return { folders, current_folder }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(MediaActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Folders extends Component {
    static propTypes = {
        folders: PropTypes.arrayOf(PropTypes.shape(folderItemPropType)),
        current_folder: PropTypes.shape(folderItemPropType),
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
        const {folders, current_folder} = this.props;
        return (
            <div className="folders-sidebar">
                <ul className="nav-lists">
                    {folders.map(folder =>
                        <FolderItem
                            key={folder.id}
                            onActive={this.handleActiveFolder}
                            onUpdate={this.props.updateFolder}
                            onRemove={this.props.removeFolder}
                            active={current_folder.id === folder.id}
                            editable={current_folder.id !== 'all'}
                            {...folder}
                        />
                    )}
                    <CreateFolderItem onSubmit={this.props.addFolder}/>
                </ul>
            </div>
        )
    }
}

