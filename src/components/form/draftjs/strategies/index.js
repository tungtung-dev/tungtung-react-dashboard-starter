import bold from './bold/index';
import italic from './italic/index';
import underline from './underline/index';
import youtube from './youtube/index';

export default {
    Edit: [
        bold.edit,
        underline.edit,
        italic.edit,
        youtube.edit
    ],
    Read: [
        bold.read,
        underline.read,
        italic.read,
        youtube.read
    ]
}