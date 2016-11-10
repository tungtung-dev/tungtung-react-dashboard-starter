import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ValidateWrapControl from '../validate_wrap_control/index';
import TeXEditor from './TeXEditor';
import TeXEditorShow from './TeXEditorShow';
import ReactTooltip from 'react-tooltip'
import "./style.scss"

export default class TeXEditorFull extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            haveRead: false,
            isFocus: false
        }
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
        this._insertImage = (e) => {
            e.preventDefault();
            this.refs.editor.insertImage();
        }
    };

    _onToggleRead(e) {
        e.preventDefault();
        this.setState({haveRead: !this.state.haveRead});
    }

    renderToolbarItem(onClick, icon, id, description){
        return <div className="item">
            <a href="#" data-tip data-for={`toolbar-item-${id}`} tabIndex="-1" onClick={onClick}>
                <i className={icon}></i>
            </a>
            <ReactTooltip place="left" id={`toolbar-item-${id}`} type='warning' effect='solid'>
                <span>{description}</span>
            </ReactTooltip>
        </div>
    }

    render() {
        const {isBorder} = this.props;
        const isShowRead = this.props.readOnly || this.state.haveRead;
        return (
            <ValidateWrapControl {...this.props}>
                <div className={classnames('TeXEditor-full',{'haveRead':isShowRead, 'border': isBorder})}>
                    {!this.props.readOnly && <div className="write">
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
                    {!this.props.readOnly &&
                        <div className={`toolbar ${this.props.toolbarPosition}`}>
                            {this.renderToolbarItem(this._insertCodeEditor, 'fa fa-code','code', 'Nhúng code editor')}
                            {this.renderToolbarItem(this._insertTeXEditor, 'icon-calculator','katex', 'Nhúng mã toán học')}
                            {this.renderToolbarItem(this._insertImage, 'icon-camera','camera', 'Nhúng ảnh')}
                            <a href="#" className={isShowRead ? 'active': ''} tabIndex="-1" onClick={this._onToggleRead}><i className="icon-eye"></i></a>
                        </div>
                    }
                </div>
            </ValidateWrapControl>
        )
    }
}
//

/*
 {this.state.isFocus &&
 <div className="suggest">
 <p><i className="icon-star"></i> Sử dụng phím <strong>Tab</strong> để di chuyển giữa các câu hỏi và câu trả lời</p>
 <p>Soạn thảo toán học, sử dụng thẻ <span className="text-blue">m:<span className="text-green">[latex]</span>:</span></p>
 <p><u>Ví dụ:</u></p>
 <table className="table">
 <tr>
 <td>m:x^2+10+3:</td>
 <td>
 <KatexInline tex="x^2+10+3"/>
 </td>
 </tr>
 </table>
 <p>m:x^2 + 10 + 3:</p>
 </div>
 }
 */

TeXEditorFull.defaultProps = {
    toolbarPosition: ''
}

TeXEditorFull.propTypes = {
    readOnly: PropTypes.bool,
    isBorder: PropTypes.bool,
    toolbarPosition: PropTypes.string
}
