import React, {PropTypes} from 'react';
import {reduxAwait} from 'utils';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {Table, Column} from 'components/manager';
import {Pagination, CenterPaddingBox, Title, Flex, Box, Toaster, Icon} from 'components/layouts';
import {ButtonGroupDropdown} from 'components/form';
import menuAction from 'redux/actions/menuAction';
import {ManagerLists} from '../../libs';

import {swalConfirmDelete} from '../utils';

@reduxAwait(state => ({
    data: state.menu.lists.data,
    pagination: state.menu.lists.pagination
}), dipsatch => bindActionCreators({...menuAction, push}, dipsatch))
export default class MenuLists extends ManagerLists {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.shape({
            page: PropTypes.Number,
            itemPerPage: PropTypes.Number
        })
    }

    getManagerConfig() {
        return {
            routePath: '/menus',
            queryLevel: {
                page: []
            },
            defaultQueryObject: {
                page: 1,
                itemPerPage: 10
            },
            actionGetData: 'getMenus'
        }
    }

    @autobind
    async handleDeleteMenu(menuId) {
        swalConfirmDelete(async () => {
            this.toggleUpdating(true);
            await menuAction.deleteMenu(menuId);
            Toaster.show({message: 'Delete menu successfuly', intent: 1});
            this.getData();
            this.toggleUpdating(false);
        })
    }

    renderColumnAction() {
        const getActions = (menu) => {
            return [
                {text: 'Delete', onClick: () => this.handleDeleteMenu(menu._id)}
            ]
        }
        return <Column header={() => 'Action'} cell={(menu) =>
            <ButtonGroupDropdown
                className="btn-default"
                onClick={(e) => this.props.push(`/menus/edit/${menu._id}`)}
                options={getActions(menu)}
                >
                Edit
            </ButtonGroupDropdown>
        }
        />
    }

    render() {
        return <CenterPaddingBox>
            <Flex alignItems="center" justifyContent="space-between" marginBottom={10}>
                <Title element="h2" styleColor="black-white" fontWeight={600}>
                    Menu manager
                </Title>
                <Link to="/menus/create" className="btn btn-default fill">
                    <Icon name="plus" simepleLineIcon/> Create menu
                </Link>
            </Flex>
            <Box sm>
                <Pagination {...this.props.pagination} onChange={this._handleChangePage}/>
                <Table data={this.props.data}>
                    <Column
                        header={() => '#'}
                        showIndex
                        pagination={this.props.pagination}
                    />
                    <Column
                        header={() => 'Name'}
                        cell={menu => menu.name}
                    />
                    <Column
                        header={() => 'Key'}
                        cell={menu => menu.key}
                    />
                    <Column
                        header={() => 'Description'}
                        cell={menu => menu.description}
                    />
                    {this.renderColumnAction()}
                </Table>
            </Box>
        </CenterPaddingBox>
    }
}
MenuLists.propTypes = {}

