import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {push} from 'react-router-redux';
import {Toaster} from 'components/layouts';
import MenuSortableManager from '../menu-sortable-manager';

export default class MenuCreate extends Component {
    @autobind
    handleSave(menuData, dispatch){
        console.log(menuData);
        Toaster.show({message: 'Created menu successfuly'});
    }

    render() {
        return <div>
            <h4>Add menu</h4>
            <MenuSortableManager
                onSave={this.handleSave}
            />
        </div>
    }
}
MenuCreate.propTypes = {}

