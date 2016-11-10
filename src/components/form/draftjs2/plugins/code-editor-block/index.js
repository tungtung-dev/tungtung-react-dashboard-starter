import { Entity } from 'draft-js';
import CodeBlock from './CodeBlock';

const codeBlockPlugin = (config = {}, readOnly = true) => {
    return {
        blockRendererFn: (block) => {
            if (block.getType() === 'atomic') {
                const type  = Entity.get(block.getEntityAt(0)).getType();
                if(type === 'code-editor-block'){
                    return {
                        component: CodeBlock,
                        editable: false,
                        props: {
                            onStartEdit: config.onStartEdit,
                            onFinishEdit: config.onFinishEdit,
                            onRemove: (blockKey) => config.onRemove(blockKey),
                            readOnly
                        },
                    };
                }
            }
            return null;
        }
    };
};

export default codeBlockPlugin;
