import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {getUsers} from '../../redux/actions/UsersAction';
import {getDomainPublic, paginationQueryPage} from '../../utils/index';
import {connect} from '../../utils/reduxAwait';
import {deleteUser} from '../../api/AuthApi';
import {Table, Column, Pagination} from '../../components/manager/index';
import {CenterPaddingBox, Flex, Title, Breadcrumb} from '../../components/layouts';
import {UserAvatar} from '../../components/partials/index';

const mapStateToProps = (state) => {
    const {data, pagination} = state.users;
    return {
        users: data,
        pagination: pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUsers, push}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserManagerContainer extends Component {
    componentDidMount() {
        const {page} = this.props.location.query;
        this.props.getUsers(page);
    }

    componentDidUpdate(prevProps){
        paginationQueryPage(prevProps, this.props, (page) => {
             this.props.getUsers(page);
        });
    }

    @autobind
    _handleUpdatePage(page) {
        this.props.push(`/users?page=${page}`);
    }

    @autobind
    _handleDelete(e, user_id) {
        e.preventDefault();
        var s_confirm = confirm("Bạn có chắc chắn muốn xóa không");
        if (s_confirm) {
            deleteUser(user_id).then(() => {
                this.reloadUsers()
            });
        }
    }

    reloadUsers(){
        const {page, item_per_page} = this.props.pagination;
        this.props.getUsers(page, item_per_page);
    }

    render() {
        const {users, pagination, awaitStatuses} = this.props;

        return (
            <CenterPaddingBox>
                <Flex justifyContent="space-between" alignItems="center" marginBottom={10}>
                    <Title element="h2" styleColor="black-white">User manager</Title>
                    <button className="btn btn-default">Save</button>
                </Flex>
                <Breadcrumb id="user_manager" name="Quản lý thành viên" icon="icon-user"/>
                    <Table data={users} isLoading={awaitStatuses.getUsers === 'pending'}>
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
                            header={() => 'Họ và tên'}
                            cell={(user, rowIndex) => user.fullname}
                        />
                        <Column
                            header={() => 'Email'}
                            cell={(user, rowIndex) => user.email}
                        />
                        <Column
                            header={() => 'Hành động'}
                            cell={(user, rowIndex) => <div>
                            <a href={getDomainPublic(`#/user/${user.username}`)} className="btn btn-purple" target="_blank">Xem trang cá nhân</a>{' '}
                                <button onClick={(e) => this._handleDelete(e, user._id)} className="btn btn-red">Xóa</button>
                            </div>}
                        />
                    </Table>
                    <Pagination className="text-center margin-top-10" {...pagination} onChange={this._handleUpdatePage}/>
            </CenterPaddingBox>
        )
    }
}

UserManagerContainer.propTypes = {}
