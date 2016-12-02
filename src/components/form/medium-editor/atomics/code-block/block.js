import CodeEditor from '../../../code-editor/index';
import React from 'react';
import {Entity} from 'draft-js';
import classnames from 'classnames';
import Equal from 'deep-equal';

export default class TeXBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };

        this._onClick = () => {
            if (this.state.editMode) {
                return;
            }
            this.setState({
                editMode: true,
                codeValue: this._getContent(),
                mode: this._getMode(),
                name: this._getName()
            }, () => {
                this._startEdit();
            });
        };

        this._onCodeValueChange = codeValue => {
            if (!this.state.editMode) return;
            this.setState({
                codeValue
            });
        };

        this._onChangeMode = mode => {
            if (!this.state.editMode) return;
            this.setState({
                mode
            });
        }

        this._onChangeName = e => {
            if (!this.state.editMode) return;
            this.setState({
                name: e.target.value
            });
        }

        this._save = () => {
            var entityKey = this.props.block.getEntityAt(0);
            Entity.mergeData(entityKey, {content: this.state.codeValue, mode: this.state.mode, name: this.state.name});
            this.setState({
                editMode: false,
                codeValue: null,
                mode: null,
                name: null
            }, this._finishEdit);
        };

        this._remove = () => {
            this.props.blockProps.onRemove(this.props.block.getKey());
        };
        this._startEdit = () => {
            console.log('start edit');
            this.props.blockProps.onStartEdit(this.props.block.getKey());
        };
        this._finishEdit = () => {
            this.props.blockProps.onFinishEdit(this.props.block.getKey());
        };
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(this.props.blockProps, prevProps.blockProps) || !Equal(this.state, prevState);
    }

    _getEntityData() {
        return Entity
            .get(this.props.block.getEntityAt(0))
            .getData();
    }

    _getKeyData(keyState, keyEntity) {
        var value = null;
        if (this.state.editMode) {
            value = this.state[keyState];
        } else {
            value = this._getEntityData()[keyEntity];
        }
        return value;
    }

    _getContent() {
        return this._getKeyData('codeValue', 'content');
    }

    _getMode() {
        return this._getKeyData('mode', 'mode');
    }

    _getName() {
        return this._getKeyData('name', 'name');
    }

    renderEditMode() {
        return <div className="TeXEditor-codeblock-action-buttons">
            <button className='btn btn-green btn-sm' onClick={this._save}><i className="icon-check"/> Done</button>
            &nbsp;
            <button className="btn btn-red btn-sm" onClick={this._remove}><i className="icon-remove"/> Remove</button>
        </div>
    }

    render() {
        const {props: {blockProps:{readOnly}},state: {editMode}} = this;
        const editorReadOnly = readOnly || !editMode;
        return (
            <div className={classnames('TeXEditor-codeblock', {editMode})}>
                <CodeEditor value={this._getContent()}
                            valueMode={this._getMode()}
                            valueName={this._getName()}
                            onChange={this._onCodeValueChange}
                            onChangeMode={this._onChangeMode}
                            onChangeName={this._onChangeName}
                            ref="container"
                            readOnly={editorReadOnly}
                />
                {!readOnly && <div className="overlay" onClick={this._onClick}/>}
                {this.state.editMode && this.renderEditMode()}
            </div>
        );
    }
}
