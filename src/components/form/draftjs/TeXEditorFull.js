import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ValidateWrapControl from '../validate_wrap_control/index';
import TeXEditor from './TeXEditor';
import TeXEditorShow from './TeXEditorShow';
import request from 'superagent';
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
    };

    _onToggleRead(e) {
        e.preventDefault();
        this.setState({haveRead: !this.state.haveRead});
    }

    upload = (data, success, failed, progress) => {
        data.formData.append('image', data.formData.get('files'));
        request.post('http://188.166.255.80:1206/upload-image')
            .accept('application/json')
            .send(data.formData)
            .on('progress', ({ percent }) => {
                progress(percent);
            })
            .end((err, res) => {
                if (err) {
                    return failed(err);
                }
                const {file} = res.body;
                success([
                    {
                        encoding: '7bit',
                        filename: file,
                        mimetype: 'image/jpeg',
                        originalname: file,
                        size: file,
                        url: `/${file}`
                    }
                ], 'image');
            });
    }

    defaultData = (blockType) => {
        if (blockType === 'block-image') {
            return {
                url: '/whoa.jpg',
            }
        }
        return {};
    }

    render() {
        const {isBorder} = this.props;
        return (
            <ValidateWrapControl {...this.props}>
                <div className={classnames('TeXEditor-full',{'haveRead':(this.state.haveRead || this.props.readOnly), 'border': isBorder})}>
                    {!this.props.readOnly && <div className="write">
                        <TeXEditor
                            {...this.props} onFocus={this._handleFocus} onBlur={this._handleBlur}
                                            handleUpload={this.upload} handleDefaultData={this.defaultData}
                        />
                    </div>
                    }

                    {!this.props.readOnly &&
                    <div className='readIcon'>
                        <a href="#" tabIndex="-1" onClick={this._onToggleRead}><i className="icon-note"></i></a>
                    </div>
                    }
                </div>
            </ValidateWrapControl>
        )
    }
}
//                    <TeXEditorShow {...this.props} onChange={() => {}} onFocus={()=>{}}/>

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

TeXEditorFull.propTypes = {
    readOnly: PropTypes.bool,
    isBorder: PropTypes.bool
}
