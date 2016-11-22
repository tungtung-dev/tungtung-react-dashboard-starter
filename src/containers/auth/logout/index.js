import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {authAction, alertAction} from '../../../redux/actions/index'

class Logout extends Component {
    componentDidMount() {
        this.props.authLogout();
        this.props.addAlertToast('logout_success', 'Đăng xuất', 'Đăng xuất thành công', 'success');
        this.props.push('/auth/login');
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
        authLogout: authAction.authLogout,
        addAlertToast: alertAction.addAlertToast,
        push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)