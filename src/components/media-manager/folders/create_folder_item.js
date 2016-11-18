import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';

export default class CreateFolderItem extends Component {
    state = {
        editable: false,
        value: ''
    }

    @autobind
    handleChangeInput(e){
        this.setState({value: e.target.value});
    }

    @autobind
    handleShowInput(e){
        e.preventDefault();
        this.setState({editable: true});
    }

    @autobind
    handleEnterKeydown(e){
        if(e.keyCode === 13){
            this.setState({editable: false});
            this.props.onSubmit(this.state.value);
            this.setState({value: ''});
        }
    }

    render() {
        return <li>
            {this.state.editable && <div style={{padding: '0px 10px'}}>
                <input type="text" placeholder="Tên thư mục" className="form-control" value={this.state.value} onKeyDown={this.handleEnterKeydown} onChange={this.handleChangeInput}/>
            </div>}
            {!this.state.editable && <a href="#" onClick={this.handleShowInput}>
                <i className="icon-plus"></i> Thêm folder
            </a>}
        </li>
    }
}
CreateFolderItem.propTypes = {
    onSubmit: PropTypes.func
}
