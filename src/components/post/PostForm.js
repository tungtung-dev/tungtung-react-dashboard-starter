import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {autobind} from 'core-decorators';
import {InputText, MDEditor, Textarea, SelectTag, EmojioneDisplay, CodeEditor, SelectImage, SelectMultipleMedia} from '../form/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';
import {MediaManagerModal} from '../../components/media_manager';


export default class PostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            code: '',
            showMedia: false
        };
    }


    @autobind
    toggleMedia(){
        this.setState({showMedia: !this.state.showMedia})
    }

    render() {
        const {fields: {title, description, content}} = this.props;
        return (
            <Row>
                <TeXEditorFull  toolbarPosition="left" {...content} onFocus={() => {}} onBlur={()=>{}} isBorder/>
                <SelectImage/>
                <SelectMultipleMedia {...title} medias={title.value}/>
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

