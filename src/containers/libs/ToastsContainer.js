/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ALERT_TOAST} from '../../constants/alertType';
import Equal from 'deep-equal';

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class ToastsContainer extends Component {
    showToast(toast) {
        const {title, content, status} = toast;
        console.log(toast);
        this.refs.container[status](
            content,
            title, {
                timeOut: 3000,
                extendedTimeOut: 1000
            });
    }

    componentDidUpdate(prevProps) {
        if (!Equal(prevProps.toasts, this.props.toasts)) {
            this.props.toasts.map((toast, index) => {
                setTimeout(() => {
                    this.showToast(toast);
                }, 200 * (index))
            })
        }
    }


    componentDidMount() {
        this.props.toasts.map((toast, index) => {
            setTimeout(() => {
                this.showToast(toast);
            }, 200 * (index - 1))
        })
    }

    shouldComponentUpdate(nextProps) {
        return !Equal(nextProps.toasts, this.props.toasts);
    }

    render() {
        return (
            <ToastContainer ref="container"
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right"/>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        toasts: state.alert.filter((alert) => alert.alert_type === ALERT_TOAST)
    };
}

export default connect(mapStateToProps)(ToastsContainer);