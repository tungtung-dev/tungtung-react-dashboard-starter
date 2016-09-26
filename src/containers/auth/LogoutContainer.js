import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {AuthAction, AlertAction} from '../../redux/actions/index'

class Logout extends Component {
    componentDidMount() {
        this.props.authLogout();
        this.props.addAlertToast('logout_success', 'Đăng xuất', 'Đăng xuất thành công', 'success');
        this.props.push('/');
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authLogout: AuthAction.authLogout,
        addAlertToast: AlertAction.addAlertToast,
        push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)