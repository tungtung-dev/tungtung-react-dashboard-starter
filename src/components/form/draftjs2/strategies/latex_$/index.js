import {findWithRegex} from '../utils';
import {Latex, LatexView} from '../latex/index';
export const HANDLE_LATEX = /\$(.*?)\$/g;

function handleLatex$(contentBlock, callback) {
    findWithRegex(HANDLE_LATEX, contentBlock, callback);
}

export default {
    edit: {
        strategy: handleLatex$,
        component: Latex
    },
    read: {
        strategy: handleLatex$,
        component: LatexView
    }
}