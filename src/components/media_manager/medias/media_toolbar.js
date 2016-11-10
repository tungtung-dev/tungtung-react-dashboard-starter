import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {mediaItemPropType} from '../proptypes';

export default class MediaToolbar extends Component {
    @autobind
    handleRemove(){
        const medias_id = this.props.medias_checked.map(media => media.id);
        this.props.onRemoveChecked(medias_id);
    }
    render() {
        const {medias_checked} = this.props;
        return (
            <div className="media-toolbar">
                <div className="flex">
                    <input type="text" placeholder="Search..." className="form-control"/>
                    <span>{' '}</span>
                </div>
                <div className="actions">
                    {medias_checked.length > 0 && <button className="btn btn-danger fill" onClick={this.handleRemove}>Delete {medias_checked.length} files</button>}
                    <button className="btn btn-purple fill" onClick={this.props.onCheckedAll}>Checked all</button>
                    <button className="btn btn-orange fill" onClick={this.props.onUnCheckedAll}>Unchecked all</button>
                    <button className="btn btn-primary" onClick={this.props.onUpload}>Upload file</button>
                </div>
            </div>
        )
    }
}

MediaToolbar.propTypes = {
    onUpload: PropTypes.func,
    onCheckedAll: PropTypes.func,
    onUnCheckedAll: PropTypes.func,
    onRemoveChecked: PropTypes.func,
    medias_checked: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType))
}
