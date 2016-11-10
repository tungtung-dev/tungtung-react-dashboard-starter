import React, {Component, PropTypes} from 'react';
import {connect} from '../../utils/reduxAwait';
import {bindActionCreators} from 'redux';
import {getFolders, getFolderPhotos} from '../../redux/actions/MediaActions';
import Folders from './folders/index';
import Medias from './medias/index';
import "./style.scss";

const mapStateToProps = (state) => {
    return {
        first_loaded: state.media.first_loaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getFolders, getFolderPhotos}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MediaManager extends Component {
    componentDidMount() {
        if(!this.props.first_loaded && this.props.awaitStatuses.getFolders !== 'pending'){
            this.props.getFolders();
            this.props.getFolderPhotos('all');
        }
    }

    render() {
        const {onChooseMedia} = this.props;
        const mediaProps = {
            onChooseMedia
        }
        return (
            <div ref="media_manager" className="media-manager">
                <Folders/>
                <Medias {...mediaProps}/>
            </div>
        )
    }
}

MediaManager.propTypes = {
    onChooseMedia: PropTypes.func
}
