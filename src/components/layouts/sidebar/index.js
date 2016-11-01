import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import MenuItem from './menu_item';
import MenuOption from './menu_option';
import './style.scss';

export default class Sidebar extends Component {
    render() {
        return (
            <div className={classnames('wrapper-sidebar',{'show-sidebar': this.props.showSidebar})}>
                <MenuOption currentPath={this.props.currentPath} name="Đề thi quản lý">
                    <MenuItem path='/' activePath={['/orders/edit/**','/']} icon="icon-notebook" text="Đề thi quản lý"/>
                    <MenuItem path="/users" icon="icon-user" text="Users"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Bài viết">
                    <MenuItem path='/post' activePath={['/post']} icon="icon-plus" text="Bài viết mới"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Media">
                    <MenuItem path='/media' activePath={['/media']} icon="icon-file-image" text="Photos"/>
                </MenuOption>
            </div>
        )
    }
}

Sidebar.defaultProps = {
    showSidebar: true
}

Sidebar.propTypes = {
    showSidebar: PropTypes.bool,
    currentPath: PropTypes.string
}