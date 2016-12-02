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
}, dispatch => bindActionCreators({...CategoryAction, push}, dispatch))
export default class CategoryListsManager extends Component {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    state = {
        isCreate: false,
        isEdit: false,
        itemsChecked: [],
        currentItem: {}
    }

    constructor() {
        super(...arguments);
        this.queryManager = new QueryManager({
            page: []
        });
    }

    getCategories() {
        const queryObject = this.queryManager.getQueryObject({
            page: 1,
            itemPerPage: 10
        });
        this.props.getCategories(queryObject);
    }

    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`/categories?${queriesString}`);
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
        swalConfirmDelete(() => {
            CategoryAction.deleteCategory(itemId).then(() => {
                this.getCategories();
            })
            Toaster.show({message: `Delete tag ${itemName} successfully`, intent: 1});
        })
    }

    componentDidMount() {
        this.getCategories();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.query !== this.props.location.query) {
            this.getCategories();
        }
    }

    @autobind
    handleSubmitCreate(values, dispatch, resetForm) {
        const dataCategory = convertData(values, {
            name: {$get: true},
            parentId: {$get: true, $default: 0}
        });
        CategoryAction.createCategory(dataCategory).then((categoryRes) => {
            if (categoryRes.success !== false) {
                this.toggleCreate();
                this.getCategories();
                Toaster.show({message: 'Create category successfully', intent: 1});
                resetForm();
            }
        })
    }

    @autobind
    handleSubmitEdit(values) {
        const dataCategory = convertData(values, {
            name: {$get: true},
            parentId: {$get: true, $default: 0}
        });
        CategoryAction.updateCategory(this.state.currentItem.id, dataCategory).then((categoryRes) => {
            if (categoryRes.success !== false) {
                this.getCategories();
                Toaster.show({message: 'Update category successfully', intent: 1});
            }
        });
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
            Toaster.show({message: `Please select tag`, intent: 0});
            return;
        }
        // Parallel with async await
        const promises = this.state.itemsChecked.map(async itemId => {
            return CategoryAction.deleteTag(itemId);
        });
        for (const promise of promises) {
            await promise;
        }
        Toaster.show({message: `Delete ${totalChecked > 1 ? 'items' : 'item'} successfully`, intent: 1});
        this.resetChecked();
        this.getCategories();
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

    renderTable() {
        const {data, pagination} = this.props;
        return <div>
            <Pagination {...pagination} onChange={this.handleChangePage}/>
            <Table data={data}>
                {this.renderColumnCheckbox()}
                <Column
                    header={() => 'Name'}
                    cell={(item) => item.nameWithLine}
                />
                <Column
                    header={() => 'Slug'}
                    cell={(item) => item.slug}
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
        return <div>
            <Title marginBottom={10} element="h3"
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
                    <Flex alignItems="center">
                        <Col md={4}>{this.renderForm()}</Col>
                        <Col md={8}>{this.renderTable()}</Col>
                    </Flex>
                </Row>
            </Box>
        </CenterPaddingBox>
    }
}
