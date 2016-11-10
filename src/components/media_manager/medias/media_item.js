import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {mediaItemPropType} from '../proptypes';
import MediaView from './media_view';
import {DialogConfirm} from '../../../components/form/index';
import {cleanFile} from '../utils';
import classnames from 'classnames';
import Equal from 'deep-equal';

const getIcon = (type) => {
    var icon = '';
    switch (type) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            icon = 'fa fa-file-image-o';
            break;
        case 'application/pdf':
            icon = 'fa fa-file-pdf-o';
            break;
        case 'video/mp4':
            icon = 'fa fa-file-video-o'
            break;
        default:
            icon = 'fa fa-file-o';
    }
    return <i className={`icon ${icon}`}/>
}

const getColor = (type) => {
    switch (type) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            return '#3498db';
        case 'application/pdf':
            return '#e67e22';
        case 'video/mp4':
            return '#8e44ad';
        default:
            return '#2ecc71'
    }
}

export default class MediaItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isView: false
        }
    }

    @autobind
    toggleView() {
        this.setState({isView: !this.state.isView});
    }

    isimage() {
        const {type} = this.props;
        return type && type.match('image/*');
    }

    getColor() {
        return getColor(this.props.type);
    }

    getIcon() {
        return getIcon(this.props.type);
    }

    renderButtonAction(icon, event = () => {
    }) {
        return <button className="btn" onClick={event}>
            <i className={icon}></i>
        </button>
    }

    renderThumnailImage() {
        const {thumbnail_url, name} = this.props;
        return <div className="thumbnail">
            <img src={thumbnail_url} alt={name}/>
        </div>
    }

    renderThumbnailIcon() {
        const isImage = this.isimage();
        return <div className="thumbnail-icon" style={{backgroundColor: this.getColor()}}>
            <div className="display">
                {this.getIcon()}
                {isImage && <span className="name">{this.props.name}</span>}
                {!isImage && <span className="name">{this.props.type}</span>}
            </div>
        </div>
    }

    @autobind
    handleRemove() {
        this.props.onRemove(this.props.id);
    }

    @autobind
    handleChoose() {
        this.setState({isView: false});
        this.props.onChoose(cleanFile(this.props));
    }

    @autobind
    handleChecked(e) {
        let classEvent = e.target.getAttribute('class');
        if (classEvent.match('overlay') || classEvent.match('file-name')) {
            if (!this.props.checked) {
                this.props.onChecked(this.props.id);
            }
            else this.props.onUnChecked(this.props.id);
        }
    }

    shouldComponentUpdate(prevProps, prevState) {
        return !Equal(this.props, prevProps) || !Equal(this.state, prevState);
    }

    renderOverlay() {
        const {name} = this.props;
        return <div className="overlay" onClick={this.handleChecked}>
            <span className="name file-name">
                {this.props.checked && <i className="icon-check"/>}
                {this.props.checked && <br/>}
                {name}
            </span>
            <div className="actions">
                {this.renderButtonAction('icon-plus', this.handleChoose)}
                {this.renderButtonAction('icon-eye', this.toggleView)}
                <DialogConfirm title="Xóa file" message="Bạn có muốn xóa không" onConfirm={this.handleRemove}>
                    {this.renderButtonAction('icon-trash')}
                </DialogConfirm>
            </div>
        </div>
    }

    renderProgress() {
        const {progress} = this.props;
        return <div className="progress-container">
            <progress className="progress progress-success progress-striped progress-animated" value={progress}
                      max="100"/>
        </div>
    }

    render() {
        const {is_uploading, checked} = this.props;
        const isThumbnailImage = this.isimage() && !is_uploading;
        const isThumbnailIcon = is_uploading || !isThumbnailImage;
        return (
            <div className="media-item">
                <MediaView toggle={this.toggleView} isOpen={this.state.isView} {...this.props} onChoose={this.handleChoose}/>
                <div className={classnames('media-item-container', {checked})}>
                    {isThumbnailImage && this.renderThumnailImage()}
                    {isThumbnailIcon && this.renderThumbnailIcon()}
                    {!is_uploading && this.renderOverlay()}
                    {is_uploading && this.renderProgress()}
                </div>
            </div>
        )
    }
}
/*
 <div className="thumbnail">
 <img src={thumbnail_url} alt={name}/>
 </div>
 */

MediaItem.defaultProps = {
    onChoose: PropTypes.func
}

MediaItem.propTypes = {
    ...mediaItemPropType,
    isLoading: PropTypes.bool,
    onRemove: PropTypes.func,
    onChoose: PropTypes.func,
    onChecked: PropTypes.func,
    onUnChecked: PropTypes.func
}

