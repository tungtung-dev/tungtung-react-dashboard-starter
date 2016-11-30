import React, {Component, PropTypes} from 'react';
import {Modal, ModalBody} from 'reactstrap';

import TagForm from '../tag-form';

export default class TagModal extends Component {
    render() {
        console.log(this.props.editable);
        return <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalBody>
                <TagForm onSubmitTag={this.props.onSubmit} editable={this.props.editable} {...this.props}/>
            </ModalBody>
        </Modal>
    }
}
TagModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func,
    editable: PropTypes.bool
}
