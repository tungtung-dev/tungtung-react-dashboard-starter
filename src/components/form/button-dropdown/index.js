import React, {Component, PropTypes} from 'react';
import {Popover, Position, Menu, MenuItem, PopoverInteractionKind} from '@blueprintjs/core';
import Button from '../button';

import "./style.scss";

export default class ButtonDropdown extends Component {
    renderPopoverContent(){
        return <Menu>{this.props.options.map(
            (option, index) => <MenuItem key={index} iconName={option.icon} onClick={option.onClick} text={option.text}/>
        )}</Menu>;
    }

    render() {
        return <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                position={Position.BOTTOM}
                useSmartPositioning={false}
                className="tt-btn-dropdown"
                content={this.renderPopoverContent()}>
                    <Button {...this.props}>{this.props.children}</Button>
            </Popover>
    }
}
ButtonDropdown.defaultProps = {
    options: []
}
ButtonDropdown.propTypes = {
    options: PropTypes.array(PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func
    }))
}

