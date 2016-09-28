import React,{Component} from 'react';
import {connect} from '../utils/reduxAwait';
import {bindActionCreators} from 'redux';
//import {Partials} from '../components/index';
import AppWrapper from '../components/layouts/AppWrapper';
import {ToastsContainer} from './libs/index';

import {getCurrenUser} from '../redux/actions/AuthAction';

class AppContainer extends Component {
    componentDidMount() {
        //this.props.getCurrenUser();
    }

    render() {
        const {auth, isAuthenticated, awaitStatuses} = this.props;
        const propsHeader = {
            isAuthenticated, auth, isAuthChecking: awaitStatuses.getCurrentUser === 'pending'
        };
        return (
            <AppWrapper {...this.props}>
                <ToastsContainer/>
                {this.props.children}
            </AppWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token ? true : false,
        auth: state.auth.user
    }
}

const mapDispatchToProps = (dipsatch) => {
    return bindActionCreators({getCurrenUser}, dipsatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);