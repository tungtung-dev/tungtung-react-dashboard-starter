import createCleanupEmptyPlugin from 'draft-js-cleanup-empty-plugin';
import createImagePlugin, { imageCreator, imageStyles } from 'draft-js-image-plugin';
import createDndPlugin, { DraggableDecorator } from 'draft-js-dnd-plugin';
import createResizeablePlugin, { ResizeableDecorator } from 'draft-js-resizeable-plugin';
import createFocusPlugin, { FocusDecorator } from 'draft-js-focus-plugin';
import createAlignmentPlugin, { AlignmentDecorator } from 'draft-js-alignment-plugin';
import createToolbarPlugin, { ToolbarDecorator } from 'draft-js-toolbar-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createKatexPlugin from './plugins/tex-block/index';
import createCodeEditorBlockPlugin from './plugins/code-editor-block/index';
import strategyCustom from './strategies/index';



if(!process.env.SERVER_RENDER) {
    require('draft-js-focus-plugin/lib/plugin.css');
    require('draft-js-image-plugin/lib/plugin.css');
    require('draft-js-alignment-plugin/lib/plugin.css');
    require('draft-js-toolbar-plugin/lib/plugin.css');
    require('draft-js-emoji-plugin/lib/plugin.css');
    require('./plugins/tex-block/style.scss')
    require('./plugins/code-editor-block/style.scss')
    require('./plugins/draftjs-side-toolbar-plugin/sideToolbarStyles.css')
    require('./plugins/draftjs-side-toolbar-plugin/buttonStyles.css')
}

const ImageComponent = ResizeableDecorator({
    resizeSteps: 20,
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

export default (config = {}, customPlugin = {}, editMode) => {
    return [
        ...plugins,
        createKatexPlugin(config.katex, !editMode),
        createCodeEditorBlockPlugin(config.codeEditor, !editMode),
        ...customPlugin,
        {decorators: editMode ? strategyCustom.Edit : strategyCustom.Read}
    ]
}