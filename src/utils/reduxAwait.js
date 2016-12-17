import {connect as reduxConnect} from 'react-redux';

function connect(mapStateToProps, mapDispatchToProps, ...args) {
    return reduxConnect((state, ownProps) => {
        const props = mapStateToProps(state, ownProps);
        let awaitStatuses = (state.await.statuses instanceof Array) ? {} : state.await.statuses;
        let awaitErrors = (state.await.errors instanceof Array) ? {} : state.await.errors;
        return {...props, awaitStatuses, awaitErrors};
    }, mapDispatchToProps, ...args)
}

export {connect}
export default connect;