import React, {PureComponent, PropTypes} from 'react';
import {Popover, Position, PopoverInteractionKind} from '@blueprintjs/core';
import "./style.scss";

export default class TooltipWrapper extends PureComponent{
    render(){
        const popoverContent = <span>{this.props.tooltip}</span>
        return <Popover content={popoverContent}
                        interactionKind={PopoverInteractionKind.HOVER}
                        popoverClassName="tooltip-content-sizing pt-dark"
                        position={this.props.position}
                        useSmartPositioning={false}
                        >
            {this.props.children}
        </Popover>
    }
}

TooltipWrapper.defaultProps = {
    position: Position.BOTTOM
}

export const tooltipPropType = {
    position: PropTypes.any,
    tooltip: PropTypes.any
}

TooltipWrapper.propTypes = tooltipPropType


