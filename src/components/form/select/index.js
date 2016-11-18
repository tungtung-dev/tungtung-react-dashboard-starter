import React,{PureComponent} from 'react';
import {FormControl} from 'reactstrap';
import ValidateWrapControl from '../validate_wrap_control/index';

export default class Select extends PureComponent {
    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <FormControl componentClass="select" {...this.props}>
                    {this.props.children}
                </FormControl>
            </ValidateWrapControl>
        )
    }
}

