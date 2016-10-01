import React,{Component} from 'react';
import {connect} from '../../utils/reduxAwait';
import AppWrapper from '../../components/layouts/AppWrapper';
import {ToastsContainer} from '../libs/index';

class AppContainer extends Component {
    render() {
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

export default connect(mapStateToProps)(AppContainer);