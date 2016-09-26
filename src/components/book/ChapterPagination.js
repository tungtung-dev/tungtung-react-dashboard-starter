import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class ChapterPagination extends Component {
    getLink(chapter_id) {
        const {book_id} = this.props;
        return `book/${book_id}/read/chapter/${chapter_id}`;
    }

    prevChapter() {
        const {current_index, chapters} = this.props;
        if (current_index > 0) return {
            ...chapters[current_index - 1],
            index: current_index - 1
        };
        return;
    }

    nextChapter() {
        const {current_index, chapters} = this.props;
        if (current_index !== chapters.length - 1) return {
            ...chapters[current_index + 1],
            index: current_index + 1
        };
        return;
    }

    renderChapterTitle(chapter, props) {
        return <Link to={this.getLink(chapter.id)} {...props}>
            Chapter {chapter.index + 1}: {chapter.title.slice(0, 10)} ...
        </Link>
    }

    render() {
        const prevChapter = this.prevChapter();
        const nextChapter = this.nextChapter();
        const {current_index, chapters, book_id} = this.props;
        return (
            <div className="clearfix margin-top-20">
                {prevChapter ? this.renderChapterTitle(prevChapter, {className: 'pull-left'}) : null}
                {nextChapter ? this.renderChapterTitle(nextChapter, {className: 'pull-right'}) : null}
                {current_index == chapters.length - 1 && <button onClick={this.props.onComplete} to={`book/${book_id}`} className="pull-right btn btn-success">
                    Đọc xong
                </button>}
            </div>
        )
    }
}

ChapterPagination.propTypes = {
    book_id: PropTypes.string,
    chapters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
    })),
    current_index: PropTypes.number,
    onComplete: PropTypes.func
}