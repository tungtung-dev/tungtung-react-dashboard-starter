import React, {Component, PropTypes} from 'react';
import "./style.scss";

export default class Icon extends Component {
    render() {
        const {fontAwesome, simepleLineIcon, bluePrintIcon, name, styleColor} = this.props;
        const classColor = styleColor ? `tt-text-color-${styleColor}` : '';
        if(bluePrintIcon) return <i className={`pt-icon-standard pt-icon-${name} ${classColor}`}/>
        if(fontAwesome) return <i className={`fa fa-${name} ${classColor}`}></i>
        if(simepleLineIcon) return <i className={`icon-${name} ${classColor}`}></i>
    }
}
Icon.defaultProps = {
    simepleLineIcon: true
}
Icon.propTypes = {
    name: PropTypes.string,
    styleColor: PropTypes.string,
    fontAwesome: PropTypes.bool,
    simepleLineIcon: PropTypes.bool,
    bluePrintIcon: PropTypes.bool
}


