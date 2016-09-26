import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Col} from 'reactstrap';
import {connect} from '../../utils/reduxAwait';
import {BookAction} from '../../redux/actions/index';
import {Book} from '../../components/index';
import {AlertsContainer} from '../libs/index';

class BookInfoContainer extends Component {
    componentDidMount() {
        const {id} = this.props.params;
        this.props.getBook(id);
    }

    componentWillUnmount() {
        this.props.clearBook();
    }

    render() {
        const {book, awaitStatuses} = this.props;
        return (
            <div>
                <Col className="margin-top-30" md={{size: 10, offset: 1}}>
                    <AlertsContainer/>
                    {awaitStatuses.getBook == 'pending' && <center><i className="fa fa-spinner fa-pulse fa-3x fa-fw"/></center>}
                    {awaitStatuses.getBook == 'success' && <Book.BookInfo {...book}/>}
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {book} = state;
    return {book}
}

const {getBook, clearBook} = BookAction;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getBook, clearBook}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoContainer)