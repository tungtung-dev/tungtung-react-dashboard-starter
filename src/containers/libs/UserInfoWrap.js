import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../../redux/actions/DefaultLoadAction';
import {connect} from '../../utils/reduxAwait';

class UserInfoWrap extends Component {
    componentDidMount() {
        if (!this.props.user._id) {
            this.props.getUserInfo(this.props.user_id);
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.user._id !== prevProps.user._id){
            this.props.getUserInfo(this.props.user_id);
        }
    }

    render() {
        var ComponentChildren = this.props.component;
        var props = this.props;
        if (this.props.noPassPropUser) {
            props = {
                ...props,
                ...this.props.user
            }
        }
        return (
            <span>
                <ComponentChildren {...props}/>
            </span>
        );
    }
}

UserInfoWrap.propTypes = {
    noPassPropUser: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    var user = {};
    var keySearch = "_id";
    if (!ownProps.user_id.match(/^[0-9a-fA-F]{24}$/)) {
        keySearch = "username";
    }
    user = state.defaultLoad.users.find(u => u[keySearch] === ownProps.user_id);
    if (!user) user = {};
    return {
        user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserInfo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoWrap);

