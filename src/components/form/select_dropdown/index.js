import React, {Component, PropTypes} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

const edit_item = {
    icon: 'icon-pencil',
    value: 'edit',
    name: 'Edit'
}

const delete_item = {
    icon: 'icon-trash',
    value: 'delete',
    name: 'Delete'
}

export default class SelectDropDown extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            isOpen: false
        }
        this.toggle = () => {
            this.setState({isOpen: !this.state.isOpen});
        }
        this.onClickItem = (value) => {
            switch (value){
                case 'delete':
                    this.props.onDelete();
                    break;
                case 'edit':
                    this.props.onEdit();
                    break;
                default:
                    this.props.onChange(value);
            }
        }
    }

    getCurrentItemValue(){
        const {value, items} = this.props;
        const item = items.find((v) => v.value === value);
        if(item) return item;
        else if(items.length > 0) return items[0];
        return {};
    }

    renderItem(item){
        return <span>
            {item.icon && <i className={item.icon}/>} {item.name}
        </span>
    }

    render() {
        const currentItem = this.getCurrentItemValue();
        var {items, onEdit, onDelete} = this.props;
        if(onEdit) items = [...items, edit_item];
        if(onDelete) items = [...items, delete_item];

        return (
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle>
                    {this.renderItem(currentItem)} <i className="fa fa-caret-down"/>
                </DropdownToggle>
                <DropdownMenu right>
                    {items.map(item => <DropdownItem key={item.value} onClick={() => this.onClickItem(item.value)}>
                        {this.renderItem(item)}
                    </DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        )
    }
}

SelectDropDown.propTypes = {
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        icon: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string
    })),
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}
