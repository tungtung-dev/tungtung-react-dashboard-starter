import React, {Component, PropTypes} from 'react';
import {getStyleFromProps} from '../../../utils';
import "./style.scss";

export default class Icon extends Component {
    render() {
        const {fontAwesome, simepleLineIcon, bluePrintIcon, name, styleColor} = this.props;
        const className = this.props.className ? this.props.className : '';
        const classColor = styleColor ? `tt-text-color-${styleColor} ${className}` : className;
        const style = getStyleFromProps(['fontSize'], this.props);
        if(bluePrintIcon) return <i style={style} className={`pt-icon-standard pt-icon-${name} ${classColor}`}/>
        if(fontAwesome) return <i style={style} className={`fa fa-${name} ${classColor}`}/>
        if(simepleLineIcon) return <i style={style} className={`icon-${name} ${classColor}`}/>
    }
}
Icon.defaultProps = {
    simepleLineIcon: true
}
Icon.propTypes = {
    name: PropTypes.string,
    styleColor: PropTypes.string,
    fontSize: PropTypes.number,
    fontAwesome: PropTypes.bool,
    simepleLineIcon: PropTypes.bool,
    bluePrintIcon: PropTypes.bool
}


