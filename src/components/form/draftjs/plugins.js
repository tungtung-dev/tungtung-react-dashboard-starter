import createCleanupEmptyPlugin from 'draft-js-cleanup-empty-plugin';
import createImagePlugin, { imageCreator, imageStyles } from 'draft-js-image-plugin';
import createDndPlugin, { DraggableDecorator } from 'draft-js-dnd-plugin';
import createResizeablePlugin, { ResizeableDecorator } from 'draft-js-resizeable-plugin';
import createFocusPlugin, { FocusDecorator } from 'draft-js-focus-plugin';
import createAlignmentPlugin, { AlignmentDecorator } from 'draft-js-alignment-plugin';
import createToolbarPlugin, { ToolbarDecorator } from 'draft-js-toolbar-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import strategyCustom from './strategies/index';

if(!process.env.SERVER_RENDER) {
require('draft-js-focus-plugin/lib/plugin.css');
require('draft-js-image-plugin/lib/plugin.css');
require('draft-js-alignment-plugin/lib/plugin.css');
require('draft-js-toolbar-plugin/lib/plugin.css');
require('draft-js-emoji-plugin/lib/plugin.css');
}

const ImageComponent = ResizeableDecorator({
    resizeSteps: 10,
    handles: true,
    vertical: 'auto'
})(DraggableDecorator(FocusDecorator(
    AlignmentDecorator(
        ToolbarDecorator()(imageCreator({theme: imageStyles}))
    )
)));

const cleanupEmptyPlugin = createCleanupEmptyPlugin({
    types: ['block-image', 'block-table']
})
const focusPlugin = createFocusPlugin();
const entityPlugin = createEntityPropsPlugin();
const imagePlugin = createImagePlugin({type: 'atomic', component: ImageComponent});
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin =  createAlignmentPlugin({});
const toolbarPlugin = createToolbarPlugin({});
const emojiPlugin = createEmojiPlugin();
const {EmojiSuggestions} = emojiPlugin;

const plugins = [
    cleanupEmptyPlugin,
    entityPlugin,
    toolbarPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    emojiPlugin
];

export {EmojiSuggestions}

export default (handleUpload = () => {}, handleDefaultData = {}, edit) => {
    return [
        ...plugins,
        createDndPlugin({
            allowDrop: true,
            handleUpload,
            handleDefaultData,
            handlePlaceholder: (state, selection, data) => {
                const { type } = data;
                if (type.indexOf('image/') === 0) {
                    return 'atomic';
                } else if (type.indexOf('text/') === 0 || type === 'application/json') {
                    return 'placeholder-github';
                } return undefined;
            }, handleBlock: (state, selection, data) => {
                const { type } = data;
                if (type.indexOf('image/') === 0) {
                    return 'block-image';
                } else if (type.indexOf('text/') === 0 || type === 'application/json') {
                    return 'block-text';
                } return undefined;
            },
        }),
        //{decorators: edit ? strategyCustom.Edit : strategyCustom.Read}
    ]
}