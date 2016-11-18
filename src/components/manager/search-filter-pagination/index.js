import React, {PureComponent, PropTypes} from 'react';
import {Collapse} from 'reactstrap';
import {autobind} from 'core-decorators';
import {Box, Flex, Pagination} from '../../layouts';
import {Link, InputText} from '../../form';

export default class SearchFilterPagination extends PureComponent {
    state = {
        collapse: false
    }

    @autobind
    toggleFilters(e){
        if(e) e.preventDefault();
        this.setState({collapse: !this.state.collapse})
    }

    renderFilter(){
        const {customText} = this.props.filterProps;
        return <Link className="font-size-14" styleColor="purple" onClick={this.toggleFilters}>
            {customText ? customText : <span><i className="icon-notebook"/> Filters</span>}
        </Link>
    }

    renderFilterCollapse(){
        if (this.props.isFilter)
            return <Collapse isOpen={this.state.collapse}>
                <Box backgroundStyle="gray" style={{marginBottom: 10}} sm>
                    {this.props.children}
                </Box>
            </Collapse>;
        return null;
    }

    renderSearch(){
        return <InputText placeholder="search ..." {...this.props.searchProps} noBottom/>
    }

    renderPagination(){
        return <Pagination {...this.props.paginationProps}/>
    }

    render() {
        return <div>
            <Flex justifyContent="space-between" wrap="wrap" alignItems="center">
                {this.renderPagination()}
                <Flex justifyContent="space-between" alignItems="center">
                    {this.props.isFilter && this.renderFilter()}
                    &nbsp; &nbsp;
                    {this.props.isSearch && this.renderSearch()}
                </Flex>
            </Flex>
            {this.renderFilterCollapse()}
        </div>
    }
}

SearchFilterPagination.defaultProps = {
    paginationProps: {},
    searchProps: {},
    filterProps: {}
}

SearchFilterPagination.propTypes = {
    isSearch: PropTypes.bool,
    isFilter: PropTypes.bool,
    paginationProps: PropTypes.object,
    searchProps: PropTypes.object,
    filterProps: PropTypes.object
}