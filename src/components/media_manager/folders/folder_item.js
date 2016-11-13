import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {autobind} from 'core-decorators';
import {InputText} from '../../../components/form/index';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {folderItemPropType} from '../proptypes';
import Equal from 'deep-equal';

export default class FolderItem extends Component {
    state = {
        isEdit: false,
        name_edit: ''
    }

    @autobind
    _handleChangeNameEdit(e) {
        this.setState({name_edit: e.target.value});
    }

    @autobind
    _handkeKeydownNameEdit(e){
        if(e.keyCode === 13) this._handleChangeEdit();
    }

    @autobind
    _handleRemove(e){
        this.setState({isEdit: false});
        this.props.onRemove(this.props.id);
        this.props.onActive('all');
    }

    @autobind
    _handleChangeEdit() {
        this.setState({isEdit: false});
        const {id} = this.props;
        this.props.onUpdate(id, this.state.name_edit);
        this.setState({name_edit: ''});
    }

    @autobind
    _handleActive(e) {
        e.preventDefault();
        this.props.onActive(this.props.id);
    }

    @autobind
    _handleDoubleClick() {
        if(this.props.editable) this.setState({isEdit: !this.state.isEdit, name_edit: this.props.name});
    }

    shouldComponentUpdate(prevProps, prevState) {
        return !Equal(this.props, prevProps) || !Equal(this.state, prevState)
    }

    renderInputEdit() {
        const {name} = this.props;
        return <Modal isOpen={true} toggle={this._handleDoubleClick}>
            <ModalBody>
                <InputText title="Tên folder" onChange={this._handleChangeNameEdit} onKeyDown={this._handkeKeydownNameEdit} defaultValue={name} value={this.state.name_edit}/>
                <button className="btn btn-red fill" onClick={this._handleRemove}>Xóa</button>{' '}
                <button className="btn btn-primary" onClick={this._handleChangeEdit}>Thay đổi</button>{' '}
            </ModalBody>
        </Modal>
    }

    render() {
        const {name, active} = this.props;
        return <li className={classnames({active})}>
            <a href="#" onClick={this._handleActive} onDoubleClick={this._handleDoubleClick}>
                <span><i className="icon-folder"/> {name}</span>
                {this.state.isEdit && this.renderInputEdit()}
            </a>
        </li>
    }
}
FolderItem.propTypes = {
    ...folderItemPropType,
    active: PropTypes.bool,
    onActive: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    editable: PropTypes.bool
}