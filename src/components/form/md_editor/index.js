import React, {PureComponent} from 'react';
import Editor from './MDEditor';
import ValidateWrapControl from '../validate_wrap_control/index';
import "codemirror/lib/codemirror.css";
import "react-md-editor/dist/react-md-editor.css";
import './style.scss';

export default class MDEditor extends PureComponent {
    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <Editor {...this.props}/>
            </ValidateWrapControl>
        )
    }
}
