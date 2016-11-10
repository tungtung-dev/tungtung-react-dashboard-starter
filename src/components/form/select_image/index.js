import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ChooseImageWrap} from '../../media_manager/index';
import {addAlertToast} from '../../../redux/actions/AlertAction';

@connect(() => ({}), (dispatch) => bindActionCreators({addAlertToast}, dispatch))
export default class SelectImage extends Component {
    state = {
        value: '',
    }

    @autobind
    chooseMedia(media){
        this.setState({value: media.thumbnail_url, showModal: false});
    }

    render() {
        return <div>
            {this.state.value && <img src={this.state.value} alt=""/>}
            <ChooseImageWrap onChoose={this.chooseMedia}>
                <button className="btn btn-purple" onClick={this.toggleModal}>Select image</button>
            </ChooseImageWrap>
        </div>
    }
}

SelectImage.propTypes = {
    value: PropTypes.string
}
