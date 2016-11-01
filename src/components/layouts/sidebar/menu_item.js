import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

function checkPath(currentPath, path) {
    var hasStar = false;
    if (path.replace('/**', '') !== path) {
        hasStar = true;
        path = path.replace('/**', '');
    }

    var isActivePathSub = hasStar && currentPath.replace(path, '') !== currentPath;
    var isActivePath = currentPath === path;

    if (isActivePathSub || isActivePath) return true;
    else return false;
}

export default class MenuItem extends Component {
    getClassname() {
        const {path, currentPath} = this.props;
        var activePath = [...this.props.activePath, path];
        if (Array.isArray(activePath)) {
            var indexPath = activePath.findIndex((p) => checkPath(currentPath, p));
            if (indexPath > -1) {
                return 'active';
            }
        }
        return '';
    }

    render() {
        const {path, icon, text} = this.props;
        return (
            <li className={this.getClassname()}>
                <Link to={path}>{icon && <i className={icon}></i>} {text}</Link>
            </li>
        )
    }
}

MenuItem.defaultProps = {
    activePath: []
}

MenuItem.propTypes = {
    path: PropTypes.string,
    activePath: PropTypes.array,
    currentPaht: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string
}