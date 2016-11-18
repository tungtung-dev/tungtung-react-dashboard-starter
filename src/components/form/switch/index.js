import React from 'react';
import {cleanPropsReduxForm} from '../../../utils/index';
import {Switch} from '@blueprintjs/core';

export default class SwitchCustom extends React.Component {
    render() {
        return <Switch checked={(this.props.value | this.props.checked) ? true : false} label={this.props.label} {...cleanPropsReduxForm(this.props)}/>
    }
}
