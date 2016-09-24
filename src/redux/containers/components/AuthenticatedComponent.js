import React, {Component} from 'react';
import {connect} from '../../../utils/reduxAwait'
import {push} from 'react-router-redux';

export default function requireAuth(ComponentChild) {
    class AuthenticatedComponent extends Component {
        componentDidUpdate(prevProps) {
            const awaitStatuses = this.props.awaitStatuses;
            const prevAwaitStatuses = prevProps.awaitStatuses;
            if (awaitStatuses.getUserFromToken !== prevAwaitStatuses.getUserFromToken) {
                if (awaitStatuses.getUserFromToken && awaitStatuses.getUserFromToken !== 'pending') {
                    if (!this.props.user.id) {
                        let redirectAfterLogin = this.props.location.pathname;
                        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
                        console.log('not auth');
                    }
                }
            }
        }

        render() {
            return (
                <span>
                    {this.props.user.id &&
                    <ComponentChild {...this.props}/>
                    }
                </span>
            )
        }
    }
    const mapStateToProps = (state) => ({
        token: state.auth.token,
        user: state.auth.user
    });
    return connect(mapStateToProps)(AuthenticatedComponent)
}
