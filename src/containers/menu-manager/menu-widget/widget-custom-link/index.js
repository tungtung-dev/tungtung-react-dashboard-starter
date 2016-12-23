import React, {PropTypes} from 'react';
import {WIDGET_CUSTOM_LINK} from '../constants';
import {InputText} from 'components/form';
import {autobind} from 'core-decorators';
import Widget from '../widget';
import uuid from 'uuid';

export default class WidgetCustomLink extends Widget {
    getConfig() {
        return {
            name: true,
            slug: false
        }
    }

    getIcon(){
        return <i className="icon-link"/>
    }

    getTitle() {
        return 'Add custom link';
    }

    getEditTitle(){
        return 'Edit custom link';
    }

    @autobind
    checkData(){
        if(!this.state.data.url) return false;
        return true;
    }

    @autobind
    handleSubmit() {
        if (this.checkValidate(this.checkData)) {
            const {name, data} = this.state;
            this.props.onSubmit({
                type: WIDGET_CUSTOM_LINK,
                id: this.props.id ? this.props.id : uuid.v4(),
                name, data
            });
            this.resetData(() => {
                this.setState({
                    data: {url: ''}
                });
            });
        }
    }

    @autobind
    handleChangeData(e) {
        this.setState({
            data: {
                url: e.target.value
            }
        })
    }

    renderCustomData() {
        return <InputText title="Link" value={this.state.data.url} onChange={this.handleChangeData}/>
    }
}

WidgetCustomLink.propTypes = {
    onSubmit: PropTypes.func
}

