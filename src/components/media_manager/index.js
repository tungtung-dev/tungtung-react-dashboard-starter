import React, {Component, PropTypes} from 'react';
import {connect} from '../../utils/reduxAwait';
import {bindActionCreators} from 'redux';
import {getFolders, getFolderPhotos} from '../../redux/actions/MediaActions';
import Folders from './folders/index';
import Medias from './medias/index';
import "./style.scss";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getFolders, getFolderPhotos}, dispatch);
}

@connect(()=>({}), mapDispatchToProps)
export default class MediaManager extends Component {
    componentDidMount() {
        this.props.getFolders();
        this.props.getFolderPhotos('all');
    }

    render() {
        return (
            <div className="media-manager">
                <Folders/>
                <Medias/>
            </div>
        )
    }
}

MediaManager.propTypes = {}
