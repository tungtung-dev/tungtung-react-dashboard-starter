import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import MenuCard from '../menu-card';
import SortableTree from 'react-sortable-tree';
import {Button, Link} from 'components/form';
import {Flex, Title, Icon} from 'components/layouts';
import {Popover, PopoverContent} from 'reactstrap';
import {getWidgetComponent} from '../../menu-widget/utils';
import {updateNodeData, deleteNodeData} from '../utils';

class MenuDetail extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        onDelete: PropTypes.func
    }

    state = {
        isOpen: false
    }

    @autobind
    toggleEdit(e) {
        if (e) e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    }

    @autobind
    handleDelete(e) {
        e.preventDefault();
        this.toggleEdit();
        this.props.onDelete(this.props.id, this.props.path);
    }

    @autobind
    handleSubmit(data) {
        this.toggleEdit();
        this.props.onSubmit(this.props.id, this.props.path, data);
    }

    renderWidgetForm() {
        const ComponentMenuForm = getWidgetComponent(this.props.type);
        if (!ComponentMenuForm) return null;
        return <ComponentMenuForm
            isOpen
            isEdit {...this.props}
            onSubmit={this.handleSubmit}
            onDelete={this.handleDelete}
        />
    }

    render() {
        const {name, id} = this.props;
        const targetId = `toggle-menu-${id}`;
        return <Flex paddingLeft={10} alignItems="center">
            {name}
            <Button id={targetId} className="btn-transparent" onClick={this.toggleEdit}>
                <Icon name="caret-down" fontAwesome/>
            </Button>
            <Popover className="tt-menu-popover" placement="bottom" isOpen={this.state.isOpen} target={targetId}
                     toggle={this.toggleEdit}>
                <PopoverContent>
                    {this.renderWidgetForm()}
                </PopoverContent>
            </Popover>
        </Flex>
    }
}

export default class MenuDragSortable extends PureComponent {
    constructor(props) {
        super(props);
    }

    @autobind
    handleDeleteMenu(id, path) {
        this.props.onChange(deleteNodeData(this.props.treeData, id, path));
    }

    @autobind
    handleUpdateMenu(id, path, data) {
        this.props.onChange(updateNodeData(this.props.treeData, path, data));
    }

    @autobind
    renderMenuDetail(node, otherProps) {
        return <MenuDetail
            {...node}
            path={otherProps.path} 
            onDelete={this.handleDeleteMenu}
            onSubmit={this.handleUpdateMenu}
        />
    }

    render() {
        return <div className="tt-menu-lists" style={{ height: 600 }}>
            {this.props.treeData.length === 0 && <Flex width="100%" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
                <Title element="h2" marginTop={10} styleColor="black-white">
                    <Icon name="folder-open" fontSize={20} bluePrintIcon/>
                </Title>
                <Title element="h2" marginTop={15} styleColor="black-white">
                    No have menu, please add me from left
                </Title>
            </Flex>}
            {this.props.treeData.length > 0 && <SortableTree
                treeData={this.props.treeData}
                onChange={this.props.onChange}
                nodeContentRenderer={MenuCard}
                generateNodeProps={(props) => {
                    return {
                        ...props,
                        renderRow: this.renderMenuDetail
                    };
                }}
                rowHeight={50}
            />}
        </div>
    }
}

MenuDragSortable.propTypes = {
    treeData: PropTypes.array,
    onChange: PropTypes.func
}
