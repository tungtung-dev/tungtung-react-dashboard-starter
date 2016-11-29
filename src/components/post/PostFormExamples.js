/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {autobind} from 'core-decorators';
import {InputText, MDEditor, Textarea, SelectTag, EmojioneDisplay, CodeEditor, SelectImage, SelectMultipleMedia, DialogConfirm, PopoverConfirm} from '../form/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';

import {Position, Toaster, Button, Dialog, Intent} from '@blueprintjs/core';

const OurToaster = Toaster.create({
    className: 'my-toaster',
    position: Position.TOP
});;

export default class PostFormExamples extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            code: '',
            showMedia: false,
            isOpen: false
        };
    }


    @autobind
    toggleMedia(){
        this.setState({showMedia: !this.state.showMedia})
    }

    @autobind
    toggleDialog(){
        this.setState({isOpen: !this.state.isOpen});
    }

    @autobind
    toast(){
        const key = OurToaster.show({ message: "Toasted!", timeout: 5000, intent: 3});
    }

    render() {
        const {fields: {title, description, content, tags, md_editor, code_editor, textarea}} = this.props;
        return (
            <Row>
                <Col md={8}>
                    <DialogConfirm title="Xóa file" message="Bạn có muốn xóa không" onConfirm={this.handleRemove}>
                        <Button onClick={this.toggleDialog} text="Show dialog" />
                    </DialogConfirm>
                    <PopoverConfirm title="Xoas file" message="Xoa lun">
                        <button className="btn btn-red">Goood over</button>
                    </PopoverConfirm>
                    <Dialog
                        iconName="inbox"
                        isOpen={this.state.isOpen}
                        onClose={this.toggleDialog}
                        title="Dialog Header"
                    >
                        <div className="pt-dialog-body">
                            Some content
                        </div>
                        <div className="pt-dialog-footer">
                            <div className="pt-dialog-footer-actions">
                                <Button text="Secondary" />
                                <Button intent={Intent.PRIMARY} onClick={this.toggleDialog} text="Primary" />
                            </div>
                        </div>
                    </Dialog>
                    <button className="btn btn-red" onClick={this.toast}>Click</button>
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
                            <EmojioneDisplay content="Hello xin chào :books: mọi người :smile: đây là react dashboard toolkit :books: sắp ra mắt rồi :v"/>
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

