import React, {PureComponent, PropTypes} from 'react';
import TooltipWrapper, {tooltipPropType} from '../tooltip-wrapper/index';

export default class Button extends PureComponent {
    render(){
        const buttonComponent = <button {...this.props} className={`btn ${this.props.className}`}>
            {this.props.children}
        </button>
        if(this.props.tooltip){
            return <TooltipWrapper {...this.props.tooltip}>
                {buttonComponent}
            </TooltipWrapper>
        }
        return buttonComponent
    }
}

Button.propTypes = {
    tooltip: PropTypes.shape(tooltipPropType)
}
