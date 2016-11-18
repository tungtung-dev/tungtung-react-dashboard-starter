import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    Classes,
    CollapsibleList,
    MenuItem
} from '@blueprintjs/core';
import classnames from 'classnames';
import "./style.scss";

@connect((state) => {
    const {breadcrumbs} = state.defaultLoad;
    return {
        breadcrumbs
    }
})
class BreadCrumbBar extends PureComponent{
    renderBreadcrumb(props) {
        if (!props.isCurrent) {
            return <Link to={props.href} className={Classes.BREADCRUMB}>
                <i className={props.iconName}/> {props.text}
            </Link>;
        } else {
            return <span className={classnames(Classes.BREADCRUMB, Classes.BREADCRUMB_CURRENT)}>
                <i className={props.iconName}/> {props.text}
            </span>;
        }
    }

    render(){
        return <div className="tt-breadcrumb-bar">
            <CollapsibleList
                className={Classes.BREADCRUMBS}
                dropdownTarget={<span className={Classes.BREADCRUMBS_COLLAPSED} />}
                renderVisibleItem={this.renderBreadcrumb}
            >
                {this.props.breadcrumbs.map((breadcrumb, index) =>
                    <MenuItem key={index} iconName={breadcrumb.icon} isCurrent={index === this.props.breadcrumbs.length - 1}  href={breadcrumb.href} text={breadcrumb.name}/>
                )}
            </CollapsibleList>
        </div>
    }
}

export default BreadCrumbBar;