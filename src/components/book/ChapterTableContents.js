import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import classnames from 'classnames';

export default class ChapterTableContents extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false
        }
        this._toggle = () => {
            this.setState({isOpen: !this.state.isOpen});
        }
    }

    render() {
        const {chapters, book_id, current_index} = this.props;
        return (
            <div>
                <button className="btn btn-primary" onClick={this._toggle}><i className="icon-menu"></i> Xem mục lục</button>
                <Modal isOpen={this.state.isOpen} toggle={this._toggle}>
                    <ModalHeader>Mục lục</ModalHeader>
                    <ModalBody>
                        <ul className="nav">
                            {chapters.map((chapter, chapterIndex) => <li>
                                <Link onClick={this._toggle} key={chapterIndex} to={`book/${book_id}/read/chapter/${chapter.id}`}
                                      className={classnames({'active': chapterIndex === current_index})}>
                                    Chapter {chapterIndex + 1} {chapter.title}
                                </Link>
                            </li>)}
                        </ul>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ChapterTableContents.propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    book_id: PropTypes.string,
    current_index: PropTypes.number
}