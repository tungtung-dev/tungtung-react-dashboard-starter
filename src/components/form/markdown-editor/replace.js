function combineKeyObjectToString(object){
    let string = '';
    Object.keys(object).map(key => {
        if(object[key]) string += object[key];
        return {};
    });
    return string;
}

export function insertType(cm, objectData){
    const doc = cm.getDoc();
    const cursor = doc.getCursor(); // gets the line number in the cursor position
    const line = doc.getLine(cursor.line); // get the line contents
    const pos = { // create a new object to avoid mutation of the original selection
        line: cursor.line,
        ch: line.length // set the character position to the end of the line
    }
    const dataString = combineKeyObjectToString(objectData);
    let lineSelection = cursor.line;

    if(line.length > 0){
        doc.replaceRange(`\n${dataString}\n`, pos); // adds a new line
        lineSelection++;
    }
    else{
        doc.replaceRange(`${dataString}\n`, pos); // adds a new line
    }
    updateSelection(cm, lineSelection, objectData)
}

export function updateSelection(cm, lineSelection, objectData){
    const chStart = objectData.before.length;
    const chEnd = objectData.placeholder.length + chStart;
    cm.setSelection({ line: lineSelection, ch: chStart }, { line: lineSelection, ch: chEnd});
    cm.focus();
}

export function insertImage(cm, image){
    const objectData = {
        before: '(![',
        placeholder: 'description for image',
        after: `](${image}))`
    }
    return insertType(cm, objectData)
}