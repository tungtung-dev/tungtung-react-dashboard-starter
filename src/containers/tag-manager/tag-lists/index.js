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
        isUpdating: false,
        itemsChecked: [],
        currentItem: {}
    }

    constructor() {
        super(...arguments);
        this.queryManager = new QueryManager({
            page: []
        });
    }

    componentDidMount() {
        this.getTags();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.query !== this.props.location.query) {
            this.getTags();
        }
    }

    getTags(resetChecked) {
        const queryObject = this.queryManager.getQueryObject({
            page: 1,
            itemPerPage: 6
        });
        this.props.getTags(queryObject);
        this.props.getTagsDefault();
        if (resetChecked) this.resetChecked();
    }

    resetChecked() {
        this.handleChangeChecked([]);
    }

    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`/tags?${queriesString}`);
    }

    toggleUpdating(isUpdating) {
        this.setState({isUpdating: (isUpdating !== null && isUpdating !== undefined) ? isUpdating : !this.state.isUpdating});
    }

    @autobind
    toggleCreate() {
        this.setState({isCreate: true, isEdit: false, currentItem: {}});
    }

    @autobind
    toggleEdit(currentItem = {}) {
        this.setState({isEdit: true, isCreate: false, currentItem});
    }

    @autobind
    handleChangePage(page) {
        this.updateLocationPage('page', page)
    }

    @autobind
    async handleDelete(tagId, tagName) {
        swalConfirmDelete(async() => {
            this.toggleUpdating(true);
            await TagAction.deleteTag(tagId);
            this.toggleUpdating(false);
            this.getTags();
            Toaster.show({message: `Delete tag ${tagName} successfully`, intent: 1});
        })
    }

    @autobind
    async handleSubmitCreate(values, dispatch, resetForm) {
        this.toggleUpdating(true);
        const tagRes = await TagAction.createTag(values.name);
        this.toggleUpdating(false);
        if (tagRes.success !== false) {
            this.toggleCreate();
            this.getTags();
            Toaster.show({message: 'Created tag successfully', intent: 1});
            resetForm();
        }
    }

    @autobind
    async handleSubmitEdit(values) {
        this.toggleUpdating(true);
        const tagRes = await TagAction.updateTag(this.state.currentItem.id, values.name);
        this.toggleUpdating(false);
        if (tagRes.success !== false) {
            this.getTags();
            Toaster.show({message: 'Update tag successfully', intent: 1})
        }
    }

    @autobind
    handleChangeChecked(itemsChecked = []) {
        this.setState({itemsChecked});
    }

    @autobind
    async handleDeleteMultipleChecked() {
        const totalChecked = this.state.itemsChecked.length;
        swalConfirmDelete(async() => {
            if (totalChecked === 0) {
                Toaster.show({message: `Please select tag`, intent: 0});
                return;
            }
            this.toggleUpdating(true);
            await TagAction.deleteMultipleTag(this.state.itemsChecked);
            this.toggleUpdating(false);
            this.getTags(true);
            Toaster.show({message: 'Delete tag success', intent: 1});
        }, {
            title: `Are you sure delete ${totalChecked} ${totalChecked > 1 ? 'tags' : 'tag'} ?`
        })
    }

    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: '_id',
            checkedData: this.state.itemsChecked,
            onChange: this.handleChangeChecked
        };
        const totalChecked = this.state.itemsChecked.length;
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

    renderColumnAction() {
        const buttonGroupDropdownProps = (tag) => ({
            options: [
                {text: 'Delete', onClick: () => this.handleDelete(tag._id, tag.name)}
            ],
            onClick: () => this.toggleEdit(tag)
        });
        return <Column
            header={() => 'Actions'}
            cell={ (tag) =>
                <ButtonGroupDropdown className="btn-default"{...buttonGroupDropdownProps(tag)} >
                    Edit
                </ButtonGroupDropdown>
            }
        />
    }

    renderTable() {
        const {data, pagination, awaitStatuses} = this.props;
        const isTableLoading = awaitStatuses.getTags === 'pending' || this.state.isUpdating;
        return <div>
            <Pagination {...pagination} onChange={this.handleChangePage}/>
            <Table isLoading={isTableLoading} data={data}>
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
                    cell={(tag) => <Link to={`/posts?tags=${tag.name}`}>{tag.totalPost} {tag.totalPost > 1 ? 'posts' : 'post'}</Link>}
                />
                {this.renderColumnAction()}
            </Table>
        </div>
    }

    renderForm() {
        const {isEdit} = this.state;
        return <div className="margin-top-15">
            <Title marginBottom={10} element="h3"
                   styleColor="primary">{isEdit ? 'Edit tag' : 'Create tag'}</Title>
            <TagForm ref="tagForm" onSubmitTag={isEdit ? this.handleSubmitEdit : this.handleSubmitCreate}
                     initialValues={this.state.currentItem} editable={isEdit}/>
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
