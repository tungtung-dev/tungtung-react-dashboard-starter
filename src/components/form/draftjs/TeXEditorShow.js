/* eslint-disable */

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

import Draft from 'draft-js';
import React, {PropTypes} from 'react';
import TeXEditor from './TeXEditor';
import Editor from 'draft-js-plugins-editor';

var {EditorState, ContentState,convertFromRaw} = Draft;

export default class TeXEditorShow extends TeXEditor {
    getEditMode(){
        return false;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value) {
            let newContentState = '';
            if (this.props.value && typeof this.props.value == 'object') {
                newContentState = convertFromRaw(this.props.value);
                this._onChange(EditorState.createWithContent(newContentState, this.getDecorator()), false);
            }
            else if (this.props.value) {
                newContentState = ContentState.createFromText(this.props.value);
                this._onChange(EditorState.createWithContent(newContentState, this.getDecorator()), false);
            }
        }
    }

    render() {
        return (
            <div className="TexEditor-container">
                <div className="TeXEditor-root">
                    <div className="TeXEditor-editor" onClick={this._focus}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this._onChange}
                            onBlur={this._onBlur}
                            plugins={this.plugins}
                            placeholder={this.props.placeholder}
                            readOnly={true}
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}