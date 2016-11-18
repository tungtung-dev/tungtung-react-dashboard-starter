import React from 'react';
import {cleanPropsReduxForm} from '../../../utils/index';
import {Checkbox} from '@blueprintjs/core';

export default class CheckboxCustom extends React.Component {
    render() {
        return <Checkbox checked={(this.props.value | this.props.checked) ? true : false} {...cleanPropsReduxForm(this.props)}>
            {this.props.children}
        </Checkbox>
    }
}