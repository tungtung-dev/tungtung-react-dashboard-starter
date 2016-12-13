import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import userAction from 'redux/actions/userAction';
import {connect} from 'utils/reduxAwait';
import {Table, Column, SearchFilterPagination} from 'components/manager';
import {CenterPaddingBox, Flex, Title} from 'components/layouts';
import {UserAvatar} from 'components/partials';
import {ManagerLists} from '../../libs';

const mapStateToProps = (state) => {
    const {data, pagination} = state.user.lists;
    return {
        data,
        pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...userAction, push}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserListsManager extends ManagerLists {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    getManagerConfig() {
        return {
            routePath : '/users',
            queryLevel: {
                page: ['keyword'],
                keyword: []
            },
            defaultQueryObject: {
                page: 1,
                itemPerPage: 10
            },
            actionGetData: 'getUsers'
        }
    }

    @autobind
    handleSearch(keyword){
        this.updateLocationPage('keyword', keyword);
    }


    renderColumnActions(){
        return <Column
            header={() => 'Hành động'}
            cell={(user, rowIndex) => <div>
            <a href={`#/user/${user.username}`} className="btn btn-purple" target="_blank">Xem trang cá nhân</a>{' '}
                <button onClick={(e) => this._handleDelete(e, user._id)} className="btn btn-red">Xóa</button>
            </div>}
        />
    }

    renderSearchFilterPagination(){
        return <SearchFilterPagination
            paginationProps={this.props.pagination}
            isSearch
            onSearch={this.handleSearch}
        />
    }

    render() {
        const {data, pagination, awaitStatuses} = this.props;
        return (
            <CenterPaddingBox>
                <Flex justifyContent="space-between" alignItems="center" marginBottom={10}>
                    <Flex alignItems="center">
                        <Title element="h2" styleColor="black-white">User manager</Title>
                    </Flex>
                    <button className="btn btn-default">Save</button>
                </Flex>
                {this.renderSearchFilterPagination()}
                <Table
                    data={data}
                    isLoading={awaitStatuses.getUsers === 'pending'}
                    showLoading
                >
                    <Column
                        header={() => '#'}
                        showIndex
                        pagination={pagination}
                    />
                    <Column
                        header={() => 'Thành viên'}
                        cell={(user, rowIndex) =>  <UserAvatar {...user}/>}
                    />
                    <Column
                        header={() => 'Email'}
                        cell={(user, rowIndex) => user.email}
                    />
                    {this.renderColumnActions()}
                </Table>
            </CenterPaddingBox>
        )
    }
}


UserListsManager.propTypes = {}
