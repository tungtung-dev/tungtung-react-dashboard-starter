import React, {PureComponent, PropTypes} from 'react';
import TooltipWrapper, {tooltipPropType} from '../tooltip-wrapper/index';
import classnames from 'classnames';
import {cleanProps} from '../../../utils/index';
import {Button as ButtonBluePrint} from '@blueprintjs/core';

import "./style.scss";

export default class Button extends PureComponent {
    renderButtonNormal(){
        const className = classnames(
            'btn',
            this.props.className,
            {
                'shadow': this.props.shadow,
                'fill': this.props.fill,
            }
        );
        return <button {...cleanProps(['tooltip','shadow','fill','position'], this.props)} className={className}>
            {this.props.children}
        </button>
    }

    renderButtonBluePrint(){
        return <ButtonBluePrint {...cleanProps(['tooltip','bluePrint'], this.props)} className={classnames('tt-button-custom',this.props.className)}>
            {this.props.children}
        </ButtonBluePrint>
    }

    render(){
        const buttonComponent = this.props.bluePrint ? this.renderButtonBluePrint() : this.renderButtonNormal()
        if(this.props.tooltip){
            return <TooltipWrapper {...this.props.tooltip}>
                {buttonComponent}
            </TooltipWrapper>
        }
        return buttonComponent
    }
}

Button.propTypes = {
    tooltip: PropTypes.shape(tooltipPropType),
    bluePrint: PropTypes.bool,
    shadow: PropTypes.bool,
    fill: PropTypes.bool
}
