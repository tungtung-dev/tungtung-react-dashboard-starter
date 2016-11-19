import React, {PureComponent} from 'react';
import {Input} from 'reactstrap';
import ValidateWrapControl from '../validate-wrap-control/index';
import {cleanPropsReduxForm} from '../../../utils/index';

export default class InputText extends PureComponent {
    render(){
        return <ValidateWrapControl {...this.props}>
            <Input className={`form-control-${this.props.status}`} {...cleanPropsReduxForm(this.props)}/>
        </ValidateWrapControl>
    }
}