import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
    render() {
        const {fontAwesome, simepleLineIcon, bluePrintIcon, name} = this.props;
        if(bluePrintIcon) return <span className={`pt-icon-standard pt-icon-${name}`}/>
        if(fontAwesome) return <i className={`fa fa-${name}`}></i>
        if(simepleLineIcon) return <i className={`icon-${name}`}></i>
    }
}
Icon.defaultProps = {
    simepleLineIcon: true
}
Icon.propTypes = {
    name: PropTypes.string,
    fontAwesome: PropTypes.bool,
    simepleLineIcon: PropTypes.bool,
    bluePrintIcon: PropTypes.bool
}


