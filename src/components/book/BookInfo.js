import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Col, Row} from 'reactstrap';
import {UserAvatar} from '../user/index';

export default class BookInfo extends Component {
    render() {
        const {id, title, sub_title, photoURL, summary, about_book, author} = this.props;
        return (
            <div>
                <Row>
                    <Col md={{size: 3}}>
                        <img src={photoURL} className="fullwidth" alt={title}/>
                    </Col>
                    <Col md={{size: 9}}>
                        <h1>{title}</h1>
                        <span className="sub-title">{sub_title}</span>
                        <h4 className="margint-top-10">Tóm tắt</h4>
                        <p>{summary}</p>
                        <div className="clearfix">
                            <Link to={`book/${id}/read`} className="btn btn-primary">
                                <i className="icon-book-open"/> Đọc ngay
                            </Link>
                        </div>

                    </Col>
                </Row>
                <hr/>
                <div>
                    <h4>Thông tin chi tiết</h4>
                    <p>{about_book}</p>
                </div>
                <hr/>
                <div>
                    <h4>Tác giả</h4>
                    <UserAvatar avatar_url={author.photoURL} displayName={author.displayName} isLink={false}>
                    </UserAvatar>
                    <p>{author.description}</p>
                </div>
            </div>
        )
    }
}

BookInfo.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
}
