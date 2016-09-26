import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../utils/reduxAwait';
import {BookListsAction} from '../../redux/actions/index';
import {BookLists} from '../../components/index';

class BookListsContainer extends Component {
    componentDidMount() {
        this.props.getBookLists(1, 10);
    }

    render() {
        const {books, awaitStatuses} = this.props;
        return (
            <div>
                {awaitStatuses.getBookLists == 'pending' && <center className="margin-top-30"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"/></center>}
                {awaitStatuses.getBookLists == 'success' && <BookLists.Lists books={books}/>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {books} = state.bookLists;
    return {
        books
    }
}

const {getBookLists} = BookListsAction;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBookLists
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookListsContainer)