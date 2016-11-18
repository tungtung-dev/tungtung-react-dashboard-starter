import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import "./style.scss";

export default class Box extends PureComponent{
    render(){
        let className = classnames(
            'tt-layout-white-box',
            {[`tt-border-color-${this.props.borderStyle}`]: this.props.borderStyle},
            {[`tt-bg-color-${this.props.backgroundStyle}`]: this.props.backgroundStyle},
            {'sm': this.props.sm}
        )
        let style = {
            ...this.props.style,
            boxShadow: this.props.shadowStyle,
        };
        if(this.props.customBorderColor){
            style.borderColor = this.props.customBorderColor;
        }
        if(this.props.customBackgroundColor){
            style.backgroundColor = this.props.customBackgroundColor;
        }
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
    customBorderColor: PropTypes.string,
    customBackgroundColor: PropTypes.string,
    shadowStyle: PropTypes.string,
    sm: PropTypes.bool
}
