import React, {Component, PropTypes} from 'react';
import {reduxAwait} from 'utils';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {Table, Column} from 'components/manager';
import {Pagination, CenterPaddingBox, Box} from 'components/layouts';
import {ButtonGroupDropdown} from 'components/form';
import {getMenus} from 'redux/actions/menuAction';
import {ManagerLists} from '../../libs';


@reduxAwait(state => ({
    data: state.menu.lists.data,
    pagination: state.menu.lists.pagination
}), dipsatch => bindActionCreators({getMenus, push}, dipsatch))
export default class MenuLists extends ManagerLists {
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

    renderColumnAction(){
        const getActions = () => {
            return []
        }
        return <Column header={() => 'Action'} cell={(menu) =>
            <ButtonGroupDropdown
                className="btn-default"
                onClick={(e) => this.props.push(`/menus/edit/${menu._id}`)}
                >
                Edit
            </ButtonGroupDropdown>
        }
        />
    }

    render() {
        console.log(this.props);
        return <CenterPaddingBox>
            <Box>
                <Pagination {...this.props.pagination} onChange={this._handleChangePage}/>
                <Table data={this.props.data}>
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

