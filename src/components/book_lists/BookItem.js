import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {} from 'reactstrap';

export default class BookItem extends Component {
    render() {
        const {id, title, photoURL} = this.props;
        return (
            <Link to={`book/${id}`} className="book-item">
                <div className="photo-url">
                    <img src={photoURL} alt={title}/>
                </div>
                <h4 className="book-title">
                    {title}
                </h4>
            </Link>
        )
    }
}

BookItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    photoURL: PropTypes.string
}