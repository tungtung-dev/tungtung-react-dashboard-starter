import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {autobind} from 'core-decorators';
import {folderItemPropType} from '../proptypes';
import Equal from 'deep-equal';

export default class FolderItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isEdit: false,
            name_edit: '',
        }
    }

    @autobind
    _handleChangeNameEdit(e) {
        this.setState({name_edit: e.target.value});
    }

    @autobind
    _handleKeyDownNameEdit(e) {
        if (e.keyCode === 13) {
            this.setState({isEdit: false});
            const {id} = this.props;
            this.props.onUpdate(id, this.state.name_edit);
            this.setState({name_edit: ''});
        }
    }

    @autobind
    _handleActive(e) {
        e.preventDefault();
        this.props.onActive(this.props.id);
    }

    @autobind
    _handleDoubleClick() {
        if(this.props.editable) this.setState({isEdit: true, name_edit: this.props.name});
    }

    shouldComponentUpdate(prevProps, prevState) {
        return !Equal(this.props, prevProps) || !Equal(this.state, prevState)
    }

    renderInputEdit() {
        const {name} = this.props;
        return <input type="text" onChange={this._handleChangeNameEdit} onKeyDown={this._handleKeyDownNameEdit}
                      className="form-control" defaultValue={name} value={this.state.name_edit}/>
    }

    render() {
        const {name, active} = this.props;
        console.log(this.props);
        return <li className={classnames({active})}>
            <a href="#" onClick={this._handleActive} onDoubleClick={this._handleDoubleClick}>
                {!this.state.isEdit ? <span><i className="icon-folder"/> {name}</span> : this.renderInputEdit()}
            </a>
        </li>
    }
}
FolderItem.propTypes = {
    ...folderItemPropType,
    active: PropTypes.bool,
    onActive: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    editable: PropTypes.bool
}