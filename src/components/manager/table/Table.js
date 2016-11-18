import React, {Component, PropTypes} from 'react';
import {Table} from 'reactstrap';
import {Loader} from '../../form/index';
import Equal from 'deep-equal';
import Row from './row';

export default class TableCustom extends Component {
    getPropsColumn() {
        return this.props.children.map(child => {
            return child.props;
        });
    }

    getIndex(pagination, rowIndex){
        const {page, item_per_page} = pagination;
        return (page-1) * item_per_page + rowIndex + 1;
    }

    getCells(item, rowIndex, props) {
        return this.props.children.map(child => {
            const {showIndex, pagination, style, className}  = child.props;
            return {
                showIndex,
                component: pagination ? this.getIndex(pagination, rowIndex) : child.props.cell(item, rowIndex, props),
                style,
                className
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
        {this.props.data.map((item, index) => <Row key={index} cells={this.getCells(item, index, this.props)}/>)}
        {this.props.data.length === 0 && <tr><td colSpan={this.getPropsColumn().length}>{this.props.renderEmpty()}</td></tr>}
        </tbody>
    }

    shouldComponentUpdate(prevProps){
        return !Equal(this.props, prevProps);
    }

    render() {
        const {responsive, striped, bordered, size} = this.props;
        const propsTable = {responsive, striped, bordered, size};
        return (
            <div style={{position: 'relative'}}>
                {this.props.showLoading && this.props.isLoading &&
                <div className="overlay" style={{backgroundColor: 'rgba(255,255,255,.8)',zIndex:'1',position:'absolute',width: '100%', height: '100%',display:'flex', alignItems: 'center',justifyContent: 'center'}}>
                    <Loader/>
                </div>
                }
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