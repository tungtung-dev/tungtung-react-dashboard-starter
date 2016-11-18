import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import TooltipWrapper, {tooltipPropType} from '../tooltip_wrapper/index';

export default class LinkCustom extends PureComponent {
    renderLink(){
        var className = `${this.props.className}`;
        if(this.props.styleColor) className += ` tt-link-${this.props.styleColor}`;
        return <Link {...this.props} className={className}>
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
    tooltip: PropTypes.shape(tooltipPropType),
    styleColor: PropTypes.string
}

