import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {mediaItemPropType} from '../proptypes';
import MediaView from './media_view';
import {PopoverConfirm} from '../../../components/form/index';
import {cleanFile, getIcon, getColor} from '../utils';
import classnames from 'classnames';
import Equal from 'deep-equal';

export default class MediaItem extends Component {
    state = {
        isView: false
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

    renderButtonAction(icon, event = () => {}) {
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
                <PopoverConfirm title="Xóa file" message="Bạn có muốn xóa không" onConfirm={this.handleRemove}>
                    {this.renderButtonAction('icon-trash')}
                </PopoverConfirm>
            </div>
        </div>
    }

    renderProgress() {
        const {progress} = this.props;
        return <div className="progress-container">
            <progress className="progress progress-success progress-striped progress-animated" value={progress} max="100"/>
        </div>
    }

    render() {
        const {is_uploading, checked} = this.props;
        const is_thumbnail_image = this.isimage() && !is_uploading;
        const is_thumbnail_icon = is_uploading || !is_thumbnail_image;
        return (
            <div className="media-item">
                <MediaView toggle={this.toggleView} isOpen={this.state.isView} {...this.props} onChoose={this.handleChoose}/>
                <div className={classnames('media-item-container', {checked})}>
                    {is_thumbnail_image && this.renderThumnailImage()}
                    {is_thumbnail_icon && this.renderThumbnailIcon()}
                    {!is_uploading && this.renderOverlay()}
                    {is_uploading && this.renderProgress()}
                </div>
            </div>
        )
    }
}

MediaItem.defaultProps = {
    onChoose: PropTypes.func
}

MediaItem.propTypes = {
    ...mediaItemPropType,
    is_uploading: PropTypes.bool,
    progress: PropTypes.number,
    checked: PropTypes.bool,
    onRemove: PropTypes.func,
    onChoose: PropTypes.func,
    onChecked: PropTypes.func,
    onUnChecked: PropTypes.func
}

