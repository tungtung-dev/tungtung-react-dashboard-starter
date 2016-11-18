import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import PostAction from '../../redux/actions/PostAction';
import {connect} from '../../utils/reduxAwait';
import {Link} from '../../components/form/index';
import {Breadcrumb, CenterPaddingBox, Box, Title} from '../../components/layouts/index';
import {Tabs,Table, Column, SearchFilterPagination} from '../../components/manager/index';
import {UserAvatar} from '../../components/partials/index';

const TAB_ALL = 'tab all';
const TAB_PUBLISH = 'tab publish'
const TAB_DRAFT = 'tab draft'

const TABS = [
    {value: TAB_ALL, text:'All'},
    {value: TAB_PUBLISH, text:'Publish'},
    {value: TAB_DRAFT, text: 'Draft'},
];

@connect((state) => ({
    data: state.post.lists.data,
    pagination: state.post.lists.pagination
}), (dispatch) => bindActionCreators(PostAction, dispatch))
export default class PostManager extends Component {
    state = {
        tab: TAB_ALL
    }

    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    @autobind
    handleChangeTab(tab){
        this.setState({tab});
    }

    @autobind
    handleChangePage(page){
        this.props.getPosts(page);
    }

    @autobind
    componentDidMount(){
        this.props.getPosts();
    }

    renderTabs(){
        return <Tabs tabs={TABS} tabSelected={this.state.tab} onChange={this.handleChangeTab}>
            <li className="pull-right">
                <Link to="post"><i className="icon-plus"/> New post</Link>
            </li>
        </Tabs>
    }

    renderSearchFilterPagination(){
        return <SearchFilterPagination
            paginationProps={{...this.props.pagination, onChange: this.handleChangePage}}
            isSearch
            isFilter
        >
            <Title element="h4">Filter</Title>
        </SearchFilterPagination>
    }

    render() {
        return <CenterPaddingBox>
            <Box sm>
                <Breadcrumb id="posts-manager" name="Posts manager"/>
                {this.renderTabs()}
                {this.renderSearchFilterPagination()}
                <Table data={this.props.data}>
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
                </Table>
            </Box>
        </CenterPaddingBox>
    }
}