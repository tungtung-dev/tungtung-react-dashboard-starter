import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import TooltipWrapper, {tooltipPropType} from '../tooltip_wrapper/index';

export default class LinkCustom extends Component {
    renderLink(){
        return <Link {...this.props}>
            {this.props.children}
        </Link>
    }

    render() {
        const linkComponent = this.renderLink();

        /* Implement tooltip */
        if(this.props.tooltip){
            return <TooltipWrapper {...this.props.tooltip}>
                {linkComponent}
            </TooltipWrapper>
        }

        /* default component */
        return linkComponent;
    }
}
LinkCustom.propTypes = {
    tooltip: PropTypes.shape(tooltipPropType)
}

