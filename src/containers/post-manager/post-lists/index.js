import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {POST_STATE} from '../../../constants/postType'
import postAction from '../../../redux/actions/postAction';
import {connect} from '../../../utils/reduxAwait';
import QueryManager from '../../../utils/location_queries';
import {Link, Button, ButtonDropdown, ButtonGroupDropdown, SelectTag} from '../../../components/form/index';
import {CenterPaddingBox, Box, Icon, Title, TabsFilter} from '../../../components/layouts/index';
import {Table, Column, SearchFilterPagination} from '../../../components/manager/index';
import {UserAvatar} from '../../../components/partials/index';
import Equal from 'deep-equal';
import {Position} from '@blueprintjs/core';
import {
    swalConfirmDelete, swalConfirmTrash, swalRevert, swalPublish, swalDraft,
    getOptionsButtonFromState, getOptionsCheckedListsFromState
} from '../utils';


const TAB_ALL = '';

const TABS = [
    {value: TAB_ALL, text: 'All'},
    {value: POST_STATE.PUBLIC, text: "Publish"},
    {value: POST_STATE.DRAFT, text: "Draft"},
    {value: POST_STATE.TRASH, text: "Trash"}
];

@connect((state) => ({
    data: state.post.lists.data,
    pagination: state.post.lists.pagination
}), (dispatch) => bindActionCreators({...postAction, push}, dispatch))
export default class PostListsManager extends Component {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    constructor() {
        super(...arguments);
        this.query_manager = new QueryManager({
            page: ['keyword', 'state', 'tagSlugs'],
            tagSlugs: ['keyword', 'state'],
            keyword: ['state'],
            state: []
        });
        this.state = {
            state: POST_STATE.PUBLIC,
            tagSlugs: this.query_manager.getQuery('tagSlugs', '').split(','),
            keyword: '',
            postsChecked: []
        }
    }

    updateLocationPage(query_key, query_value) {
        const queries_string = this.query_manager.updateQuery(query_key, query_value);
        this.props.push(`/posts?${queries_string}`);
    }

    @autobind
    handleChangeChecked(postsChecked = []) {
        this.setState({postsChecked})
    }

    @autobind
    handleSearch(keyword) {
        this.updateLocationPage('keyword', keyword);
    }

    @autobind
    handleChangeTab(state) {
        this.updateLocationPage('state', state);
    }

    @autobind
    handleChangePage(page) {
        this.updateLocationPage('page', page);
    }

    @autobind
    handleChangeFilterTags(tagSlugs) {
        this.setState({tagSlugs})
    }

    @autobind
    handleSubmitFilter(tagSlugs) {
        this.updateLocationPage('tagSlugs', this.state.tagSlugs.concat(','))
    }

    getPosts() {
        const query = this.query_manager.getQueryObject({
            state: TAB_ALL,
            page: 1,
            item_per_page: 10,
        });
        this.props.getPosts(query);
    }

