import React, {Component} from 'react';
import {Entity} from 'draft-js';
import {rendererFn, Block} from 'medium-draft';
import EmbedBlock from './embed-block';
import ImageBlock from './image-block';
import CodeBlock from './code-block';

export class AtomicBlock extends Component {
    render() {
        const {blockProps, block} = this.props;
        const entity = Entity.get(block.getEntityAt(0));
        const data = entity.getData();
        const type = entity.getType();
        if (blockProps.components[type]) {
            const AtComponent = blockProps.components[type];
            return (
                <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
                    <AtComponent data={data} block={block} blockProps={blockProps}/>
                </div>
            );
        }
        return <p>Block of type <b>{type}</b> is not supported.</p>;
    };
}

export function customRenderFn(setEditorState, getEditorState, {onStartEdit, onFinishEdit} = {}) {
    const atomicRenderers = {
        embed: EmbedBlock.Block,
        code_editor: CodeBlock.Block,
    };
    const rFnOld = rendererFn(setEditorState, getEditorState);
    const rFnNew = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
            case Block.ATOMIC:
                return {
                    component: AtomicBlock,
                    editable: false,
                    props: {
                        components: atomicRenderers,
                        onStartEdit,
                        onFinishEdit
                    },
                };
            default:
                return rFnOld(contentBlock);
        }
    };
    return rFnNew;

}

export const SIDE_BUTTONS = [
    {
        title: 'Code block',
        component: CodeBlock.SideButton
    },
    {
        title: 'Image',
        component: ImageBlock.SideButton
    }
]