import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import uuid from 'uuid';
import Dropzone from 'react-dropzone';
import {uploadMedia} from '../../../api/MediaApi';

export default class MediaDropdzone extends Component {
    @autobind
    onDrop(acceptedFiles) {
        const files = acceptedFiles;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                this._handleUploadFile(files[i]);
            }

        }
    }

    @autobind
    openDropzone(){
        this.dropzone.open();
    }

    _handleUploadFile(file) {
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
        data.append('folder_id', this.props.folder_id);
        const callback_xhr = function (xhr, onUpdateMedia) {
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    // calculate the percentage of upload completed
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100, 10);
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
            <div className="dropzone-manager">
                <Dropzone className="dropzone" disableClick ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                    {this.props.children}
                </Dropzone>
            </div>
        )
    }
}

MediaDropdzone.propTypes = {
    onAddMedia: PropTypes.func,
    onUpdateMedia: PropTypes.func,
    folder_id: PropTypes.string
}