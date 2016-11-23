import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import CM from 'codemirror';
import Equal from 'deep-equal';
import "./style.scss";
import "codemirror/lib/codemirror.css";

import SelectModes from './select_modes';

export default class CodeEditor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isFocused: false,
            mode: 'javascript',
            cs: {},
        };
    }

    @autobind
    _handleChangeMode(mode) {
        if (mode.value) {
            this.setState({mode: mode.value});
            this.props.onChangeMode(mode.value);
            this.codeMirror.setOption("mode", mode.value);
        }
    }

    componentDidMount() {
        this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.codeMirrorNode), this.getOptions());
        this.codeMirror.on('change', this.codemirrorValueChanged);
        this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        this._currentCodemirrorValue = this.props.value;
    }

    @autobind
    getOptions() {
        return Object.assign({
            mode: 'javascript',
            lineNumbers: true,
            indentWithTabs: true,
            tabSize: '2',
            readOnly: this.props.readOnly
        }, this.props.options);
    }

    componentWillUnmount() {
        // todo: is there a lighter-weight way to remove the cm instance?
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
            this.codeMirror.setValue(nextProps.value);
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.readOnly !== this.props.readOnly){
            this.codeMirror.setOption('readOnly', this.props.readOnly);
        }
        if(prevProps.mode !== this.props.valueMode && this.props.valueMode !== this.state.mode){
            this.codeMirror.setOption('mode', this.props.valueMode);
        }
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(this.props, prevProps) || !Equal(this.state, prevState);
    }

    @autobind
    getCodeMirror() {
        return this.codeMirror;
    }

    @autobind
    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }

    @autobind
    focusChanged(focused) {
        this.setState({isFocused: focused});
    }

    @autobind
    codemirrorValueChanged(doc, change) {
        var newValue = doc.getValue();
        this._currentCodemirrorValue = newValue;
        if (this.props.onChange && !this.props.readOnly) this.props.onChange(newValue);
    }

    @autobind
    renderToolbar() {
        const valueMode = this.props.valueMode ? this.props.valueMode : this.state.mode;
        const {valueName, onChangeName, readOnly} = this.props;
        return (
            <div className="tt-code-editor-toolbar">
                {readOnly && <div>
                    <i className="fa fa-code"/> <i>{valueName} - {valueMode}</i>
                </div>}
                {!readOnly && <div className="flex align-center">
                        <input type="text" className="form-control" style={{width: 200}} placeholder="file name ..." value={valueName} onChange={onChangeName}/>
                        <div>&nbsp;&nbsp;</div>
                        <SelectModes style={{width: 200}} value={valueMode} onChange={this._handleChangeMode}/>
                </div>}
            </div>
        );
    }

    render() {
        var editorClassName = classNames('tt-code-editor', {'tt-code-editor-focused': this.state.isFocused});
        return (
            <div className="tt-code-editor-wrapper">
                {this.renderToolbar()}
                <div className={editorClassName}>
                    <textarea ref={(node) => {this.codeMirrorNode = node}} name={this.props.path} defaultValue={this.props.value} autoComplete="off"/>
                </div>
            </div>
        );
    }
}

CodeEditor.defaultProps = {
    onChange: () => {},
    onChangeMode: () => {}
}

CodeEditor.propTypes = {
    onChange: PropTypes.func,
    onChangeMode: PropTypes.func,
    onChangeName: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
    valueMode: PropTypes.string,
    valueName: PropTypes.string,
    readOnly: PropTypes.bool
}