/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {reduxForm, getValues} from 'redux-form';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {POST_STATE} from '../../../constants/postType';
import swal from 'sweetalert2';
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
    Switch
} from '../../../components/form/index';
import {Box, Flex, Title, Icon, CenterPaddingBox, TabsFilter, SpinnerOverlay} from '../../../components/layouts';
import {Spinner, Position} from '@blueprintjs/core';
import {getDeepObject} from '../../../utils';
import {
    swalConfirmDelete, swalConfirmTrash, swalRevert,
    getOptionsButtonFromState, getDataPost
} from '../utils';

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
            <SelectTag
                title="Tags"
                {...tags}
                value={getDeepObject(tags, [], 'value')}
                defaultTags={getDeepObject(tags, [], 'value')}
                createable
            />
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
                </Box>
            </CenterPaddingBox>
        )
    }
}