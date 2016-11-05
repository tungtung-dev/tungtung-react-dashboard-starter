import Editor from 'draft-js-plugins-editor';

export default class CustomEditorOverridePlugin extends Editor{
    getEditorRef() {
        console.log(this.editor);
        return this.editor;
    }

    getPluginMethods() {
        return {
            getPlugins: this.getPlugins,
            getProps: this.getProps,
            setEditorState: this.onChange,
            getEditorState: this.getEditorState,
            getReadOnly: this.getReadOnly,
            setReadOnly: this.setReadOnly,
            getEditorRef: this.getEditorRef
        }
    }
}