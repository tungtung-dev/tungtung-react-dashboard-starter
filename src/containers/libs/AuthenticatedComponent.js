import React, {Component} from 'react';
import {connect} from '../../utils/reduxAwait'
import {push} from 'react-router-redux';
import {addAlertText} from '../../redux/actions/AlertAction';

export default function requireAuth(ComponentChild) {
    class AuthenticatedComponent extends Component {
        redirect() {
            let redirectAfterLogin = this.props.location.pathname;
            localStorage.setItem('redirect_back', redirectAfterLogin);
            this.props.dispatch(push(`/auth/login`));
            this.props.dispatch(addAlertText('require_login', 'Yêu cầu', 'Vui lòng đăng nhập để sử dụng tính năng này', 'warning'));
        }

        componentDidUpdate(prevProps) {
            const awaitStatuses = this.props.awaitStatuses;
            const prevAwaitStatuses = prevProps.awaitStatuses;
            if (awaitStatuses.getCurrentUser !== prevAwaitStatuses.getCurrentUser) {
                if (awaitStatuses.getCurrentUser && awaitStatuses.getCurrentUser !== 'pending') {
                    if (!this.props.token) {
                        this.redirect();
                    }
                }
            }
        }

        componentDidMount(){
            const awaitStatuses = this.props.awaitStatuses;
            if (awaitStatuses.getCurrentUser === 'failure') {
                if (!this.props.token) {
                    this.redirect();
                }
            }
        }

        render() {
            if (this.props.token) return <ComponentChild {...this.props}/>;
            else return <div></div>
        }
    }
    const mapStateToProps = (state) => ({
        token: state.auth.token,
        user: state.auth.user
    });
    return connect(mapStateToProps)(AuthenticatedComponent)
}
