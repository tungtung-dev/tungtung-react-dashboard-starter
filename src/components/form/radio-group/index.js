import React, {Component, PropTypes} from 'react';
import {RadioGroup, Radio} from '@blueprintjs/core';
import ValidateWrapControl from '../validate-wrap-control';

export default class RadioGroupCustom extends Component {
    render() {
        return <ValidateWrapControl {...this.props}>
            <RadioGroup onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} valueSelected={this.props.value}>
                {this.props.labels.map((label, index) => <Radio {...label} key={index}/>)}
            </RadioGroup>
        </ValidateWrapControl>
    }
}
RadioGroupCustom.defaultProps = {
    labels: []
}
RadioGroupCustom.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.func,
}
