import React,{Component} from 'react';
import {connect} from '../utils/reduxAwait';
import {bindActionCreators} from 'redux';
import {ToastsContainer} from './libs/index';

import {getCurrenUser} from '../redux/actions/authAction';
import {autoLoadData} from '../redux/actions/defaultLoadAction';
import {getSettings} from '../redux/actions/settingAction';

class AppContainer extends Component {
    componentDidMount() {
        this.props.getCurrenUser();
        this.props.autoLoadData();
        this.props.getSettings();
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <ToastsContainer/>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token ? true : false,
        auth: state.auth.user
    }
}

const mapDispatchToProps = (dipsatch) => {
    return bindActionCreators({getCurrenUser, autoLoadData, getSettings}, dipsatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);