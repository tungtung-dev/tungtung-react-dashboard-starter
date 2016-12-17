import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import WidgetCategory from './widget-category';
import WidgetCustomLink from './widget-custom-link';

export default class MenuWidget extends Component {
    @autobind
    onOpenWidgetCategory(){
        this.refs.widgetCustomLink.toggleHide();
        //this.refs.widgetCustomLink.toggleHide();
    }

    @autobind
    onOpenWidgetCustomLink(){
        this.refs.widgetCategory.toggleHide();
        //this.refs.widgetCustomLink.toggleHide();
    }

    componentDidMount(){
        this.refs.widgetCategory.toggleForm();
    }

    render() {
        return <div>
            <WidgetCategory ref="widgetCategory" onOpen={this.onOpenWidgetCategory} onSubmit={this.props.onSubmit}/>
            <WidgetCustomLink ref="widgetCustomLink" onOpen={this.onOpenWidgetCustomLink} onSubmit={this.props.onSubmit}/>
        </div>
    }
}

MenuWidget.propTypes = {
    onSubmit: PropTypes.func
}