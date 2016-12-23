import React, {Component, PropTypes} from 'react';
import {reduxAwait} from 'utils';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import {Toaster, Breadcrumb} from 'components/layouts';
import {getMenu, updateMenu} from 'redux/actions/menuAction';
import MenuSortableManager from '../menu-sortable-manager';

@reduxAwait((state) => ({
    menu: state.menu.currentMenu
}), dispatch => bindActionCreators({getMenu, updateMenu}, dispatch))
export default class MenuEdit extends Component {
    static propTypes = {
        menu: PropTypes.object
    }

    componentDidMount() {
        const {menuId} = this.props.params;
        this.props.getMenu(menuId);
    }

    @autobind
    handleSave(values, dispatch) {
        updateMenu(this.props.params.menuId, values);
        Toaster.show({message: 'Update menu successfully', intent: 1});
    }

    render() {
        const {menu} = this.props;
        return <div>
            {menu && <Breadcrumb id="menuEdit" name={`Edit ${menu.name}`}/>}
            {menu &&
                <MenuSortableManager
                    initialValues={menu}
                    onSave={this.handleSave}
                />
            }
        </div>
    }
}
MenuEdit.propTypes = {}

