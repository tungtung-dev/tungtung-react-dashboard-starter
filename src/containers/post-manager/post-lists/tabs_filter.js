import React, {Component, PropTypes} from 'react';
import {Link} from '../../../components/form';
import {Tabs} from '../../../components/layouts';

const TAB_ALL = 'POST/tab-all';
const TAB_PUBLISH = 'POST/tab-publish'
const TAB_DRAFT = 'POST/tab-draft'

const TABS = [
    {value: TAB_ALL, text:'All'},
    {value: TAB_PUBLISH, text:'Publish'},
    {value: TAB_DRAFT, text: 'Draft'},
];

export default class TabFilters extends Component {
    render() {
        return <Tabs tabs={TABS} tabSelected={this.props.tabSelected} onChange={this.props.onChange}>
            <li className="pull-right">
                <Link to="post"><i className="icon-plus"/> New post</Link>
            </li>
        </Tabs>
    }
}
TabFilters.propTypes = {
    onChange: PropTypes.func,
    tabSelected: PropTypes.string
}
