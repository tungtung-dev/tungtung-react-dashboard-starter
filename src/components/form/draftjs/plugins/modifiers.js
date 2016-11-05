/* eslint-disable */
import {
    EditorState, Modifier, SelectionState,
    AtomicBlockUtils, Entity
} from 'draft-js';

export function removeBlock(editorState, blockKey) {
    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(blockKey);

    var targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
    });

    var withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
    var resetBlock = Modifier.setBlockType(
        withoutTeX,
        withoutTeX.getSelectionAfter(),
        'unstyled'
    );

    var newState = EditorState.push(editorState, resetBlock, 'remove-range');
    return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
}

export function insertBlock(editorState, type, data) {
    const entityKey = Entity.create(
        type,
        'IMMUTABLE',
        data
    );
    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}

export function insertImage(editorState, image_src){
    return insertBlock(editorState, 'image', {src: image_src});
}