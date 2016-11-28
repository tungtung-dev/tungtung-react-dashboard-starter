import React, {PureComponent, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import Paginate from 'react-paginate';
import classnames from 'classnames';
import './style.scss';

export default class Pagination extends PureComponent{
    @autobind
    handleChangePage(page){
        this.props.onChange(page.selected + 1);
    }

    render(){
        const {total_item, item_per_page, page, page_range_displayed, className} = this.props;
        return <Paginate
            containerClassName={classnames('tt-paginate', className)}
            previousLabel={<i className="fa fa-chevron-circle-left"/>}
            nextLabel={<i className="fa fa-chevron-circle-right"/>}
            pageNum={total_item / item_per_page}
            forceSelected={page - 1}
            pageRangeDisplayed={page_range_displayed}
            clickCallback={this.handleChangePage}
        />
    }
}

Pagination.defaultProps = {
    total_item: 0,
    item_per_page: 0,
    page: 1,
    page_range_displayed: 5
}

Pagination.propTypes = {
    total_item: PropTypes.number,
    item_per_page: PropTypes.number,
    page: PropTypes.any,
    page_range_displayed: PropTypes.number,
    onChange: PropTypes.func
}