import React, {Component, PropTypes} from 'react';
import Avatar from '../Avatar/index';
import "./style.scss";
import {Link} from 'react-router';

export default class UserAvatar extends Component {
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
            <Avatar avatar_url={avatar_url} username={username} onClickAvatar={this.props.onClickAvatar}
                    isEditAvatar={isEditAvatar}/>
        )
    }

    render() {
        const {username, isEditAvatar, isLink} = this.props;
        return (
            <div style={this.props.style}>
                {!isLink && <div className={`user-avatar-component `+this.props.className}>
                    {this.renderAvatar()}
                    {this.renderInformation()}
                </div>}
                {isLink && !isEditAvatar && <Link to={`user/${username}`} className={`user-avatar-component text-none `+this.props.className}>
                    {this.renderAvatar()}
                    {this.renderInformation()}
                </Link>}
            </div>
        )
    }
}

UserAvatar.defaultProps = {
    onClickAvatar: () => {
        console.log('how');
    },
    label: "nickname",
    isLink: true
}

UserAvatar.propTypes = {
    avatar_url: PropTypes.string,
    label: PropTypes.string,
    username: PropTypes.string,
    nickname: PropTypes.string,
    onClickAvatar: PropTypes.func,
    isEditAvatar: PropTypes.bool,
    isLink: PropTypes.bool,
    hideLabel: PropTypes.bool
}

