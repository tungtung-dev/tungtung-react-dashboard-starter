import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {autobind} from 'core-decorators';
import {InputText, MDEditor, Textarea, SelectTag, EmojioneDisplay, CodeEditor, SelectImage, SelectMultipleMedia} from '../form/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';
import DraftjsExport from '../form/draftjs/DraftjsExport';
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
        const {fields: {title, description, content, tags, md_editor, code_editor, textarea}} = this.props;
        return (
            <Row>
                <Col md={8}>
                    <InputText title="Tiêu đề"/>
                    <div className="clearfix"></div>
                    <TeXEditorFull  toolbarPosition="left" {...content} onFocus={() => {}} onBlur={()=>{}} isBorder/>
                    <div className="clearfix margin-top-10"></div>
                    <SelectTag title="Tags" {...tags}/>
                    <hr/>
                    <MDEditor {...md_editor}/>
                    <CodeEditor {...code_editor}/>
                    <hr/>
                    <Row>
                        <Col md={6}>
                            <Textarea title="Textarea autoresize" autoResize {...textarea}/>
                        </Col>
                        <Col md={6}>
                            <EmojioneDisplay content="Hello xin chào mọi người :smile: đây là react dashboard toolkit :books: sắp ra mắt rồi :v"/>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <SelectImage title="Ảnh đại diện" {...description} media={description.value}/>
                    <div className="clearfix"/>
                    <SelectMultipleMedia title="Album ảnh" {...title} medias={title.value}/>
                </Col>
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

