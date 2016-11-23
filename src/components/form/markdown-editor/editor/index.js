import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Row, Col} from 'reactstrap';
import ReactDOM from 'react-dom';
import marked from 'marked';
import classNames from 'classnames';
import CM from 'codemirror';
import Toolbar from '../toolbar';

import "./style.scss";

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';

import { getCursorState } from '../format.js';

export default class MarkdownEditor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isFocused: false,
            preview: false,
            cursor: {},
        };
    }

    componentDidMount() {
        this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.refs.codemirror), this.getOptions());
        this.codeMirror.on('change', this.codemirrorValueChanged);
        this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        this.codeMirror.on('cursorActivity', this.updateCursorState);
        this._currentCodemirrorValue = this.props.value;
    }

    @autobind
    getOptions() {
        return Object.assign({
            mode: 'markdown',
            lineNumbers: false,
            indentWithTabs: true,
            tabSize: '2',
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
    updateCursorState() {
        this.setState({cursor: getCursorState(this.codeMirror)});
    }

    @autobind
    codemirrorValueChanged(doc, change) {
        var newValue = doc.getValue();
        this._currentCodemirrorValue = newValue;
        if(this.props.onChange) this.props.onChange(newValue);
    }

    @autobind
    togglePreview() {
        this.setState({preview: !this.state.preview});
    }

    render() {
        var editorClassName = classNames('tt-markdown-editor', {'focused': this.state.isFocused});
        return (
            <div className="tt-markdown-editor-wrapper">
                <Toolbar
                    cursor={this.state.cursor}
                    codeMirror={this.codeMirror}
                    editorDOM={this.refs.editor_wrap}
                />
                <div ref="editor_wrap">
                    <Row>
                    <Col md={this.state.preview ? 6 : 12}>
                        <div className={editorClassName}>
                            <textarea ref="codemirror" name={this.props.path} defaultValue={this.props.value} autoComplete="off"/>
                        </div>
                    </Col>
                    {this.state.preview && <Col md={6}>
                        <div className="tt-markdown-editor-preview" dangerouslySetInnerHTML={{__html: marked(this.props.value)}}/>
                    </Col>}
                    </Row>
                </div>
            </div>
        );
    }
}

MarkdownEditor.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
}