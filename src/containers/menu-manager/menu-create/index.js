import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {push} from 'react-router-redux';
import {Toaster, Breadcrumb} from 'components/layouts';
import MenuSortableManager from '../menu-sortable-manager';
import {createMenu} from 'redux/actions/menuAction';

export default class MenuCreate extends Component {
    @autobind
    handleSave(menuData, dispatch){
        createMenu(menuData).then(menuRes => {
            dispatch(push(`/menus/edit/${menuRes._id}`));
        });
        Toaster.show({message: 'Created menu successfuly'});
    }

    render() {
        return <div>
            <Breadcrumb id="createMenu" name="Create Menu"/>
            <MenuSortableManager
                onSave={this.handleSave}
            />
        </div>
    }
}
MenuCreate.propTypes = {}

