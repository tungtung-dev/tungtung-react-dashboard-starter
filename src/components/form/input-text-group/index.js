import React, {Component} from 'react';
import {InputGroup} from '@blueprintjs/core';
import classnames from 'classnames';
import {cleanPropsReduxForm} from '../../../utils';
import "./style.scss";

export default class InputTextGroup extends Component {
    render() {
        return <InputGroup
            className={classnames(this.props.className,'tt-input-group-custom')}
            {...cleanPropsReduxForm(this.props)}
        />
    }
}
