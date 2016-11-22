import React, {Component, PropTypes} from 'react';
import ItemWrapper from '../items/item_wrapper';

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
];

export default class BlockTypes extends Component {
    render() {
        return <div className="group-items">
            {BLOCK_TYPES.map((blockType, index) => <ItemWrapper key={index} className="item-text" onClick={(e) => this.props.onToggle(e, blockType.style)}>
                {blockType.label}
            </ItemWrapper>)}
        </div>
    }
}

BlockTypes.propTypes = {
    onToggle: PropTypes.func
}

