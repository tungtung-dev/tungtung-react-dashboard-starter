import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import {cleanProps, getStyleFromProps} from '../../../utils/index';
import TooltipWrapper, {tooltipPropType} from '../tooltip-wrapper/index';

export default class LinkCustom extends PureComponent {
    renderLink(){
        var className = `${this.props.className}`;
        if(this.props.styleColor) className += ` tt-link-${this.props.styleColor}`;
        const style = getStyleFromProps(['fontWeight','color'], this.props);
        return <Link className={className} {...cleanProps(['tooltip', 'styleColor'],this.props)} style={style}>
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
    styleColor: PropTypes.string,
    fontWeight: PropTypes.number
}

