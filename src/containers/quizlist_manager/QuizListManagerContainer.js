import React, {Component, PropTypes} from 'react';
import Dimensions from 'react-dimensions';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {Table, Column, Cell} from 'fixed-data-table';
import {activeQuiList, unActiveQuizList, deleteQuizList} from '../../api/QuizApi';
import {Filters, Pagination, Cells} from '../../components/table/index';
import {UserAvatar} from '../../components/other/index';
import {getQuizLists} from '../../redux/actions/QuizListsAction';
import {getDomainPublic} from  '../../utils/index';
import UserInfoWrap from '../libs/UserInfoWrap';

class CellQuizInfo extends Component {
    getProperty(label, value) {
        return <span><strong>{label} : </strong>{value}</span>
    }

    render() {
        const {rowIndex, data} = this.props;
        const {total_questions, time, access_count} = data[rowIndex];
        return (
            <Cells.CellFlexAlignCenter>
                {this.getProperty('Số câu hỏi', total_questions)} | {this.getProperty('Thời gian', time)}
                | {this.getProperty('Lượt thi', access_count)}
            </Cells.CellFlexAlignCenter>
        )
    }
}


class CellUser extends Component {
    render() {
        const {rowIndex, data} = this.props;
        var user_id = data[rowIndex].user_id;
        return (
            <Cells.CellFlexAlignCenter>
                <UserInfoWrap component={UserAvatar} noPassPropUser user_id={user_id}/>
            </Cells.CellFlexAlignCenter>
        )
    }
}

class CellQuizAction extends Component {
    render() {
        const {rowIndex, data} = this.props;
        const quiz = data[rowIndex];
        return (
            <Cells.CellFlexAlignCenter>
                {!quiz.active && <button className="btn btn-default" onClick={(e) => this.props.onActive(e, quiz._id)}>Active</button>}
                {quiz.active && <button className="btn btn-default" onClick={(e) => this.props.onUnActive(e, quiz._id)}>Un active</button>} &nbsp;
                <a href={getDomainPublic(`#/quizs/${quiz._id}`)} className="btn btn-purple" target="_blank">Xem</a> &nbsp;
                <button onClick={(e) => this.props.onDelete(e, quiz._id)} className="btn btn-red">Xóa</button> &nbsp;
            </Cells.CellFlexAlignCenter>
        )
    }
}
CellQuizAction.propTypes = {
    onActive: PropTypes.func,
    onUnActive: PropTypes.func,
    onDelete: PropTypes.func
}

const filters = [
    {text: 'Chưa active', icon: '', value: 'not_active'},
    {text: 'Đã active', icon: 'icon-check', value: 'actived'},
]

const mapStateToProps = (state) => {
    return {
        quiz_lists: state.quizLists.data,
        pagination: state.quizLists.pagination
    }
}

@connect(mapStateToProps)
class QuizListManagerContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            filter: 'all'
        }
    }

    @autobind
    _handleChangeFilter(value) {
        this.setState({filter: value});
    }

    @autobind
    _handleUpdatePage(page) {
        const {item_per_page} = this.props.pagination;
        this.props.dispatch(getQuizLists(page, item_per_page));
    }

    @autobind
    _handleActiveQuiz(e, id){
        e.preventDefault();
        activeQuiList(id).then(() => this.reloadQuizLists());
    }

    @autobind
    _handleUnActiveQuiz(e, id){
        e.preventDefault();
        unActiveQuizList(id).then(() => this.reloadQuizLists());
    }

    @autobind
    _handleDeleteQuiz(e, id){
        e.preventDefault();
        var s_confirm = confirm('Bạn có chắc chắn xóa không');
        if(s_confirm) deleteQuizList(id).then(() => this.reloadQuizLists());
    }

    reloadQuizLists(){
        const {page, item_per_page} = this.props.pagination;
        this.props.dispatch(getQuizLists(page, item_per_page));
    }

    componentDidMount() {
        this.props.dispatch(getQuizLists(1, 10));
    }

    render() {
        const {pagination, quiz_lists} = this.props;
        return (
            <div>
                <Filters filters={filters} value={this.state.filter} onChange={this._handleChangeFilter}/>
                <Pagination {...pagination} onChange={this._handleUpdatePage}/>
                <div>
                    <Table
                        rowsCount={quiz_lists.length}
                        rowHeight={60}
                        headerHeight={30}
                        width={this.props.width}
                        height={this.props.height -100}
                    >
                        <Column
                            header={<Cell>Tên đề thi</Cell>}
                            cell={<Cells.CellText data={quiz_lists} field="title"/>}
                            width={300}
                        />
                        <Column
                            header={<Cell>Thông tin</Cell>}
                            cell={<CellQuizInfo data={quiz_lists}/>}
                            width={350}
                        />
                        <Column
                            header={<Cell>Người tạo</Cell>}
                            cell={<CellUser data={quiz_lists}/>}
                            width={160}
                        />
                        <Column
                            header={<Cell>Hành động</Cell>}
                            cell={
                                <CellQuizAction data={quiz_lists} onActive={this._handleActiveQuiz}
                                    onUnActive={this._handleUnActiveQuiz} onDelete={this._handleDeleteQuiz}/>
                            }
                            width={200}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

QuizListManagerContainer.propTypes = {}

@Dimensions()
export default class OuterTableResponsive extends Component {
    resetTablePagination() {
        this.refs.table.resetTablePagination();
    }

    render() {
        return <QuizListManagerContainer ref="table" width={this.props.containerWidth}
                                         height={this.props.containerHeight} {...this.props}/>
    }
}
