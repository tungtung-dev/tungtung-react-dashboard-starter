import React, {Component} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import {Col, Container, Card, CardHeader, CardBlock} from 'reactstrap';
import validator from 'validator';
import {AuthApi} from '../../api/index'
import {InputText} from '../../components/form/index';
import {AuthAction, AlertAction} from '../../redux/actions/index';

class Register extends Component {
    constructor() {
        super(...arguments);
        this._onRegister = (values, dispatch) => {
            const {email, fullName, password} = values;
            const userinfo = {
                email, password, fullName
            }
            return new Promise((resolve, reject) => {
                AuthApi.authRegister(userinfo).then(userRes => {
                    dispatch(AuthAction.setAuthToken(userRes.token, userRes));
                    dispatch(AlertAction.addAlertToast('register_success', 'Đăng ký thành công', 'Chúc mừng bạn đã đăng ký thành công', 'success'));
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
        const {fields: {email, fullName, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader><i className="icon-register"/> Đăng ký</CardHeader>
                        <CardBlock>
                            <form action="" onSubmit={handleSubmit(this._onRegister)}>
                                <InputText title="Email" {...email} />
                                <InputText title="Fullname" {...fullName} />
                                <InputText title="Mật khẩu" type="password" {...password} />
                                <button className="btn btn-primary btn-block" disabled={submitting}>Đăng ký</button>
                            </form>
                            <div className="text-center margin-top-20">
                                <Link to="auth/login">Bạn đã có tài khoản ?</Link><br/>
                            </div>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['email', 'fullName', 'password'];

const validate = (values) => {
    let errors = {};
    if (!values.email) errors.email = 'Vui lòng nhập email';
    if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
    if (!values.fullName) errors.fullName = "Vui lòng nhập họ và tên";
    if (values.fullName && !(new RegExp(/^([^1-9/<>!@#$%^&*+"'\\\/\[\]`.,~?])+$/g)).test(values.fullname)) {
        errors.fullName = "Tên không được chứa các ký tự đặc biệt";
    }
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = 'Định dạng email không đúng';
    }
    return errors;
}

const form = {
    form: 'registerForm',
    fields,
    validate
}


export default reduxForm(form)(Register);