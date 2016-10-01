import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar,Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {UserAvatar} from '../../other/index';
import './style.scss';

class UserItem extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false
        }
        this.toggle = () => {
            this.setState({isOpen: !this.state.isOpen});
        }
    }

    render() {
        const {auth} = this.props;
        return <NavItem>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle className="dropdown-transparent">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <UserAvatar className="size-25" {...auth} displayName={auth.username ? auth.username : 'Ano'} isLink={false}/>
                        {' '}<i className="fa fa-caret-down"/>
                    </div>
                </DropdownToggle>
                <DropdownMenu right>
                    <Link className="dropdown-item" to="/auth/change-password">
                        Đổi mật khấu
                    </Link>
                    <DropdownItem divider/>
                    <Link className="dropdown-item" to="/auth/logout">
                        Đăng xuất
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </NavItem>
    }
}

UserItem.propTypes = {
    auth: PropTypes.object
}

export default class Header extends Component {
    render() {
        const {isAuthenticated, isAuthChecking, auth} = this.props;
        return (
            <Navbar className="header" color="faded" light>
                <Link to="/" className="navbar-brand"><i className="icon-menu"/> React dashboard</Link>
                {!isAuthChecking && <Nav className="pull-xs-right" navbar>
                    {!isAuthenticated && <NavItem>
                        <Link className="nav-link" to="auth/login">Login</Link>
                    </NavItem>}
                    {isAuthenticated && <UserItem auth={auth}/>}
                </Nav>}
            </Navbar>
        );
    }
}
Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    isAuthChecking: PropTypes.bool,
    auth: PropTypes.object
}