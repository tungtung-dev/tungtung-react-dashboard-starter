import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {Row, Col} from 'reactstrap';
import {connect} from '../../utils/reduxAwait';
import {BookAction, AlertAction} from '../../redux/actions/index';
import {Book} from '../../components/index';

class BookReadContainer extends Component {
    constructor() {
        super(...arguments);
        this._handleComplete = () => {
            const {book:{id}} = this.props;
            this.props.addAlertText("read_success", "Hoàn thành ^_^", "Chúc mừng bạn đã đọc hết cuốn sách này, chúc bạn 1 ngày vui vẻ ^_^");
            this.props.push(`book/${id}`);
        }
    }

    componentDidMount() {
        const {params: {id}, book} = this.props;
        if (!book.id) {
            this.props.getBook(id);
        }
    }

    getChapter() {
        const {book:{chapters},params:{chapter_id}} = this.props;
        if (chapter_id) {
            const index = chapters.findIndex((c) => c.id === chapter_id);
            return {
                ...chapters[index],
                index
            }
        }
        else {
            return {
                ...chapters[0],
                index: 0
            }
        }
    }

    render() {
        const {book: {id, title, chapters}} = this.props;
        const currentChapter = this.getChapter();
        return (
            <div>
                <Row className="margin-top-30">
                    <Col md={{size: 8, offset: 2}}>
                        {id && <h1>{title}</h1>}
                        {id && <div>
                            <Book.BookChapter {...currentChapter}/>
                            <Book.ChapterPagination onComplete={this._handleComplete} book_id={id} chapters={chapters}
                                                    current_index={currentChapter.index}/>
                        </div>}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {book} = state;
    return {book}
}

const {getBook} = BookAction;
const {addAlertText} = AlertAction;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getBook, addAlertText, push}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReadContainer)