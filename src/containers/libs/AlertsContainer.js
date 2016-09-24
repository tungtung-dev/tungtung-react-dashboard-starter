import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ALERT_TEXT} from '../../constants/alertType';
import {resetAlert} from '../../redux/actions/AlertAction';
import {bindActionCreators} from 'redux';
import Equal from 'deep-equal';

class AlertsContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            alerts: []
        }
    }

    getAlertsStatus(status) {
        return this.props.alerts.filter((a)=> a.status === status);
    }

    renderStatus(status = 'success') {
        var alerts = this.getAlertsStatus(status);
        if (status === 'error') status = 'danger';
        if (alerts.length > 0) {
            return (<div className={`alert alert-${status}`}>
                {alerts.map((alert, index) => <p key={index}><strong>{alert.title}</strong><br/> {alert.content}</p>)}
            </div>);
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !Equal(this.props.alerts, nextProps.alerts);
    }

    componentWillUnmount() {
        if (this.props.autoReset) {
            this.props.resetAlert();
        }
    }

    render() {
        return (
            <div>
                {this.renderStatus('success')}
                {this.renderStatus('info')}
                {this.renderStatus('warning')}
                {this.renderStatus('error')}
            </div>
        )
    }
}

AlertsContainer.defaultProps = {
    autoReset: true
}

AlertsContainer.propTypes = {
    autoReset: PropTypes.bool
}

const mapStateToProps = (state)=> {
    return {
        alerts: state.alert.filter(a => a.alert_type === ALERT_TEXT)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({resetAlert}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsContainer);
