import React, {Component} from 'react';
import {Container, Col, Card, CardHeader, CardBlock} from 'reactstrap';
import {reduxForm} from 'redux-form';
import validator from 'validator';
import {UIForm} from '../../components/index';
import {AuthApi} from '../../api/index';

class ForgotPassword extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            emailSended: false
        }

        this._handleSendMail = (values, dispatch) => {
            const {email} = values;
            return new Promise((resolve, reject) => {
                AuthApi.sendPasswordResetEmail(email).then(() => {
                    this.setState({emailSended: true});
                    resolve();
                }).catch((errors) => {
                    this.setState({emailSended: false});
                    reject(errors);
                });
            })
        }
    }

    render() {
        const {fields: {email}, handleSubmit, submitting} = this.props;
        return (
            <Container>
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Quên mật khẩu</CardHeader>
                        <CardBlock>
                            {this.state.emailSended &&
                            <div className="alert alert-success">Đã gửi mật khẩu mới tới {email.value}</div>
                            }
                            <form onSubmit={handleSubmit(this._handleSendMail)}>
                                <UIForm.InputText title="Email" {...email}/>
                                <button className="btn btn-primary btn-block" disabled={submitting}>
                                    Yêu cầu mật khẩu
                                </button>
                            </form>
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['email'];

const validate = (values) => {
    let errors = {};
    if (!values.email) errors.email = 'Vui lòng nhập email';
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = 'Định dạng email không đúng';
    }
    return errors;
}

const form = {
    form: 'forgotPassword',
    fields,
    validate
}

export default reduxForm(form)(ForgotPassword);