import React, {PureComponent, PropTypes} from 'react';
import {cleanProps} from '../../../utils/index';
import TooltipWrapper, {tooltipPropType} from '../tooltip-wrapper/index';

export default class Span extends PureComponent {
    renderLink(){
        var className =  this.props.className ? this.props.className : '';
        if(this.props.styleColor) className += ` tt-text-color-${this.props.styleColor}`;
        return <span className={className} {...cleanProps(['tooltip', 'styleColor'],this.props)}>
            {this.props.children}
        </span>
    }

    render() {
        const spanComponent = this.renderLink();

        /* Implement tooltip */
        if(this.props.tooltip){
            return <TooltipWrapper {...this.props.tooltip}>
                {spanComponent}
            </TooltipWrapper>
        }

        /* default component */
        return spanComponent;
    }
}

Span.propTypes = {
    tooltip: PropTypes.shape(tooltipPropType),
    styleColor: PropTypes.string
}

