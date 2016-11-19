import React, {PureComponent, PropTypes} from 'react';
import {Collapse} from 'reactstrap';
import {autobind} from 'core-decorators';
import {Box, Flex, Pagination} from '../../layouts';
import {InputTextGroup, Button} from '../../form';

export default class SearchFilterPagination extends PureComponent {
    state = {
        collapse: false,
        search: ''
    }

    @autobind
    handleChangeSearch(e){
        this.setState({search: e.target.value});
    }

    @autobind
    handleKeyDownSearch(e){
        if(e.keyCode === 13) this.props.onSearch(this.state.search)
    }

    changeSearch(search){
        this.setState({search});
    }

    @autobind
    toggleFilters(e){
        if(e) e.preventDefault();
        this.setState({collapse: !this.state.collapse})
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
        return <InputTextGroup
            leftIconName="search"
            rightElement={<Button onClick={this.toggleFilters} className="pt-minimal pt-intent-primary pt-icon-filter" bluePrint/>}
            placeholder="search ..."
            onChange={this.handleChangeSearch}
            onKeyDown={this.handleKeyDownSearch}
            {...this.props.searchProps}
            noBottom
        />
    }

    renderPagination(){
        return <Pagination {...this.props.paginationProps}/>
    }

    render() {
        return <div>
            <Flex justifyContent="space-between" wrap="wrap" alignItems="center">
                {this.renderPagination()}
                <Flex justifyContent="space-between" alignItems="center">
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
    filterProps: PropTypes.object,
    onSearch: PropTypes.func
}