import React, {PureComponent, PropTypes} from 'react';
import Select from 'react-select';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/jsx/jsx.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/ruby/ruby.js';
import 'codemirror/mode/ruby/ruby.js';
import 'codemirror/mode/clike/clike.js';

const options = [
    {
        value: 'frontend', label: 'Frontend', children: [
            {value: 'javascript', label: 'Javascript'},
            {value: 'jsx', label: 'JSX'},
            {value: 'htmlmixed', label: 'HTML'},
            {value: 'css', label: 'CSS'},
        ]
    },
    {
        value: 'backend', label: 'Backend', children: [
            {value: 'text/x-java', label: 'Java'},
            {value: 'text/x-c++src', label: 'C/C++'},
            {value: 'text/x-php', label: 'PHP'},
            {value: 'python', label: 'Python'},
            {value: 'go', label: 'Golang'},
            {value: 'ruby', label: 'Ruby'},
            {value: 'application/x-aspx', label: 'C#'},
        ]
    }
]

export default class SelectModes extends PureComponent {
    transformOptions() {
        const option = (value, label, render, disabled = false) => ({value, label, render, disabled});

        return options.reduce((acc, o) => {
            const parent = option(o.value, o.label, (<strong style={{color: 'red'}}>{o.label} label herhe</strong>), true);
            const children = o.children.map(c => option(c.value, c.label, <div style={{paddingLeft: 10}}>{c.label}</div>));
            return acc.concat(parent).concat(children);
        }, []);
    }

    renderValue(item) {
        return <div>
            <i className="fa fa-code"/> {item.label}
        </div>
    }

    render() {
        return (
            <Select
                options={this.transformOptions()}
                valueRenderer={this.renderValue}
                {...this.props}
            />
        )
    }
}

SelectModes.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}
