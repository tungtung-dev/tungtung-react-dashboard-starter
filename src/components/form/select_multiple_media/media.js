import React, { Component, PropTypes } from 'react';
import {autobind} from 'core-decorators';
import classnames from 'classnames';
import { InputText, Textarea } from '../../form/index';
import Thumbnail from './thumbnail';

export default class Card extends Component {
    state = {
        showEdit: false
    }

    static propTypes = {
        index: PropTypes.number.isRequired,
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    @autobind
    toggleEdit(e){
        e.preventDefault();
        if(!this.state.showEdit){
            this.setState({showEdit: true});
        }
        else{
            this.setState({showEdit: false});
        }
    }

    handleChangeKey(key, e){
        var value = e;
        if(typeof e === 'object') value = e.target.value;
        this.props.onChange(this.props.index, key, value);
    }

    @autobind
    handleDelete(e){
        e.preventDefault();
        this.props.onDelete(this.props.index);
    }

    getButton(){
        const {showEdit} = this.state;
        const buttonEditClass = classnames('btn',{'btn-primary': !showEdit}, {'btn-success': showEdit});
        const iconEditClass = showEdit ? 'icon-check' : 'icon-pencil';
        return <div className="tools">
            <a href="#" onClick={this.toggleEdit} className={buttonEditClass}>
                <i className={iconEditClass}/>
            </a>
            <a href="#" onClick={this.handleDelete} className="btn btn-danger">
                <i className="icon-trash"/>
            </a>
        </div>
    }

    render() {
        const { name, description, type, thumbnail_url, opacity } = this.props;

        return <div className="item" style={{opacity}}>
                <div className="thumbnail">
                    <Thumbnail type={type} thumbnail_url={thumbnail_url}/>
                </div>
                <div className="section">
                    {!this.state.showEdit && <span>{name}</span>}
                    {this.state.showEdit && <div>
                        <InputText placeholder="Name" onChange={this.handleChangeKey.bind(this, 'name')} value={name}/>
                        <Textarea placeholder="Mô tả" onChange={this.handleChangeKey.bind(this, 'description')} value={description} autoResize/>
                    </div>}
                </div>
                <div className="tools">
                    {this.getButton()}
                </div>
            </div>

    }
}
