import React, {PureComponent, PropTypes} from 'react';
var katex = {};
if(!process.env.SERVER_RENDER) {
    katex = require('katex');
    require('katex/dist/katex.min.css')
};

export default class KatexInline extends PureComponent {
    renderKatex() {
        if(typeof window === 'undefined') {
            return ;
        }
        let html = '';
        try {
            html = katex.renderToString(this.props.tex, {displayMode: true});
            if (this.refs.test) {
                katex.render(this.props.tex, this.refs.test)
            }
        } catch (ex) {
            html = false;
        }
        return html;
    }

    render() {
        if(typeof window === 'undefined') return ;
        const renderKatex = this.renderKatex();
        return (
            <span>
                {renderKatex ? <span dangerouslySetInnerHTML={{__html: renderKatex}}></span> : <span className="text-red">Latex Lỗi</span>}
            </span>
        )
    }
}

KatexInline.propTypes = {
    tex: PropTypes.string.isRequired
}
