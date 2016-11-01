/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import Draft from 'draft-js';
import {Map} from 'immutable';
import React, {PropTypes} from 'react';

import TeXBlock from './TeXBlock';
import {content} from './data/content';
import {insertTeXBlock} from './modifiers/insertTeXBlock';
import {removeTeXBlock} from './modifiers/removeTeXBlock';
import KatexInline from '../KatexInline';
import MathInput from '../MathInput';
import {Modal} from 'react-bootstrap';
import {createEntityTypeStrategy} from './strategies';

var {Editor, EditorState, convertToRaw, convertFromRaw, Modifier, Entity, RichUtils, CompositeDecorator} = Draft;

class LatexInline extends React.Component {
    constructor(props) {
        super(props);
        const {src} = Entity.get(props.entityKey).getData();
        this.state = {
            src
        }
        this.onChange = (value) => this.setState({src: value})
    }

    componentDidMount(){
        this.props.onClick();
    }

    render() {
        const {editing, onBlur, onClick} = this.props;
        const {src} = this.state;
        if (editing) {
            return (
                <MathInput onChange={this.onChange} onBlur={onBlur} defaultValue={src}/>
            )
        }
        return (
            <span onClick={onClick}>
                <KatexInline tex={src}/>
                {this.props.children}
            </span>
        )
    }
}

LatexInline.propTypes = {
    editing: PropTypes.bool.isRequired,
    entityKey: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onClick: PropTypes.func
}

const HANDLE_LINK = /\math:(.*?):/g;

function handleLink(contentBlock, callback) {
    findWithRegex(HANDLE_LINK, contentBlock, callback);
}


function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const HandleLinkSpan = (props) => {
    let href = props.children[0].props.text;
    href = href.replace('math:', '');
    href = href.slice(0, href.length - 1);
    return <span>math:<MathInput defaultValue={href}/>:</span>
    //return <a href={href}>{props.children}</a>
}


export default class TeXEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.decorator = new CompositeDecorator([{
            strategy: createEntityTypeStrategy('INLINE_LATEX_EQUATION'),
            component: (props) => {
                const { entityKey } = props // eslint-disable-line react/prop-types
                const editing = this.state.liveTeXEdits.get(entityKey, false)

                const onClick = () => {
                    const { editorState, liveTeXEdits } = this.state

                    this.setState({
                        editorState: EditorState.forceSelection(editorState, editorState.getSelection()),
                        liveTeXEdits: liveTeXEdits.set(entityKey, true)
                    })
                }

                const onBlur = (src) => {
                    const { editorState, liveTeXEdits } = this.state

                    Entity.mergeData(entityKey, {
                        src
                    })

                    this.setState({
                        liveTeXEdits: liveTeXEdits.remove(entityKey),
                        editorState: EditorState.forceSelection(editorState, editorState.getSelection())
                    })
                }

                const newProps = {
                    ...props,
                    editing,
                    onBlur,
                    onClick
                }

                return <LatexInline {...newProps} />
            }
        },
            {
                strategy: handleLink,
                component: props => {
                    const { entityKey } = props // eslint-disable-line react/prop-types

                    const editing = !this.state.liveTeXEdits.get(entityKey, false)

                    const onClick = () => {
                        const { editorState, liveTeXEdits } = this.state

                        this.setState({
                            editorState: EditorState.forceSelection(editorState, editorState.getSelection()),
                            liveTeXEdits: liveTeXEdits.set(entityKey, true)
                        })
                    }

                    const onBlur = (src) => {
                        const { editorState, liveTeXEdits } = this.state

                        Entity.mergeData(entityKey, {
                            src
                        })

                        this.setState({
                            liveTeXEdits: liveTeXEdits.remove(entityKey),
                            editorState: EditorState.forceSelection(editorState, editorState.getSelection())
                        })
                    }

                    const newProps = {
                        ...props,
                        editing: true,
                        onBlur,
                        onClick
                    }

                    return <LatexInline {...newProps} />
                }
            },
        ]);

        this.state = {
            editorState: EditorState.createWithContent(content, this.decorator),
            liveTeXEdits: Map(),
        };

        this._blockRenderer = (block) => {
            if (block.getType() === 'atomic') {
                return {
                    component: TeXBlock,
                    editable: false,
                    props: {
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
                };
            }
            return null;
        };

        this._focus = () => this.refs.editor.focus();
        this._onChange = (editorState) => {
            this.setState({editorState});
            let contentState = editorState.getCurrentContent();

            if (contentState.getPlainText()) {
                this.props.onChange(convertToRaw(contentState));
            }
            else {
                this.props.onChange(null);
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

    addInlineLatexEquation() {
        const { editorState } = this.state

        const entityKey = Entity.create(
            'INLINE_LATEX_EQUATION',
            'IMMUTABLE',
            {src: 'x'}
        )

        const contentState = editorState.getCurrentContent()
        const selectionState = editorState.getSelection()

        const firstBlank = Modifier.insertText(
            contentState,
            selectionState,
            ' ',
            null,
            null
        )

        const withEntity = Modifier.insertText(
            firstBlank,
            selectionState,
            ' ',
            null,
            entityKey
        )

        const withBlank = Modifier.insertText(
            withEntity,
            selectionState,
            ' ',
            null,
            null
        )

        this.setState({
            liveTeXEdits: Map(),
            editorState: EditorState.push(editorState, withBlank, 'insert-text')
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state != this.props.state) {
            let newRawContent = {...this.props.state, entityMap: {}}
            let newContentState = convertFromRaw(newRawContent);
            this.onChange(EditorState.createWithContent(newContentState, this.decorator));
        }
    }

    /**
     * While editing TeX, set the Draft editor to read-only. This allows us to
     * have a textarea within the DOM.
     */
    render() {
        return (
            <div className="TexEditor-container">
                <button onClick={this.addInlineLatexEquation.bind(this)}>Insert Inline Equation</button>

                <div className="TeXEditor-root">
                    <div className="TeXEditor-editor" onClick={this._focus}>
                        <Editor
                            blockRendererFn={this._blockRenderer}
                            editorState={this.state.editorState}
                            handleKeyCommand={this._handleKeyCommand}
                            onChange={this._onChange}
                            placeholder="Start a document..."
                            readOnly={this.state.liveTeXEdits.count()}
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
                <button onClick={this._insertTeX} className="TeXEditor-insert">
                    {'Insert new TeX'}
                </button>
            </div>
        );
    }
}
