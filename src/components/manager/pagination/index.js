import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import './style.scss';

export default class Pagination extends Component {
    constructor() {
        super(...arguments);
        var page = 1;
        if (this.props.location && this.props.location.query.page) {
            page = this.props.location.query.page;
        }
        else if (this.props.page) {
            page = this.props.page
        }

        this.state = {
            page
        }
    }

    @autobind
    _onChange(page) {
        if (!isNaN(page)) {
            if (page <= this.getMaxPage() && page >= 1) {
                this.setState({page});
                this.props.onChange(page);
            }
        }
    }

    @autobind
    checkDisableNext() {
        if (this.state.page >= this.getMaxPage()) return true;
        return false;
    }

    @autobind
    checkDisablePrev() {
        if (this.state.page <= 1) return true;
        return false;
    }

    @autobind
    onNext() {
        if (!this.checkDisableNext()) {
            let page = this.state.page;
            page++;
            this._onChange(page);
        }
    }

    @autobind
    onPrev() {
        if (!this.checkDisablePrev()) {
            let page = this.state.page;
            page--;
            this._onChange(page);
        }
    }

    @autobind
    onChangeInput(e) {
        let page = e.target.value;
        this.setState({page});
    }

    @autobind
    onChangeInputKeyDown(e) {
        if (e.keyCode === 13) {
            this._onChange(this.state.page);
        }
    }

    @autobind
    reset() {
        this.setState({page: 1});
    }

    @autobind
    getMaxPage() {
        const {item_per_page, total_item} = this.props;
        var max_page = 0;
        max_page = parseInt(total_item / item_per_page, 10);
        if (total_item % item_per_page > 0) max_page++;
        return !isNaN(max_page) ? max_page : 0;
    }

    render() {
        const {total_item} = this.props;
        return (
            <div className="table-pagination clearfix">
                <button className="btn btn-default" onClick={this.onPrev} disabled={this.checkDisablePrev()}><i
                    className="fa fa-chevron-left"></i></button>
                <input type="text" className="form-control" value={this.state.page}
                       onKeyDown={this.onChangeInputKeyDown} onChange={this.onChangeInput}/>
                <button className="btn btn-default" onClick={this.onNext} disabled={this.checkDisableNext()}><i
                    className="fa fa-chevron-right"></i></button>
                <div className="pull-left" style={{marginTop: 4}}>
                    &nbsp;&nbsp;<span>{this.getMaxPage().toString()} trang</span> |
                    <span>{total_item.toString()} items được tìm thấy </span>
                </div>
            </div>
        )
    }
}

Pagination.defaultProps = {
    total_item: 0,
    item_per_page: 0,
    page: 1
}

Pagination.propTypes = {
    total_item: PropTypes.number,
    item_per_page: PropTypes.number,
    page: PropTypes.number,
    onChange: PropTypes.func
}

