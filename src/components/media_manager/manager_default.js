import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../utils/reduxAwait';
import MediaActions from '../../redux/actions/MediaActions';
import Folders from './folders';
import Medias from './medias';
import "./style.scss";

const mapStateToProps = (state) => {
    const {first_loaded} = state.media;
    return {first_loaded};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(MediaActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MediaManager extends Component {
    static propTypes = {
        onChooseMedia: PropTypes.func,
        getFolders: PropTypes.func.isRequired,
        getFolderPhotos: PropTypes.func.isRequired
    }

    componentDidMount() {
        if(!this.props.first_loaded && this.props.awaitStatuses.getFolders !== 'pending'){
            this.props.getFolders();
            this.props.getFolderPhotos('all');
        }
    }

    renderFolders(){
        return <Folders/>
    }

    renderMedias(){
        const {onChooseMedia} = this.props;
        return <Medias onChooseMedia={onChooseMedia}/>
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
