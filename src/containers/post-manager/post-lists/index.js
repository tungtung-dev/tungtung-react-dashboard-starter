import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import Equal from 'deep-equal';

import {POST_STATE} from 'constants/postType'
import postAction from 'redux/actions/postAction';
import {toShortString} from 'utils';
import {connect} from 'utils/reduxAwait';
import QueryManager from 'utils/location_queries';
import {Link, Button, ButtonDropdown, ButtonGroupDropdown, SelectTag} from 'components/form';
import {CenterPaddingBox, Box, Icon, Title, TabsFilter} from 'components/layouts';
import {Table, Column, SearchFilterPagination} from 'components/manager';
import {UserAvatar} from 'components/partials';
import {Position} from '@blueprintjs/core';
import {
    swalConfirmDelete, swalConfirmTrash, swalRevert, swalPublish, swalDraft,
    getOptionsButtonFromState, getOptionsCheckedListsFromState
} from '../utils';

const TABS = [
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
        this.queryManager = new QueryManager({
            page: ['keyword', 'state', 'tags'],
            tags: ['keyword', 'state'],
            keyword: ['state'],
            state: []
        });
        this.state = {
            state: POST_STATE.PUBLIC,
            tags: this.queryManager.getQuery('tags', '').split(','),
            keyword: '',
            postsChecked: []
        }
    }

    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`/posts?${queriesString}`);
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
    handleChangeFilterTags(tags) {
        this.setState({tags})
    }

    @autobind
    handleSubmitFilter(tags) {
        const tagsString = this.state.tags.length > 0 ? this.state.tags.concat(',') : '';
        this.updateLocationPage('tags', tagsString)
    }

    getPosts(resetChecked = false) {
        const query = this.queryManager.getQueryObject({
            state: POST_STATE.PUBLIC,
            page: 1,
            itemPerPage: 10,
        });
        this.props.getPosts(query);
        if(resetChecked) this.resetPostsChecked();
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
        return <TabsFilter tabs={TABS} tabSelected={this.queryManager.getQuery('state', POST_STATE.PUBLIC)}
                           onChange={this.handleChangeTab}>
            <li className="pull-right">
                <Link to="/posts/create"><i className="icon-plus"/> New post</Link>
            </li>
        </TabsFilter>
    }

    renderSearchFilterPagination() {
        return <SearchFilterPagination
            onSearch={this.handleSearch}
            paginationProps={{...this.props.pagination, page: this.queryManager.getQuery('page', 1), onChange: this.handleChangePage}}
            searchProps={{defaultValue: this.queryManager.getQuery('keyword','')}}
            filterOpen={this.queryManager.getQuery('tags',false)}
            isSearch
            isFilter
        >
            <Title element="h4" marginTop={10}>Tags filter</Title>
            <SelectTag marginTop={15} defaultTags={['technology']} value={this.state.tags}
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
        const state = this.queryManager.getQuery('state', POST_STATE.PUBLIC);
        const totalChecked = this.state.postsChecked.length;
        const buttonActions = getOptionsCheckedListsFromState(state, totalChecked, {
            onRevert: () => {
                swalRevert(this.getPosts.bind(this, true));
            },
            onTrash: () => {
                swalConfirmTrash(() => {}, this.getPosts.bind(this, true));
            },
            onDelete: () => {
                swalConfirmDelete(() => {}, this.getPosts.bind(this, true));
            },
            onPublish: () => {
                swalPublish(this.getPosts.bind(this, true));
            },
            onDraft: () => {
                swalDraft(this.getPosts.bind(this, true));
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
        //const context = this;

        const getActions = (post) => {
            //const {slug} = post;
            return {
                onRevert: () => {
                    swalRevert();
                },
                onTrash: () => {
                    swalConfirmTrash(() => {}, this.getPosts.bind(this))
                },
                onDelete: () => {
                    swalConfirmDelete(() => {}, this.getPosts.bind(this))
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
                    if(post.featuredImage){
                            return <img src={post.featuredImage.thumbnailUrl} style={{width: 40}} alt=""/>
                    }
                    else return 'No image'
                }}
            />
            <Column
                header={() => 'Title'}
                cell={(post) => <Link styleColor="primary" fontWeight={600} to={`/posts/${post.slug}`}>{post.title}</Link>}
            />
            <Column
                header={() => 'Description'}
                cell={(post) => toShortString(post.description, 70, 50)}
            />
            <Column
                header={() => 'Author'}
                cell={(post) => <UserAvatar username={post.owner.username} label="fullname" fullname={post.owner.fullname}/>}
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