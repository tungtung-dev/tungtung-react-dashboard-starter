import {insertBlock, removeBlock} from '../modifiers';

export function removeCodeBlock(editorState, blockKey) {
    return removeBlock(editorState, blockKey);
}

const exampleCode = `//your code hear...`;

export function insertCodeBlock(editorState) {
    return insertBlock(
        editorState,
        'code-editor-block',
        {name: 'filename', mode: 'javascript', content: exampleCode}
    );
}
