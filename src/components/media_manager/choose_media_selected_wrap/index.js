import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Equal from 'deep-equal';
import MediaManagerModal from '../manager_modal/index';
import {addAlertToast} from '../../../redux/actions/AlertAction';

const Div = ({children, className}) => <div className={className}>{children}</div>
const Span = ({children, className}) => <span className={className}>{children}</span>

@connect(() => ({}), (dispatch) => bindActionCreators({addAlertToast}, dispatch))
export default class ChooseImageWrap extends Component {
    static propTypes = {
        element: PropTypes.oneOf(['div','span']),
        addAlertToast: PropTypes.func,
        onChoose: PropTypes.func
    }

    state = {
        showModal: false
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(prevProps, this.props) || !Equal(this.state, prevState);
    }

    @autobind
    toggleModal(e){
        if(e) e.preventDefault();
        this.setState({showModal: !this.state.showModal});
    }

    @autobind
    chooseMediaChecked(medias){
        if(!medias) return ;
        if(medias && medias.length === 0){
            this.props.addAlertToast('media_error','Bạn chưa chọn file nào','','error');
            return ;
        }
        this.props.onChoose(medias);
        this.toggleModal();
    }

    @autobind
    chooseMedia(media){
        this.props.onChoose([media]);
        this.toggleModal();
    }

    getWrap(){
        switch (this.props.element){
            case 'span': return Span;
            default: return Div;
        }
    }

    render() {
        const cloneChildren = React.cloneElement(this.props.children, {
            onClick: this.toggleModal
        });
        const Wrap = this.getWrap();
        return <Wrap className={this.props.className}>
            {cloneChildren}
            <MediaManagerModal
                onChooseMedia={this.chooseMedia}
                onChooseMediaChecked={this.chooseMediaChecked}
                isOpen={this.state.showModal}
                toggle={this.toggleModal}
                isMultipleChoose
            />
        </Wrap>
    }
}

