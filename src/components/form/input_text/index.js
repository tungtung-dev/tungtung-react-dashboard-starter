import React, {PureComponent} from 'react';
import {Input} from 'reactstrap';
import ValidateWrapControl from '../validate_wrap_control/index';

var cleanInputText = (props) => {
    let newProps = {...props};
    let keys = [`initialValue`, `autofill`, `onUpdate`, `valid`, `invalid`, `dirty`, `pristine`, `error`, `active`, `touched`, `visited`, `autofilled`];
    keys.map(key => {
        delete newProps[key];
        return {}
    });
    return newProps;
}

export default class InputText extends PureComponent {
    render(){
        return <ValidateWrapControl {...this.props}>
            <Input className={`form-control-${this.props.status}`} {...cleanInputText(this.props)}/>
        </ValidateWrapControl>
    }
}
