import React, {Component} from 'react';
import {Container, Col, Card, CardHeader, CardBlock} from 'reactstrap';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import {UIForm} from '../../../components';
import {AuthApi} from '../../../api/index';
import {addAlertToast} from '../../../redux/actions/alertAction'

class NewPassword extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            checkedCode: false
        }

        this._handleResetPassword = (values, dispatch) => {
            const {password} = values;
            const {oobCode} = this.props.location.query;
            return new Promise((resolve, reject) => {
                AuthApi.confirmPasswordReset(oobCode, password).then(() => {
                    dispatch(addAlertToast('reset_password_success', 'Cập nhật mật khẩu', 'Cập nhật mật khẩu thành công,  vui lòng đăng nhập lại', 'success'));
                    dispatch(push('/auth/login'));
                    resolve();
                }).catch((errors) => {
                    reject(errors);
                })
            });
        }
    }

    componentDidMount() {
        const {oobCode} = this.props.location.query;
        AuthApi.verifyPasswordResetCode(oobCode).then(() => {
            this.setState({checkedCode: true});
        }).catch(() => {
            this.props.dispatch(addAlertToast('reset_password_fail', 'Code không đúng hoặc hết hạn', '', 'error'));
            this.props.dispatch(push('/'));
        });
    }

    render() {
        const {fields: {password}, handleSubmit, submitting} = this.props;
        return (
            <Container className="margin-top-50">
                <Col md={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Mật khẩu mới</CardHeader>
                        <CardBlock>
                            {!this.state.checkedCode && <p>Đang kiểm tra code ...</p>}
                            {this.state.checkedCode && <form onSubmit={handleSubmit(this._handleResetPassword)}>
                                <UIForm.InputText type="password" title="Mật khẩu mới" {...password}/>
                                <button className="btn btn-primary btn-block" disabled={submitting}>
                                    Xác nhận mật khẩu
                                </button>
                            </form>}
                        </CardBlock>
                    </Card>
                </Col>
            </Container>
        )
    }
}

const fields = ['password'];

const validate = (values) => {
    let errors = {};
    if (!values.password) errors.password = "Vui lòng nhập mật khẩu mới";
    if (values.password && values.password.length <= 5) {
        errors.password = "Password lớn hơn 6 ký tự"
    }
    return errors;
}

const form = {
    form: 'newPassword',
    fields,
    validate
}

export default reduxForm(form)(NewPassword);