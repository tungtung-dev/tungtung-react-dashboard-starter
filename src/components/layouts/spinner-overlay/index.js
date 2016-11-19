import React, {Component, PropTypes} from 'react';
import {Spinner} from '@blueprintjs/core';
import classnames from 'classnames';
import Flex from '../flex';

import "./style.scss";

export default class SpinnerOverlay extends Component {
    render() {
        return <Flex className={classnames('tt-spiner-overlay',{'fixed': this.props.fixed})} alignItems="center" justifyContent="center">
            <Spinner className={classnames({'tt-sm': this.props.sm})}/>
        </Flex>
    }
}
SpinnerOverlay.propTypes = {
    sm: PropTypes.bool,
    fixed: PropTypes.bool
}

