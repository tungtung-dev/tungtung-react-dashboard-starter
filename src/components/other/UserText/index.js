import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class UserText extends Component {
    render() {
        var {username, className} = this.props;
        if (this.props.isLink)
            return (
                <Link to={`user/${username}`} style={this.props.style} className={className}>
                    {username}
                </Link>
            )
        else
            return (
                <span style={this.props.style} className={className}>
                    {username}
                </span>
            )
    }
}

UserText.defaultProps = {
    isLink: true
}

UserText.propTypes = {
    username: PropTypes.string,
    isLink: PropTypes.bool
}
