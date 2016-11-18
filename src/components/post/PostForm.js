/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {autobind} from 'core-decorators';
import {
    InputText,
    MDEditor,
    Button,
    Textarea,
    SelectTag,
    EmojioneDisplay,
    CodeEditor,
    SelectImage,
    SelectMultipleMedia,
    SelectImagePopover,
    DialogConfirm,
    PopoverConfirm
} from '../form/index';
import {
    UserAvatar
} from '../partials/index';
import TeXEditorFull from '../form/draftjs/TeXEditorFull';
import {Box, TitleFlex, CenterPaddingBox, Breadcrumb} from '../layouts/index';
import {
    Switch, Checkbox
} from '@blueprintjs/core';
import classnames from 'classnames';

export default class PostForm extends Component {
    render() {
        const {fields: {title, description, content, tags, md_editor, code_editor, textarea}} = this.props;
        return (
            <CenterPaddingBox>
                <Breadcrumb id="post-form" href="/create" icon="icon-plus" name="Create new post"/>
                {title.value && <Breadcrumb id="post-form-title" name={title.value}/>}
                <TitleFlex
                    title={
                        <h2>Create new post</h2>
                    }
                    actions={
                        <button className="btn btn-default fill">Save</button>
                    }
                />
                <Box>
                    <Row>
                        <Col md={9}>
                            <InputText title="Title" {...title}/>
                            <SelectTag title="Tags" {...tags}/>
                            <Textarea title="Description"/>
                            <div className="clearfix"></div>
                            <TeXEditorFull title="Content" {...content} isBorder toolbarPosition="left"/>
                        </Col>
                        <Col md={3}>
                            <SelectImage title="Featured image" {...description} media={description.value ? description.value : {}}/>
                            <SelectImagePopover title="Popover image" {...description} media={description.value ? description.value : {}}/>
                            <div className="clearfix"/>
                            <SelectMultipleMedia title="Ablums" {...title} medias={title.value ? title.value : []}/>
                            <Switch checked={textarea.value} label="Public" {...textarea}/>
                            <Checkbox checked={textarea.value} {...textarea}>
                                <span className="pt-icon-standard pt-icon-user" />
                                Gilad Gray
                            </Checkbox>
                        </Col>
                    </Row>
                </Box>
            </CenterPaddingBox>
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

