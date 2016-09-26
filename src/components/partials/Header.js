import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar,Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {UserAvatar} from '../user/index';

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
                <DropdownToggle>
                    <UserAvatar className="size-25" {...auth} displayName={auth.displayName ? auth.displayName : 'Ano'} isLink={false}/>
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
            <Navbar color="faded" light>
                <div className="container">
                    <Link to="/" className="navbar-brand">Logo</Link>
                    {!isAuthChecking && <Nav className="pull-xs-right" navbar>
                        {!isAuthenticated && <NavItem>
                            <Link className="nav-link" to="auth/login">Login</Link>
                        </NavItem>}
                        {isAuthenticated && <UserItem auth={auth}/>}
                    </Nav>}
                </div>
            </Navbar>
        );
    }
}
Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    isAuthChecking: PropTypes.bool,
    auth: PropTypes.object
}