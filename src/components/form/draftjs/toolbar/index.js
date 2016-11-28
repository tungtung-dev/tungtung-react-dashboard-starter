import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import {Icon} from '../../../layouts/index';
import {InsertImage, InsertCode, ItemWrapper} from './items';
import BlockTypes from './block-types';

import "./style.scss";

export default class Toolbar extends Component {
    state = {
        fixed: false,
        style : {},
        height: 30
    }

    getEditorRect(){
        const editorRect = findDOMNode(this.props.editorDOM).getBoundingClientRect();
        const toolbarRect = findDOMNode(this.refs.toolbar).getBoundingClientRect();
        const toolbarHeight = toolbarRect.bottom - toolbarRect.top;

        if(editorRect.top < 0 && editorRect.bottom - 100 > 0){
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
        else{
            this.setState({fixed: false, style: {}})
        }
    }

    componentDidMount(){
        this._windowScroll = () => {
            this.getEditorRect();
        }
        window.addEventListener('scroll', this._windowScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._windowScroll);
    }

    render() {
        const className = classnames(
            `tt-draftjs-editor-toolbar`,
            {[`tt-draftjs-editor-toolbar-fixed`]: this.state.fixed},
        )
        return <div>
            {this.state.fixed && <div style={{height: this.state.height}}/>}
            <div ref="toolbar" className={className} style={this.state.style}>
                <BlockTypes onToggle={this.props.onToggleBlockType} currentBlockType={this.props.blockTypeSelection}/>
                <InsertImage onChooseImage={this.props.onInsertImage} popover/>
                <InsertCode onInsert={this.props.onInsertCodeEditor}/>
                <ItemWrapper onClick={this.props.onRead}>
                    <span className={classnames('item-icon',this.props.showRead ? 'pressed': '')}>
                        <Icon name="eye-open" bluePrintIcon/>
                    </span>
                </ItemWrapper>
            </div>
        </div>
    }
}
Toolbar.propTypes = {
    blockTypeSelection: PropTypes.string,
    showRead: PropTypes.bool,
    onRead: PropTypes.func,
    onInsertImage: PropTypes.func,
    onInsertCodeEditor: PropTypes.func,
    onToggleBlockType: PropTypes.func,
    onToggleInlineStyle: PropTypes.func,
    editorDOM: PropTypes.object
}

