import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

export default class DialogConfirm extends Component {
    state = {
        showConfirm: false
    }

    @autobind
    _handleClick(){
        this.setState({
            showConfirm: true
        })
    }

    @autobind
    _handleCancel(){
        this.setState({showConfirm: false});
        this.props.onCancel();
    }

    @autobind
    _handleConfirm(){
        this.setState({showConfirm: false});
        this.props.onConfirm();
    }

    render() {
        const cloneChildren = React.cloneElement(this.props.children, {
            onClick: this._handleClick
        });

        return <span>
            <Modal isOpen={this.state.showConfirm} toggle={this._handleCancel}>
                <ModalHeader>
                    {this.props.title}
                </ModalHeader>
                <ModalBody>
                    <p>{this.props.message}</p>
                    <div className="flex justify-end margin-top-5">
                        <buton className="btn btn-danger" onClick={this._handleCancel}>Không</buton>{' '}
                        <buton className="btn btn-success" onClick={this._handleConfirm}>Có</buton>
                    </div>
                </ModalBody>
            </Modal>
            {cloneChildren}
        </span>
    }
}

DialogConfirm.defaultProps = {
    onCancel: () => {},
    onConfirm: () => {}
}

DialogConfirm.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
}
