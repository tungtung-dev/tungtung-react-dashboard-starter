import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {mediaItemPropType} from '../proptypes';
import MediaView from './media_view';

export default class MediaItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isView: false
        }
    }

    @autobind
    toggleView(){
        this.setState({isView: !this.state.isView});
    }

    isimage(){
        const {type} = this.props;
        return type && type.match('image/*');
    }

    getColor(){
        switch (this.props.type){
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return '#3498db';
            case 'application/pdf':
                return '#e67e22';
            case 'video/mp4':
                return '#8e44ad';
            default: return '#2ecc71'
        }
    }

    getIcon(){
        var icon = '';
        switch (this.props.type){
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
            default: icon = 'fa fa-file-o';
        }
        return <i className={`icon ${icon}`}/>
    }

    renderButtonAction(icon, event = () => {}){
        return <button className="btn" onClick={event}>
            <i className={icon}></i>
        </button>
    }

    renderThumnailImage(){
        const {thumbnail_url, name} = this.props;
        return <div className="thumbnail">
            <img src={thumbnail_url} alt={name}/>
        </div>
    }

    renderThumbnailIcon(){
        const isImage = this.isimage();
        return <div className="thumbnail-icon" style={{backgroundColor: this.getColor()}}>
            <div className="display">
                {this.getIcon()}
                {isImage && <span className="name">{this.props.name}</span>}
                {!isImage && <span className="name">{this.props.type}</span>}
            </div>
        </div>
    }

    renderOverlay(){
        const {name} = this.props;
        return <div className="overlay">
            <span className="name">{name}</span>
            <div className="actions">
                {this.renderButtonAction('icon-plus')}
                {this.renderButtonAction('icon-eye', this.toggleView)}
                {this.renderButtonAction('icon-pencil')}
                {this.renderButtonAction('icon-trash')}
            </div>
        </div>
    }

    renderProgress(){
        const {progress} = this.props;
        return <div className="progress-container">
            <progress className="progress progress-success progress-striped progress-animated" value={progress} max="100"/>
        </div>
    }

    render() {
        const {is_uploading} = this.props;
        const isThumbnailImage = this.isimage();
        const isThumbnailIcon = is_uploading || !isThumbnailImage;
        return (
            <div className="media-item">
                <MediaView toggle={this.toggleView} isOpen={this.state.isView} {...this.props}/>
                <div className="media-item-container">
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

MediaItem.propTypes = {
    ...mediaItemPropType,
    isLoading: PropTypes.bool
}

