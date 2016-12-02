import React, {Component} from 'react';
import {Breadcrumb} from 'components/layouts';

export default class CategoryWrapper extends Component {
    render() {
        return <div>
            <Breadcrumb id="category_mananager" href="/categories"/>
            {this.props.children}
        </div>
    }
}

