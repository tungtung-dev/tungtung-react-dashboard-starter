import React, {Component, PropTypes} from 'react';
import {SelectDropDown} from '../../form/select/index';
import {autobind} from 'core-decorators';
import {MARK_AS_NEW, MARK_AS_OLD, MARK_AS_NEED_REVIEW, MARK_AS_REJECT} from '../../../constants/quizManagerActionType';
import {markQuizAsNew, markQuizAsOld, markQuizAsNeedReview, markQuizAsReject, deleteQuizList} from '../../../api/QuizApi'
import {getDomainPublic} from '../../../utils/index';
import Equal from 'deep-equal';

const items = [
    {value: MARK_AS_NEW, name: 'Mark as new', api: markQuizAsNew},
    {value: MARK_AS_OLD, name: 'Mark as old', api: markQuizAsOld},
    {value: MARK_AS_NEED_REVIEW, name: 'Mark as need review', api: markQuizAsNeedReview},
    {value: MARK_AS_REJECT, name: 'Mark as reject', api: markQuizAsReject},
]

export default class QuizListActions extends Component {
    @autobind
    _handleChange(value) {
        const {id} = this.props;
        let item = items.find(i => i.value === value);
        if (item.api) {
            item.api(id).then(() => {
                this.props.onChange(value);
            });
        }
    }

    @autobind()
    _handleEdit() {
        window.open(getDomainPublic(`#edit/${this.props.id}`));
    }

    @autobind()
    _handleDelete() {
        let s_confirm = confirm("Bạn có chắc chắn muốn xóa");
        if (s_confirm) {
            deleteQuizList(this.props.id).then(() => {
                this.props.onChange();
            });
        }
    }

    shouldComponentUpdate(prevProps){
        return !Equal(prevProps, this.props);
    }

    render() {
        console.log(this.props.value);
        return (
            <SelectDropDown value={this.props.value} items={items} onChange={this._handleChange} onEdit={this._handleEdit} onDelete={this._handleDelete}/>
        )
    }
}

QuizListActions.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
}