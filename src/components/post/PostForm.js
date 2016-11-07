import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {InputText, MDEditor, Textarea, SelectTag, EmojioneDisplay, CodeEditor} from '../form/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';

export default class PostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            code: ''
        };
    }

    render() {
        const {fields: {title, description, content}} = this.props;
        return (
            <Row>
                    <TeXEditorFull  toolbarPosition="left" {...content} onFocus={() => {}} onBlur={()=>{}} isBorder/>

            </Row>
        )
    }
}
/*
 <InputText title="Tiêu đề"/>
 <MDEditor title="Content" value={this.state.code} onChange={this.updateCode}/>
 <Textarea title="Mô tả" {...description} autoResize/>
 <EmojioneDisplay content="vui quas af :)) vui muon xiu lun a:smile:"/>
 */
PostForm.propTypes = {}

