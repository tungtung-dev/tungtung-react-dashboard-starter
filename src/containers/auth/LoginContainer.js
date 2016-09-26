import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {Col, Container, Card, CardHeader, CardBlock} from 'reactstrap';
import validator from 'validator';

import {InputText} from '../../components/form/index';
import {AuthApi} from '../../api/index';
import {AuthAction, AlertAction} from '../../redux/actions/index';
import {AlertsContainer} from '../libs/index';

const {setAuthToken} = AuthAction;
const {addAlertToast} = AlertAction;

class Login extends Component {
    constructor() {
        super(...arguments);
        this._onLogin = (values, dispatch) => {
            const {email, password} = values;
            return new Promise((resolve, reject) => {
                AuthApi.loginUser(email, password).then(user => {
                    dispatch(setAuthToken(user.token, user));
                    dispatch(addAlertToast('login_success', 'Thông báo', 'Đăng nhập thành công', 'success'));
                    if (localStorage.getItem('redirect_back')) {
                        dispatch(push(localStorage.getItem('redirect_back')));
                        localStorage.removeItem('redirect_back');
                    }
                    else dispatch(push('/'));
                    resolve(user);
                }).catch(errors => {
                    reject(errors);
                });
            })
        }
    }

    render() {
        const {fields: {email, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader><i className="icon-login"/> Đăng nhập</CardHeader>
                        <CardBlock>
                            <AlertsContainer/>
                            <form onSubmit={handleSubmit(this._onLogin)}>
                                <InputText title="Email" {...email} />
                                <InputText title="Mật khẩu" type="password" {...password} />
                                <button className="btn btn-primary btn-block" disabled={submitting}>Đăng nhập</button>
                            </form>
                            <div className="text-center margin-top-20">
                                <Link to="auth/register">Bạn chưa có tài khoản ?</Link><br/>
                                <Link to="auth/forgot-password">Quên mật khẩu</Link>
                            </div>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['email', 'password'];

const validate = (values) => {
    let errors = {};
    if (!values.email) errors.email = 'Vui lòng nhập email';
    if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = 'Định dạng email không đúng';
    }
    return errors;
}

const form = {
    form: 'loginForm',
    fields,
    validate
}

export default reduxForm(form)(Login);