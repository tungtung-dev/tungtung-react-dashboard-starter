import React, {Component, PropTypes} from 'react';
import Select, {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import ValidateWrapControl from '../validate_wrap_control/index';
import "./style.scss"

export default class SelectTag extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            options: this.props.options
        }
    }
    getValue() {
        if (Array.isArray(this.props.value)) {
            console.log(this.props.value.map(v => v.value).join(','));
            return this.props.value.map(v => v.value).join(',')
        }
        return this.props.value;
    }

    onChange(options) {
        this.setState({options: options});
    }

    onInputKeyDown({ label, labelKey, valueKey }) {
        return {
            value: label,
            label: label
        }
    }

    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <Creatable multi {...this.props}
                           options={this.state.options}
                           value={this.getValue()}
                           onBlur={()=>{this.props.onBlur(this.props.value)}}
                />
            </ValidateWrapControl>
        )
    }
}

SelectTag.propTypes = {}
