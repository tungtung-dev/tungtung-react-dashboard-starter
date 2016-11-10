import React from 'react';
import {findWithRegex, cleanRegex} from '../utils';
const HANDLE_ITALIC = /~~(.*?)~~/g;

function handleItalic(contentBlock, callback) {
    findWithRegex(HANDLE_ITALIC, contentBlock, callback);
}

var Italic = (props) => (
    <i>{props.children}</i>
)

var ItalicView = (props) => (
    <i>{cleanRegex(props.children[0].props.text.slice(),'~~')}</i>
)

export default {
    edit: {
        strategy: handleItalic,
        component: Italic
    },
    read: {
        strategy: handleItalic,
        component: ItalicView
    }
}