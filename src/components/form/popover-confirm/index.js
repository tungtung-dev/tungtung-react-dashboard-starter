import React, {PureComponent, PropTypes} from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

export default class PopoverConfirm extends PureComponent {
    renderPopoverContent(){
        const {title, message} = this.props;
        return <div>
            <h6>{title}</h6>
            <p>{message}</p>
            <button className="btn btn-sm btn-warning pt-popover-dismiss">Close</button> &nbsp;
            <button className="btn btn-sm btn-primary pt-popover-dismiss" onClick={this.props.onConfirm}>Đồng ý</button>
        </div>
    }
    render() {
        return <Popover
            content={this.renderPopoverContent()}
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="pt-popover-content-sizing"
            position={Position.BOTTOM}
            useSmartPositioning={false}
        >
            {this.props.children}
        </Popover>
    }
}

PopoverConfirm.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired
}
