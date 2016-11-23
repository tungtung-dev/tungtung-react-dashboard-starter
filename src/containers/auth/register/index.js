/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import {Col, Container, Card, CardHeader, CardBlock} from 'reactstrap';
import validator from 'validator';
import {AuthApi} from '../../../api'
import {InputText} from '../../../components/form';
import {Toaster} from '../../../components/layouts';

import {storageKey} from '../../../config';

import {setAuthToken} from '../../../redux/actions/authAction';

class Register extends Component {
    constructor() {
        super(...arguments);
        this._onRegister = (values, dispatch) => {
            const {email, username, fullName, password} = values;
            const userinfo = {
                email, username, fullName, password
            }
            return new Promise((resolve, reject) => {
                AuthApi.authRegister(userinfo).then(userRes => {
                    dispatch(setAuthToken(userRes.token, userRes));
                    resolve(userinfo);
                    Toaster.show({message: 'Register successed', timeout: 3000, intent: 1});

                    const redirectUrl = localStorage.getItem(storageKey.redirect);
                    if (redirectUrl) {
                        dispatch(push(redirectUrl));
                        localStorage.removeItem(storageKey.redirect);
                    }
                    else dispatch(push('/'));
                }).catch(errors => {
                    Toaster.show({message: 'Register failed', timeout: 3000, intent: 3});
                    reject(errors);
                });
            })
        }
    }

    render() {
        const {fields: {email, username, fullName, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader><i className="icon-register"/> Register</CardHeader>
                        <CardBlock>
                            <form action="" onSubmit={handleSubmit(this._onRegister)}>
                                <InputText title="Email" {...email} />
                                <InputText title="Username" {...username} />
                                <InputText title="Fullname" {...fullName} />
                                <InputText title="Password" type="password" {...password} />
                                <button className="btn btn-primary btn-block" disabled={submitting}>Register</button>
                            </form>
                            <div className="text-center margin-top-20">
                                <Link to="auth/login">You have already account ?</Link><br/>
                            </div>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['email', 'username','fullName','password'];
const asyncBlurFields = ['email', 'username'];

const asyncValidate = (values, dispatch, props)=> {
    let errors = {};
    asyncBlurFields.map((field)=> {
        if (props.form[field]) {
            if (props.form[field].asyncError) {
                errors[field] = props.form[field].asyncError;
            }
        }
        return {};
    })
    switch (props.form._active) {
        case 'email':
            return new Promise((relsove, reject) => {
                AuthApi.checkFieldExists('email', values.email).then(exists => {
                    if (exists.exists) {
                        reject({
                            ...errors,
                            email: 'Email already exists'
                        });
                    }
                    else relsove();
                })
            });
        case 'username':
            return new Promise((relsove, reject) => {
                AuthApi.checkFieldExists('username', values.username).then(exists => {
                    if (exists.exists) {
                        reject({
                            ...errors,
                            username: 'Username already exists'
                        });
                    }
                    else relsove();
                })
            });
        default:
            return new Promise((resolve, reject) => {
                if (Object.keys(errors).length > 0) reject(errors);
                else resolve();
            });
    }
}

const validate = (values) => {
    let errors = {};
    if (!values.email) errors.email = 'Please enter email';
    if (!values.password) errors.password = 'Please enter password';
    if (!values.username) errors.username = "Please enter username";
    else {
        var matches = values.username.match(/^[a-z][a-z1-9\_]*/g);
        if (values.username.length < 5) {
            errors.username = "Username is min length 5 characters";
        }
        else if (values.username.length > 15) {
            errors.username = "Username is min length 15 characters"
        }
        else if (matches && matches.length > 0) {
            if (matches[0] !== values.username) errors.username = 'Username shouldn\'t contains special chars';
        }
        else if (!matches) {
            errors.username = 'Username shouldn\'t contains special chars';
        }
    }
    if(!values.fullName) errors.fullName = "Please enter fullname"
    if (values.fullName && !(new RegExp(/^([^1-9/<>!@#$%^&*+"'\\\/\[\]`.,~?])+$/g)).test(values.fullname)) {
        errors.fullName = "Fullname shoudn\'t contains special chars";
    }
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = 'Email incorrect';
    }
    return errors;
}

const form = {
    form: 'registerForm',
    fields,
    validate,
    asyncValidate,
    asyncBlurFields
}


export default reduxForm(form)(Register);