import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Tabs} from '@blueprintjs/core';
import Flex from '../flex';

import "./style.scss";

export default class TabsCustom extends Component {
    render() {
        const className = classnames('tt-tabs',{'pt-vertical': this.props.vertical});
        return  <Tabs className={className}>
                {this.props.children}
            </Tabs>
    }
}

Tabs.propTypes = {
    vertical: PropTypes.bool,
    rightComponent: PropTypes.any
}

