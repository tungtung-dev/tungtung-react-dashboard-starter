import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {Col, Container, Card, CardHeader, CardBlock} from 'reactstrap';
import validator from 'validator';

import {InputText} from '../../../components/form';
import {Toaster} from '../../../components/layouts';
import {AuthApi} from '../../../api';
import {storageKey} from '../../../config';
import {setAuthToken} from '../../../redux/actions/authAction';

class Login extends Component {
    constructor() {
        super(...arguments);
        this._onLogin = (values, dispatch) => {
            const {email, password} = values;
            return new Promise((resolve, reject) => {
                AuthApi.authLogin({email, password}).then(userRes => {
                    if (userRes.success) {
                        const {token, user} = userRes;
                        dispatch(setAuthToken(token, user));
                        Toaster.show({message: 'Login successed', timeout: 3000, intent: 1});
                        resolve(user);

                        const redirectUrl = localStorage.getItem(storageKey.redirect);
                        if (redirectUrl) {
                            dispatch(push(redirectUrl));
                            localStorage.removeItem(storageKey.redirect);
                        }
                        else dispatch(push('/'));
                    }
                    else {
                        Toaster.show({message: 'Login failed', timeout: 3000, intent: 3});
                        reject(userRes.errors);
                    }
                })
            })
        }
    }

    render() {
        const {fields: {email, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader><i className="icon-login"/> Login</CardHeader>
                        <CardBlock>
                            <form onSubmit={handleSubmit(this._onLogin)}>
                                <InputText title="Email" {...email} />
                                <InputText title="Mật khẩu" type="password" {...password} />
                                <button className="btn btn-primary btn-block" disabled={submitting}>Login</button>
                            </form>
                            <div className="text-center margin-top-20">
                                <Link to="/auth/register">Register account</Link><br/>
                                <Link to="/auth/forgot-password">Forgot password</Link>
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
    if (!values.email) errors.email = 'Please enter email';
    if (!values.password) errors.password = 'Please enter password';
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = 'Email incorrect';
    }
    return errors;
}

const form = {
    form: 'loginForm',
    fields,
    validate
}

export default reduxForm(form)(Login);