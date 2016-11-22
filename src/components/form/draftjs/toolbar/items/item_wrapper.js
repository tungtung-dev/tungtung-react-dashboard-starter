import React, {Component, PropTypes} from 'react';
import Span from '../../../span';

export default class ItemWrapper extends Component {
    render() {
        return <div className="item">
            <Span tabIndex="-1" styleColor="black-white" tooltip={this.props.tooltip} onMouseDown={this.props.onClick} className={this.props.className}>
                {this.props.children}
            </Span>
        </div>
    }
}
ItemWrapper.propTypes = {
    tooltip: PropTypes.object,
    onClick: PropTypes.func
}
