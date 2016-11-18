import React, {PureComponent, PropTypes} from 'react';
import "./style.scss";

export default class CenterPaddingBox extends PureComponent{
    getStyle(){
        const {paddingTop, paddingBottom, paddingLeft, paddingRight} = this.props;
        return {
            paddingTop: paddingTop ? paddingTop : paddingBottom,
            paddingBottom: paddingBottom ? paddingBottom : paddingTop,
            paddingLeft: paddingLeft ? paddingLeft : paddingRight,
            paddingRight: paddingRight ? paddingRight : paddingLeft,
        }
    }
    render(){
        return <div className="tt-layout-center-padding-box" style={this.getStyle()}>
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
