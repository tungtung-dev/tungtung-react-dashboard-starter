import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../utils/reduxAwait';
import mediaAction from '../../redux/actions/mediaAction';
import Folders from './folders';
import Medias from './medias';
import "./style.scss";

const mapStateToProps = (state) => {
    const {firstLoaded} = state.media;
    return {firstLoaded};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mediaAction, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MediaManager extends Component {
    static propTypes = {
        customToolbar: PropTypes.func,
        onChooseMedia: PropTypes.func,
        getFolders: PropTypes.func.isRequired,
        getFolderPhotos: PropTypes.func.isRequired
    }

    componentDidMount() {
        if(!this.props.firstLoaded && this.props.awaitStatuses.getFolders !== 'pending'){
            this.props.getFolders();
            this.props.getFolderPhotos('all');
        }
    }

    renderFolders(){
        return <Folders/>
    }

    renderMedias(){
        const {onChooseMedia, customToolbar} = this.props;
        return <Medias onChooseMedia={onChooseMedia} customToolbar={customToolbar}/>
    }

    render() {
        return (
            <div ref="media_manager" className="media-manager">
                {this.renderFolders()}
                {this.renderMedias()}
            </div>
        )
    }
}
