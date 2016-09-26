import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';

export default class BookChapter extends Component {
    render() {
        const {index, title, content} = this.props;
        return (
            <div>
                <h4>Chapter {index + 1}: {title}</h4>
                <div>
                    <p>Here, the variable value is defined and initialized using let, but that statement is never
                        executed because the previous line throws an error. The issue is that value exists in what the
                        JavaScript community has dubbed the temporal dead zone (TDZ). The TDZ is never named explicitly
                        in the ECMAScript specification, but the term is often used to describe why let and const
                        declarations are not accessible before their declaration. This section covers some subtleties of
                        declaration placement that the TDZ causes, and although the examples shown all use let, note
                        that the same information applies to const.

                        When a JavaScript engine looks through an upcoming block and finds a variable declaration, it
                        either hoists the declaration to the top of the function or global scope (for var) or places the
                        declaration in the TDZ (for let and const). Any attempt to access a variable in the TDZ results
                        in a runtime error. That variable is only removed from the TDZ, and therefore safe to use, once
                        execution flows to the variable declaration.

                        This is true anytime you attempt to use a variable declared with let or const before it’s been
                        defined. As the previous example demonstrated, this even applies to the normally safe typeof
                        operator. You can, however, use typeof on a variable outside of the block where that variable is
                        declared, though it may not give the results you’re after. Consider this code:</p>
                    <p>This loop works exactly like the loop that used var and an IIFE but is, arguably, cleaner. The
                        let declaration creates a new variable i each time through the loop, so each function created
                        inside the loop gets its own copy of i. Each copy of i has the value it was assigned at the
                        beginning of the loop iteration in which it was created. The same is true for for-in and for-of
                        loops, as shown here:</p>
                </div>
            </div>
        )
    }
}

BookChapter.propTypes = {
    title: PropTypes.string,
    content: PropTypes.any
}