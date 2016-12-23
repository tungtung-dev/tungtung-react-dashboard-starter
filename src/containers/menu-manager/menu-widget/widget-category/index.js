import React, {PropTypes} from 'react';
import {WIDGET_CATEGORY} from '../constants';
import {autobind} from 'core-decorators';
import SelectCategory from '../../../category-manager/select-category';
import Widget from '../widget';
import uuid from 'uuid';

export default class WidgetCategory extends Widget {
    getTitle(){
        return 'Add category';
    }

    getEditTitle(){
        return 'Edit category'
    }

    getIcon(){
        return <i className="icon-directions"/>
    }

    getConfig(){
        return {
            name: true,
            slug: false
        }
    }

    @autobind
    handleSubmit(){
        if(this.checkValidate()){
            const {name, slug, data} = this.state;
            this.props.onSubmit({
                type: WIDGET_CATEGORY,
                id: this.props.id ? this.props.id : uuid.v4(),
                name, slug, data
            });
            this.resetData();
        }

    }

    renderCustomData(){
        return <SelectCategory title="Category" value={this.state.data.value} onChange={this.handleChangeData}/>
    }
}

WidgetCategory.propTypes = {
    onSubmit: PropTypes.func
}

