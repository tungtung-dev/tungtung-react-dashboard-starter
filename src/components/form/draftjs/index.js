import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import {autobind} from 'core-decorators';
import Editor from './editor/index';
import EditorView from './editor-view';
import Toolbar from './toolbar/index';

import {draftjsPropType} from './proptypes';

import "./style.scss";

export default class EditorFull extends PureComponent {
    state = {
        haveRead: false,
        isFocus: false
    }

    constructor() {
        super(...arguments);
        this._handleFocus = (e) => {
            this.setState({isFocus: true});
            this.props.onFocus(e);
        }
        this._handleBlur = (e) => {
            this.setState({isFocus: false});
            if (this.props.onBlur)
                this.props.onBlur(e);
        }
    };

    @autobind
    _handleFocus (e){
        this.setState({isFocus: true});
        this.props.onFocus(e);
    }

    @autobind
    _insertCodeEditor(e){
        e.preventDefault();
        this.refs.editor.insertCodeEditor();
    }

    @autobind
    _insertImage(media) {
        this.refs.editor.insertImage(media.original_url)
    }

    @autobind
    _onToggleRead(e) {
        e.preventDefault();
        this.setState({haveRead: !this.state.haveRead});
    }

    renderToolbar(){
        if(this.props.readOnly) return null;
        const isShowRead = this.props.readOnly || this.state.haveRead;
        return <Toolbar
            onInsertCodeEditor={this._insertCodeEditor}
            onInsertImage={this._insertImage}
            onRead={this._onToggleRead}
            showRead={isShowRead}
            position={this.props.toolbarPosition}
            editorDOM={this.refs.editor_wrap}
        />
    }

    renderEditors(){
        const {isBorder, readOnly} = this.props;
        const isShowRead = this.props.readOnly || this.state.haveRead;
        return <div ref="editor_wrap" className={classnames({'border': isBorder}, 'clearfix','tt-draftjs-editor-wrapper')}>
            {!readOnly && <div className="write">
                <Editor ref="editor" {...this.props} onFocus={this._handleFocus} onBlur={this._handleBlur}/>
            </div>}
            {isShowRead && <div className="read">
                <EditorView {...this.props} onChange={() => {}} onFocus={()=>{}}/>
            </div>}
        </div>
    }

    render() {
        const {readOnly} = this.props;
        const isShowRead = this.props.readOnly || this.state.haveRead;
        const className = classnames('tt-draftjs-editor-full',{'have-read':isShowRead, 'read-only': readOnly});
        return (
            <div className={className}>
                {this.renderToolbar()}
                {this.renderEditors()}
            </div>
        )
    }
}

EditorFull.defaultProps = {
    toolbarPosition: ''
}

EditorFull.propTypes = {
    readOnly: PropTypes.bool,
    isBorder: PropTypes.bool,
    toolbarPosition: PropTypes.string,
    ...draftjsPropType
}
