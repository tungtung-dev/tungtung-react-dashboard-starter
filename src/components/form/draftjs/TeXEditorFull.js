import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {autobind} from 'core-decorators';
import TeXEditor from './TeXEditor';
import TeXEditorShow from './TeXEditorShow';
import Link from '../link/index';
import {ChooseImageModalWrap} from '../../media_manager/index';
import dataTooltip from '../../../constants/tooltipType';

export default class TeXEditorFull extends Component {
    state = {
        haveRead: false,
        isFocus: false
    }

    constructor() {
        super(...arguments);
        this._onToggleRead = this._onToggleRead.bind(this);
        this._handleFocus = (e) => {
            this.setState({isFocus: true});
            this.props.onFocus(e);
        }
        this._handleBlur = (e) => {
            this.setState({isFocus: false});
            if (this.props.onBlur)
                this.props.onBlur(e);
        }
        this._insertCodeEditor = (e) => {
            e.preventDefault();
            this.refs.editor.insertCodeEditor();
        }
        this._insertTeXEditor = (e) => {
            e.preventDefault();
            this.refs.editor.insertTeXEditor();
        }
        this._handleChooseMedia = (media) => {
            this.refs.editor.insertImage(media.original_url)
        }
    };

    @autobind
    _onToggleRead(e) {
        e.preventDefault();
        this.setState({haveRead: !this.state.haveRead});
    }

    renderToolbarItem(onClick, icon, tooltip){
        return <div className="item">
            <Link to="#" tabIndex="-1" tooltip={tooltip} onClick={onClick}>
                <i className={icon}></i>
            </Link>
        </div>
    }

    renderToolbars(){
        const isShowRead = this.props.readOnly || this.state.haveRead;
        return <div className={`toolbar ${this.props.toolbarPosition}`}>
            {this.renderToolbarItem(this._insertCodeEditor, 'fa fa-code', dataTooltip.draft_editor.insert_code_editor)}
            {this.renderToolbarItem(this._insertTeXEditor, 'icon-calculator', dataTooltip.draft_editor.insert_katex)}
            <ChooseImageModalWrap className="item" onChoose={this._handleChooseMedia}>
                <Link to="#" tabIndex="-1" tooltip={dataTooltip.draft_editor.insert_image}>
                    <i className="icon-camera"/>
                </Link>
            </ChooseImageModalWrap>
            <Link tooltip={dataTooltip.draft_editor.preview} href="#" className={isShowRead ? 'active': ''} tabIndex="-1" onClick={this._onToggleRead}>
                <i className="icon-eye"></i>
            </Link>
        </div>
    }

    componentDidUpdate(prevProps){
        if(prevProps.preview_all !== this.props.preview_all){
            this.setState({haveRead: this.props.preview_all});
        }
    }

    render() {
        const {isBorder, readOnly} = this.props;
        const isShowRead = this.props.readOnly || this.state.haveRead;
        const classNameTexFull = classnames('TeXEditor-full',{'haveRead':isShowRead, 'border': isBorder, readOnly});
        return (
            <div className={classNameTexFull}>
                {!readOnly && <div className="write">
                    <TeXEditor
                        {...this.props}
                        onFocus={this._handleFocus} onBlur={this._handleBlur}
                        ref="editor"
                    />
                </div>
                }
                <div className="read">
                    <TeXEditorShow {...this.props} onChange={() => {}} onFocus={()=>{}}/>
                </div>
                {!readOnly && this.renderToolbars()}
            </div>
        )
    }
}

TeXEditorFull.defaultProps = {
    toolbarPosition: ''
}

TeXEditorFull.propTypes = {
    readOnly: PropTypes.bool,
    isBorder: PropTypes.bool,
    toolbarPosition: PropTypes.string
}
