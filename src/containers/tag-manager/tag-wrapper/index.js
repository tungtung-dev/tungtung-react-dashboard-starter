import React, {Component, PropTypes} from 'react';
import {Breadcrumb} from 'components/layouts';

export default class TagManager extends Component {
    render() {
        return <div>
            <Breadcrumb id="tag-manager" name="Tags manager"/>
            {this.props.children}
        </div>
    }
}
TagManager.propTypes = {}
