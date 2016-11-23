import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Toaster} from '../../../components/layouts';
import {authLogout} from '../../../redux/actions/authAction'

@connect(() => ({}), (dispatch) => bindActionCreators({authLogout, push}, dispatch))
export default class Logout extends Component {
    componentDidMount() {
        this.props.authLogout();
        this.props.push('/auth/login');
        Toaster.show({message: 'Logout successed', intent: 1})
    }

    render() {
        return null;
    }
}