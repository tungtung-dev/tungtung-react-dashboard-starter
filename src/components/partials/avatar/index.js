import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import {getColorFromText} from '../../../utils/index';
import "./style.scss";

export default class Avatar extends Component {
    getColor() {
        return getColorFromText(this.props.username);
    }

    getFirstChacter(){
        var firstCharacter = ' ';
        if(this.props.username){
            firstCharacter = this.props.username[0].toUpperCase();
        }
        return firstCharacter;
    }

    renderImage() {
        const {avatar_url, username, isEditAvatar} = this.props;
        const isText = !avatar_url;
        const isImage = avatar_url;

        return <span>
            {isText && <span className="character">{this.getFirstChacter()}</span>}
            {isImage && <img src={avatar_url} alt={username}/>}
            {isEditAvatar && <div className="overlay">
                <i className="icon-pencil"/>
            </div>}
        </span>
    }

    render() {
        const {avatar_url, username, isLink} = this.props;
        const isImage = !isLink;
        return (
            <div className={classnames('avatar','avatar-component',{'character': !avatar_url})}
                 style={{backgroundColor: this.getColor()}} onClick={this.props.onClickAvatar}>
                {isLink && <Link to={`user/${username}`} className="text-none text-white">{this.renderImage()}</Link>}
                {isImage && this.renderImage()}
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
