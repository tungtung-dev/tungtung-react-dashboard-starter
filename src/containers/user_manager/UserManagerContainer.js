import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import Dimensions from 'react-dimensions';
import {Table, Column, Cell} from 'fixed-data-table';
import {Pagination, Cells} from '../../components/table/index';
import {UserAvatar} from '../../components/other/index';
import {getUsers} from '../../redux/actions/UsersAction';
import {getDomainPublic} from '../../utils/index';
import {deleteUser} from '../../api/AuthApi';

class CellUserAvatar extends Component {
    render() {
        const {data, rowIndex} = this.props;
        return (
            <Cells.CellFlexAlignCenter>
                <UserAvatar {...data[rowIndex]}/>
            </Cells.CellFlexAlignCenter>
        )
    }
}

class CellActions extends Component {
    render() {
        const {rowIndex, data} = this.props;
        const user = data[rowIndex];
        return (
            <Cells.CellFlexAlignCenter>
                <a href={getDomainPublic(`#/user/${user.username}`)} className="btn btn-purple" target="_blank">Xem
                    trang cá nhân</a> &nbsp;
                <button onClick={(e) => this.props.onDelete(e, user._id)} className="btn btn-red">Xóa</button>
                &nbsp;
            </Cells.CellFlexAlignCenter>
        )
    }
}

const mapStateToProps = (state) => {
    const {data, pagination} = state.users;
    console.log(state.users);
    return {
        users: data,
        pagination: pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUsers}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class UserManagerContainer extends Component {
    componentDidMount() {
        this.props.getUsers(1, 10);
    }

    @autobind
    _handleUpdatePage(page) {
        const {item_per_page} = this.props.pagination;
        console.log(page);
        this.props.getUsers(page, item_per_page);
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
        const {users} = this.props;
        return (
            <div>
                <Pagination {...this.props.pagination} onChange={this._handleUpdatePage}/>
                <Table
                    rowsCount={users.length}
                    rowHeight={60}
                    headerHeight={30}
                    width={this.props.width}
                    height={this.props.height -100}
                >
                    <Column
                        header={<Cell>Thành viên</Cell>}
                        cell={<CellUserAvatar data={users}/>}
                        width={200}
                    />
                    <Column
                        header={<Cell>Họ và tên</Cell>}
                        cell={<Cells.CellText data={users} field="fullname"/>}
                        width={180}
                    />
                    <Column
                        header={<Cell>Email</Cell>}
                        cell={<Cells.CellText data={users} field="email"/>}
                        width={180}
                    />
                    <Column
                        header={<Cell>Actions</Cell>}
                        cell={<CellActions data={users} onDelete={this._handleDelete}/>}
                        width={200}
                    />
                </Table>
            </div>
        )
    }
}

UserManagerContainer.propTypes = {}

@Dimensions()
export default class OuterTableResponsive extends Component {
    resetTablePagination() {
        this.refs.table.resetTablePagination();
    }

    render() {
        return <UserManagerContainer ref="table" width={this.props.containerWidth}
                                     height={this.props.containerHeight} {...this.props}/>
    }
}
