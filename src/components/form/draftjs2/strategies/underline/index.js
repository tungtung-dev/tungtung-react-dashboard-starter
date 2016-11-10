import React from 'react';
import {findWithRegex, cleanRegex} from '../utils';
const HANDLE_UNDERLINE = /(__)(.*?)(__)/g;

function handleUnderline(contentBlock, callback) {
    findWithRegex(HANDLE_UNDERLINE, contentBlock, callback);
}

const Underline = (props) => (
    <u>{props.children}</u>
)

const UnderlineView = (props) => (
    <u>{cleanRegex(props.children[0].props.text, '__')}</u>
)

export default {
    edit:{
        strategy: handleUnderline,
        component: Underline
    },
    read: {
        strategy: handleUnderline,
        component: UnderlineView
    }
}