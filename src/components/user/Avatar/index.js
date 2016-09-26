import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import {getColorFromText} from '../../../utils/index';
import "./style.scss";

export default class Avatar extends Component {
    getColor() {
        return getColorFromText(this.props.displayName);
    }

    renderImage() {
        const {avatar_url, displayName, isEditAvatar} = this.props;
        var firstCharacter;
        if (displayName) {
            firstCharacter = displayName[0].toUpperCase();
        }
        else firstCharacter = " ";
        return <span>
            {!avatar_url && <span className="character">{firstCharacter}</span>}
            {avatar_url && <img src={avatar_url} alt={displayName}/>}
            {isEditAvatar && <div className="overlay">
                <i className="icon-pencil"/>
            </div>}
        </span>
    }

    render() {
        var {avatar_url, displayName} = this.props;
        return (
            <div className={classnames('avatar','avatar-component',{'character': !avatar_url})}
                 style={{backgroundColor: this.getColor()}} onClick={this.props.onClickAvatar}>
                {this.props.isLink && <Link to={`user/${displayName}`} className="text-none text-white">{this.renderImage()}</Link>}
                {!this.props.isLink && this.renderImage()}
            </div>
        )
    }
}

Avatar.propTypes = {
    isEditAvatar: PropTypes.bool,
    onClickAvatar: PropTypes.func,
    avatar_url: PropTypes.string,
    displayName: PropTypes.string,
    isLink: PropTypes.bool
}
