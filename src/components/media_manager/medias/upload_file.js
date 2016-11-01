import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import uuid from 'uuid';
import {uploadMedia} from '../../../api/MediaApi';

export default class UploadFile extends Component {
    @autobind
    toggleDialog() {
        this.refs.files_upload.click();
    }

    @autobind
    _handleChooseFiles() {
        const files = this.refs.files_upload.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                this._handleFile(files[i]);
            }

        }
    }

    _handleFile(file) {
        var data = new FormData();
        var newFile = {
            id: uuid.v4(),
            name: file.name,
            type: file.type,
            is_uploading: true
        }
        this.props.onAddMedia(newFile);
        data.append('uploads[]', file, file.name);
        data.append('id', newFile.id);
        const callback_xhr = function (xhr, onUpdateMedia) {
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    // calculate the percentage of upload completed
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    onUpdateMedia(newFile.id, {
                        progress: percentComplete,
                    })
                }
            };
        }
        uploadMedia(data, (xhr) => callback_xhr(xhr, this.props.onUpdateMedia)).then((file) => {
            this.props.onUpdateMedia(newFile.id, {
                ...file,
                is_uploading: false
            })
        })
    }

    render() {
        return (
            <span>
                <button className="btn btn-primary btn-sm" onClick={this.toggleDialog}>Upload file</button>
                <input type="file" style={{display: 'none'}} onChange={this._handleChooseFiles} ref="files_upload" multiple="multiple"/>
            </span>
        )
    }
}

UploadFile.propTypes = {
    onAddMedia: PropTypes.func,
    onUpdateMedia: PropTypes.func
}