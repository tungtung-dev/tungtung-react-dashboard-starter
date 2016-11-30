import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import swal from 'sweetalert2';
import {autobind} from 'core-decorators';
import {connect} from 'utils/reduxAwait';
import QueryManager from 'utils/location_queries';
import {CenterPaddingBox, Title, Flex, Pagination, Toaster, Row, Col, Box} from 'components/layouts';
import {Table, Column} from 'components/manager';
import {Button, Link, ButtonGroupDropdown} from 'components/form';
import TagAction from 'redux/actions/tagAction';
import {getTags as getTagsDefault} from 'redux/actions/defaultLoadAction';

import TagModal from '../tag-modal';
import TagForm from '../tag-form';

@connect((state) => {
    const {data, pagination} = state.tag.lists;
    return {
        data,
        pagination
    }
}, dispatch => bindActionCreators({...TagAction, push, getTagsDefault}, dispatch))
export default class TagListsManager extends Component {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    state = {
        isCreate: false,
        isEdit: false,
        currentTag: {}
    }

    constructor() {
        super(...arguments);
        this.queryManager = new QueryManager({
            page: []
        });
    }

    getTags() {
        const queryObject = this.queryManager.getQueryObject({
            page: 1,
            itemPerPage: 6
        });
        this.props.getTags(queryObject);
        this.props.getTagsDefault();
    }

    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`/tags?${queriesString}`);
    }

    @autobind
    toggleCreate() {
        this.setState({isCreate: true, isEdit: false, currentTag: {}});
    }

    @autobind
    toggleEdit(currentTag = {}) {
        this.setState({isEdit: true, isCreate: false, currentTag});
    }

    @autobind
    handleChangePage(page) {
        this.updateLocationPage('page', page)
    }

    @autobind
    handleTrash(tagId, tagName) {
        const context = this;
        swal({
            title: 'Are you sure delete tag?',
            text: 'Your tag delete forever',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            TagAction.deleteTag(tagId).then(() => {
                context.getTags();
            })
            Toaster.show({message: `Deleted tag ${tagName}`, intent: 1});
        })
    }

    componentDidMount() {
        this.getTags();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.query !== this.props.location.query) {
            this.getTags();
        }
    }

    @autobind
    handleSubmitCreate(values, dispatch) {
        TagAction.createTag(values.name).then((tagRes) => {
            if (tagRes.success !== false) {
                this.toggleCreate();
                this.getTags();
                Toaster.show({message: 'Created tag success', intent: 1})
            }
        })
    }

    @autobind
    handleSubmitEdit(values, dispatch) {
        TagAction.updateTag(this.state.currentTag.id, values.name).then((tagRes) => {
            if (tagRes.success !== false) {
                this.getTags();
                Toaster.show({message: 'Update tag successed', intent: 1})
            }
        })
    }

    render() {
        const {data, pagination} = this.props;
        return <CenterPaddingBox>
            <Flex alignItems="center" justifyContent="space-between">
                <Title element="h2" styleColor="black-white">
                    Tag manager
                </Title>
                <Button className="btn-default" onClick={this.toggleCreate}>
                    Add new tag
                </Button>
            </Flex>
            <Box marginTop={10}>
                <Row>
                    <Flex alignItems="center">
                        <Col md={4}>
                            <Title marginBottom={10} element="h3" styleColor="primary">{this.state.isEdit ? 'Edit tag' : 'Create tag'}</Title>
                            <TagForm onSubmitTag={this.state.isEdit ? this.handleSubmitEdit : this.handleSubmitCreate} initialValues={this.state.currentTag} editable={this.state.isEdit}/>
                        </Col>
                        <Col md={8}>
                            <Pagination {...pagination} onChange={this.handleChangePage}/>
                            <Table data={data}>
                                <Column
                                    header={() => 'Name'}
                                    cell={(tag) => tag.name}
                                />
                                <Column
                                    header={() => 'Slug'}
                                    cell={(tag) => tag.slug}
                                />
                                <Column
                                    header={() => 'Posts'}
                                    cell={(tag) => <Link to={`/posts?tags=${tag.name}`}>Posts</Link>}
                                />
                                <Column
                                    header={() => 'Actions'}
                                    cell={(tag) =><div>
                                    <ButtonGroupDropdown
                                        className="btn-default"
                                        options={[{text: 'Delete', onClick: () => this.handleTrash(tag.id, tag.name)}]}
                                        onClick={() => this.toggleEdit(tag)}
                                        >
                                        Edit
                                    </ButtonGroupDropdown>
                                </div>
                            }
                                />
                            </Table>
                        </Col>
                    </Flex>
                </Row>
            </Box>
        </CenterPaddingBox>
    }
}
