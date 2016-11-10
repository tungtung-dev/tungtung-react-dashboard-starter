/* eslint-disable */
import React, {PropTypes, Component} from 'react';
import {Map} from 'immutable';
import {autobind} from 'core-decorators';
import Draft from 'draft-js';
import classnames from 'classnames';
import {Modal} from 'react-bootstrap';
import strategiesCustom from './strategies/index';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import Equal from 'deep-equal';

import createPlugins, {EmojiSuggestions} from './plugins';
import "./style.scss";

var {Entity, EditorState, ContentState, convertFromRaw, convertToRaw, RichUtils, AtomicBlockUtils, CompositeDecorator} = Draft;
import TeXBlock from './TeXBlock';
import {insertTeXBlock, removeTeXBlock} from './plugins/tex-block/modifiers';
import {insertCodeBlock, removeCodeBlock} from './plugins/code-editor-block/modifiers';


export default class TeXEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.getEditorState(),
            liveTeXEdits: Map(),
            liveCodeBlock: Map()
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
        this.plugins = createPlugins(this.props.handleUpload, this.props.handleDefaultData, {
            teX: {
                onStartEdit: (blockKey) => {
                    var {liveTeXEdits} = this.state;
                    this.setState({liveTeXEdits: liveTeXEdits.set(blockKey, true)});
                },
                onFinishEdit: (blockKey) => {
                    var {liveTeXEdits} = this.state;
                    this.setState({liveTeXEdits: liveTeXEdits.remove(blockKey)});
                },
                onRemove: (blockKey) => this._removeTeX(blockKey),
            },
            codeBlock: {
                onStartEdit: (blockKey) => {
                    var {liveCodeBlock} = this.state;
                    this.setState({liveCodeBlock: liveCodeBlock.set(blockKey, true)});
                },
                onFinishEdit: (blockKey) => {
                    var {liveCodeBlock} = this.state;
                    this.setState({liveCodeBlock: liveCodeBlock.remove(blockKey)});
                    this._onChange(this.state.editorState);
                },
                onRemove: (blockKey) => this._removeCodeBlock(blockKey),
            }
        }, this.getEditMode())

        this._removeCodeBlock = (blockKey) => {
            var {editorState, liveCodeBlock} = this.state;
            this.setState({
                liveCodeBlock: liveCodeBlock.remove(blockKey),
            });
            this._onChange(removeCodeBlock(editorState, blockKey));
        }

        this._insertCodeBlock = () => {
            this.setState({
                liveCodeBlock: Map(),
                editorState: insertCodeBlock(this.state.editorState)
            })
            this._onChange(insertCodeBlock(this.state.editorState));
        }

        this._removeTeX = (blockKey) => {
            var {editorState, liveTeXEdits} = this.state;
            this.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey),
                editorState: removeTeXBlock(editorState, blockKey),
            });
        };

        this._insertTeX = () => {
            this.setState({
                liveTeXEdits: Map(),
                editorState: insertTeXBlock(this.state.editorState),
            });
        };
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
        if (!newContentState) return EditorState.createEmpty(this.getDecorator());
        return EditorState.createWithContent(newContentState, this.getDecorator());
    }

    getDecorator() {
        return new CompositeDecorator(strategiesCustom.Edit);
    }

    getEditMode(){
        return true;
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(prevProps, this.props) || !Equal(prevState, this.state)
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
                            readOnly={this.state.liveTeXEdits.count() || this.state.liveCodeBlock.count()}
                            ref="editor"
                            spellCheck={false}
                        />
                        <button onClick={this._insertCodeBlock}>
                            {'Insert code block'}
                        </button>
                        <button onClick={this._insertTeX}>
                            {'Insert new TeX'}
                        </button>
                        <EmojiSuggestions/>
                    </div>
                </div>
            </div>
        );
    }
}

/*
 plugins={this.plugins}

 */

/* plugins={plugins}
 blockRendererFn={mediaBlockRenderer}*/