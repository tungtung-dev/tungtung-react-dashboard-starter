/* eslint-disable */
export function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    var matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export function cleanRegex(text, character) {
    text = text.replace(`${character}`, '');
    text = text.slice(0, text.length - 2);
    return text;
}