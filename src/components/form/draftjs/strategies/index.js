import bold from './bold/index';
import italic from './italic/index';
import underline from './underline/index';
import latex from './latex/index';
import latex_$ from './latex_$/index';
import youtube from './youtube/index';

export default {
    Edit: [
        bold.edit,
        underline.edit,
        italic.edit,
        latex.edit,
        latex_$.edit,
        youtube.edit
    ],
    Read: [
        bold.read,
        underline.read,
        italic.read,
        latex.read,
        latex_$.read,
        youtube.read
    ]
}