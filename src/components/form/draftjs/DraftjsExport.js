import React, {Component, PropTypes} from 'react';
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import {renderToString} from 'react-dom/server';
import {Entity} from 'draft-js';
import KatexInline from '../katex/KatexInline';
import CodeEditor from '../code_editor/index';

const renderKatex = (data) => {
    let katexString = renderToString(<KatexInline tex={data.content}/>);
    return `<div>${katexString}</div>`;
}

const renderCodeEditor = (data) => {
    let codeEditorString = renderToString(<CodeEditor readOnly value={data.content} valueMode={data.mode} valueName={data.name}/>);
    return `<div>${codeEditorString}</div>`
}

let options = {
    blockRenderers: {
        atomic: (block) => {
            let type = Entity.get(block.getEntityAt(0)).getType();
            let data = Entity.get(block.getEntityAt(0)).getData();
            switch (type){
                case 'katex-block': return renderKatex(data);
                case 'code-editor-block': return renderCodeEditor(data);
                default :
            }
        },
    },
};

export default class DraftjsExport extends Component {
    getContentState(){
        return stateToHTML(convertFromRaw(this.props.value), options);
    }
    getHtml(){
        return this.props.value ? this.getContentState()  : '';
    }
    render() {
        return <div dangerouslySetInnerHTML={{__html: this.getHtml()}}>

        </div>
    }
}
DraftjsExport.propTypes = {}
