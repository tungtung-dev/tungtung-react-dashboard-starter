import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import Avatar from '../avatar/index';
import "./style.scss";

export default class UserAvatar extends PureComponent {
    renderInformation() {
        const {username, label} = this.props;
        return (
            <div className="information">
                {username && <div className="name">{username.slice(0, 16)}</div>}
                {!this.props.hideLabel && <div className="name-label">{this.props[label]}</div>}
                {this.props.children}
            </div>
        )
    }

    renderAvatar() {
        const {avatar_url, username, isEditAvatar} = this.props;
        return (
            <Avatar avatar_url={avatar_url} username={username} onClickAvatar={this.props.onClickAvatar} isEditAvatar={isEditAvatar}/>
        )
    }

    render() {
        const {username, isEditAvatar, isLink} = this.props;
        return (
            <div style={this.props.style}>
                {!isLink && <div className={`tt-user-avatar-component `+this.props.className}>
                    {this.renderAvatar()}
                    {this.renderInformation()}
                </div>}
                {isLink && !isEditAvatar && <Link to={`user/${username}`} className={`tt-user-avatar-component text-none `+this.props.className}>
                    {this.renderAvatar()}
                    {this.renderInformation()}
                </Link>}
            </div>
        )
    }
}

UserAvatar.defaultProps = {
    onClickAvatar: () => {},
    label: "nickname",
    isLink: true
}

UserAvatar.propTypes = {
    onClickAvatar: PropTypes.func,
    isEditAvatar: PropTypes.bool,
    isLink: PropTypes.bool,
    hideLabel: PropTypes.bool,
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    label: PropTypes.string
}

