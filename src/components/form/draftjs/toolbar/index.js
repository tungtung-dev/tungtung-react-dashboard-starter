import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import Link from '../../link';
import dataTooltip from '../../../../constants/tooltipType';
import {ChooseImageModalWrap} from '../../../media-manager/index';
import {Icon} from '../../../layouts/index';

import "./style.scss";

export default class Toolbar extends Component {
    state = {
        fixed: false,
        style : {}
    }

    renderToolbarItem(onClick, icon, tooltip){
        return <div className="item">
            <Link to="#" tabIndex="-1" tooltip={tooltip} onClick={onClick}>
                <Icon name={icon} bluePrintIcon/>
            </Link>
        </div>
    }

    getEditorRect(){
        const editorRect = findDOMNode(this.props.editorDOM).getBoundingClientRect();
        if(editorRect.top < 0 && editorRect.bottom - 20 > 0){
            this.setState({
                fixed: true,
                style: {
                    left: editorRect.left,
                    width: editorRect.right - editorRect.left,
                    top: '45.5px'
                }
            });
        }
        else{
            this.setState({fixed: false, style: {}})
        }
    }

    componentDidMount(){
        this._windowScroll = window.addEventListener('scroll', (e) => {
            this.getEditorRect();
        })
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._windowScroll);
    }

    render() {
        const className = classnames(
            `tt-draftjs-editor-toolbar`,
            {[`tt-draftjs-editor-toolbar-fixed`]: this.state.fixed},
            {[this.props.position]: this.props.position ? this.props.position : ''},
        )
        return <div className={className} style={this.state.style}>
            {this.renderToolbarItem(this.props.onInsertCodeEditor, 'code', dataTooltip.draft_editor.insert_code_editor)}
            <ChooseImageModalWrap className="item" onChoose={this.props.onInsertImage}>
                <Link to="#" tabIndex="-1" tooltip={dataTooltip.draft_editor.insert_image}>
                    <Icon name="camera" bluePrintIcon/>
                </Link>
            </ChooseImageModalWrap>
            <Link tooltip={dataTooltip.draft_editor.preview} href="#" className={this.props.showRead ? 'active': ''} tabIndex="-1" onClick={this.props.onRead}>
                <Icon name="eye" bluePrintIcon/>
            </Link>
        </div>
    }
}
Toolbar.propTypes = {
    position: PropTypes.string,
    showRead: PropTypes.bool,
    onRead: PropTypes.func,
    onInsertImage: PropTypes.func,
    onInsertCodeEditor: PropTypes.func,
    editorDOM: PropTypes.object
}

