import createCleanupEmptyPlugin from 'draft-js-cleanup-empty-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createResizeablePlugin  from 'draft-js-resizeable-plugin';
import createFocusPlugin  from 'draft-js-focus-plugin';
import createAlignmentPlugin  from 'draft-js-alignment-plugin';
import createToolbarPlugin  from 'draft-js-toolbar-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createCodeEditorBlockPlugin from './code-editor-block/index';
import strategyCustom from '../strategies/index';
import {ImageComponent} from './image-block';

if(!process.env.SERVER_RENDER) {
    require('draft-js-focus-plugin/lib/plugin.css');
    require('draft-js-image-plugin/lib/plugin.css');
    require('draft-js-alignment-plugin/lib/plugin.css');
    require('draft-js-toolbar-plugin/lib/plugin.css');
    require('./code-editor-block/style.scss')
}

const cleanupEmptyPlugin = createCleanupEmptyPlugin({
    types: ['block-image', 'block-table']
})
const focusPlugin = createFocusPlugin();
const entityPlugin = createEntityPropsPlugin();
const imagePlugin = createImagePlugin({type: 'atomic', component: ImageComponent});
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin =  createAlignmentPlugin({});
const toolbarPlugin = createToolbarPlugin({});

const plugins = [
    cleanupEmptyPlugin,
    entityPlugin,
    toolbarPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
];

export default (config = {}, customPlugin = {}, editMode) => {
    return [
        ...plugins,
        createCodeEditorBlockPlugin(config.codeEditor, !editMode),
        ...customPlugin,
        {decorators: editMode ? strategyCustom.Edit : strategyCustom.Read}
    ]
}