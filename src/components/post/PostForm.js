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
    PopoverConfirm,
    DraftjsEditor,
    Switch,
    Checkbox
} from '../form/index';
import {Box, TitleFlex, CenterPaddingBox, Breadcrumb} from '../layouts/index';

export default class PostForm extends Component {
    render() {
        const {fields: {title, description, tags, content_type, content, featured_image, secondary_featured_image, is_public}} = this.props;
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
                            <Textarea title="Description" {...description}/>
                            <DraftjsEditor title="Content" {...content} isBorder toolbarPosition="left"/>
                        </Col>
                        <Col md={3}>
                            <SelectImage title="Featured image" {...featured_image} media={featured_image.value}/>
                            <SelectImagePopover title="Secondary featured image" {...secondary_featured_image} media={secondary_featured_image.value}/>
                            <div className="clearfix"/>
                            <Switch checked={is_public.value} label="Public" {...is_public}/>
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

