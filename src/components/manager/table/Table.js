import React, {Component, PropTypes} from 'react';
import {Table} from 'reactstrap';
import {autobind} from 'core-decorators';
import {Spinner} from '@blueprintjs/core';
import Equal from 'deep-equal';
import Row from './row';
import {Flex} from '../../layouts';
import {Checkbox} from '../../form';
import update from 'react-addons-update';

export default class TableCustom extends Component {
    @autobind
    handleCheckItem(e, check_key_value, checkboxProps){
       const {onChange, checkedData} = checkboxProps;
        if(e.target.checked){
            onChange(
                update(checkedData, {
                    $push: [check_key_value]
                })
            )
        }
        else{
            onChange(
                update(checkedData, {
                    $set: checkedData.filter(checked_key_value => check_key_value !== checked_key_value)
                })
            )
        }
    }

    isCheckedItem(item, checkboxProps){
        const {keyData, checkedData} = checkboxProps;
        if(checkedData.indexOf(item[keyData]) > -1) return true;
        return false;
    }

    getPropsColumn() {
        return this.props.children.map(child => {
            return child.props;
        });
    }

    getIndex(pagination, rowIndex){
        const {page, item_per_page} = pagination;
        return (page-1) * item_per_page + rowIndex + 1;
    }

    getCellShowIndex(cellProps, rowIndex){
        const {showIndex, pagination} = cellProps;
        return {
            showIndex,
            component: this.getIndex(pagination, rowIndex),
        }
    }

    getCellCheckbox(item, cellProps){
        const {showCheckbox, checkboxProps: {keyData}, checkboxProps} = cellProps;
        return {
            showCheckbox,
            component: <Checkbox checked={this.isCheckedItem(item, checkboxProps)} onChange={(e) => this.handleCheckItem(e, item[keyData], checkboxProps)}/>,
            className: 'checkbox'
        }
    }

    getCells(item, rowIndex, props) {
        return this.props.children.map(child => {
            const {showIndex, showCheckbox, style, className}  = child.props;
            let cellProps = {};
            if(showIndex){
                cellProps = this.getCellShowIndex(child.props, rowIndex);
            } else if(showCheckbox){
                cellProps = this.getCellCheckbox(item, child.props);
            } else {
                cellProps = {
                    component: child.props.cell(item, rowIndex, props)
                }
            }
            return {
                style,
                className,
                ...cellProps,

            }
        });
    }

    renderThead() {
        return (
            <thead className="thead-default">
            <tr key="index">
                {this.getPropsColumn().map((props, index) =>
                    <th key={index} style={props.style} className={props.className}>{props.header()}</th>
                )}
            </tr>
            </thead>
        )
    }

    renderTbody() {
        return <tbody>
        {this.props.data.map((item, index) => <Row key={index} cells={this.getCells(item, index, this.props)} tableProps={this.props}/>)}
        {this.props.data.length === 0 && <tr><td colSpan={this.getPropsColumn().length}>{this.props.renderEmpty()}</td></tr>}
        </tbody>
    }

    shouldComponentUpdate(prevProps){
        return !Equal(this.props, prevProps);
    }

    renderLoading(){
        const style = {
            backgroundColor: 'rgba(0,0,0,.04)',
            zIndex: 1,
            position:'absolute',
            width: '100%',
            height: '100%'
        };
        return <Flex className="overlay" alignItems="center" justifyContent="center" style={style}>
            <Spinner/>
        </Flex>
    }

    render() {
        const {className, responsive, striped, bordered, size, isLoading, showLoading} = this.props;
        const propsTable = {responsive, striped, bordered, size, className: `tt-table ${className}`};
        return (
            <div style={{position: 'relative'}}>
                {isLoading && showLoading && this.renderLoading()}
                <Table {...propsTable} size="normal">
                    {this.renderThead()}
                    {this.renderTbody()}
                </Table>
            </div>
        )
    }
}

TableCustom.defaultProps = {
    renderEmpty: () => 'No data'
}

TableCustom.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    showLoading: PropTypes.bool,
    renderEmpty: PropTypes.func
}