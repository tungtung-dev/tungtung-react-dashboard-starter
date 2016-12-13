// Taxonomy Name: Category, Taxonomy Lists: Categories
// NameAction CategoryAction, getLists: getCategories, create: $ACTION_CREATE, update: updateCategory ,delete: deleteCategory

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {connect} from 'utils/reduxAwait';
import {CenterPaddingBox, Title, Flex, Pagination, Toaster, Row, Col, Box, Icon} from 'components/layouts';
import {Table, Column} from 'components/manager';
import {Button, ButtonGroupDropdown, ButtonDropdown} from 'components/form';
import CategoryAction from 'redux/actions/categoryAction';
import {getCategories as getCategoriesDefault} from 'redux/actions/defaultLoadAction';
import {convertData} from 'common-helper';

import {Position} from '@blueprintjs/core';
import {ManagerLists} from '../../libs';

import CategoryForm from '../category-form';
import {swalConfirmDelete, restructureCategories} from '../utils';

@connect((state) => {
    const {data, pagination} = state.category.lists;
    return {
        data: restructureCategories(data),
        pagination
    }
}, dispatch => bindActionCreators({...CategoryAction, getCategoriesDefault, push}, dispatch))
export default class CategoryListsManager extends ManagerLists {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    getManagerConfig() {
        return {
            routePath: '/categories',
            queryLevel: {
                page: []
            },
            defaultQueryObject: {
                page: 1,
                itemPerPage: 10
            },
            actionGetData: 'getCategories'
        }
    }

    supperGetData() {
        this.props.getCategoriesDefault();
    }

    @autobind
    handleDelete(itemId, itemName) {
        swalConfirmDelete(async() => {
            this.toggleUpdating(true);
            await CategoryAction.deleteCategory(itemId);
            this.toggleUpdating(true);
            this.getData();
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
            this.getData();
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
            this.getData();
            Toaster.show({message: 'Update category successfully', intent: 1});
        }
    }

    @autobind
    async handleDeleteMultipleChecked() {
        const totalChecked = this.state.itemsChecked.length;
        if (totalChecked === 0) {
            Toaster.show({message: `Please select category`, intent: 0});
            return;
        }
        swalConfirmDelete(async() => {
            this.toggleUpdating(true);
            await CategoryAction.deleteMultipleCategory(this.state.itemsChecked);
            this.toggleUpdating(false);
            Toaster.show({message: `Delete ${totalChecked > 1 ? 'items' : 'item'} successfully`, intent: 1});
            this.getData(true);
        })
    }

    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: 'id',
            checkedData: this.state.itemsChecked,
            onChange: this._handleItemsChecked
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

    renderColumnAction() {
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
            <Pagination {...pagination} onChange={this._handleChangePage}/>
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
