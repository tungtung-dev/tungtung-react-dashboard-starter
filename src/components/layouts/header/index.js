import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar,Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {UserAvatar} from '../../partials/index';
import BreadcrumbBar from '../breadcrumb_bar';
import Breadcrumb from '../breadcrumb';
import './style.scss';

class UserItem extends PureComponent {
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

export default class Header extends PureComponent {
    render() {
        const {isAuthenticated, isAuthChecking, auth} = this.props;
        return (
            <Navbar className="header tt-header" color="faded" light>
                <Link to="/" className="navbar-brand">
                    <img src="http://tungtung.vn/images/logo.png" alt="" style={{height: 20}}/>
                </Link>
                <div className="pull-xs-left tt-breadcrumb-bar-wrap">
                    <BreadcrumbBar/>
                    <Breadcrumb icon="icon-screen-desktop" href="/" name="Dashboard"/>
                </div>
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