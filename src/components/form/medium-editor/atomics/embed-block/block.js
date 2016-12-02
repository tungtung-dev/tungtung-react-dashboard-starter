import React from 'react';
import {Entity} from 'draft-js';

export default class AtomicEmbedComponent extends React.Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            showIframe: false,
        };

        this.enablePreview = this.enablePreview.bind(this);
    }

    componentDidMount() {
        this.renderEmbedly();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
            this.renderEmbedly();
        }
    }

    getScript() {
        const script = document.createElement('script');
        script.async = 1;
        script.src = '//cdn.embedly.com/widgets/platform.js';
        script.onload = () => {
            window.embedly();
        };
        document.body.appendChild(script);
    }

    renderEmbedly() {
        if (window.embedly) {
            window.embedly();
        } else {
            this.getScript();
        }
    }

    enablePreview() {
        var entityKey = this.props.block.getEntityAt(0);

        Entity.mergeData(entityKey, {showIframe: !this.state.showIframe});

        this.setState({
            showIframe: !this.state.showIframe,
        });
    }

    render() {
        const { url } = this.props.data;
        const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
        return (
            <div className="md-block-atomic-embed">
                <button className="btn btn-default" onClick={this.enablePreview}>Default button</button>
                {this.state.showIframe && <div dangerouslySetInnerHTML={{ __html: innerHTML }} />}
            </div>
        );
    }
}
