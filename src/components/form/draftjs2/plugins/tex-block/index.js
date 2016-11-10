import { Entity } from 'draft-js';
import TeXBlock from './TeXComponent';

const texPlugin = (config = {}, readOnly = true) => {
    return {
        blockRendererFn: (block) => {
            if (block.getType() === 'atomic') {
                const type  = Entity.get(block.getEntityAt(0)).getType();
                if(type === 'katex-block') {
                    return {
                        component: TeXBlock,
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

export default texPlugin;
