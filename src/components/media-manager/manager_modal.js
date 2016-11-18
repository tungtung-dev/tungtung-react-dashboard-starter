import React, {Component, PropTypes} from 'react';
import {Modal} from 'reactstrap';
import ManagerDefault from './manager_default';

export default class ManagerModal extends Component {
    render() {
        const {isOpen, toggle} = this.props;
        return <Modal isOpen={isOpen} toggle={toggle} className="media-manager-modal">
            <ManagerDefault/>
        </Modal>
    }
}

ManagerModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
}
