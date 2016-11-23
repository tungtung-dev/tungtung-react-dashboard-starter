import React, {PureComponent} from 'react';
import Editor from './editor';
import ValidateWrapControl from '../validate-wrap-control/index';
import "codemirror/lib/codemirror.css";

export default class MarkdownEditorControl extends PureComponent {
    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <Editor {...this.props}/>
            </ValidateWrapControl>
        )
    }
}
