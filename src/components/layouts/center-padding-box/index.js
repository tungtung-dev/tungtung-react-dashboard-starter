import React, {PureComponent, PropTypes} from 'react';
import "./style.scss";
import classnames from 'classnames';

export default class CenterPaddingBox extends PureComponent{
    getStyle(){
        const {paddingTop, paddingBottom, paddingLeft, paddingRight} = this.props;
        return {
            paddingTop: paddingTop ? paddingTop : paddingBottom,
            paddingBottom: paddingBottom ? paddingBottom : paddingTop,
            paddingLeft: paddingLeft ? paddingLeft : paddingRight,
            paddingRight: paddingRight ? paddingRight : paddingLeft,
            ...this.props.style
        }
    }
    render(){
        const className = classnames('tt-layout-center-padding-box', {[this.props.className] : this.props.className});
        return <div className={className} style={this.getStyle()}>
            {this.props.children}
        </div>
    }
}

CenterPaddingBox.defaultProps = {
    paddingTop: 10,
    paddingLeft: 80
}

CenterPaddingBox.propTypes = {
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
}
