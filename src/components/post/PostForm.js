import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {Input} from '../form/index';
import AWS from 'aws-sdk';

//
//var client = s3.createClient({
//    maxAsyncS3: 20,     // this is the default
//    s3RetryCount: 3,    // this is the default
//    s3RetryDelay: 1000, // this is the default
//    multipartUploadThreshold: 20971520, // this is the default (20 MB)
//    multipartUploadSize: 15728640, // this is the default (15 MB)
//    s3Options: {
//        accessKeyId: "AKIAIVK2TB26PDL64QUQ",
//        secretAccessKey: "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",
//        // any other options are passed to new AWS.S3()
//        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
//    },
//});
//
//var params = {
//    localFile: "some/local/file",
//
//    s3Params: {
//        Bucket: "tungtungstorage",
//        Key: "some/remote/file",
//        // other options supported by putObject, except Body and ContentLength.
//        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
//    },
//};

export default class PostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            code: ''
        };
        this.updateCode = (code) => {
            this.setState({code});
        }
        this.updateFile = (e) => {
            if (this.refs.file.files.length > 0) {
                //params.localFile = this.refs.file.files[0];
                //var uploader = client.uploadFile(params);
                //uploader.on('error', function(err) {
                //    console.error("unable to upload:", err.stack);
                //});
                //uploader.on('progress', function() {
                //    console.log("progress", uploader.progressMd5Amount,
                //        uploader.progressAmount, uploader.progressTotal);
                //});
                //uploader.on('end', function() {
                //    console.log("done uploading");
                //});
            }
        }
    }

    render() {
        const {fields: {title, description, content}} = this.props;
        return (
            <Row>
                <Col md={{size: 12}}>
                    <input type="file" ref="file" onChange={this.updateFile}/>
                    <Input.InputText title="Tiêu đề" {...title}/>
                    <Input.MDEditor title="Content" value={this.state.code} onChange={this.updateCode}/>
                </Col>
            </Row>
        )
    }
}

PostForm.propTypes = {}

