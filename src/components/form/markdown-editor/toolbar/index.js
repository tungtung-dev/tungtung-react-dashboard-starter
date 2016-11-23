import React, {PureComponent, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import {autobind} from 'core-decorators';
import classnames from 'classnames';
import {Icon} from '../../../layouts';
import {ChooseImageModalWrap} from '../../../media-manager/index';
import {applyFormat} from '../format.js';
import {insertImage} from '../replace.js';
import "./style.scss";

const SpanFormat = ({onToggle, cursor, toggleFormat, formatKey, children}) => {
    let action = () => {
    };
    if (!onToggle) action = (e) => toggleFormat(formatKey, e);

    var className = classNames('item', {
        'pressed': cursor[formatKey]
    });
    return <span className={className} onClick={action} title={formatKey}>
        {children}
    </span>
}

export default class Toolbar extends PureComponent {
    state = {
        fixed: false,
        style: {},
        height: 30
    }

    @autobind
    toggleFormat(formatKey, e) {
        e.preventDefault();
        applyFormat(this.props.codeMirror, formatKey);
    }

    @autobind
    insertImage(media) {
        insertImage(this.props.codeMirror, media.originalUrl);
    }

    renderSpanFormat(formatKey, componentChildren, isIcon = true) {
        return <SpanFormat formatKey={formatKey} toggleFormat={this.toggleFormat} cursor={this.props.cursor}>
            {isIcon && <span className="item-icon">
                {componentChildren}
            </span>}
            {!isIcon && <span className="item-text">
                {componentChildren}
            </span>}
        </SpanFormat>
    }

    getEditorRect() {
        if (!this.props.editorDOM) return;
        const editorRect = findDOMNode(this.props.editorDOM).getBoundingClientRect();
        const toolbarRect = findDOMNode(this.refs.toolbar).getBoundingClientRect();
        const toolbarHeight = toolbarRect.bottom - toolbarRect.top;

        if (editorRect.top < 15 && editorRect.bottom - 100 > 0) {
            this.setState({
                fixed: true,
                style: {
                    left: editorRect.left,
                    width: editorRect.right - editorRect.left,
                    top: '45.5px'
                },
                height: toolbarHeight
            });
        }
        else {
            this.setState({fixed: false, style: {}})
        }
    }

    componentDidMount() {
        this._windowScroll = () => {
            this.getEditorRect();
        }
        window.addEventListener('scroll', this._windowScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._windowScroll);
    }


    render() {
        const className = classnames(
            `tt-markdown-editor-toolbar`,
            {[`tt-markdown-editor-toolbar-fixed`]: this.state.fixed},
        )
        return (
            <div>
                {this.state.fixed && <div style={{height: this.state.height}}/>}
                <div ref="toolbar" className={className} style={this.state.style}>
                    {this.renderSpanFormat('h1', 'H1', false)}
                    {this.renderSpanFormat('h2', 'H2', false)}
                    {this.renderSpanFormat('h3', 'H3', false)}
                    {this.renderSpanFormat('bold', <Icon name="bold" fontAwesome/>)}
                    {this.renderSpanFormat('itatlic', <Icon name="italic" fontAwesome/>)}
                    {this.renderSpanFormat('oList', <Icon name="list-ul" fontAwesome/>)}
                    {this.renderSpanFormat('uList', <Icon name="list-ol" fontAwesome/>, false)}
                    {this.renderSpanFormat('quote', <Icon name="quote-right" fontAwesome/>)}
                    <ChooseImageModalWrap onChoose={this.insertImage}>
                        <span className="item">
                            <span className="item-icon">
                                <Icon name="camera" bluePrintIcon/>
                            </span>
                        </span>
                    </ChooseImageModalWrap>
                </div>
            </div>
        );
    }
}

Toolbar.propTypes = {
    onToggleFormat: PropTypes.func,
    onAddImage: PropTypes.func,
    cursor: PropTypes.object,
    editorDOM: PropTypes.any,
    codeMirror: PropTypes.any,
}

