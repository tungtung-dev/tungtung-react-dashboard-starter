import React, {PureComponent, PropTypes} from 'react';
import {Icon} from '../../../../layouts';
import {ChooseImagePopoverWrap, ChooseImageModalWrap} from '../../../../media-manager/index';

export default class InsertCode extends PureComponent {
    getComponent(){
        if(this.props.popover) return ChooseImagePopoverWrap;
        return ChooseImageModalWrap
    }
    render() {
        const ChooseImageWrap = this.getComponent();
        return <ChooseImageWrap className="item" onChoose={this.props.onChooseImage}>
            <span className="item-icon">
                <Icon name="camera" bluePrintIcon/>
            </span>
        </ChooseImageWrap>
    }
}

InsertCode.propTypes = {
    onChooseImage: PropTypes.func,
    popover: PropTypes.bool
}
