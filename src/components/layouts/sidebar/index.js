import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import './style.scss';

function checkPath(currentPath, path) {
    let hasStar = false;
    if (path.replace('/**', '') !== path) {
        hasStar = true;
        path = path.replace('/**', '');
    }

    if (currentPath === path || ( hasStar && currentPath.replace(path, '') !== currentPath)) {
        return true;
    }
    else return false;
}

class MenuItem extends Component {
    render() {
        const {path, currentPath} = this.props;
        var activePath = [...this.props.activePath, path];
        let classNameActive = '';
        if (typeof activePath === 'object') {
            let active = activePath.find((p) => checkPath(currentPath, p));
            classNameActive = classnames({'active': active})
        }
        return (
            <li className={classNameActive}>
                <Link to={this.props.path}>{this.props.icon &&
                <i className={this.props.icon}></i>} {this.props.text}</Link>
            </li>
        )
    }
}

MenuItem.defaultProps = {
    activePath: []
}

MenuItem.propTypes = {
    activePath: PropTypes.array,
    path: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string
}

class MenuOption extends Component {
    render() {
        return (
            <ul className="menu-option">
                {this.props.children.map((children, index) => {
                    if(children.type === 'hr') return children;
                    return React.cloneElement(children, {
                        currentPath: this.props.currentPath,
                        key: index
                    });
                })}
            </ul>
        )
    }
}

export default class Sidebar extends Component {
    render() {
        return (
            <div className={classnames('wrapper-sidebar',{'show-sidebar': this.props.showSidebar})}>
                <MenuOption currentPath={this.props.currentPath}>
                    <MenuItem path='/' activePath={['/orders/edit/**','/']} icon="icon-notebook" text="Đề thi"/>
                    <MenuItem path="/users" icon="icon-user" text="Users"/>
                </MenuOption>

            </div>
        )
    }
}

Sidebar.defaultProps = {
    showSidebar: true
}

Sidebar.propTypes = {
    showSidebar: PropTypes.bool
}