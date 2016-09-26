import React, {Component, PropTypes} from 'react';
import {Col, Row} from 'reactstrap';
import BookItem from './BookItem';

export default class BookLists extends Component {
    render() {
        const {books} = this.props;
        return (
            <Row className="margin-top-30 book-lists">
                {books.map(book => <Col key={book.id} md={{size: 2}}><BookItem {...book}/></Col>)}
            </Row>
        )
    }
}

BookLists.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string
    }))
}
