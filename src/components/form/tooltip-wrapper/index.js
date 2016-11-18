import React, {PureComponent, PropTypes} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class TooltipWrapper extends PureComponent{
    render(){
        const tooltip = <Tooltip id={`tooltip-${this.props.id}`}>{this.props.tooltip}</Tooltip>;
        return <OverlayTrigger overlay={tooltip} placement={this.props.placement}>
            {this.props.children}
        </OverlayTrigger>
    }
}

TooltipWrapper.defaultProps = {
    placement: 'bottom'
}

export const  tooltipPropType = {
    placement: PropTypes.string,
    tooltip: PropTypes.string,
    id: PropTypes.string
}
TooltipWrapper.propTypes = tooltipPropType


