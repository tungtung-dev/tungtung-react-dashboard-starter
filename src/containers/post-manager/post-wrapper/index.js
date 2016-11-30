import React, {Component} from 'react';
import {Breadcrumb} from 'components/layouts';

export default class PostWrapper extends Component {
    render() {
        return <div>
            <Breadcrumb id="posts-manager" href="/posts" name="Posts manager"/>
            {this.props.children}
        </div>
    }
}
PostWrapper.propTypes = {}

