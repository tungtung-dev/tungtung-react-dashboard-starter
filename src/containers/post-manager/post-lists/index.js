import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import PostAction from '../../../redux/actions/PostAction';
import {connect} from '../../../utils/reduxAwait';
import QueryManager from '../../../utils/location_queries';
import {Link, Button, ButtonDropdown, ButtonGroupDropdown, Checkbox, SelectTag} from '../../../components/form/index';
import {CenterPaddingBox, Box, Icon, Title, Tabs} from '../../../components/layouts/index';
import {Table, Column, SearchFilterPagination} from '../../../components/manager/index';
import {UserAvatar} from '../../../components/partials/index';
import update from 'react-addons-update';
import Equal from 'deep-equal';
import {Position} from '@blueprintjs/core';

const TAB_ALL = 'LISTS/tab_all';
const TAB_PUBLISH = 'LISTS/tab_publish'
const TAB_DRAFT = 'LISTS/tab_draft'

const TABS = [
    {value: TAB_ALL, text:'All'},
    {value: TAB_PUBLISH, text:'Publish'},
    {value: TAB_DRAFT, text: 'Draft'},
];

@connect((state) => ({
    data: state.post.lists.data,
    pagination: state.post.lists.pagination
}), (dispatch) => bindActionCreators({...PostAction, push}, dispatch))
export default class PostManager extends Component {
    state = {
        tab: TAB_ALL,
        tags: [],
        search: '',
        posts_checked: []
    }

    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    constructor(){
        super(...arguments);
        this.query_manager = new QueryManager({
            page: ['search','tab'],
            search: ['tab'],
            tab: []
        });
    }

    updateLocationPage(query_key, query_value){
        const queries_string = this.query_manager.updateQuery(query_key, query_value);
        this.props.push(`/posts?${queries_string}`);
    }

    @autobind
    handleChangeChecked(posts_checked = []){
        this.setState({posts_checked})
    }

    @autobind
    handleSearch(search){
        this.updateLocationPage('search',search);
    }

    @autobind
    handleChangeTab(tab){
        this.updateLocationPage('tab',tab);
    }

    @autobind
    handleChangePage(page){
        this.updateLocationPage('page', page);
    }

    @autobind
    handleChangeFilterTags(tags){
        this.setState({tags})
    }

    @autobind
    handleSubmitFilter(tags){

    }

    getPosts(){
        const query = this.query_manager.getQueryObject({
            tab: TAB_ALL
        });
        this.props.getPosts();
    }

    componentDidMount(){
        this.getPosts();
    }

    componentDidUpdate(prevProps){
        if(!Equal(prevProps.location.query, this.props.location.query)){
            this.getPosts();
        }
    }

    renderTabs(){
        return <Tabs tabs={TABS} tabSelected={this.query_manager.getQuery('tab', TAB_ALL)} onChange={this.handleChangeTab}>
            <li className="pull-right">
                <Link to="/posts/create"><i className="icon-plus"/> New post</Link>
            </li>
        </Tabs>
    }

    renderSearchFilterPagination(){
        return <SearchFilterPagination
            onSearch={this.handleSearch}
            paginationProps={{...this.props.pagination, page: this.query_manager.getQuery('page', 1), onChange: this.handleChangePage}}
            searchProps={{defaultValue: this.query_manager.getQuery('search','')}}
            isSearch
            isFilter
        >
            <Title element="h4" marginTop={10}>Tags filter</Title>
            <SelectTag marginTop={15} defaultTags={['Đề thi','THPT quốc gia']} value={this.state.tags} onChange={this.handleChangeFilterTags}/>
            <Button className="btn-default fill">Submit</Button>
        </SearchFilterPagination>
    }

    renderTable(){
        const {awaitStatuses} = this.props;
        return <Table
            data={this.props.data}
            isLoading={awaitStatuses.getPosts === 'pending'}
            showLoading
        >
            <Column
                header={() =>
                <ButtonDropdown
                    className="btn-black btn-super-sm"
                    options={[{icon: 'trash', text: `Trash ${this.state.posts_checked.length} posts`}]}
                    position={Position.BOTTOM_LEFT}
                    >
                    <Icon name="caret-down" bluePrintIcon/>
                </ButtonDropdown>
                }
                checkboxProps={{
                    keyData: 'id',
                    checkedData: this.state.posts_checked,
                    onChange: this.handleChangeChecked
                }}
                showCheckbox
            />
            <Column
                header={() => "#"}
                showIndex
                pagination={this.props.pagination}
            />
            <Column
                header={() => 'Title'}
                cell={(post) => post.title}
            />
            <Column
                header={() => 'Description'}
                cell={(post) => post.description}
            />
            <Column
                header={() => 'Author'}
                cell={(post) => <UserAvatar username={post.user.username} label="fullname" fullname={post.user.fullname}/>}
            />
            <Column
                header={() => 'Actions'}
                cell={(post) =>
                    <ButtonGroupDropdown
                        className="btn-default"
                        position={Position.BOTTOM_RIGHT}
                        onClick={(e) => this.props.push(`/posts/edit/${post.id}`)}
                        dropdownIcon={{name: 'caret-down', bluePrintIcon: true}}
                        options={[
                            {icon: 'trash', text: 'Trash', onClick: this.handleClick},
                            {icon: 'trash', text: 'Enable publish', onClick: this.handleClick},
                        ]}
                    >
                        Edit
                    </ButtonGroupDropdown>
                }
            />
        </Table>
    }

    @autobind
    handleClick(){
        alert('clciked');
    }

    render() {
        return <CenterPaddingBox>
            <Box sm>
                {this.renderTabs()}
                {this.renderSearchFilterPagination()}
                {this.renderTable()}
            </Box>
        </CenterPaddingBox>
    }
}