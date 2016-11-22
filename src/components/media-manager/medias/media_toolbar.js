import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {mediaItemPropType} from '../proptypes';
import {PopoverConfirm} from '../../form/index';

export default class MediaToolbar extends Component {
    @autobind
    handleRemove(){
        const medias_id = this.props.mediasChecked.map(media => media.id);
        this.props.onRemoveChecked(medias_id);
    }

    @autobind
    handleChangeFilter(e){
        this.props.onFilter(e.target.value);
    }

    render() {
        const {mediasChecked, filter, customToolbar} = this.props;
        return (
            <div className="media-toolbar">
                <div className="flex">
                    <input type="text" placeholder="Search..." value={filter} onChange={this.handleChangeFilter} className="form-control"/>
                    <span>{' '}</span>
                </div>
                <div className="actions">
                    {customToolbar}
                    {mediasChecked.length > 0 && <PopoverConfirm title="Bạn có muốn xóa không" onConfirm={this.handleRemove}>
                        <button className="btn btn-transparent">
                            <i className="icon-trash"/> Delete {mediasChecked.length} files
                        </button>
                    </PopoverConfirm>
                    }
                    {mediasChecked.length > 0 && <button className="btn btn-transparent" onClick={this.props.onUnCheckedAll}><i className="fa fa-ban"/> Uncheck all</button>}
                    <button className="btn btn-transparent" onClick={this.props.onCheckedAll}><i className="fa fa-check"/> Check all</button>
                    <button className="btn btn-transparent" onClick={this.props.onUpload}><i className="fa fa-upload"/> Upload</button>
                </div>
            </div>
        )
    }
}

MediaToolbar.propTypes = {
    mediasChecked: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
    filter: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
    onCheckedAll: PropTypes.func.isRequired,
    onUnCheckedAll: PropTypes.func.isRequired,
    onRemoveChecked: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    customToolbar: PropTypes.any
}
