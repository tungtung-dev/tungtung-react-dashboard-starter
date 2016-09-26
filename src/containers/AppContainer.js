import React,{Component} from 'react';
import {connect} from '../utils/reduxAwait';
import {Container, Col} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {Partials} from '../components/index';
import {ToastsContainer} from './libs/index';
import {getCurrenUser} from '../redux/actions/AuthAction';

class AppContainer extends Component {
    componentDidMount() {
        this.props.getCurrenUser();
    }

    render() {
        const {auth, isAuthenticated, awaitStatuses} = this.props;
        const propsHeader = {
            isAuthenticated, auth, isAuthChecking: awaitStatuses.getCurrentUser == 'pending'
        };
        return (
            <div>
                <Partials.Header {...propsHeader}/>
                <ToastsContainer/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
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