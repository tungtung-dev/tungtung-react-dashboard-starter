import React, {Component, PropTypes} from 'react';
import Avatar from '../Avatar/index';
import "./style.scss";
import {Link} from 'react-router';

export default class UserAvatar extends Component {
    getLastName() {
        const {displayName} = this.props;
        const splits = displayName.split(" ");
        return splits[splits.length - 1]
    }

    renderInformation() {
        const {displayName} = this.props;
        return (
            <div className="information">
                {displayName && <div className="name">{this.getLastName()}</div>}
                {this.props.children}
            </div>
        )
    }

    renderAvatar() {
        const {avatar_url,isEditAvatar} = this.props;
        return (
            <Avatar avatar_url={avatar_url} displayName={this.getLastName()} onClickAvatar={this.props.onClickAvatar}
                    isEditAvatar={isEditAvatar}/>
        )
    }

    render() {
        const {displayName, isEditAvatar, isLink} = this.props;
        return (
            <div style={this.props.style}>
                {!isLink && <div className={`user-avatar-component `+this.props.className}>
                    {this.renderAvatar()}
                    {this.renderInformation()}
                </div>}
                {isLink && !isEditAvatar &&
                <Link to={`user/${displayName}`} className={`user-avatar-component text-none `+this.props.className}>
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
    isLink: true,
    displayName: 'Tung'
}

UserAvatar.propTypes = {
    avatar_url: PropTypes.string,
    displayName: PropTypes.string,
    onClickAvatar: PropTypes.func,
    isEditAvatar: PropTypes.bool,
    isLink: PropTypes.bool,
}

