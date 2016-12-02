/* eslint-disable */

import React, {PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {
    EditorState,
    convertToRaw,
    convertFromRaw,
    KeyBindingUtil,
    Modifier,
    AtomicBlockUtils,
    Entity
} from 'draft-js';
import classnames from 'classnames';

import "medium-draft/dist/medium-draft.css";

import {
    Editor,
    StringToTypeMap,
    Block,
    keyBindingFn,
    createEditorState,
    addNewBlockAt,
    beforeInput,
    getCurrentBlock,
    ImageSideButton,
    rendererFn,
    HANDLED,
    NOT_HANDLED
} from 'medium-draft';

import {customRenderFn, SIDE_BUTTONS} from './atomics';

import "./style.scss";

const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;

const { hasCommandModifier } = KeyBindingUtil;

export default class MediumEditor extends React.Component {
    static defaultProps = {
        readOnly: false
    }

    static propTypes = {
        onChange: PropTypes.func,
        defaultValue: PropTypes.any

    }
    constructor(props) {
        super(props);

        this.state = {
            editorState: this.getEditorState2(),
            editorEnabled: !this.props.readOnly,
            placeholder: 'Write here...',
        };

        this.onChange = (editorState, change = true) => {
            if (this.state.editorEnabled) {
                this.setState({editorState}, () => {
                    if(change){
                        this.props.onChange(convertToRaw(editorState.getCurrentContent()))
                    }
                });
            }
        };

        this.getEditorState = () => this.state.editorState;

        this.logData = this.logData.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.keyBinding = this.keyBinding.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    getEditorState2() {
        let newRawContent = this.props.defaultValue;
        let newContentState = '';
        if (typeof newRawContent === 'object') {
            if (newRawContent) {

                if (!newRawContent.entityMap) newRawContent.entityMap = {};
                if (!newRawContent.blocks[0].inlineStyleRanges) newRawContent.blocks[0].inlineStyleRanges = []
                if (!newRawContent.blocks[0].entityRanges) newRawContent.blocks[0].entityRanges = []
                newContentState = createEditorState(newRawContent);
            }
        }
        else if (newRawContent) {
            newContentState = createEditorState();
        }
        if (!newContentState) return createEditorState();
        return newContentState;
    }

    componentDidUpdate(prevProps){
        if(!prevProps.defaultValue && this.props.defaultValue !== prevProps.defaultValue){
            let editorState = this.getEditorState2();
            this.onChange(editorState, false);
        }
    }

    componentDidMount() {
        if(this.props.defaultValue){
            let editorState = this.getEditorState2();
            this.onChange(editorState, true);
        }
        this.refs.editor.focus();
    }

    keyBinding(e) {
        if (hasCommandModifier(e)) {
            if (e.which === 83) {  /* Key S */
                return 'editor-save';
            }
            // else if (e.which === 74 /* Key J */) {
            //  return 'do-nothing';
            //}
        }
        if (e.altKey === true) {
            if (e.shiftKey === true) {
                switch (e.which) {
                    /* Alt + Shift + L */
                    case 76:
                        return 'load-saved-data';
                    /* Key E */
                    // case 69: return 'toggle-edit-mode';
                }
            }
            if (e.which === 72 /* Key H */) {
                return 'toggleinline:HIGHLIGHT';
            }
        }
        return keyBindingFn(e);
    }

    handleKeyCommand(command) {
        if (command === 'editor-save') {
            window.localStorage['editor'] = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
            window.ga('send', 'event', 'draftjs', command);
            return true;
        } else if (command === 'load-saved-data') {
            this.loadSavedData();
            return true;
        } else if (command === 'toggle-edit-mode') {
            this.toggleEdit();
        }
        return false;
    }

    logData(e) {
        const es = convertToRaw(this.state.editorState.getCurrentContent());
        console.log(es);
        console.log(this.state.editorState.getSelection().toJS());
        window.ga('send', 'event', 'draftjs', 'log-data');
    }

    toggleEdit(e) {
        this.setState({
            editorEnabled: !this.state.editorEnabled
        }, () => {
            window.ga('send', 'event', 'draftjs', 'toggle-edit', this.state.editorEnabled + '');
        });
    }

    handleReturn(e) {
        // const currentBlock = getCurrentBlock(this.state.editorState);
        // var text = currentBlock.getText();
        return NOT_HANDLED;
    }

    @autobind
    rendererFn(setEditorState, getEditorState){
        var context = this;
        return customRenderFn(setEditorState, getEditorState, {
            onStartEdit: () => {
                context.setState({editorEnabled: false})
            },
            onFinishEdit: () => {
                context.setState({editorEnabled: true});
                this.refs.editor.focus();
            }
        });
    }

    render() {
        const {editorState, editorEnabled} = this.state;
        const editorClassName = classnames(
            'tt-medium-editor',
            {'tt-medium-editor-readonly': this.props.readOnly}
        )
        return (
            <div className={editorClassName}>
                <Editor
                    ref="editor"
                    editorState={editorState}
                    onChange={this.onChange}
                    editorEnabled={editorEnabled}
                    handleKeyCommand={this.handleKeyCommand}
                    placeholder={this.state.placeholder}
                    keyBindingFn={this.keyBinding}
                    handleReturn={this.handleReturn}
                    sideButtons={SIDE_BUTTONS}
                    rendererFn={this.rendererFn}
                />
            </div>
        );
    }
};
