import React,{Component} from 'react';
import {FormControl} from 'reactstrap';
import ValidateWrapControl from '../ValidateWrapControl';

export default class Select extends Component {
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

