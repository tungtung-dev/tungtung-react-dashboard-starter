import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ToastsContainer} from './components/index';
import {addAlertToast} from '../actions/AlertAction';

class AppContainer extends Component {
    componentDidMount() {
        this.props.addAlertToast('welcome', "Welcome to react", "Have fun", "success");
    }

    render() {
        return (
            <div>
                <ToastsContainer/>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dipsatch) => {
    return bindActionCreators({addAlertToast}, dipsatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);