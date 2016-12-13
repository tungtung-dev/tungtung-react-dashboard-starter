import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {POST_STATE} from 'constants/postType'
import postAction from 'redux/actions/postAction';
import {toShortString} from 'utils';
import {connect} from 'utils/reduxAwait';
import {Link, Button, ButtonDropdown, ButtonGroupDropdown, SelectTag} from 'components/form';
import {CenterPaddingBox, Box, Icon, Title, TabsFilter} from 'components/layouts';
import {Table, Column, SearchFilterPagination} from 'components/manager';
import {UserAvatar} from 'components/partials';
import {Position} from '@blueprintjs/core';
import {
    swalConfirmDelete, swalConfirmTrash, swalRevert, swalPublish, swalDraft,
    getOptionsButtonFromState, getOptionsCheckedListsFromState
} from '../utils';
import {ManagerLists} from '../../libs'

const TABS = [
    {value: POST_STATE.PUBLIC, text: "Publish"},
    {value: POST_STATE.DRAFT, text: "Draft"},
    {value: POST_STATE.TRASH, text: "Trash"}
];

@connect((state) => ({
    data: state.post.lists.data,
    pagination: state.post.lists.pagination
}), (dispatch) => bindActionCreators({...postAction, push}, dispatch))
export default class PostListsManager extends ManagerLists {
    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    getManagerConfig() {
        return {
            routePath: '/posts',
            queryLevel: {
                page: ['keyword', 'state', 'tags'],
                tags: ['keyword', 'state'],
                keyword: ['state'],
                state: []
            },
            defaultQueryObject: {
                state: POST_STATE.PUBLIC,
                page: 1,
                itemPerPage: 10,
            },
            actionGetData: 'getPosts'
        }
    };

    getStateConfig() {
        return {
            tags: this.queryManager.getQuery('tags', '').split(','),
            itemsChecked: []
        }
    };

    componentWillUnmount() {
        this.props.clearPost();
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
    handleChangeFilterTags(tags) {
        this.setState({tags})
    }

    @autobind
    handleSubmitFilter(tags) {
        const tagsString = this.state.tags.length > 0 ? this.state.tags.concat(',') : '';
        this.updateLocationPage('tags', tagsString)
    }

    @autobind
    async handleUpdateStateMultiple(postState, resetChecked = true) {
        this.toggleUpdating(true)
        await postAction.updateStateMultiplePosts(this.state.itemsChecked, postState);
        this.toggleUpdating(false)
        this.getData(resetChecked)
        return;
    }

    @autobind
    async handleUpdateState(postKey, postState) {
        this.toggleUpdating(true)
        await postAction.updatePostState(postKey, postState);
        this.toggleUpdating(false)
        this.getData(false);
        return;
    }

    @autobind
    async handleTrashMultiple() {
        await this.handleUpdateStateMultiple(POST_STATE.TRASH, false);
        swalConfirmTrash(async() => {
            this.toggleUpdating(true)
            await postAction.deleteMultiplePosts(this.state.itemsChecked);
            this.toggleUpdating(false)
            this.getData(true);
        });
    }

    @autobind
    async handleRevertMultiple() {
        await this.handleUpdateStateMultiple(POST_STATE.DRAFT);
        swalRevert();
    }

    @autobind
    async handleDraftMultiple() {
        await this.handleUpdateStateMultiple(POST_STATE.DRAFT);
        swalDraft();
    }

    @autobind
    async handlePublicMultiple() {
        await this.handleUpdateStateMultiple(POST_STATE.PUBLIC);
        swalPublish();
    }

    @autobind
    async handleDeleteMultiple() {
        swalConfirmDelete(async() => {
            this.toggleUpdating(true)
            await postAction.deleteMultiplePosts(this.state.itemsChecked);
            this.toggleUpdating(false)
            this.getData(true);
        });
    }

    @autobind
    async handleTrash(postKey) {
        await this.handleUpdateState(postKey, POST_STATE.TRASH);
        swalConfirmTrash(async() => {
            await postAction.deletePost(postKey);
        })
    }

    async handleRevert(postKey) {
        await this.handleUpdateState(postKey, POST_STATE.DRAFT);
        swalRevert();
    }

    async handlePublic(postKey) {
        await this.handleUpdateState(postKey, POST_STATE.PUBLIC);
        swalPublish();
    }

    async handleDraft(postKey) {
        await this.handleUpdateState(postKey, POST_STATE.DRAFT);
        swalDraft();
    }

    async handleDelete(postKey) {
        swalConfirmDelete(async() => {
            this.toggleUpdating(true)
            await postAction.deletePost(postKey);
            this.toggleUpdating(false)
            this.getData();
        })
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
        const searchProps = {
            defaultValue: this.queryManager.getQuery('keyword', '')
        }
        const isFilterOpen = this.queryManager.getQuery('tags', false) ? true : false;
        const paginationProps = {
            ...this.props.pagination,
            page: this.queryManager.getQuery('page', 1),
            onChange: this._handleChangePage
        };

        return <SearchFilterPagination
            onSearch={this.handleSearch}
            paginationProps={paginationProps}
            searchProps={searchProps}
            filterOpen={isFilterOpen}
            isSearch
            isFilter
        >
            <Title element="h4" marginTop={10}>Tags filter</Title>
            <SelectTag marginTop={15} value={this.state.tags} onChange={this.handleChangeFilterTags}/>
            <Button className="btn-default fill" onClick={this.handleSubmitFilter}>Submit</Button>
        </SearchFilterPagination>
    }


    renderColumnCheckbox() {
        const checkboxProps = {
            keyData: 'slug',
            checkedData: this.state.itemsChecked,
            onChange: this._handleItemsChecked
        };
        const state = this.queryManager.getQuery('state', POST_STATE.PUBLIC);
        const totalChecked = this.state.itemsChecked.length;
        const buttonActions = getOptionsCheckedListsFromState(state, totalChecked, {
            onRevert: this.handleRevertMultiple,
            onTrash: this.handleTrashMultiple,
            onDelete: this.handleDeleteMultiple,
            onPublish: this.handlePublicMultiple,
            onDraft: this.handleDraftMultiple
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
        const getActions = (post) => {
            const {slug} = post;
            return {
                onRevert: () => this.handleRevert(slug),
                onTrash: () => this.handleTrash(slug),
                onDelete: () => this.handleDelete(slug),
                onPublish: () => this.handlePublic(slug),
                onDraft: () => this.handleDraft(slug)
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
        const tableIsLoading = awaitStatuses.getData === 'pending' || this.state.isUpdating;
        return <Table
            data={this.props.data}
            isLoading={tableIsLoading}
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