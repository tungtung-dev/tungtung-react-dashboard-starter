// Taxonomy Name: Category, Taxonomy Lists: Categories
// NameAction CategoryAction, getLists: getCategories, create: $ACTION_CREATE, update: updateCategory ,delete: deleteCategory

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {connect} from 'utils/reduxAwait';
import QueryManager from 'utils/location_queries';
import {CenterPaddingBox, Title, Flex, Pagination, Toaster, Row, Col, Box, Icon} from 'components/layouts';
import {Table, Column} from 'components/manager';
import {Button, ButtonGroupDropdown, ButtonDropdown} from 'components/form';
import CategoryAction from 'redux/actions/categoryAction';
import {getCategories as getCategoriesDefault} from 'redux/actions/defaultLoadAction';
import {convertData} from 'common-helper';

import {Position} from '@blueprintjs/core';

import CategoryForm from '../category-form';
import {swalConfirmDelete, restructureCategories} from '../utils';

@connect((state) => {
    const {data, pagination} = state.category.lists;
    return {
        data: restructureCategories(data),
        pagination
    }
}, dispatch => bindActionCreators({...CategoryAction, getCategoriesDefault, push}, dispatch))
export default class CategoryListsManager extends Component {
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
        this.getCategories();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.query !== this.props.location.query) {
            this.getCategories();
        }
    }

    getCategories() {
        const queryObject = this.queryManager.getQueryObject({
            page: 1,
            itemPerPage: 10
        });
        this.props.getCategories(queryObject);
        this.props.getCategoriesDefault();
    }

    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`/categories?${queriesString}`);
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
    handleDelete(itemId, itemName) {
        swalConfirmDelete(async() => {
            this.toggleUpdating(true);
            await CategoryAction.deleteCategory(itemId);
            this.toggleUpdating(true);
            this.getCategories();
            Toaster.show({message: `Delete category ${itemName} successfully`, intent: 1});
        })
    }

    @autobind
    async handleSubmitCreate(values, dispatch, resetForm) {
        const dataCategory = convertData(values, {
            name: {$get: true},
            parentId: {$get: true, $default: 0}
        });
        this.toggleUpdating(true);
        const categoryRes = await CategoryAction.createCategory(dataCategory);
        this.toggleUpdating(false);
        if (categoryRes.success !== false) {
            this.toggleCreate();
            this.getCategories();
            Toaster.show({message: 'Create category successfully', intent: 1});
            resetForm();
        }
    }

    @autobind
    async handleSubmitEdit(values) {
        const dataCategory = convertData(values, {
            name: {$get: true},
            parentId: {$get: true, $default: 0}
        });
        this.toggleUpdating(true);
        const categoryRes = await CategoryAction.updateCategory(this.state.currentItem.id, dataCategory);
        this.toggleUpdating(false);
        if (categoryRes.success !== false) {
            this.getCategories();
            Toaster.show({message: 'Update category successfully', intent: 1});
        }
    }

    @autobind
    handleChangeChecked(itemsChecked = []) {
        this.setState({itemsChecked});
    }

    resetChecked() {
        this.handleChangeChecked([]);
    }

    @autobind
    async handleDeleteMultipleChecked() {
        const totalChecked = this.state.itemsChecked.length;
        if (totalChecked === 0) {
            Toaster.show({message: `Please select category`, intent: 0});
            return;
        }
        swalConfirmDelete(async () => {
            this.toggleUpdating(true);
            await CategoryAction.deleteMultipleCategory(this.state.itemsChecked);
            this.toggleUpdating(false);
            Toaster.show({message: `Delete ${totalChecked > 1 ? 'items' : 'item'} successfully`, intent: 1});
            this.resetChecked();
            this.getCategories();
        })
    }

    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: 'id',
            checkedData: this.state.itemsChecked,
            onChange: this.handleChangeChecked
        };
        const totalChecked = this.state.itemsChecked.length;
        const buttonActions = [
            {
                text: `Delete ${totalChecked} ${totalChecked > 1 ? 'items' : 'item'}`,
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

    renderColumnAction(){
        const buttonGroupDropdownProps = (item) => ({
            options: [
                {text: 'Delete', onClick: () => this.handleDelete(item._id, item.name)}
            ],
            onClick: () => this.toggleEdit(item)
        });
        return <Column
            header={() => 'Actions'}
            cell={ (item) =>
                <ButtonGroupDropdown className="btn-default"{...buttonGroupDropdownProps(item)} >
                    Edit
                </ButtonGroupDropdown>
            }
        />
    }

    renderTable() {
        const {data, pagination, awaitStatuses} = this.props;
        const isTableLoading = awaitStatuses.getCategories === 'pending' || this.state.isUpdating;
        return <div>
            <Pagination {...pagination} onChange={this.handleChangePage}/>
            <Table isLoadng={isTableLoading} data={data}>
                {this.renderColumnCheckbox()}
                <Column
                    header={() => 'Name'}
                    cell={(item) => item.nameWithLine}
                />
                <Column
                    header={() => 'Slug'}
                    cell={(item) => item.slug}
                />
                {this.renderColumnAction()}
            </Table>
        </div>
    }

    renderForm() {
        const {isEdit} = this.state;
        return <div>
            <Title marginTop={20} marginBottom={10} element="h3"
                   styleColor="primary">{isEdit ? 'Edit category' : 'Create category'}</Title>
            <CategoryForm
                onSubmitCategory={isEdit ? this.handleSubmitEdit : this.handleSubmitCreate}
                initialValues={this.state.currentItem}
                currentCategory={this.state.currentItem}
                editable={isEdit}
            />
        </div>
    }

    render() {
        return <CenterPaddingBox>
            <Flex alignItems="center" justifyContent="space-between">
                <Title element="h2" styleColor="black-white">
                    Category manager
                </Title>
                <Button className="btn-default" onClick={this.toggleCreate}>
                    Add new item
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
