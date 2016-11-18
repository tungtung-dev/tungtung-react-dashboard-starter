import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import MenuItem from './menu_item';
import MenuOption from './menu_option';
import './style.scss';

export default class Sidebar extends PureComponent {
    render() {
        return (
            <div className={classnames('wrapper-sidebar',{'show-sidebar': this.props.showSidebar})}>
                <MenuOption currentPath={this.props.currentPath} name="Manager">
                    <MenuItem path='/' activePath={['/orders/edit/**','/']} icon="icon-notebook" text="Quiz Manager"/>
                    <MenuItem path="/users" icon="icon-user" text="Users"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Posts">
                    <MenuItem path='/posts' activePath={['/posts']} icon="icon-book" text="Posts Manager"/>
                    <MenuItem path='/post' activePath={['/post']} icon="icon-plus" text="New post"/>
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