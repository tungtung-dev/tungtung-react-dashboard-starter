import Draft from 'draft-js';
import {Map} from 'immutable';
import React from 'react';
import Editor from '../draft-js-plugins-editor';
import {autobind} from 'core-decorators';
import {insertTeXBlock, removeTeXBlock} from './plugins/tex-block/modifiers';
import {insertCodeBlock, removeCodeBlock} from './plugins/code-editor-block/modifiers';
import {insertImage} from './plugins/modifiers';
import createPlugins from './plugins';
import strategiesCustom from './strategies/index';

if(!process.env.SERVER_RENDER){
    require("./style.scss");
}

var {convertToRaw, convertFromRaw, ContentState, CompositeDecorator,EditorState, RichUtils} = Draft;

const blockPlugins = {
    katex: 'liveKatexEdit',
    codeEditor: 'liveCodeEditorEdit',
}

export default class TeXEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.getEditorState(),
            [blockPlugins.katex]: Map(),
            [blockPlugins.codeEditor]: Map()
        };
        this.plugins = createPlugins({
            katex: this.getBlockConfig(blockPlugins.katex, removeTeXBlock),
            codeEditor: this.getBlockConfig(blockPlugins.codeEditor, removeCodeBlock),
        }, [], this.getEditMode());
    }

    getEditMode(){
        return true;
    }

    @autobind
    _focus(e){
        if(this.editor && this.editor.focus){
            this.editor.focus();
        }
        if(this.props.onFocus){
            this.props.onFocus(e);
        }
    }

    @autobind
    _blur(e){
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    @autobind
    _onChange(editorState, change = true){
        this.setState({editorState});
        let contentState = editorState.getCurrentContent();
        if (contentState.getPlainText()) {
            if (change) this.props.onChange(convertToRaw(contentState));
        }
        else {
            if (change) this.props.onChange(null);
        }
    }

    @autobind
    _handleKeyCommand(command){
        var {editorState} = this.state;
        var newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this._onChange(newState);
            return true;
        }
        return false;
    }

    @autobind
    insertBlock(keyStateBlock, insertBlockFunc){
        this.setState({
            [keyStateBlock]: Map(),
        });
        this._onChange(insertBlockFunc(this.state.editorState));
    }

    @autobind
    getBlockConfig(keyStateBlock, removeBlockFunc){
        const removeBlock = (blockKey) => {
            this.setState({
                [keyStateBlock]: this.state[keyStateBlock].remove(blockKey),
            });
            this._onChange(removeBlockFunc(this.state.editorState, blockKey));
        };

        return {
            onStartEdit: (blockKey) => {
                this.setState({[keyStateBlock]: this.state[keyStateBlock].set(blockKey, true)});
            },
            onFinishEdit: (blockKey) => {
                this.setState({[keyStateBlock]: this.state[keyStateBlock].remove(blockKey)});
                this._onChange(this.state.editorState);
            },
            onRemove: (blockKey) => removeBlock(blockKey),
        }
    }

    getEditorState() {
        let newRawContent = this.props.value;
        let newContentState = '';
        if (typeof newRawContent === 'object') {
            if (newRawContent) {
                if (!newRawContent.entityMap) newRawContent.entityMap = {};
                if (!newRawContent.blocks[0].inlineStyleRanges) newRawContent.blocks[0].inlineStyleRanges = []
                if (!newRawContent.blocks[0].entityRanges) newRawContent.blocks[0].entityRanges = []
                newContentState = convertFromRaw(newRawContent);
            }
        }
        else if (newRawContent) {
            newContentState = ContentState.createFromText(this.props.value);
        }
        if (!newContentState) return EditorState.createEmpty(this.getDecorator());
        return EditorState.createWithContent(newContentState, this.getDecorator());
    }

    getDecorator() {
        const strategies = this.getEditMode() ? strategiesCustom.Edit : strategiesCustom.Read
        return new CompositeDecorator(strategies);
    }

    disableDraftjs(){
        var disable = false;
        Object.keys(blockPlugins).map(key => {
            let keyBlockEdit = blockPlugins[key];
            let liveBlockEdit = this.state[keyBlockEdit];
            if(liveBlockEdit && liveBlockEdit.count()){
                disable = true;
            }
            return {};
        })
        return disable;
    }

    @autobind
    insertCodeEditor(){
        this.insertBlock(blockPlugins.codeEditor, insertCodeBlock);
    }

    @autobind
    insertTeXEditor(){
        this.insertBlock(blockPlugins.katex, insertTeXBlock);
    }

    @autobind
    insertImage(image){
        const addImage = () => {
            return insertImage(this.state.editorState, image);
        }
        this.insertBlock('liveImage', addImage);
    }

    render() {
        return (
            <div className="TexEditor-container">
                <div className="TeXEditor-root">
                    <div className="TeXEditor-editor" id={this.props.id} onClick={this._focus} onFocus={this._focus} onBlur={this._blur}>
                        <Editor
                            editorState={this.state.editorState}
                            handleKeyCommand={this._handleKeyCommand}
                            onChange={this._onChange}
                            placeholder={this.props.placeholder}
                            readOnly={this.disableDraftjs()}
                            ref={(ref) => this.editor = ref}
                            spellCheck={true}
                            plugins={this.plugins}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

//                            blockRendererFn={this._blockRenderer}