    componentDidMount() {
        this.getPosts();
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    componentDidUpdate(prevProps) {
        if (!Equal(prevProps.location.query, this.props.location.query)) {
            this.getPosts();
        }
    }

    renderTabs() {
        return <TabsFilter tabs={TABS} tabSelected={this.query_manager.getQuery('state', TAB_ALL)}
                           onChange={this.handleChangeTab}>
            <li className="pull-right">
                <Link to="/posts/create"><i className="icon-plus"/> New post</Link>
            </li>
        </TabsFilter>
    }

    renderSearchFilterPagination() {
        if (this.props.data.length === 0) return;
        return <SearchFilterPagination
            onSearch={this.handleSearch}
            paginationProps={{...this.props.pagination, page: this.query_manager.getQuery('page', 1), onChange: this.handleChangePage}}
            searchProps={{defaultValue: this.query_manager.getQuery('keyword','')}}
            filterOpen={this.query_manager.getQuery('tagSlugs',false)}
            isSearch
            isFilter
        >
            <Title element="h4" marginTop={10}>Tags filter</Title>
            <SelectTag marginTop={15} defaultTags={['Đề thi','THPT quốc gia']} value={this.state.tagSlugs}
                       onChange={this.handleChangeFilterTags}/>
            <Button className="btn-default fill" onClick={this.handleSubmitFilter}>Submit</Button>
        </SearchFilterPagination>
    }

    resetPostsChecked(){
        this.setState({postsChecked: []})
    }

    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: 'slug',
            checkedData: this.state.postsChecked,
            onChange: this.handleChangeChecked
        };
        const buttonActions = getOptionsCheckedListsFromState(this.state.state, this.state.postsChecked.length, {
            onRevert: () => {
                swalRevert();
            },
            onTrash: () => {
                swalConfirmTrash(() => {}, this.resetPostsChecked.bind(this));
            },
            onDelete: () => {
                swalConfirmDelete(() => {});
            },
            onPublish: () => {
                swalPublish();
            },
            onDraft: () => {
                swalDraft();
            }
        });
        const buttonDropDown = <ButtonDropdown
            className="btn-black btn-super-sm"
            options={buttonActions}
            position={Position.BOTTOM_LEFT}
        >
            <Icon name="caret-down" bluePrintIcon/>
        </ButtonDropdown>;

        return <Column header={() => buttonDropDown} checkboxProps={checkboxProps} showCheckbox/>
    }

    renderColumnActions() {
        const context = this;

        const getActions = (post) => {
            const {slug} = post;
            return {
                onRevert: () => {
                    swalRevert();
                },
                onTrash: () => {
                    swalConfirmTrash(() => {}, this.getPosts.bind(this))
                },
                onDelete: () => {
                    swalConfirmTrash(() => {}, this.getPosts.bind(this))
                },
                onPublish: () => {
                    swalPublish(this.getPosts.bind(this));
                },
                onDraft: () => {
                    swalDraft(this.getPosts.bind(this));
                }
            }
        }

        return <Column header={() => 'Actions'} cell={(post) =>
                <ButtonGroupDropdown
                    className="btn-default"
                    position={Position.BOTTOM_RIGHT}
                    onClick={(e) => this.props.push(`/posts/edit/${post.slug}`)}
                    dropdownIcon={{name: 'caret-down', bluePrintIcon: true}}
                    options={getOptionsButtonFromState(post.state, getActions(post))}
                >
                    Edit
                </ButtonGroupDropdown>
            }
        />
    }

    renderTable() {
        const {awaitStatuses} = this.props;

        return <Table
            data={this.props.data}
            isLoading={awaitStatuses.getPosts === 'pending'}
            showLoading
        >
            {this.renderColumnCheckbox()}
            <Column
                header={() => "#"}
                showIndex
                pagination={this.props.pagination}
            />
            <Column
                header={() => {}}
                cell={(post) => {
                    return <img src={post.featuredImage.thumbnailUrl} style={{width: 40}} alt=""/>
                }}
            />
            <Column
                header={() => 'Title'}
                cell={(post) => <Link styleColor="primary" fontWeight={600} to={`/posts/${post.slug}`}>{post.title}</Link>}
            />
            <Column
                header={() => 'Description'}
                cell={(post) => post.description ? post.description.slice(0, 100) + ' ...' : ''}
            />
            <Column
                header={() => 'Author'}
                cell={(post) => <UserAvatar username={post.user.username} label="fullname" fullname={post.user.fullname}/>}
            />
            {this.renderColumnActions()}
        </Table>
    }

    @autobind
    handleClick() {
        alert('clciked');
    }

    render() {
        return <CenterPaddingBox paddingLeft={30}>
            <Box sm>
                {this.renderTabs()}
                {this.renderSearchFilterPagination()}
                {this.renderTable()}
            </Box>
        </CenterPaddingBox>
    }
}