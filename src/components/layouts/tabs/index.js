import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import classname from 'classnames';
import './style.scss';

export default class Tabs extends PureComponent{
    @autobind
    handleClickTab (e, tab_value){
        e.preventDefault();
        this.props.onChange(tab_value);
    }

    render(){
        const {tabSelected, tabs} = this.props;
        return (
            <ul className="tt-manager-tabs clearfix">
                {tabs.map((tab, index) =>
                    <li key={index} className={classname({'active': tab.value === tabSelected})}>
                        <a onClick={(e) => this.handleClickTab(e, tab.value)}>
                            <span><i className={tab.icon} style={{color: tab.color}}/>{' '} {tab.text}</span>
                        </a>
                    </li>
                )}
                {this.props.children}
            </ul>
        )
    }
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.string
    })),
    tabSelected: PropTypes.string,
    onChange: PropTypes.func.isRequired
}