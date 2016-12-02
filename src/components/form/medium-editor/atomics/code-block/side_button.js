import React from 'react';
import {Entity, AtomicBlockUtils} from 'draft-js';

export default class CodeSideButton extends React.Component {

    static propTypes = {
        setEditorState: React.PropTypes.func,
        getEditorState: React.PropTypes.func,
        close: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const exampleCode = `//your code hear...`;
        const data = {name: 'filename', mode: 'javascript', content: exampleCode}
        const entityKey = Entity.create('code_editor', 'IMMUTABLE', data);
        this.props.setEditorState(
            AtomicBlockUtils.insertAtomicBlock(
                this.props.getEditorState(),
                entityKey,
                ' '
            )
        );
    }


    render() {
        return (
            <button
                className="md-sb-button md-sb-img-button"
                type="button"
                title="Add an Embed"
                onClick={this.onClick}
            >
                <i className="fa fa-code"/>
            </button>
        );
    }

}