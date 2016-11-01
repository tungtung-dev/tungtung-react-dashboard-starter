import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {InputText, MDEditor, Textarea, SelectTag, EmojioneDisplay} from '../form/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';
import AWS from 'aws-sdk';

export default class PostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            code: ''
        };
        this.updateCode = (code) => {
            this.setState({code});
        }
        this.updateFile = (e) => {
            if (this.refs.file.files.length > 0) {
                // Goood job man
                //var  a =
            }
        }
    }

    render() {
        const {fields: {title, description, content}} = this.props;
        const options = [
            {value: '1', label: 'Chuyên mục abc'},
            {value: '2', label: 'Chuyên mục bdc'}
        ]
        return (
            <Row>
                <Col md={{size: 6}}>
                    <InputText title="Tiêu đề"/>
                    <MDEditor title="Content" value={this.state.code} onChange={this.updateCode}/>
                    <SelectTag title="Tags" options={options} {...title}/>
                    <Textarea title="Mô tả" {...description} autoResize/>
                    <TeXEditorFull title="Draftjs Content" {...content} isBorder/>
                    <EmojioneDisplay content="vui quas af :)) vui muon xiu lun a:smile:"/>
                </Col>
            </Row>
        )
    }
}

PostForm.propTypes = {}

