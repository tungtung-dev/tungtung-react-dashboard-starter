import React, {Component} from 'react';
import {Container, Col, Card, CardHeader, CardBlock} from 'reactstrap';
import {reduxForm} from 'redux-form';
import {UIForm} from '../../../components';
import {AuthApi} from '../../../api';

class ChangePassword extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            success: false
        }

        this._handleChangePassword = (values, dispatch) => {
            const {oldPassword, password} = values;
            return new Promise((resolve, reject) => {
                AuthApi.updatePassword(oldPassword, password).then(() => {
                    this.setState({success: true});
                    resolve();
                }).catch((errors) => {
                    this.setState({success: false});
                    reject(errors);
                });
            })
        }
    }

    render() {
        const {fields: {oldPassword, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Change password</CardHeader>
                        <CardBlock>
                            {this.state.success &&
                            <div className="alert alert-success">Change password succesed</div>
                            }
                            <form onSubmit={handleSubmit(this._handleChangePassword)}>
                                <UIForm.InputText title="Old password" type="password" {...oldPassword}/>
                                <UIForm.InputText title="New Password" type="password" {...password}/>
                                <button className="btn btn-primary btn-block" disabled={submitting}>
                                    Change
                                </button>
                            </form>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['oldPassword', 'password', 'email'];
const asyncBlurFields = ['oldPassword'];

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
        case 'oldPassword':
            return new Promise((relsove, reject) => {
                const user = {
                    email: values.email,
                    password: values.oldPassword
                }
                AuthApi.authLogin(user).then((userRes) => {
                    if(userRes.success === false){
                        reject({
                            ...errors,
                            oldPassword: 'Old password incorrect'
                        });
                    }
                });
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
    if (!values.oldPassword) errors.oldPassword = 'Please enter old password';
    if (!values.password) errors.password = 'Please enter new password';
    return errors;
}

const form = {
    form: 'forgotPassword',
    fields,
    validate,
    asyncValidate,
    asyncBlurFields
}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            email: state.auth.user.email
        }
    }
}

export default reduxForm(form, mapStateToProps)(ChangePassword);