import React, {Component, PropTypes} from 'react';
import TooltipWrapper, {tooltipPropType} from '../tooltip_wrapper/index';

export default class Button extends Component {
    renderButton(){
        return <button {...this.props} className={`btn ${this.props.className}`}>
            {this.props.children}
        </button>
    }

    render() {
        const buttonComponent = this.renderButton();

        /* Implement tooltip*/
        if(this.props.tooltip){
            return <TooltipWrapper {...this.props.tooltip}>
                {buttonComponent}
            </TooltipWrapper>
        }

        /* return default button */
        return buttonComponent;
    }
}

Button.propTypes = {
    tooltip: PropTypes.shape(tooltipPropType)
}
