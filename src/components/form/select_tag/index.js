import React, {PureComponent, PropTypes} from 'react';
import {Creatable} from 'react-select';
import ValidateWrapControl from '../validate_wrap_control/index';
import 'react-select/dist/react-select.css';
import "./style.scss"

export default class SelectTag extends PureComponent {
    constructor(){
        super(...arguments);
        this.state = {
            options: this.props.options
        }
    }

    getValue() {
        if (Array.isArray(this.props.value)) {
            return this.props.value.map(v => v.value).join(',')
        }
        return this.props.value;
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

SelectTag.defaultProps = {
    options: []
}
SelectTag.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}
