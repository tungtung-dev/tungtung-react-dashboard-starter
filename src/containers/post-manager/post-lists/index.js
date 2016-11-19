import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import PostAction from '../../../redux/actions/PostAction';
import {connect} from '../../../utils/reduxAwait';
import {Link, Button, ButtonDropdown, ButtonGroupDropdown, Checkbox, SelectTag} from '../../../components/form/index';
import {Breadcrumb, CenterPaddingBox, Box, Icon, Title, Tabs} from '../../../components/layouts/index';
import {Table, Column, SearchFilterPagination} from '../../../components/manager/index';
import {UserAvatar} from '../../../components/partials/index';
import update from 'react-addons-update';

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
}), (dispatch) => bindActionCreators({...PostAction, push}, dispatch))
export default class PostManager extends Component {
    state = {
        tab: TAB_ALL,
        tags: [],
        posts_checked: []
    }

    static propTypes = {
        data: PropTypes.array,
        pagination: PropTypes.object
    }

    @autobind
    handleCheckPost(e, post_id){
        if(e.target.value){
            this.setState(update(this.state, {
                posts_checked: {
                    $push: [post_id]
                }
            }))
        }
        else{
            this.setState({
                posts_checked: this.state.posts_checked.filter(p_id => post_id !== p_id)
            })
        }
    }

    getPostChecked(post_id){
        const index_post = this.state.posts_checked.findIndex(p_id => post_id === p_id);
        return index_post > - 1 ? true : false;
    }

    @autobind
    handleChangeTab(tab){
        this.setState({tab});
    }

    @autobind
    handleChangeFilterTags(tags){
        this.setState({tags})
    }

    @autobind
    handleSubmitFilter(tags){

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
            <Title element="h4" marginTop={10}>Tags filter</Title>
            <SelectTag marginTop={15} defaultTags={['Đề thi','THPT quốc gia']} value={this.state.tags} onChange={this.handleChangeFilterTags}/>
            <Button className="btn-default fill">Submit</Button>
        </SearchFilterPagination>
    }

    renderTable(){
        const {awaitStatuses} = this.props;
        return <Table data={this.props.data} isLoading={awaitStatuses.getPosts === 'pending'} showLoading>
            <Column
                header={() => <ButtonDropdown className="btn btn-super-sm" options={[{icon: 'trash', text: `Trash ${this.state.posts_checked.length} posts`}]}>
                    <Icon name="caret-down" bluePrintIcon/>
                </ButtonDropdown>
                }
                cell={(post) => <Checkbox value={this.getPostChecked(post.id)} onChange={(e) => this.handleCheckPost(e, post.id)}/>}
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