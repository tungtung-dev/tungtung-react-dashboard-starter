import React, {Component} from 'react';
import {Breadcrumb} from 'components/layouts/index';

export default class SettingWrapper extends Component {
    render() {
        return <div>
            <Breadcrumb id="setting-manager" href="/setting" name="Settings"/>
            {this.props.children}
        </div>
    }
}
SettingWrapper.propTypes = {}

