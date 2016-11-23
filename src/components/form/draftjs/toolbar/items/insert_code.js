import React, {PureComponent, PropTypes} from 'react';
import {Icon} from '../../../../layouts';
import ItemWrapper from './item_wrapper';

export default class InsertCode extends PureComponent {
    render() {
        return <ItemWrapper className="item-icon" onClick={this.props.onInsert} link>
            <Icon name="code" bluePrintIcon/>
        </ItemWrapper>
    }
}
InsertCode.propTypes = {
    onInsert: PropTypes.func
}
