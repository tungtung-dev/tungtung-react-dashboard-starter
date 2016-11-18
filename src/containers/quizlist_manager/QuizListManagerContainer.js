import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {push} from 'react-router-redux';
import {SelectActions} from '../../components/quiz_lists/index';
import {UserAvatar} from '../../components/partials/index';
import {InputText} from '../../components/form/index';
import {Table, Column, Tabs, Pagination} from '../../components/manager/index';
import {getQuizLists} from '../../redux/actions/QuizListsAction';
import {getDomainPublic, paginationQueryPage} from  '../../utils/index';
import {connect} from  '../../utils/reduxAwait';
import {GET_AS_NEW, GET_AS_OLD, GET_AS_REJECT, GET_NEED_REVIEW} from '../../constants/quizManagerActionType';
import {CenterPaddingBox} from '../../components/layouts';
import UserInfoWrap from '../libs/UserInfoWrap';
import time_ago from 'time-ago';

var timeago = time_ago();

const TAB_ALL = 'all';

const filters = [
    {text: 'All', value: TAB_ALL},
    {text: 'Pending', color: '#3498db', icon: 'icon-options-vertical', value: GET_NEED_REVIEW},
    {text: 'Approved', color: '#2ecc71', icon: 'icon-check', value: GET_AS_NEW},
    {text: 'Rejected', color: '#e74c3c', icon: 'icon-minus', value: GET_AS_REJECT},
    {text: 'Old', color: '#9b59b6', icon: 'icon-event', value: GET_AS_OLD},
]

const mapStateToProps = (state) => {
    return {
        quiz_lists: state.quizLists.data,
        pagination: state.quizLists.pagination
    }
}

@connect(mapStateToProps)
export default class QuizListManagerContainer extends Component {
    @autobind
    _handleChangeFilter(value) {
        this.props.dispatch(push(`/?filter=${value}`));
    }

    @autobind
    _handleUpdatePage(page) {
        this.props.dispatch(push(`/?filter=${this.getCurrentFilter()}&page=${page}`));
    }

    @autobind
    reloadQuizLists() {
        const {page, item_per_page} = this.props.pagination;
        this.props.dispatch(getQuizLists(this.getCurrentFilter(), page, item_per_page));
    }

    componentDidMount() {
        const {page} = this.props.location.query;
        this.props.dispatch(getQuizLists(this.getCurrentFilter(), page, 10));
    }

    componentDidUpdate(prevProps) {
        paginationQueryPage(prevProps, this.props, (page) => {
            this.props.dispatch(getQuizLists(this.getCurrentFilter(), page, 10));
        })
        if (this.getCurrentFilter() !== this.getCurrentFilter(prevProps)) {
            this.props.dispatch(getQuizLists(this.getCurrentFilter(), 1, 10));
        }
    }

    getCurrentFilter(props) {
        const {query:{filter}} = props ? props.location : this.props.location;
        return filter ? filter : TAB_ALL;
    }

    render() {
        const {pagination, quiz_lists, awaitStatuses} = this.props;
        console.log(this.getCurrentFilter());
        return (
            <CenterPaddingBox>
                <Tabs tabs={filters} tabSelected={this.getCurrentFilter()} onChange={this._handleChangeFilter}>
                    <li className="pull-right">
                        <a href="#">Create new quiz</a>
                    </li>
                </Tabs>
                <Pagination ref="table_pagination" {...pagination} location={this.props.location} onChange={this._handleUpdatePage}>
                    <InputText placeholder="Tìm kiếm"/>
                </Pagination>
                <Table data={quiz_lists} isLoading={awaitStatuses.getQuizLists === 'pending'}
                       showLoading>
                    <Column
                        header={() => "#"}
                        showIndex
                        pagination={pagination}
                    />
                    <Column
                        header={() => "Tên đề thi"}
                        cell={(quiz_list)=> <div>
                             <a href={getDomainPublic(`#/quizs/${quiz_list.id}`)} className="black" target="_blank">{quiz_list.title}</a>
                             <div className="text-helper">Ngày tạo: {timeago.ago(quiz_list.created_at)}</div>
                             </div>}/>
                    <Column
                        header={() => "Thông tin"}
                        cell={(quiz_list)=> <div> {quiz_list.access_count} lượt thi </div>}
                    />
                    <Column
                        header={() => "Người tạo"}
                        cell={(quiz_list)=> <UserInfoWrap component={UserAvatar} noPassPropUser user_id={quiz_list.user_id}/>}
                    />
                    <Column
                        header={() => "Hành động"}
                        cell={(quiz_list)=>  <div>
                            <SelectActions id={quiz_list.id} value={quiz_list.status_type} onChange={this.reloadQuizLists}/>
                        </div>}
                    />
                </Table>
            </CenterPaddingBox>
        )
    }
}
QuizListManagerContainer.propTypes = {}