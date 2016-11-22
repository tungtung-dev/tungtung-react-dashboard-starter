import React, {PureComponent, PropTypes} from 'react';
import {Icon} from '../../../../layouts';
import ItemWrapper from './item_wrapper';
import dataTooltip from '../../../../../constants/tooltipType';

export default class InsertCode extends PureComponent {
    render() {
        return <ItemWrapper className="item-icon" tooltip={dataTooltip.draft_editor.insert_code_editor} onClick={this.props.onInsert}>
            <Icon name="code" bluePrintIcon/>
        </ItemWrapper>
    }
}
InsertCode.propTypes = {
    onInsert: PropTypes.func
}
