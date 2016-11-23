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
        return <ChooseImageWrap onChoose={this.props.onChooseImage}>
            <div className="item">
                <span className="item-icon">
                    <Icon name="camera" bluePrintIcon/>
                </span>
            </div>
        </ChooseImageWrap>
    }
}

InsertCode.propTypes = {
    onChooseImage: PropTypes.func,
    popover: PropTypes.bool
}
