export function insertType(cm, data){
    var doc = cm.getDoc();
    var cursor = doc.getCursor(); // gets the line number in the cursor position
    var line = doc.getLine(cursor.line); // get the line contents
    var pos = { // create a new object to avoid mutation of the original selection
        line: cursor.line,
        ch: line.length // set the character position to the end of the line
    }
    if(line.length > 0){
        doc.replaceRange(`\n${data}\n`, pos); // adds a new line
    }
    else{
        doc.replaceRange(`${data}\n`, pos); // adds a new line
    }
}

export function insertImage(cm, image){
    return insertType(cm, `(![alt text](${image}))`)
}