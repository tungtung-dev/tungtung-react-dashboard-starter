import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import MenuItem from './menu_item';
import MenuOption from './menu_option';
import './style.scss';

export default class Sidebar extends PureComponent {
    render() {
        return (
            <div className={classnames('wrapper-sidebar',{'show-sidebar': this.props.showSidebar})}>
                <MenuOption currentPath={this.props.currentPath} name="Posts">
                    <MenuItem path='/posts' activePath={['/posts','/posts/edit/**']} icon="icon-notebook" text="Posts Manager"/>
                    <MenuItem path='/posts/create' activePath={['/posts/create']} icon="icon-plus" text="New post"/>
                    <MenuItem path='/tags' activePath={['/tags']} icon="icon-tag" text="Tags"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Manager">
                    <MenuItem path="/users" icon="icon-user" text="Users"/>
                    <MenuItem path='/media' activePath={['/media']} icon="icon-folder-alt" text="Medias"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Examples">
                    <MenuItem path="/examples/page-tabs" icon="icon-screen-tablet" text="Page tabs"/>
                </MenuOption>
                <MenuOption currentPath={this.props.currentPath} name="Options">
                    <MenuItem path="/setting" activePath={['/setting']} icon="icon-settings" text="Setting"/>
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