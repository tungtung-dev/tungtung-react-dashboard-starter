import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Popover, Position, Menu, MenuItem, PopoverInteractionKind} from '@blueprintjs/core';
import {cleanProps} from '../../../utils'
import Button from '../button';
import {Icon} from '../../layouts';

import "./style.scss";

export default class ButtonGroupDropdown extends Component {
    renderPopoverContent(){
        return <Menu>{this.props.options.map(
            (option, index) => <MenuItem key={index} iconName={option.icon} onClick={option.onClick} text={option.text}/>
        )}</Menu>;
    }

    render() {
        return <div className="btn-group tt-btn-group-dropdown">
            <Button {...cleanProps(['dropdownIcon','options'], this.props)}>{this.props.children}</Button>
            <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                position={this.props.position}
                useSmartPositioning={false}
                content={this.renderPopoverContent()}>
                <Button className={classnames(this.props.className, 'tt-dropdown-icon')}>
                    <Icon {...this.props.dropdownIcon}/>
                </Button>
            </Popover>

        </div>
    }
}
ButtonGroupDropdown.defaultProps = {
    options: [],
    position: Position.BOTTOM
}
ButtonGroupDropdown.propTypes = {
    dropdownIcon: PropTypes.object,
    position: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func
    }))
}

