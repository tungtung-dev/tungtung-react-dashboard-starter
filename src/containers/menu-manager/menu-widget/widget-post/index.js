import React, {Component, PropTypes} from 'react';
import {WIDGET_CATEGORY} from '../constants';
import {Box, Title} from 'components/layouts';
import {InputText, Button} from 'components/form';
import {autobind} from 'core-decorators';
import SelectCategory from '../../../category-manager/select-category';
import Widget from '../widget';

export default class WidgetPost extends Widget {
    getTitle(){
        return 'Add post';
    }

    @autobind
    handleSubmit(){
        const {name, slug, data} = this.state;
        this.props.onSubmit({
            type: WIDGET_CATEGORY,
            name, slug, data
        });
        this.resetData();
    }

    renderCustomData(){
        return <SelectCategory value={this.state.data.value} onChange={this.handleChangeData}/>
    }
}

WidgetPost.propTypes = {
    onSubmit: PropTypes.func
}

