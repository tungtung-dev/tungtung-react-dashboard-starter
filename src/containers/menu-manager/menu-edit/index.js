import React, {Component, PropTypes} from 'react';
import {reduxAwait} from 'utils';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators'
import {getMenu, updateMenu} from 'redux/actions/menuAction';
import MenuSortableManager from '../menu-sortable-manager';

@reduxAwait((state) => ({
    menu: state.menu.currentMenu
}), dispatch => bindActionCreators({getMenu, updateMenu}, dispatch))
export default class MenuEdit extends Component {
    componentDidMount(){
        const {menuId} = this.props.params;
        this.props.getMenu(menuId);
    }

    @autobind
    handleSave(values, dispatch){
        console.log(values);
    }

    render() {
        return <div>
            <MenuSortableManager
                initialValues={this.props.menu}
                onSave={this.handleSave}
            />
        </div>
    }
}
MenuEdit.propTypes = {}

