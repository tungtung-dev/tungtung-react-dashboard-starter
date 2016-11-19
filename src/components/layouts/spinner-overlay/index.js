import React, {Component, PropTypes} from 'react';
import {Spinner} from '@blueprintjs/core';
import classnames from 'classnames';
import {getStyleFromProps} from '../../../utils/index';
import Flex from '../flex';

import "./style.scss";

export default class SpinnerOverlay extends Component {
    render() {
        const style = getStyleFromProps(['backgroundColor'],this.props);
        return <Flex className={classnames('tt-spiner-overlay',{'fixed': this.props.fixed})} style={style} alignItems="center" justifyContent="center">
            <Spinner className={classnames({'tt-sm': this.props.sm})}/>
        </Flex>
    }
}
SpinnerOverlay.propTypes = {
    sm: PropTypes.bool,
    fixed: PropTypes.bool,
    backgroundColor: PropTypes.string
}

