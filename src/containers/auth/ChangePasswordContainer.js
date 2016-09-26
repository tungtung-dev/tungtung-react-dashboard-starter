import React, {Component} from 'react';
import {Container, Col, Card, CardHeader, CardBlock} from 'reactstrap';
import {reduxForm} from 'redux-form';
import {UIForm} from '../../components/index';
import {AuthApi} from '../../api/index';

class ChangePassword extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            success: false
        }

        this._handleChangePassword = (values, dispatch) => {
            const {password} = values;
            return new Promise((resolve, reject) => {
                AuthApi.updatePassword(password).then(() => {
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
        const {fields: {old_password, password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Thay đổi mật khẩu</CardHeader>
                        <CardBlock>
                            {this.state.success &&
                            <div className="alert alert-success">Thay đổi mật khẩu thành công</div>
                            }
                            <form onSubmit={handleSubmit(this._handleChangePassword)}>
                                <UIForm.InputText title="Mật khẩu cũ" tyoe="password" {...old_password}/>
                                <UIForm.InputText title="Mật khẩu mới" type="password" {...password}/>
                                <button className="btn btn-primary btn-block" disabled={submitting}>
                                    Thay đổi
                                </button>
                            </form>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['old_password', 'password', 'email'];
const asyncBlurFields = ['old_password'];

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
        case 'old_password':
            return new Promise((relsove, reject) => {
                AuthApi.checkPassword(values.email, values.old_password).then(() => {
                }).catch((err) => {
                    reject({
                        ...errors,
                        old_password: 'Mật khẩu cũ không đúng'
                    });
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
    if (!values.old_password) errors.old_password = 'Vui lòng nhập mật khẩu cũ';
    if (!values.password) errors.password = 'Vui lòng nhập mật khẩu mới';
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