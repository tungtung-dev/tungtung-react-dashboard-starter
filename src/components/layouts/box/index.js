import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import {getStyleFromProps} from 'utils';
import "./style.scss";

export default class Box extends PureComponent{
    render(){
        let className = classnames(
            'tt-layout-white-box',
            {[`tt-border-color-${this.props.borderStyle}`]: this.props.borderStyle},
            {[`tt-bg-color-${this.props.backgroundStyle}`]: this.props.backgroundStyle},
            {'sm': this.props.sm}
        )
        let style = getStyleFromProps(['boxShadow', 'borderColor', 'backgroundClor', 'marginTop', 'marginBottom'], this.props);
        return <div className={className} style={style}>
            {this.props.children}
        </div>
    }
}

Box.defaultProps = {
    borderStyle: 'black',
    backgroundStyle: 'white',
    shadowStyle: '0 1px 1px rgba(0,0,0,.1)'
}

Box.propTypes = {
    borderStyle: PropTypes.oneOf(['blue','black','red','orange','yellow']),
    backgroundStyle: PropTypes.oneOf(['white', 'gray']),
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    boxShadow: PropTypes.string,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingTop: PropTypes.number,
    sm: PropTypes.bool
}
