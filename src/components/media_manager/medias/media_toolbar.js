import React, {Component, PropTypes} from 'react';

export default class MediaToolbar extends Component {
    render() {
        return (
            <div className="media-toolbar">
                <div>
                    <input type="text" placeholder="Search..." className="form-control"/>
                </div>
                <div className="actions">
                    <button className="btn btn-primary btn-sm" onClick={this.props.onUpload}>Upload file</button>
                    <button className="btn btn-sm btn-success">Checked</button>
                </div>
            </div>
        )
    }
}

MediaToolbar.propTypes = {
    onUpload: PropTypes.func
}
