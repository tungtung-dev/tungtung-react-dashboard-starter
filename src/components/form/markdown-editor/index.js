import React, {PureComponent} from 'react';
import Editor from './MDEditor';
import ValidateWrapControl from '../validate-wrap-control/index';
import "codemirror/lib/codemirror.css";
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
