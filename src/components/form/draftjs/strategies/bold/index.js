import React from 'react';
import {findWithRegex, cleanRegex} from '../utils';
const HANDLE_BOLD = /(\*\*)(.*?)(\*\*)/g;

function handleBold(contentBlock, callback) {
    findWithRegex(HANDLE_BOLD, contentBlock, callback);
}

var Bold = (props) => (
    <b>{props.children}</b>
)

var BoldView = (props) => (
    <b>{cleanRegex(props.children[0].props.text, '**')}</b>
)

export default {
    edit:{
        strategy: handleBold,
        component: Bold
    },
    read: {
        strategy: handleBold,
        component: BoldView
    }
}