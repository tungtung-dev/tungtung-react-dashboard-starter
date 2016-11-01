/* eslint-disable */
import React, {PropTypes, Component} from 'react';
import {Map} from 'immutable';
import {autobind} from 'core-decorators';
import Draft from 'draft-js';
import classnames from 'classnames';
import {Modal} from 'react-bootstrap';
import strategiesCustom from './strategies/index';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';

import createPlugins, {EmojiSuggestions} from './plugins';

var {Entity, EditorState, ContentState, convertFromRaw, convertToRaw, RichUtils, AtomicBlockUtils, CompositeDecorator} = Draft;

export default class TeXEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.getEditorState(),
            liveTeXEdits: Map(),
        };

        this._focus = (e) => {
            this.refs.editor.focus();
            this.props.onFocus(e);
        }
        this._blur = (e)=> {
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }
        this._onChange = (editorState, change = true) => {
            this.setState({editorState});
            let contentState = editorState.getCurrentContent();
            if (contentState.getPlainText()) {
                if (change) this.props.onChange(convertToRaw(contentState));
            }
            else {
                if (change) this.props.onChange(null);
            }
        }

        this._handleKeyCommand = command => {
            var {editorState} = this.state;
            var newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this._onChange(newState);
                return true;
            }
            return false;
        };
        this.plugins = createPlugins(this.props.handleUpload, this.props.handleDefaultData, this.getEditMode())
    }

    getEditMode() {
        return true;
    }

    getEditorState() {
        let newRawContent = this.props.value;
        let newContentState = '';
        if (typeof newRawContent == 'object') {
            if (newRawContent) {
                if (!newRawContent.entityMap) newRawContent.entityMap = {};
                if (!newRawContent.blocks[0].inlineStyleRanges) newRawContent.blocks[0].inlineStyleRanges = []
                if (!newRawContent.blocks[0].entityRanges) newRawContent.blocks[0].entityRanges = []
                newContentState = convertFromRaw(newRawContent);
            }
        }
        else if (newRawContent) {
            newContentState = ContentState.createFromText(this.props.value);
        }
        if(!newContentState) return EditorState.createEmpty(this.getDecorator());
        return EditorState.createWithContent(newContentState, this.getDecorator());
    }

    //componentDidMount() {
    //    let newRawContent = this.props.value;
    //    if (typeof newRawContent == 'object') {
    //        if (newRawContent) {
    //            if (!newRawContent.entityMap) newRawContent.entityMap = {};
    //            if (!newRawContent.blocks[0].inlineStyleRanges) newRawContent.blocks[0].inlineStyleRanges = []
    //            if (!newRawContent.blocks[0].entityRanges) newRawContent.blocks[0].entityRanges = []
    //            let newContentState = convertFromRaw(newRawContent);
    //            this._onChange(EditorState.createWithContent(newContentState, this.getDecorator()), false);
    //        }
    //    }
    //    else if (newRawContent) {
    //        let newContentState = ContentState.createFromText(this.props.value);
    //        this._onChange(EditorState.createWithContent(newContentState, this.getDecorator()), false);
    //    }
    //}

    getDecorator() {
        return new CompositeDecorator(strategiesCustom.Edit);
    }

    render() {
        return (
            <div className="TexEditor-container">
                <div className="TeXEditor-root">
                    <div className="TeXEditor-editor" onClick={this._focus} onFocus={this._focus} onBlur={this._blur}>
                        <Editor
                            editorState={this.state.editorState}
                            plugins={this.plugins}
                            onChange={this._onChange}
                            onBlur={this._blur}
                            placeholder={this.props.placeholder}
                            readOnly={this.state.liveTeXEdits.count()}
                            ref="editor"
                            spellCheck={false}
                        />
                        <EmojiSuggestions/>
                    </div>
                </div>
            </div>
        );
    }
}

/* plugins={plugins}
 blockRendererFn={mediaBlockRenderer}*/