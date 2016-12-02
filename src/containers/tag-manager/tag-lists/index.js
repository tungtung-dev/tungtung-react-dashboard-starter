import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {connect} from 'utils/reduxAwait';
import QueryManager from 'utils/location_queries';
import {CenterPaddingBox, Title, Flex, Pagination, Toaster, Row, Col, Box, Icon} from 'components/layouts';
import {Table, Column} from 'components/manager';
import {Button, Link, ButtonGroupDropdown, ButtonDropdown} from 'components/form';
import TagAction from 'redux/actions/tagAction';
import {getTags as getTagsDefault} from 'redux/actions/defaultLoadAction';

import {Position} from '@blueprintjs/core';

import TagForm from '../tag-form';
import {swalConfirmDelete} from '../utils';

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
        tagsChecked: [],
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
    handleDelete(tagId, tagName) {
        swalConfirmDelete(() => {
            TagAction.deleteTag(tagId).then(() => {
                this.getTags();
            })
            Toaster.show({message: `Delete tag ${tagName} successfully`, intent: 1});
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
    handleSubmitCreate(values, dispatch, resetForm) {
        TagAction.createTag(values.name).then((tagRes) => {
            if (tagRes.success !== false) {
                this.toggleCreate();
                this.getTags();
                Toaster.show({message: 'Created tag successfully', intent: 1});
                resetForm();
            }
        })
    }

    @autobind
    handleSubmitEdit(values) {
        TagAction.updateTag(this.state.currentTag.id, values.name).then((tagRes) => {
            if (tagRes.success !== false) {
                this.getTags();
                Toaster.show({message: 'Update tag successfully', intent: 1})
            }
        })
    }

    @autobind
    handleChangeChecked(tagsChecked = []) {
        this.setState({tagsChecked});
    }

    resetChecked() {
        this.handleChangeChecked([]);
    }

    @autobind
    async handleDeleteMultipleChecked() {
        const totalChecked = this.state.tagsChecked.length;
        swalConfirmDelete(async() => {
            if (totalChecked === 0) {
                Toaster.show({message: `Please select tag`, intent: 0});
                return;
            }
            // Parallel with async await
            const promises = this.state.tagsChecked.map(async tagId => {
                return TagAction.deleteTag(tagId);
            });
            for (const promise of promises) {
                await promise;
            }
            Toaster.show({message: `Delete ${totalChecked > 1 ? 'tags' : 'tag'} successfully`, intent: 1});
            this.resetChecked();
            this.getTags();
        }, {
            title: `Are you sure delete ${totalChecked} ${totalChecked > 1 ? 'tags' : 'tag'} ?`
        })
    }

    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: 'id',
            checkedData: this.state.tagsChecked,
            onChange: this.handleChangeChecked
        };
        const totalChecked = this.state.tagsChecked.length;
        const buttonActions = [
            {
                text: `Delete ${totalChecked} ${totalChecked > 1 ? 'tags' : 'tag'}`,
                onClick: this.handleDeleteMultipleChecked
            }
        ]
        const buttonDropDown = <ButtonDropdown
            className="btn-black btn-super-sm"
            options={buttonActions}
            position={Position.BOTTOM_LEFT}
        >
            <Icon name="caret-down" bluePrintIcon/>
        </ButtonDropdown>;

        return <Column header={() => buttonDropDown} checkboxProps={checkboxProps} showCheckbox/>
    }

    renderTable() {
        const {data, pagination} = this.props;
        return <div>
            <Pagination {...pagination} onChange={this.handleChangePage}/>
            <Table data={data}>
                {this.renderColumnCheckbox()}
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
                                        options={[{text: 'Delete', onClick: () => this.handleDelete(tag.id, tag.name)}]}
                                        onClick={() => this.toggleEdit(tag)}
                                        >
                                        Edit
                                    </ButtonGroupDropdown>
                                </div>
                            }
                />
            </Table>
        </div>
    }

    renderForm() {
        const {isEdit} = this.state;
        return <div className="margin-top-15">
            <Title marginBottom={10} element="h3"
                   styleColor="primary">{isEdit ? 'Edit tag' : 'Create tag'}</Title>
            <TagForm ref="tagForm" onSubmitTag={isEdit ? this.handleSubmitEdit : this.handleSubmitCreate}
                     initialValues={this.state.currentTag} editable={isEdit}/>
        </div>
    }

    render() {
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
                    <Col md={4}>{this.renderForm()}</Col>
                    <Col md={8}>{this.renderTable()}</Col>
                </Row>
            </Box>
        </CenterPaddingBox>
    }
}
