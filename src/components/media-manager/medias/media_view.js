import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import Clipboard from 'react-copy-to-clipboard';
import {mediaItemPropType} from '../proptypes';
import {InputText} from '../../../components/form/index';

export default class MediaView extends Component {
    state = {
        copied: false
    }

    @autobind
    onCopy(){
        this.setState({copied: true});
    }

    renderImageView(){
        return <center>
            <img src={this.props.originalUrl} style={{maxWidth: '100%'}} alt=""/>
        </center>
    }

    renderVideoView(){
        return <video width="100%" controls>
            <source src={this.props.originalUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
        </video>
    }

    renderPdfView(){
        return <object data={this.props.originalUrl} type="application/pdf" width="100%" height="600" scrolling="auto" internalinstanceid="11">
            <embed src={this.props.originalUrl} type="application/pdf"/>
        </object>
    }

    renderDefaultLink(){
        const rightComponent = <Clipboard text={this.props.originalUrl} onCopy={this.onCopy}>
            <span>
                <a href="#" onClick={(e) => e.preventDefault()}><i className="icon-link"/> Copy link</a>
                <span className="text-green"> {this.state.copied ? 'Đã copied' : ''}</span>
                {' '}<a href={this.props.originalUrl} target="_blank"><i className="icon-cloud-download"/> Download</a>
            </span>
        </Clipboard>
        return <div >
            <p>File isn't support view</p>
            <InputText rightComponent={rightComponent} title="Link original" value={this.props.originalUrl}/>
        </div>
    }

    renderTypeView(){
        switch (this.props.type){
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return this.renderImageView();
            case 'video/mp4':
                return this.renderVideoView();
            case 'application/pdf':
                return this.renderPdfView();
            default:
                return this.renderDefaultLink();
        }
    }

    render() {
        return (
            <Modal {...this.props}>
                <ModalHeader>
                    File Viewer
                </ModalHeader>
                <ModalBody>
                    {this.renderTypeView()}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end">
                        <button className="btn btn-primary" onClick={this.props.toggle}>Đóng lại</button>{' '}
                        <button className="btn btn-success" onClick={this.props.onChoose}>Chọn</button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
}

MediaView.propTypes = {
    ...mediaItemPropType,
    onChoose: PropTypes.func
}
