import React, {Component, PropTypes} from 'react';
import {Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import ManagerDefault from '../manager_default';
import {mediaItemPropType} from '../proptypes';
import {bindActionCreators} from 'redux';
import {unCheckedAllMedia} from '../../../redux/actions/mediaAction';

import "./style.scss";

@connect((state) => ({
    mediasChecked: state.media.medias.data.filter(m => m.checked),
}), (dispatch) => bindActionCreators({unCheckedAllMedia}, dispatch))
export default class ManagerModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        toggle: PropTypes.func,
        mediasChecked: PropTypes.arrayOf(PropTypes.shape(mediaItemPropType)),
        onChooseMedia: PropTypes.func,
        onChooseMediaChecked: PropTypes.func,
        unCheckedAllMedia: PropTypes.func,
        isMultipleChoose: PropTypes.bool
    }

    @autobind
    handleChooseMediaChecked(e){
        e.preventDefault();
        this.props.onChooseMediaChecked(this.props.mediasChecked);
        this.props.unCheckedAllMedia();
    }

    customToolbar(){
        const {mediasChecked} = this.props;
        if(mediasChecked.length === 0) return null;
        return <button className="btn btn-transparent" onClick={this.handleChooseMediaChecked}>
            Import {mediasChecked.length} files
        </button>
    }

    render() {
        const {isMultipleChoose, isOpen, toggle, onChooseMedia} = this.props;
        const media_manager_props = {
            onChooseMedia,
            customToolbar: isMultipleChoose ? this.customToolbar() : null
        }
        return <Modal isOpen={isOpen} toggle={toggle} className="media-manager-modal">
            <ManagerDefault ref="manager" {...media_manager_props}/>
        </Modal>
    }
}