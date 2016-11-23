import React, {Component, PropTypes} from 'react';
import ItemWrapper from '../items/item_wrapper';
import {Icon} from '../../../../layouts';

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: <Icon name="quote-right" fontAwesome/>, style: 'blockquote'},
    {label: <Icon name="list-ul" fontAwesome/>, style: 'unordered-list-item'},
    {label: <Icon name="list-ol" fontAwesome/>, style: 'ordered-list-item'},
];

export default class BlockTypes extends Component {
    getClassName(blockType){
        let className = '';
        if(blockType.style === this.props.currentBlockType) className += 'pressed ';
        if(typeof blockType.label === 'string') className += 'item-text ';
        else className += 'item-icon';
        return className;
    }

    render() {
        return <div className="group-items">
            {BLOCK_TYPES.map((blockType, index) =>
                <ItemWrapper
                    key={index}
                    className={this.getClassName(blockType)}
                    onClick={(e) => this.props.onToggle(e, blockType.style)}
                >
                    {blockType.label}
                </ItemWrapper>
            )}
        </div>
    }
}

BlockTypes.propTypes = {
    onToggle: PropTypes.func,
    currentBlockType: PropTypes.string
}

