import React,{PureComponent, PropTypes} from 'react';
import ValidateWrapControl from '../validate-wrap-control/index';

const limitRow = 0;

export default class Textarea extends PureComponent {
    constructor() {
        super(...arguments);
        this._handleChange = (e) => {
            const value = e.target.value;
            const lines = value.split('\n').length + limitRow;
            this.props.onChange(e.target.value);
            this.updateRows(lines);
        }
    }

    updateRows(lines) {
        if (this.props.autoResize) {
            var prevLines = parseInt(this.refs.textarea.getAttribute('rows'), 10);
            if (prevLines !== lines && lines > 1) {
                this.refs.textarea.setAttribute('rows', lines);
            }
        }
    }

    componentDidMount() {
        if (this.props.value) {
            const lines = this.props.value.split('\n').length + limitRow;
            this.updateRows(lines);
        }
    }

    render() {
        var props = {
            ...this.props,
            onChange: this._handleChange,
        }
        var componentRight = <a href="http://emoji.codes/" className="none" target="_blank">
            <i className="icon-emotsmile"/> Emojis code
        </a>

        return (
            <ValidateWrapControl {...this.props} right={componentRight}>
                <textarea className="form-control" ref="textarea" {...props}/>
            </ValidateWrapControl>
        )
    }
}
//                <FormControl ref="textarea" componentClass="textarea" {...props}/>

Textarea.propTypes = {
    autoResize: PropTypes.bool
}