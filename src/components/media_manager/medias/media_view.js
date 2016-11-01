import React, {Component, PropTypes} from 'react';
import {Modal} from 'reactstrap';
import {mediaItemPropType} from '../proptypes';

export default class MediaView extends Component {
    render() {
        const {type, original_url} = this.props;
        return (
            <Modal {...this.props}>
                <img src={original_url} style={{maxWidth: '100%'}} alt=""/>
            </Modal>
        )
    }
}

MediaView.propTypes = {
    ...mediaItemPropType
}
