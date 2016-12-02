/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {reduxForm, getValues} from 'redux-form';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {POST_STATE} from 'constants/postType';
import {
    InputText, MDEditor, Button, ButtonGroupDropdown, Textarea,
    SelectTag, SelectImage, SelectImagePopover, Switch,
    MediumEditor
} from 'components/form';
import SelectCategory from 'containers/category-manager/select-category';
import {Box, Flex, Title, Icon, CenterPaddingBox, TabsFilter, SpinnerOverlay} from 'components/layouts';
import {getDeepObject} from 'utils';
import {Spinner, Position} from '@blueprintjs/core';

import {
    swalConfirmDelete, swalConfirmTrash, swalRevert,
    getOptionsButtonFromState, getDataPost
} from '../utils';

import {DRAFTJS_CONTENT_TYPE, MARKDOWN_CONTENT_TYPE} from '../constants';

const TABS_CONTENT_TYPE = [
    {text: 'Draftjs', value: DRAFTJS_CONTENT_TYPE},
    {text: 'Markdown', value: MARKDOWN_CONTENT_TYPE},
]

const fields = [
    'title', 'description', 'tags', 'content', 'featuredImage', 'secondaryFeaturedImage', 'isPublic',
    'customField.contentType', 'customField.markdownContent', 'categoryId'
]
const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Please fill title";
    if (!values.categoryId) errors.categoryId = "Please choose category";
    return errors;
}

const form = {
    form: 'postForm',
    fields,
    validate
}

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            ...ownProps.post,
            isPublic: getDeepObject(ownProps.post, {}, 'state') === POST_STATE.PUBLIC,
            tags: getDeepObject(ownProps.post, [], 'tags').map(tag => tag.name)
        },
        formValues: getValues(state.form.postForm)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({push}, dispatch);
}

@reduxForm(form, mapStateToProps, mapDispatchToProps)
export default class PostForm extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        isUpdating: PropTypes.bool,
        post: PropTypes.object,
        onSave: PropTypes.func,
        onTrash: PropTypes.func,
        onRevert: PropTypes.func,
        onDelete: PropTypes.func,
        editable: PropTypes.bool,
    }

    static defaultProps = {
        post: {}
    }

    state = {
        checked: false
    }

    getOptionsButton() {
        const {post:{slug, state}} = this.props;
        if (!slug) return [];
        return getOptionsButtonFromState(state, {
            onDelete: this.handleDelete,
            onRevert: this.handleRevert,
            onTrash: this.handleTrash
        });
    }

    @autobind
    handleSubmit(values, dispatch, props, customPost = {}) {
        const {formValues, post} = this.props;
        const dataPost = {
            ...getDataPost(formValues, post, this.props),
            ...customPost
        }
        return this.props.onSave(dataPost, dispatch);
    }

    @autobind
    handleTrash() {
        this.handleSubmit({}, this.props.dispatch, {}, {
            state: POST_STATE.TRASH
        });
        swalConfirmTrash(this.props.onDelete, () => {
            this.props.push('/posts');
        })
    }

    @autobind
    handleRevert() {
        this.handleSubmit({}, this.props.dispatch, {}, {
            state: POST_STATE.DRAFT
        });
        swalRevert();
    }

    @autobind
    handleDelete() {
        swalConfirmDelete(this.props.onDelete, () => {
            this.props.push('/posts');
        });
    }

    renderContentType() {
        const {fields: {customField: {contentType, markdownContent}, content}} = this.props;
        const markdownEditor = <MDEditor {...markdownContent}
            value={markdownContent.value ? markdownContent.value : markdownContent.initialValue}/>;
        // const draftJsEditor = <DraftjsEditor isBorder title="Content" {...content} value={content.value ? content.value : content.initialValue}/>;
        const draftJsEditor = <MediumEditor isBorder title="Content" {...content}
                                            defaultValue={content.value ? content.value : content.initialValue}/>;
        switch (contentType.value) {
            case MARKDOWN_CONTENT_TYPE:
                return markdownEditor;
            case DRAFTJS_CONTENT_TYPE:
                return draftJsEditor;
            default:
                return draftJsEditor;
        }
    }

    renderTabContent() {
        const {fields: {customField:{contentType}}} = this.props;
        return <div>
            <TabsFilter tabs={TABS_CONTENT_TYPE}
                        tabSelected={contentType.value ? contentType.value : DRAFTJS_CONTENT_TYPE}
                        onChange={contentType.onChange}/>
            {this.renderContentType()}
        </div>
    }

    renderMainContent() {
        const {fields: {title, description, tags, categoryId}} = this.props;
        return <div>
            <InputText title="Title" {...title}/>
            <SelectTag
                title="Tags"
                {...tags}
                value={getDeepObject(tags, [], 'value')}
                defaultTags={getDeepObject(tags, [], 'value')}
                createable
            />
            <SelectCategory title="Category" {...categoryId} showNoParent={false}/>
            <Textarea title="Description" {...description}/>
            {this.renderTabContent()}
        </div>
    }

    renderOptions() {
        const {fields: {featuredImage, secondaryFeaturedImage, isPublic}, editable, post} = this.props;
        return <div>
            <SelectImage title="Featured image" {...featuredImage} media={featuredImage.value}/>
            <SelectImagePopover title="Secondary featured image" {...secondaryFeaturedImage}
                                media={secondaryFeaturedImage.value}/>
            <div className="clearfix"/>
            {
                post.state !== POST_STATE.TRASH && isPublic.value !== POST_STATE.TRASH &&
                <Switch checked={isPublic.value} label="Public" {...isPublic}/>
            }
            {
                editable && post.state === POST_STATE.TRASH &&
                <Button className="btn-red fill" onClick={this.handleDelete}>
                    <Icon name="trash" bluePrintIcon/> Delete post
                </Button>
            }
        </div>
    }

    render() {
        const {isLoading, isUpdating, handleSubmit, editable, post: {slug}} = this.props;
        return (
            <CenterPaddingBox>
                <Flex alignItems="center" justifyContent="space-between" marginBottom={10}>
                    <Title element="h2" styleColor="black-white" fontWeight={400}>
                        {!editable && <span><Icon name="note"/> Create new post</span>}
                        {editable && <span><Icon name="note"/> Edit post</span>}
                    </Title>
                    <Flex alignItems="center">
                        {isUpdating && <Spinner className="pt-small"/>}
                        <span>&nbsp;</span>
                        {editable && <Link to={`/posts/${slug}`} className="btn btn-purple fill">Preview</Link>}
                        <span>&nbsp;</span>
                        <ButtonGroupDropdown
                            className="btn-default fill"
                            position={Position.BOTTOM_RIGHT}
                            options={this.getOptionsButton()}
                            dropdownIcon={{name: 'caret-down', bluePrintIcon: true}}
                            onClick={handleSubmit(this.handleSubmit)}
                        >
                            Save your post
                        </ButtonGroupDropdown>
                    </Flex>
                </Flex>
                <Box>
                    <CenterPaddingBox paddingLeft={10} paddingTop={0}>
                        {isLoading && <SpinnerOverlay/>}
                        {!isLoading &&
                        <Row>
                            <Col md={9}>
                                {this.renderMainContent()}
                            </Col>
                            <Col md={3}>
                                {this.renderOptions()}
                            </Col>
                        </Row>
                        }
                    </CenterPaddingBox>
                </Box>
            </CenterPaddingBox>
        )
    }
}