import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import "./style.scss";
import {getColorFromText} from '../../../utils/index';

export default class Avatar extends Component {
    getColor() {
        return getColorFromText(this.props.username);
    }

    renderImage() {
        var {avatar_url, username, isEditAvatar} = this.props;
        var firstCharacter = ' ';
        if (username) {
             firstCharacter = username[0].toUpperCase();
        }
        return <span>
            {!avatar_url && <span className="character">{firstCharacter}</span>}
            {avatar_url && <img src={avatar_url} alt={username}/>}
            {isEditAvatar && <div className="overlay">
                <i className="icon-pencil"/>
            </div>}
        </span>
    }

    render() {
        var {avatar_url, username} = this.props;
        return (
            <div className={classnames('avatar','avatar-component',{'character': !avatar_url})}
                 style={{backgroundColor: this.getColor()}} onClick={this.props.onClickAvatar}>
                {this.props.isLink && <Link to={`user/${username}`} className="text-none text-white">{this.renderImage()}</Link>}
                {!this.props.isLink && this.renderImage()}
            </div>
        )
    }
}

Avatar.propTypes = {
    isEditAvatar: PropTypes.bool,
    onClickAvatar: PropTypes.func,
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    isLink: PropTypes.bool
}
