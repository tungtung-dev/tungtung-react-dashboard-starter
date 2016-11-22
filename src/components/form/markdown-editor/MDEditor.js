import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Row, Col} from 'reactstrap';
import ReactDOM from 'react-dom';
import marked from 'marked';
import classNames from 'classnames';
import CM from 'codemirror';
import {ChooseImagePopoverWrap} from '../../media-manager/index';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';

import { getCursorState, applyFormat} from './format.js';
import {insertImage} from './replace';

export default class MDEditor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isFocused: false,
            preview: false,
            cs: {},
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
            lineNumbers: true,
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
        this.setState({cs: getCursorState(this.codeMirror)});
    }

    @autobind
    codemirrorValueChanged(doc, change) {
        var newValue = doc.getValue();
        this._currentCodemirrorValue = newValue;
        if(this.props.onChange) this.props.onChange(newValue);
    }

    @autobind
    toggleFormat(formatKey, e) {
        e.preventDefault();
        applyFormat(this.codeMirror, formatKey);
    }

    @autobind
    renderIcon(icon) {
        return <span dangerouslySetInnerHTML={{__html: icon}} className="MDEditor_toolbarButton_icon"/>;
    }

    @autobind
    renderButton(formatKey, label, labelClassName, action) {
        if (!action) action = this.toggleFormat.bind(this, formatKey);

        var className = classNames('item MDEditor_toolbarButton', {
            'MDEditor_toolbarButton--pressed': this.state.cs[formatKey]
        }, ('MDEditor_toolbarButton--' + formatKey));

        return (
            <span className={className} onClick={action} title={formatKey}>
                <span className={labelClassName}>{label}</span>
            </span>
        );
    }

    @autobind
    renderHeaderNumber(number) {
        return <sub style={{fontSize: 12}}>{number}</sub>
    }

    @autobind
    togglePreview() {
        this.setState({preview: !this.state.preview});
    }

    @autobind
    addImage(media){
        insertImage(this.codeMirror, media.original_url);
    }

    @autobind
    renderToolbar() {
        return (
            <div className="tt-markdown-editor-toolbar">
                {this.renderButton('h1', this.renderHeaderNumber(1), 'fa fa-header')}
                {this.renderButton('h2', this.renderHeaderNumber(2), 'fa fa-header')}
                {this.renderButton('h3', this.renderHeaderNumber(3), 'fa fa-header')}
                {this.renderButton('bold', '', 'fa fa-bold')}
                {this.renderButton('italic', '', 'fa fa-italic')}
                {this.renderButton('oList', '', 'fa fa-list-ol')}
                {this.renderButton('uList', '', 'fa fa-list-ul')}
                {this.renderButton('quote', '', 'fa fa-quote-right')}
                {this.renderButton('quote', '', 'fa fa-eye', this.togglePreview)}
                <ChooseImagePopoverWrap onChoose={this.addImage}>
                    <button className="btn btn-red">
                        Image
                    </button>
                </ChooseImagePopoverWrap>

                {/*this.renderButton('link', 'a')*/}
            </div>
        );
    }

    render() {
        var editorClassName = classNames('MDEditor_editor', {'MDEditor_editor--focused': this.state.isFocused});
        return (
            <div className="MDEditor">
                {this.renderToolbar()}
                <Row>
                    <Col md={this.state.preview ? 6 : 12}>
                        <div className={editorClassName}>
                            <textarea ref="codemirror"  name={this.props.path} defaultValue={this.props.value} autoComplete="off"/>
                        </div>
                    </Col>
                    {this.state.preview && <Col md={6}>
                        <div className="MDEditor-preview" dangerouslySetInnerHTML={{__html: marked(this.props.value)}}/>
                    </Col>}
                </Row>
            </div>
        );
    }
}

MDEditor.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
}