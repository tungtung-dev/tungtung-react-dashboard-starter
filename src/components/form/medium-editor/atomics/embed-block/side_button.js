import React from 'react';
import {Entity, AtomicBlockUtils} from 'draft-js';

export default class EmbedSideButton extends React.Component {

    static propTypes = {
        setEditorState: React.PropTypes.func,
        getEditorState: React.PropTypes.func,
        close: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.addEmbedURL = this.addEmbedURL.bind(this);
    }

    onClick() {
        const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
        this.props.close();
        if (!url) {
            return;
        }
        this.addEmbedURL(url);
    }

    addEmbedURL(url) {
        const entityKey = Entity.create('embed', 'IMMUTABLE', {url});
        this.props.setEditorState(
            AtomicBlockUtils.insertAtomicBlock(
                this.props.getEditorState(),
                entityKey,
                'E'
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
                <i className="fa fa-code" />
            </button>
        );
    }

}