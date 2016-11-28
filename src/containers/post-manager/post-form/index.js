/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {autobind} from 'core-decorators';
import {POST_STATE} from '../../../constants/postType';
import {
    InputText,
    MDEditor,
    Button,
    ButtonGroupDropdown,
    Textarea,
    SelectTag,
    SelectImage,
    SelectImagePopover,
    DraftjsEditor,
    Switch,
    Checkbox
} from '../../../components/form/index';
import {Box, Flex, Title, Icon, CenterPaddingBox, SpinnerOverlay, TabsFilter} from '../../../components/layouts/index';
import {Spinner, Position} from '@blueprintjs/core';

const DRAFTJS_CONTENT_TYPE = 'CONTENT-TYPE/draftjs';
const MARKDOWN_CONTENT_TYPE = 'CONTENT-TYPE/markdown';

const TABS_CONTENT_TYPE = [
    {text: 'Markdown', value: MARKDOWN_CONTENT_TYPE},
    {text: 'Draftjs', value: DRAFTJS_CONTENT_TYPE},
]

const fields = ['title', 'description', 'tags', 'contentType', 'content', 'featuredImage', 'secondaryFeaturedImage', 'isPublic']
const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Please fill title";
    return errors;
}

const form = {
    form: 'postForm',
    fields,
    validate
}

const mapStateToProps = () => {
    return {}
}

@reduxForm(form, mapStateToProps)
export default class PostForm extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        onSave: PropTypes.func,
        editable: PropTypes.bool,
        slug: PropTypes.string
    }

    static defaultProps = {
        initialValues: {}
    }

    state = {
        checked: false
    }

    renderContentType() {
        const {fields: {contentType, content}} = this.props;
        switch (contentType.value) {
            case MARKDOWN_CONTENT_TYPE:
                return <MDEditor {...content}/>;
            case DRAFTJS_CONTENT_TYPE:
                return <DraftjsEditor isBorder title="Content" {...content}/>;
            default:
                return <MDEditor {...content}/>;
        }
    }

    renderTabContent() {
        const {fields: {contentType}} = this.props;
        return <div>
            <TabsFilter tabs={TABS_CONTENT_TYPE}
                        tabSelected={contentType.value ? contentType.value : MARKDOWN_CONTENT_TYPE}
                        onChange={contentType.onChange}/>
            {this.renderContentType()}
        </div>
    }

    renderMainContent() {
        const {fields: {title, description, tags}} = this.props;
        return <div>
            <InputText title="Title" {...title}/>
            <SelectTag title="Tags" {...tags} value={Array.isArray(tags.value) ? tags.value : []} createable/>
            <Textarea title="Description" {...description}/>
            {this.renderTabContent()}
        </div>
    }

    @autobind
    handleCheckbox(e) {
        this.setState({checked: e.target.checked});
    }

    renderOptions() {
        const {fields: {featuredImage, secondaryFeaturedImage, isPublic}} = this.props;
        return <div>
            <SelectImage title="Featured image" {...featuredImage} media={featuredImage.value}/>
            <SelectImagePopover title="Secondary featured image" {...secondaryFeaturedImage}
                                media={secondaryFeaturedImage.value}/>
            <div className="clearfix"/>
            <Switch checked={isPublic.value} label="Public" {...isPublic}/>
            <Button className="btn-red fill"><Icon name="trash" bluePrintIcon/> Trash post</Button>
        </div>
    }

    @autobind
    handleSubmit(values, dispatch) {
        const {
            title, description, contentType, content,
            featuredImage, secondaryFeaturedImage, tags,
            isPublic
        } = values;
        const dataPost = {
            title, description, contentType, content,
            featuredImage, secondaryFeaturedImage, tags,
            state: isPublic ? POST_STATE.PUBLIC : POST_STATE.DRAFT
        }
        return this.props.onSave(dataPost, dispatch);
    }

    render() {
        const {isLoading, handleSubmit, editable, slug} = this.props;
        return (
            <CenterPaddingBox>
                <Flex alignItems="center" justifyContent="space-between" marginBottom={10}>
                    <Title element="h2" styleColor="black-white" fontWeight={400}>
                        {editable && <span><Icon name="note"/> Create new post</span>}
                        {!editable && <span><Icon name="note"/> Edit post</span>}
                    </Title>
                    <Flex alignItems="center">
                        {isLoading && <Spinner className="pt-small"/>}
                        <span>&nbsp;</span>
                        {editable && <Link to={`/posts/${slug}`} className="btn btn-purple fill">Preview</Link>}
                        <span>&nbsp;</span>
                        <ButtonGroupDropdown
                            className="btn-default fill"
                            position={Position.BOTTOM_RIGHT}
                            options={[{text: 'Save and finish'}]}
                            dropdownIcon={{name: 'caret-down', bluePrintIcon: true}}
                            onClick={handleSubmit(this.handleSubmit)}
                        >
                            Save your post
                        </ButtonGroupDropdown>
                    </Flex>
                </Flex>
                <Box>
                    <Row>
                        <Col md={9}>
                            {this.renderMainContent()}
                        </Col>
                        <Col md={3}>
                            {this.renderOptions()}
                        </Col>
                    </Row>
                </Box>
            </CenterPaddingBox>
        )
    }
}